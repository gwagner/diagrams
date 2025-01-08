import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { CodeDeploy } from "valewood-components/cloud/aws/code-deploy";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CodeDeployRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<CodeDeploy>;
    public get ref(): Reference<CodeDeploy> {
        return this._ref;
    }
    private set ref(value: Reference<CodeDeploy>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<CodeDeploy>();

        this.tags = [Tags.Configurable, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<CodeDeploy ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}