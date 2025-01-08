
import { ComponentChildren, Layout, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { Length } from "@motion-canvas/2d/lib/partials";
import { createSignal, Signal, SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { createRef, useLogger } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface SubnetContainerProps extends ComponentHelpersProps {

}

export class SubnetContainer extends ComponentHelpers {

    public readonly componentLayout = createRef<Layout>();
    public readonly labelTop = createRef<Txt>();
    public readonly labelBottom = createRef<Txt>();
    public readonly iconContainer = createRef<Rect>();

    protected readonly labelTopText = createSignal("")
    protected readonly labelBottomText = createSignal("")

    protected readonly labelTopSize: SimpleSignal<number, void> = createSignal(0);
    protected readonly labelBottomSize: SimpleSignal<number, void>  = createSignal(0);
    protected readonly iconContainerSize: SimpleSignal<number, void>;

    public constructor(props?: SubnetContainerProps) {
        super({
            ...props,
        });
        this.containerNode().remove()

        this.layout(true)
        this.direction("column")
        this.padding(8)
        this.margin(16)
        this.minWidth(64)
        this.radius(8)

        this.add(
            <>
                <Txt ref={this.labelTop} text={this.labelTopText} fontSize={this.fontSize} textAlign={"center"}/>
                <Rect ref={this.iconContainer} direction={"column"}  wrap={"wrap"} grow={1} alignContent={"center"} justifyContent={"space-evenly"} />
                <Txt ref={this.labelBottom} text={this.labelBottomText} fontSize={this.fontSize} textAlign={"center"}/>
            </>
        )

    }

    public addIcon(icon: ComponentChildren) {
        this.iconContainer().add(icon)
    }

    public setTopLabel(label: string) {
        this.labelTopText(label)
    }

    public setBottomLabel(label: string) {
        this.labelBottomText(label)

    }
}