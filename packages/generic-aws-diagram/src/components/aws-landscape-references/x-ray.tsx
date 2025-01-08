import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { XRay } from "valewood-components/cloud/aws/x-ray";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class XRayRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<XRay>;
    public get ref(): Reference<XRay> {
        return this._ref;
    }
    private set ref(value: Reference<XRay>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<XRay>();

        this.tags = [Tags.Configurable, Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<XRay ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}