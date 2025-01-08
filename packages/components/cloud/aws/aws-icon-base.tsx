import { Img, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { Length } from "@motion-canvas/2d/lib/partials";
import { createSignal, Signal, SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";
import { createRef, Reference, useLogger } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import { Tags } from "../aws-landscape";

export enum labelAlignment {
    top = 1,
    bottom
}

export interface AWSIconBaseProps extends ComponentHelpersProps {
    label?: string;
    tags?: Tags[];
}

export abstract class AWSIconBase extends ComponentHelpers {

    public readonly primaryElement = createRef<any>();
    public readonly label = createRef<Txt>();

    private _tags: Tags[] = [];

    public constructor(props?: AWSIconBaseProps) {
        super({
            ...props,
        });

        this.tags = props.tags;
        this.minWidth(64)
    }

    public get tags(): Tags[] {
        return this._tags;
    }

    protected set tags(value: Tags[]) {
        this._tags = value;
    }

    public drawContainer(background: string, title: string, align: labelAlignment) {
        let zIndex = this.zIndex() + 1
        let label = createRef<Txt>()

        let alignment = () => { };
        switch(align) {
            case labelAlignment.top: {
                alignment = () => [
                    (((this.size.x() / 2) * -1) + label().size.x() / 2) + 6,
                    (((this.size.y() / 2) * -1) + label().size.y() / 2) + 6,
                ]
                break;
            }

            case labelAlignment.bottom: {
                alignment = () => [
                    (((this.size.x() / 2) * -1) + label().size.x() / 2) + 6,
                    (((this.size.y() / 2) * 1) - label().size.y() / 2) - 6,
                ]
                break;
            }
        }

        this.insert(
            <Txt
                ref={label}
                text={title}
                fontSize={12}
                stroke={"#A9A9A9"}
                alignSelf={"start"}
                zIndex={zIndex}
                
            />, 0
        )

        this.fill(background)
        this.padding(this.containerPadding)
        this.lineWidth(2)
        this.radius(this.radius)
        this.stroke("#FFFFFF")
        this.smoothCorners(true)
        this.width(100)
        this.height(200)
    }

    public getChildElementLeftEdge(i: number): Vector2Signal<void> {
        let child = this.children()[i] as AWSIconBase;
        return Vector2.createSignal(() => this.absolutePosition().addX((this.size.x() / 2) * -1))
    }

    public getChildElementRightEdge(i: number): Vector2Signal<void> {
        let child = this.children()[i] as AWSIconBase;
        return Vector2.createSignal(() => this.absolutePosition().addX((this.size.x() / 2)))
    }

    public getChildElementTopEdge(i: number): Vector2Signal<void> {
        let child = this.children()[i] as AWSIconBase;
        return Vector2.createSignal(() => this.absolutePosition().addY((this.size.y() / 2) * -1))
    }

    public getChildElementBottomEdge(i: number): Vector2Signal<void> {
        let child = this.children()[i] as AWSIconBase;
        return Vector2.createSignal(() => this.absolutePosition().addY((this.size.y() / 2)))
    }
}

export function defaultProps(props?: AWSIconBaseProps): AWSIconBaseProps {
    // set some sane defaults
    if (props.width == undefined) {
        props.width = 48
    }

    if (props.height == undefined) {
        props.height = 48
    }

    if (props.radius == undefined) {
        props.radius = 10
    }

    if (props.fontSize == undefined) {
        props.fontSize = 10
    }

    return props
}