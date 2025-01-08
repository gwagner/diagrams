import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { SecurityHub } from "valewood-components/cloud/aws/security-hub";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class SecurityHubRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<SecurityHub>;
    public get ref(): Reference<SecurityHub> {
        return this._ref;
    }
    private set ref(value: Reference<SecurityHub>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<SecurityHub>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<SecurityHub ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}