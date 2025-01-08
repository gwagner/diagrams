import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import kmsImage from "./Arch_AWS-Key-Management-Service_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface KMSProps extends AWSIconBaseProps {
    
}

export class KMS extends AWSIconBase {

    public constructor(props?: KMSProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={kmsImage}
                    width={props.width}
                    height={props.height}
                    radius={props.radius}
                    alignSelf={"center"}
                    shadowColor={"#d3d3d3"}
                    shadowOffset={[2,2]}
                    clip
                />
                <Txt
                    ref={this.label}
                    text="KMS"
                    textAlign={"center"}
                />
            </>
        )
    }
}