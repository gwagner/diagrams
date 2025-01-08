import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import vpcEndpointImage from "./Res_Amazon-VPC_Endpoints_48_Light.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface VPCEndpointProps extends AWSIconBaseProps {
    
}

export class VPCEndpoint extends AWSIconBase {

    public constructor(props?: VPCEndpointProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={vpcEndpointImage}
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
                    text="VPC Endpoint"
                    textAlign={"center"}
                />
            </>
        )
    }
}