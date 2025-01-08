import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { CodeCommit } from "valewood-components/cloud/aws/code-commit";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CodeCommitRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<CodeCommit>;
    public get ref(): Reference<CodeCommit> {
        return this._ref;
    }
    private set ref(value: Reference<CodeCommit>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<CodeCommit>();

        this.tags = [Tags.Configurable, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<CodeCommit ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}