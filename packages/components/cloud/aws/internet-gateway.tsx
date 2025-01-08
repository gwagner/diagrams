import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import internetGatewayImage from "./Res_Amazon-VPC_Internet-Gateway_48_Light.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface InternetGatewayProps extends AWSIconBaseProps {
    
}

export class InternetGateway extends AWSIconBase {

    public constructor(props?: InternetGatewayProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={internetGatewayImage}
                    width={props.width}
                    height={props.height}
                    radius={props.radius}
                    shadowColor={"#d3d3d3"}
                    shadowOffset={[2,2]}
                    alignSelf={"center"}
                    clip
                />
                <Txt
                    ref={this.label}
                    text="IGW"
                    textAlign={"center"}
                />
            </>
        )
    }
}