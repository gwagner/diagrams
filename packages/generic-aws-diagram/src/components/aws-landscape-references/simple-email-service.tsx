import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { SimpleEmailService } from "valewood-components/cloud/aws/ses";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class SimpleEmailServiceRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<SimpleEmailService>;
    public get ref(): Reference<SimpleEmailService> {
        return this._ref;
    }
    private set ref(value: Reference<SimpleEmailService>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<SimpleEmailService>();

        this.tags = [Tags.Configurable, Tags.EndUser, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<SimpleEmailService ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}