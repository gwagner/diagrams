import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import costManagementImage from "./Arch_AWS_Cost-Management_300.webp"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface CostManagementProps extends AWSIconBaseProps {
    
}

export class CostManagement extends AWSIconBase {

    public constructor(props?: CostManagementProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={costManagementImage}
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
                    text="Cost Mgmt"
                    textAlign={"center"}
                />
            </>
        )
    }
}