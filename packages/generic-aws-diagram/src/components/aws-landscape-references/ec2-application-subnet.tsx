import { Reference } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { SubnetContainer } from "valewood-components/cloud/aws/subnet-container";
import { InstantiateRef } from "../../utils/setup";
import { EC2AutoScaling } from "valewood-components/cloud/aws/ec2-autoscaling";
import { Line, View2D } from "@motion-canvas/2d/lib/components";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { EC2AutoScalingRef } from "./ec2-autoscaling";

export class EC2ApplicationSubnetRef extends BaseRef implements AwsLandscapeComponentRef {

    public az1: EC2AutoScalingRef
    public az2: EC2AutoScalingRef

    private _az1_arrow_to_rds_az1: Reference<Line>;
    public get az1_arrow_to_rds_az1(): Reference<Line> {
        return this._az1_arrow_to_rds_az1;
    }
    private set az1_arrow_to_rds_az1(value: Reference<Line>) {
        this._az1_arrow_to_rds_az1 = value;
    }

    private _az2_arrow_to_rds_az2: Reference<Line>;
    public get az2_arrow_to_rds_az2(): Reference<Line> {
        return this._az2_arrow_to_rds_az2;
    }
    private set az2_arrow_to_rds_az2(value: Reference<Line>) {
        this._az2_arrow_to_rds_az2 = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this.az1 = new EC2AutoScalingRef(this.props)
        this.az2 = new EC2AutoScalingRef(this.props)

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this.az1.ref)
        this.addComponentRefs(this.az2.ref)
    }


    setupAZ1()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#cbe7ef"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.az1.setup())
        subnet.setTopLabel("App Subnet")

        return subnet
    }

    setupAZ2()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#cbe7ef"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.az2.setup())
        subnet.setBottomLabel("App Subnet")

        return subnet
    }

    drawLines(view: View2D, parent: AWSLandscape) { 

    }
}