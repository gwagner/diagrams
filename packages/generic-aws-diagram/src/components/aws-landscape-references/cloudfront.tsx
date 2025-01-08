import { Reference, createRef } from "@motion-canvas/core/lib/utils"
import { Cloudfront } from "valewood-components/cloud/aws/cloudfront";
import { InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CloudFrontRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Cloudfront>;
    public get ref(): Reference<Cloudfront> {
        return this._ref;
    }
    private set ref(value: Reference<Cloudfront>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Cloudfront>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Cloudfront ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}