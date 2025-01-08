import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import { APIGateway } from "./api-gateway";
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";
import apiGatewayImage from "./Arch_Amazon-API-Gateway_64.png"
import natGatewayImage from "./Res_Amazon-VPC_NAT-Gateway_48_Dark.png"
import { ElasticLoadBalancer } from "./elastic-load-balancer";
import { labelAlignment } from "./aws-icon-base";
import { Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";

export interface IngressProps extends AWSIconBaseProps {

}

export class Ingress extends AWSIconBase {

    public readonly primaryElement = createRef<ElasticLoadBalancer>();
    public readonly secondaryElement = createRef<APIGateway>();

    public constructor(props?: IngressProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    src={apiGatewayImage}
                    width={props.width}
                    height={props.height}
                    radius={props.radius}
                    alignSelf={"center"}
                    shadowColor={"#d3d3d3"}
                    shadowOffset={[2,2]}
                    clip
                />
                <Img
                    ref={this.primaryElement}
                    src={natGatewayImage}
                    width={props.width}
                    height={props.height}
                    radius={props.radius}
                    clip
                />
            </>
        )


    }

    public getSecondaryElementLeftEdge(): Vector2Signal<void> {
        return Vector2.createSignal(() => this.secondaryElement().absolutePosition().addX((this.secondaryElement().size.x() / 2) * -1))
    }

    public getSecondaryElementRightEdge(): Vector2Signal<void> {
        return Vector2.createSignal(() => this.secondaryElement().absolutePosition().addX((this.secondaryElement().size.x() / 2)))
    }

    public getSecondaryElementTopEdge(): Vector2Signal<void> {
        return Vector2.createSignal(() => this.secondaryElement().absolutePosition().addY((this.secondaryElement().size.y() / 2) * -1))
    }

    public getSecondaryElementBottomEdge(): Vector2Signal<void> {
        return Vector2.createSignal(() => this.secondaryElement().absolutePosition().addY((this.secondaryElement().size.y() / 2)))
    }
}