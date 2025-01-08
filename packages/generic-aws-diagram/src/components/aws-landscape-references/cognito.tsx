import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Cognito } from "valewood-components/cloud/aws/cognito";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CognitoRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Cognito>;
    public get ref(): Reference<Cognito> {
        return this._ref;
    }
    private set ref(value: Reference<Cognito>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Cognito>();

        this.tags = [Tags.Configurable]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Cognito ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}