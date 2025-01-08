import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { SubnetContainer } from "valewood-components/cloud/aws/subnet-container";
import { View2D } from "@motion-canvas/2d/lib/components";
import { APIGatewayRef } from "./api-gateway";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { NATGatewayRef } from "./nat-gateway";

export class TransitSubnetRef extends BaseRef implements AwsLandscapeComponentRef  {

    public apiGatewayAZ1: APIGatewayRef
    public natGatewayAZ1: NATGatewayRef
    public apiGatewayAZ2: APIGatewayRef
    public natGatewayAZ2: NATGatewayRef

    constructor(props: AWSLandscapeProps) {
        super(props)
        this.apiGatewayAZ1 = new APIGatewayRef(this.props)
        this.natGatewayAZ1 = new NATGatewayRef(this.props)
        this.apiGatewayAZ2 = new APIGatewayRef(this.props)
        this.natGatewayAZ2 = new NATGatewayRef(this.props)

        this.tags = [Tags.Configurable, Tags.Egress, Tags.EndUser]
        this.addComponentRefs(this.apiGatewayAZ1.ref)
        this.addComponentRefs(this.apiGatewayAZ2.ref)
        this.addComponentRefs(this.natGatewayAZ1.ref)
        this.addComponentRefs(this.natGatewayAZ2.ref)
    }

    setupAZ1()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#9FE2BF"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.apiGatewayAZ1.setup())
        subnet.addIcon(this.natGatewayAZ1.setup())
        subnet.setTopLabel("Transit Subnet")

        return subnet
    }

    setupAZ2()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#9FE2BF"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.natGatewayAZ2.setup())
        subnet.addIcon(this.apiGatewayAZ2.setup())
        subnet.setBottomLabel("Transit Subnet")

        return subnet
    }

    drawLines(view: View2D, parent: AWSLandscape) { 

    }
}