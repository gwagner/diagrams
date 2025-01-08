import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Cloudtrail } from "valewood-components/cloud/aws/cloudtrail";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CloudtrailRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Cloudtrail>;
    public get ref(): Reference<Cloudtrail> {
        return this._ref;
    }
    private set ref(value: Reference<Cloudtrail>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Cloudtrail>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Cloudtrail ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}