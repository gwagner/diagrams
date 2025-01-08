import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { SimpleNotificationService } from "valewood-components/cloud/aws/sns";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class SimpleNotificationServiceRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<SimpleNotificationService>;
    public get ref(): Reference<SimpleNotificationService> {
        return this._ref;
    }
    private set ref(value: Reference<SimpleNotificationService>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<SimpleNotificationService>();

        this.tags = [Tags.Configurable, Tags.EndUser, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<SimpleNotificationService ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}