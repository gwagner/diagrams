import { Line, Rect, View2D } from "@motion-canvas/2d/lib/components"
import { Reference, createRef } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../../components/aws-landscape";
import { InstantiateRef } from "../../utils/setup";
import { ApplicationLoadBalancer } from "valewood-components/cloud/aws/application-load-balancer"
import { Edge, AwsLandscapeComponentRef, BaseRef } from "./base";
import { Arrow } from "../../../../components/arrow/arrow";

export class ApplicationLoadBalancerRef extends BaseRef implements AwsLandscapeComponentRef {

    private readonly _ref: Reference<ApplicationLoadBalancer>;
    public get ref(): Reference<ApplicationLoadBalancer> {
        return this._ref;
    }

    private _arrow_to_apiGateway_az1: Reference<Line>;
    public get arrow_to_apiGateway_az1(): Reference<Line> {
        return this._arrow_to_apiGateway_az1;
    }
    private set arrow_to_apiGateway_az1(value: Reference<Line>) {
        this._arrow_to_apiGateway_az2 = value;
    }

    private _arrow_to_apiGateway_az2: Reference<Line>;
    public get arrow_to_apiGateway_az2(): Reference<Line> {
        return this._arrow_to_apiGateway_az2;
    }
    private set arrow_to_apiGateway_az2(value: Reference<Line>) {
        this._arrow_to_apiGateway_az2 = value;
    }

    private _arrow_to_ec2Web_az1: Reference<Line>;
    public get arrow_to_ec2Web_az1(): Reference<Line> {
        return this._arrow_to_ec2Web_az1;
    }
    private set arrow_to_ec2Web_az1(value: Reference<Line>) {
        this._arrow_to_ec2Web_az1 = value;
    }

    private _arrow_to_ec2Web_az2: Reference<Line>;
    public get arrow_to_ec2Web_az2(): Reference<Line> {
        return this._arrow_to_ec2Web_az2;
    }
    private set arrow_to_ec2Web_az2(value: Reference<Line>) {
        this._arrow_to_ec2Web_az2 = value;
    }

    private _arrow_to_certManager: Reference<Line>;
    public get arrow_to_certManager(): Reference<Line> {
        return this._arrow_to_certManager;
    }
    private set arrow_to_certManager(value: Reference<Line>) {
        this._arrow_to_certManager = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<ApplicationLoadBalancer>();

        this.tags = [Tags.EndUser, Tags.Configurable]
        this.addComponentRefs(this._ref)
    }

    setup() {
        return (
            <Rect layout={false}>
                <ApplicationLoadBalancer layout ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />
            </Rect>
        )
    }

    drawLines(view: View2D, parent: AWSLandscape) {
       
    }
}

