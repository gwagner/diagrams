import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { GuardDuty } from "valewood-components/cloud/aws/guardduty";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class GuardDutyRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<GuardDuty>;
    public get ref(): Reference<GuardDuty> {
        return this._ref;
    }
    private set ref(value: Reference<GuardDuty>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<GuardDuty>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<GuardDuty ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}