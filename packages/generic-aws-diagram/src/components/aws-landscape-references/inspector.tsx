import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Inspector } from "valewood-components/cloud/aws/inspector";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class InspectorRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Inspector>;
    public get ref(): Reference<Inspector> {
        return this._ref;
    }
    private set ref(value: Reference<Inspector>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Inspector>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Inspector ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}