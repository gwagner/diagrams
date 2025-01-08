import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { KMS } from "valewood-components/cloud/aws/kms";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class KeyManagementServiceRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<KMS>;
    public get ref(): Reference<KMS> {
        return this._ref;
    }
    private set ref(value: Reference<KMS>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<KMS>();

        this.tags = [Tags.Configurable, Tags.Management, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<KMS ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}