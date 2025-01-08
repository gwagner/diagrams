import { Img, Txt } from "@motion-canvas/2d/lib/components";
import route53HostedZoneImage from "./Res_Amazon-Route-53-Hosted-Zone_48_Dark.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface Route53HostedZoneProps extends AWSIconBaseProps {
    
}

export class Route53HostedZone extends AWSIconBase {

    public constructor(props?: Route53HostedZoneProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={route53HostedZoneImage}
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
                    text="Hosted Zone"
                    textAlign={"center"}
                />
            </>
        )
    }
}