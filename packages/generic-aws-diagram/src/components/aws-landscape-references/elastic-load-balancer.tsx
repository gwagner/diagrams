import { Line, Rect, View2D } from "@motion-canvas/2d/lib/components"
import { Reference, createRef } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../../components/aws-landscape";
import { ElasticLoadBalancer } from "valewood-components/cloud/aws/elastic-load-balancer"
import { Edge, AwsLandscapeComponentRef, BaseRef } from "./base";

export class ElasticLoadBalancerRef extends BaseRef implements AwsLandscapeComponentRef {

    private _ref: Reference<ElasticLoadBalancer>;
    public get ref(): Reference<ElasticLoadBalancer> {
        return this._ref;
    }
    private set ref(value: Reference<ElasticLoadBalancer>) {
        this._ref = value;
    }

    private _arrow_to_apiGateway_az1: Reference<Line>;
    public get arrow_to_apiGateway_az1(): Reference<Line> {
        return this._arrow_to_apiGateway_az1;
    }
    private set arrow_to_apiGateway_az1(value: Reference<Line>) {
        this._arrow_to_apiGateway_az1 = value;
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
        this._ref = createRef<ElasticLoadBalancer>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup() {
        return (
            <Rect layout={false}>
                <ElasticLoadBalancer layout ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />
            </Rect>
        )
    }

    drawLines(view: View2D, parent: AWSLandscape) {
        // this.getLineAnimationV3({ view: view, ref: this.arrow_to_ec2Web_az1, start: this.ref, startEdge: ArrowDirection.Right, end: parent.ec2Web.ref_az1, endEdge: ArrowDirection.Bottom, numPoints: 3 })
        // this.getLineAnimationV3({ view: view, ref: this.arrow_to_ec2Web_az2, start: this.ref, startEdge: ArrowDirection.Right, end: parent.ec2Web.ref_az2, endEdge: ArrowDirection.Top, dashed: true, numPoints: 3 })
        // this.getLineAnimationV3({ view: view, ref: this.arrow_to_apiGateway_az1, start: this.ref, startEdge: ArrowDirection.Right, startOffset: 20, end: parent.transitSubnet.apiGateway_az1.ref, endEdge: ArrowDirection.Right, color: "#32CD32", numPoints: 3 })
        // this.getLineAnimationV3({ view: view, ref: this.arrow_to_apiGateway_az2, start: this.ref, startEdge: ArrowDirection.Right, startOffset: 20, end: parent.transitSubnet.apiGateway_az2.ref, endEdge: ArrowDirection.Right, color: "#32CD32", dashed: true, numPoints: 3 })
        // this.getLineAnimationV3({ view: view, ref: this.arrow_to_certManager, start: this.ref, startEdge: ArrowDirection.Bottom, end: parent.certificateManager, endEdge: ArrowDirection.Top, color: "#FE7F9C", numPoints: 3 })
    }
}

