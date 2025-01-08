import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Internet } from "valewood-components/cloud/aws/internet";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class InternetRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Internet>;
    public get ref(): Reference<Internet> {
        return this._ref;
    }
    private set ref(value: Reference<Internet>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Internet>();

        this.tags = [Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Internet ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}