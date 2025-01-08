import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import natGatewayImage from "./Res_Amazon-VPC_NAT-Gateway_48_Dark.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface NATGatewayProps extends AWSIconBaseProps {
    
}

export class NATGateway extends AWSIconBase {

    public constructor(props?: NATGatewayProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")

        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={natGatewayImage}
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
                    text="NAT Gateway"
                    textAlign={"center"}
                />
            </>
        )
    }
}