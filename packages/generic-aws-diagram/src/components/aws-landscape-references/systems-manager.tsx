import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { SystemsManager } from "valewood-components/cloud/aws/systems-manager";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class SystemsManagerRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<SystemsManager>;
    public get ref(): Reference<SystemsManager> {
        return this._ref;
    }
    private set ref(value: Reference<SystemsManager>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<SystemsManager>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<SystemsManager ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}