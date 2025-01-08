import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import codeBuildImage from "./Arch_AWS-CodeBuild_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface CodeBuildProps extends AWSIconBaseProps {
    
}

export class CodeBuild extends AWSIconBase {

    public constructor(props?: CodeBuildProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={codeBuildImage}
                    width={props.width}
                    height={props.height}
                    radius={props.radius}
                    alignSelf={"center"}
                    shadowColor={"#d3d3d3"}
                    shadowOffset={[2,2]}
                    clip
                />
                <Txt
                    ref={this.label}
                    text="Code Build"
                    textAlign={"center"}
                />
            </>
        )
    }
}