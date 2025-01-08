import { Img, Txt } from "@motion-canvas/2d/lib/components";
import apiGatewayImage from "./Arch_Amazon-API-Gateway_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface APIGatewayProps extends AWSIconBaseProps {
    
}

export class APIGateway extends AWSIconBase {

    public constructor(props?: APIGatewayProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={apiGatewayImage}
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
                    text="API Gateway"
                    textAlign={"center"}
                />
            </>
        )
    }
}