import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { CostManagement } from "valewood-components/cloud/aws/cost-management";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CostManagementRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<CostManagement>;
    public get ref(): Reference<CostManagement> {
        return this._ref;
    }
    private set ref(value: Reference<CostManagement>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<CostManagement>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<CostManagement ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}