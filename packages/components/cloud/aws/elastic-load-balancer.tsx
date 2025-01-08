import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import elasticLoadBalancerImage from "./Arch_Elastic-Load-Balancing_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface ElasticLoadBalancerProps extends AWSIconBaseProps {
    
}

export class ElasticLoadBalancer extends AWSIconBase {

    public constructor(props?: ElasticLoadBalancerProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={elasticLoadBalancerImage}
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
                    text={"ELB"}
                    fontSize={props.fontSize}
                    textAlign={"center"}
                />
            </>
        )
    }
}