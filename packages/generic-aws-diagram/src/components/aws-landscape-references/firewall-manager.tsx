import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { FirewallManager } from "valewood-components/cloud/aws/firewall-manager";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class FirewallManagerRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<FirewallManager>;
    public get ref(): Reference<FirewallManager> {
        return this._ref;
    }
    private set ref(value: Reference<FirewallManager>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<FirewallManager>();

        this.tags = [Tags.Configurable, Tags.Management]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<FirewallManager ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}