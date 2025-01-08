import { createRef, Reference } from "@motion-canvas/core/lib/utils"
import { CertificateManager } from "valewood-components/cloud/aws/certificate-manager";
import { Enumerable, InstantiateRef } from "../../utils/setup";
import { AwsLandscapeComponentRef, BaseRef } from "./base";
import { View2D } from "@motion-canvas/2d/lib/components";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";

export class CertificateManagerRef extends BaseRef implements AwsLandscapeComponentRef  {

    private _ref: Reference<CertificateManager>;
    public get ref(): Reference<CertificateManager> {
        return this._ref;
    }
    private set ref(value: Reference<CertificateManager>) {
        this._ref = value;
    }

    constructor(props: AWSLandscapeProps) {
        super(props)
        this._ref = createRef<CertificateManager>();

        this.tags = [Tags.Configurable, Tags.EndUser]
        this.addComponentRefs(this._ref)
    }

    setup()  {
        return (<CertificateManager ref={this.ref} fontSize={this.props.fontSize} tags={this.tags} />)
    }

    drawLines(view: View2D, parent: AWSLandscape): void { 

    }
}