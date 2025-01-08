import { Img, Txt } from "@motion-canvas/2d/lib/components";
import route53Image from "./Arch_Amazon-Route-53_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface Route53Props extends AWSIconBaseProps {
    
}

export class Route53 extends AWSIconBase {

    public constructor(props?: Route53Props) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={route53Image}
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
                    text="Route53"
                    textAlign={"center"}
                />
            </>
        )
    }
}