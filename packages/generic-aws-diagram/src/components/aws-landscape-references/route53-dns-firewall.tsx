import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Route53DNSFirewall } from "valewood-components/cloud/aws/route53-dns-firewall"
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class Route53DNSFirewallRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Route53DNSFirewall>;
    public get ref(): Reference<Route53DNSFirewall> {
        return this._ref;
    }
    private set ref(value: Reference<Route53DNSFirewall>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Route53DNSFirewall>();

        this.tags = [Tags.Configurable, Tags.EndUser, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Route53DNSFirewall ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}