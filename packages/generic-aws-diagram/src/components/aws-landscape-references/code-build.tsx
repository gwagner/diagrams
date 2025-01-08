import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { CodeBuild } from "valewood-components/cloud/aws/code-build";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CodeBuildRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<CodeBuild>;
    public get ref(): Reference<CodeBuild> {
        return this._ref;
    }
    private set ref(value: Reference<CodeBuild>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<CodeBuild>();

        this.tags = [Tags.Configurable, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<CodeBuild ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}