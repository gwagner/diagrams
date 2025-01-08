import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { S3 } from "valewood-components/cloud/aws/s3";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class SimpleStorageServiceRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<S3>;
    public get ref(): Reference<S3> {
        return this._ref;
    }
    private set ref(value: Reference<S3>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<S3>();

        this.tags = [Tags.Configurable, Tags.EndUser, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<S3 ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}