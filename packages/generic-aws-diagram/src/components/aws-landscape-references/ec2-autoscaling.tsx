import { Reference, createRef } from "@motion-canvas/core/lib/utils"
import { InstantiateRef } from "../../utils/setup";
import { EC2AutoScaling } from "valewood-components/cloud/aws/ec2-autoscaling";
import { BaseRef } from "./base";
import { AWSLandscapeProps, Tags } from "../../components/aws-landscape";

@InstantiateRef
export class EC2AutoScalingRef extends BaseRef  {

    //@InstantiateRef<EC2AutoScaling>()
    private _ref: Reference<EC2AutoScaling>;
    public get ref(): Reference<EC2AutoScaling> {
        return this._ref;
    }
    private set ref(value: Reference<EC2AutoScaling>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<EC2AutoScaling>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<EC2AutoScaling ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

}