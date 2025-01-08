import { Line, View2D } from "@motion-canvas/2d/lib/components"
import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { RDSMultiAZ } from "valewood-components/cloud/aws/rds-mulit-az";
import { SubnetContainer } from "valewood-components/cloud/aws/subnet-container";
import { InstantiateRef } from "../../utils/setup";
import { Edge, AwsLandscapeComponentRef, BaseRef } from "./base";
import { RelationalDatabaseServiceRef } from "./relational-database-service";
import { Arrow } from "../../../../components/arrow/arrow";

export class RDSSubnetRef extends BaseRef implements AwsLandscapeComponentRef  {

    public az1: RelationalDatabaseServiceRef
    public az2: RelationalDatabaseServiceRef

    private _arrow_rds_az1_to_rds_az2: Reference<Line> = createRef<Line>();
    public get arrow_rds_az1_to_rds_az2(): Reference<Line> {
        return this._arrow_rds_az1_to_rds_az2;
    }
    private set arrow_rds_az1_to_rds_az2(value: Reference<Line>) {
        this._arrow_rds_az1_to_rds_az2 = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this.az1 = new RelationalDatabaseServiceRef(this.props)
        this.az2 = new RelationalDatabaseServiceRef(this.props)

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this.az1.ref)
        this.addComponentRefs(this.az2.ref)
    }


    setupAZ1()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#cbe7ef"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.az1.setup())
        subnet.setTopLabel("DB Subnet")

        return subnet
    }

    setupAZ2()  {
        let subnet: SubnetContainer = (<SubnetContainer fontSize={this.props.fontSize} fill={"#cbe7ef"} height={this.props.subnetHeight} />) as SubnetContainer
        subnet.addIcon(this.az2.setup())
        subnet.setBottomLabel("DB Subnet")

        return subnet
    }


    drawLines(view: View2D, parent: AWSLandscape) { 
        this.arrow_rds_az1_to_rds_az2 = new Arrow(this.az1.ref).bottom().offset(20).to(this.az2.ref).top().dashed(true).draw(view)
    }
}

/**
 *     public readonly rdsPrimary = createRef<RDSMultiAZ>()
    public readonly rdsSecondary = createRef<RDSMultiAZ>()
    protected rdsConstructor() {
        const subnetContainer1 = createRef<SubnetContainer>()
        this.availabilityZone1().add(<SubnetContainer ref={subnetContainer1} fontSize={this.fontSize} fill={"#cbe7ef"} height={this.subnetHeight} />)
        subnetContainer1().addIcon(<RDSMultiAZ ref={this.rdsPrimary} fontSize={this.fontSize} />)
        subnetContainer1().setTopLabel("DB Subnet")

        const subnetContainer2 = createRef<SubnetContainer>()
        this.availabilityZone2().add(<SubnetContainer ref={subnetContainer2} fontSize={this.fontSize} fill={"#cbe7ef"} height={this.subnetHeight} />)
        subnetContainer2().addIcon(<RDSMultiAZ ref={this.rdsSecondary} fontSize={this.fontSize} />)
        subnetContainer2().setBottomLabel("DB Subnet")

    }
 */