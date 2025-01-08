import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Backup } from "valewood-components/cloud/aws/backup";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class BackupRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Backup>;
    public get ref(): Reference<Backup> {
        return this._ref;
    }
    private set ref(value: Reference<Backup>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Backup>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Backup ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}