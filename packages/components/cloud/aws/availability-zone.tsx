import { ComponentChildren, Rect } from "@motion-canvas/2d/lib/components";
import { Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";
import { ComponentHelpers } from "../../component-helpers";
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface AvailabilityZoneProps extends AWSIconBaseProps {
    halfMarginTop?: boolean;
    halfMarginBottom?: boolean;
}

export const azPadding = 16
export const azMargin = 16

export class AvailabilityZone extends ComponentHelpers {

    public constructor(props?: AvailabilityZoneProps) {
        super({
            ...props,
        });

        this.containerNode().remove()

        this.fill("#FFFFFF")
        this.stroke("#0047AB")
        this.lineDash([3, 3])
        this.lineWidth(2)
        this.justifyContent("end")
        this.alignItems("center")
        this.padding(azPadding)
        this.direction("row-reverse")
        this.margin([props.halfMarginTop?azMargin/2:azMargin, azMargin, props.halfMarginBottom?azMargin/2:azMargin, azMargin])
    }

    public getChildElementLeftEdge(i: number): Vector2Signal<void> {
        return Vector2.createSignal(() => this.absolutePosition().addX((this.size.x() / 2) * -1))
    }

    public getChildElementRightEdge(i: number): Vector2Signal<void> {
        return Vector2.createSignal(() => this.absolutePosition().addX((this.size.x() / 2)))
    }

    public getChildElementTopEdge(i: number): Vector2Signal<void> {
        return Vector2.createSignal(() => this.absolutePosition().addY((this.size.y() / 2) * -1))
    }

    public getChildElementBottomEdge(i: number): Vector2Signal<void> {
        return Vector2.createSignal(() => this.absolutePosition().addY((this.size.y() / 2)))
    }
}