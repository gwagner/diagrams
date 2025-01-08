import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import ec2AutoScalingImage from "./Arch_Amazon-EC2-Auto-Scaling_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface EC2AutoScalingProps extends AWSIconBaseProps {
    
}

export class EC2AutoScaling extends AWSIconBase {

    public constructor(props?: EC2AutoScalingProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={ec2AutoScalingImage}
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
                    text="EC2 AS"
                    textAlign={"center"}
                />
            </>
        )
    }
}