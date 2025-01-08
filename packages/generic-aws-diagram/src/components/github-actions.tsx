import { Img, ImgProps, Layout, LayoutProps, Rect } from "@motion-canvas/2d/lib/components";
import { PossibleCanvasStyle } from "@motion-canvas/2d/lib/partials";
import { SignalValue } from "@motion-canvas/core/lib/signals";
import { ComponentHelpers, ComponentHelpersProps } from "valewood-components/component-helpers";

export interface GitHubActionsProps extends ComponentHelpersProps {
    radius?: SignalValue<number>;
}

export class GitHubActions extends ComponentHelpers {
    public constructor(props?: GitHubActionsProps) {
        super({
            ...props,
        });

        this.containerNode().add(
            <>
                <Img
                    src={"https://avatars.githubusercontent.com/u/44036562?s=200&v=4"}
                    width={this.width}
                    height={this.height}
                    radius={props.radius}
                    clip
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