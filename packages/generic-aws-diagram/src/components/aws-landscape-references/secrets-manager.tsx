import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { SecretsManager } from "valewood-components/cloud/aws/secrets-manager";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class SecretsManagerRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<SecretsManager>;
    public get ref(): Reference<SecretsManager> {
        return this._ref;
    }
    private set ref(value: Reference<SecretsManager>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<SecretsManager>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<SecretsManager ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}