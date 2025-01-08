import { Img, Txt } from "@motion-canvas/2d/lib/components";
import applicationLoadBalancerImage from "./Res_Elastic-Load-Balancing_Application-Load-Balancer_48_Light.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface ApplicationLoadBalancerProps extends AWSIconBaseProps {
    
}

export class ApplicationLoadBalancer extends AWSIconBase {

    public constructor(props?: ApplicationLoadBalancerProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={applicationLoadBalancerImage}
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
                    text={"ALB"}
                    fontSize={props.fontSize}
                    textAlign={"center"}
                />
            </>
        )
    }
}