import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { ManagementConsole } from "valewood-components/cloud/aws/management-console";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class ManagementConsoleRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<ManagementConsole>;
    public get ref(): Reference<ManagementConsole> {
        return this._ref;
    }
    private set ref(value: Reference<ManagementConsole>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<ManagementConsole>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<ManagementConsole ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}