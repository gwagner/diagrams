import { Reference, createRef } from "@motion-canvas/core/lib/utils"
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { Line, View2D } from "@motion-canvas/2d/lib/components";
import { APIGateway } from "valewood-components/cloud/aws/api-gateway";
import { AwsLandscapeComponentRef, BaseRef } from "./base";


export class APIGatewayRef extends BaseRef implements AwsLandscapeComponentRef  {

    private readonly _ref: Reference<APIGateway>;

    public get ref(): Reference<APIGateway> {
        return this._ref;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<APIGateway>();

        this.tags = [Tags.EndUser, Tags.Configurable]
        this.addComponentRefs(this._ref)

        console.log("Component Refs: "+this.componentRefs.length)
    }

    setup()  {
        return (<APIGateway ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape) { 
        
    }
}