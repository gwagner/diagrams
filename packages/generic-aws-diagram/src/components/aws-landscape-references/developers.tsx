import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { Users } from "valewood-components/cloud/aws/users";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class DevelopersRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<Users>;
    public get ref(): Reference<Users> {
        return this._ref;
    }
    private set ref(value: Reference<Users>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<Users>();

        this.tags = [Tags.Developer]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<Users ref={this._ref} marginRight={48} fontSize={this.props.fontSize} label={"Developers"} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}