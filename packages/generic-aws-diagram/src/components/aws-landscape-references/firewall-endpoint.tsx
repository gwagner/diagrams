import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { InstantiateRef } from "../../utils/setup";
import { FirewallEndpoint } from "valewood-components/cloud/aws/firewall-endpoint";
import { BaseRef } from "./base";
import { AWSLandscapeProps, Tags } from "../../components/aws-landscape";

export class FirewallEndpointRef extends BaseRef  {

    private _ref: Reference<FirewallEndpoint>;
    public get ref(): Reference<FirewallEndpoint> {
        return this._ref;
    }
    private set ref(value: Reference<FirewallEndpoint>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<FirewallEndpoint>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<FirewallEndpoint ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }
}