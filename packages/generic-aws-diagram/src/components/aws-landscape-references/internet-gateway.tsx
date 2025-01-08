import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { InstantiateRef } from "../../utils/setup";
import { Line, View2D } from "@motion-canvas/2d/lib/components";
import { InternetGateway } from "valewood-components/cloud/aws/internet-gateway";
import { AwsLandscapeComponentRef, BaseRef } from "./base";

export class InternetGatewayRef extends BaseRef implements AwsLandscapeComponentRef {

    private _ref: Reference<InternetGateway>;
    public get ref(): Reference<InternetGateway> {
        return this._ref;
    }
    private set ref(value: Reference<InternetGateway>) {
        this._ref = value;
    }

    private _arrow_to_firewall_az1: Reference<Line> = createRef<Line>();
    public get arrow_to_firewall_az1(): Reference<Line> {
        return this._arrow_to_firewall_az1;
    }
    private set arrow_to_firewall_az1(value: Reference<Line>) {
        this._arrow_to_firewall_az1 = value;
    }

    private _arrow_to_firewall_az2: Reference<Line> = createRef<Line>();
    public get arrow_to_firewall_az2(): Reference<Line> {
        return this._arrow_to_firewall_az2;
    }
    private set arrow_to_firewall_az2(value: Reference<Line>) {
        this._arrow_to_firewall_az2 = value;
    }


    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<InternetGateway>();

        this.tags = [Tags.Configurable, Tags.Egress, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup() {
        return (<InternetGateway ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape) {

    }
}