import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { NetworkFirewall } from "valewood-components/cloud/aws/network-firewall";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class NetworkFirewallRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<NetworkFirewall>;
    public get ref(): Reference<NetworkFirewall> {
        return this._ref;
    }
    private set ref(value: Reference<NetworkFirewall>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<NetworkFirewall>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<NetworkFirewall ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}