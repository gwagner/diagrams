import { Reference } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { SubnetContainer } from "valewood-components/cloud/aws/subnet-container";
import { InstantiateRef } from "../../utils/setup";
import { EC2AutoScaling } from "valewood-components/cloud/aws/ec2-autoscaling";
import { Line, View2D } from "@motion-canvas/2d/lib/components";
import { FirewallEndpoint } from "valewood-components/cloud/aws/firewall-endpoint";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { FirewallEndpointRef } from "./firewall-endpoint";

export class FirewallEndpointSubnetRef extends BaseRef implements AwsLandscapeComponentRef {

    public az1: FirewallEndpointRef
    public az2: FirewallEndpointRef

    constructor(props: AWSLandscapeProps) {
        super(props)
        this.az1 = new FirewallEndpointRef(this.props)
        this.az2 = new FirewallEndpointRef(this.props)

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this.az1.ref)
        this.addComponentRefs(this.az2.ref)
    }

    setupAZ1()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#9FE2BF"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.az1.setup())
        subnet.setTopLabel("Firewall Subnet")

        return subnet
    }

    setupAZ2()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#9FE2BF"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.az2.setup())
        subnet.setBottomLabel("Firewall Subnet")

        return subnet
    }

    drawLines(view: View2D, parent: AWSLandscape) { 
        
    }
}