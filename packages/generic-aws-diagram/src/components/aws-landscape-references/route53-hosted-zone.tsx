import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Route53HostedZone } from "valewood-components/cloud/aws/route53-hosted-zone";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class Route53HostedZoneRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Route53HostedZone  >;
    public get ref(): Reference<Route53HostedZone> {
        return this._ref;
    }
    private set ref(value: Reference<Route53HostedZone>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Route53HostedZone>();

        this.tags = [Tags.Configurable, Tags.EndUser, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Route53HostedZone ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}