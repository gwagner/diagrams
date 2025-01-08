import { Line, View2D } from "@motion-canvas/2d/lib/components"
import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { RDSMultiAZ } from "valewood-components/cloud/aws/rds-mulit-az";
import { SubnetContainer } from "valewood-components/cloud/aws/subnet-container";
import { InstantiateRef } from "../../utils/setup";
import { Edge, AwsLandscapeComponentRef, BaseRef } from "./base";
import { initialize, signal } from "@motion-canvas/2d/lib/decorators";

export class RelationalDatabaseServiceRef extends BaseRef  {

    private _ref: Reference<RDSMultiAZ>;
    public get ref(): Reference<RDSMultiAZ> {
        return this._ref;
    }
    private set ref(value: Reference<RDSMultiAZ>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<RDSMultiAZ>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<RDSMultiAZ ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
        
    }
}
