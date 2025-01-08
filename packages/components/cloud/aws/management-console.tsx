import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { SimpleSignal } from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "../../component-helpers";
import managementConsoleImage from "./Arch_AWS-Management-Console_64.png"
import { AWSIconBase, AWSIconBaseProps, defaultProps } from "./aws-icon-base";

export interface ManagementConsoleProps extends AWSIconBaseProps {
    
}

export class ManagementConsole extends AWSIconBase {

    public constructor(props?: ManagementConsoleProps) {
        super({
            ...defaultProps(props),
        });

        this.containerNode().remove()
        this.direction("column")
        this.add(
            <>
                <Img
                    ref={this.primaryElement}
                    src={managementConsoleImage}
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
                    text={"Console"}
                    textAlign={"center"}
                />
            </>
        )
    }
}