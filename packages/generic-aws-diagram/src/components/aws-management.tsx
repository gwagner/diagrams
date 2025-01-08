import { Img, ImgProps, Layout, LayoutProps, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { PossibleCanvasStyle } from "@motion-canvas/2d/lib/partials";
import { SignalValue } from "@motion-canvas/core/lib/signals";
import { ComponentHelpers, ComponentHelpersProps } from "valewood-components/component-helpers";

export interface AWSManagementProps extends ComponentHelpersProps {
    radius?: SignalValue<number>;
}

export class AWSManagement extends ComponentHelpers {
    public constructor(props?: AWSManagementProps) {
        super({
            ...props,
        });

        this.containerNode().add(
            <>
                <Txt
                    text={"AWS\nMGMT"}
                    width={this.width}
                    height={this.height}
                />
            </>
        )

        this.containerNode().fill("#FFFFFF")
        this.containerNode().padding(this.containerPadding)
        this.containerNode().lineWidth(2)
        this.containerNode().radius(this.radius)
        this.containerNode().stroke("#FFFFFF")
        this.containerNode().smoothCorners(true)
    }
}