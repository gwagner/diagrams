import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { CodePipeline } from "valewood-components/cloud/aws/code-pipeline";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CodePipelineRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<CodePipeline>;
    public get ref(): Reference<CodePipeline> {
        return this._ref;
    }
    private set ref(value: Reference<CodePipeline>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<CodePipeline>();

        this.tags = [Tags.Configurable, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<CodePipeline ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}