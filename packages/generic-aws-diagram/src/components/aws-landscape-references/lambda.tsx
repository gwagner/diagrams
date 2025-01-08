import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Lambda } from "valewood-components/cloud/aws/lambda";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class LambdaRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Lambda>;
    public get ref(): Reference<Lambda> {
        return this._ref;
    }
    private set ref(value: Reference<Lambda>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Lambda>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Lambda ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}