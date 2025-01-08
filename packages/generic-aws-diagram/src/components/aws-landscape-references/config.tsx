import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Config } from "valewood-components/cloud/aws/config";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class ConfigRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Config>;
    public get ref(): Reference<Config> {
        return this._ref;
    }
    private set ref(value: Reference<Config>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Config>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Config ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}