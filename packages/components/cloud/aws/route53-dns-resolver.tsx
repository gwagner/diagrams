import { Img, Txt } from "@motion-canvas/2d/lib/components";
import route53DnsResolverImage from "./Res_Amazon-Route-53_Resolver_48_Dark.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface Route53DnsResolverProps extends AWSIconBaseProps {
    
}

export class Route53DnsResolver extends AWSIconBase {

    public constructor(props?: Route53DnsResolverProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={route53DnsResolverImage}
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
                    text="DNS Resolver"
                    textAlign={"center"}
                />
            </>
        )
    }
}