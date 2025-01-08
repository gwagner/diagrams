import { Img, Rect, RectProps, Txt } from "@motion-canvas/2d/lib/components";
import applicationLoadBalancerImage from "./Res_Elastic-Load-Balancing_Application-Load-Balancer_48_Light.png"
import { Reference, createRef } from "@motion-canvas/core/lib/utils";

export interface ContainerProps extends RectProps {
    composition: number[];
}

export class Container extends Rect {

    public colRefs: Reference<Rect>[] = [];
    public rowRefs: Array<Array<Reference<Rect>>> = [];

    public constructor(props?: ContainerProps) {
        super({
            ...props,
        });

        for (let i = 0; i < props.composition.length; i++) {
            this.rowRefs.push([]);

            let idx = this.colRefs.push(createRef<Rect>())
            this.add(<Rect ref={this.colRefs[idx - 1]}></Rect>)

            if (props.composition[i] > 1) {
                this.colRefs[idx - 1]().direction("column")
                this.colRefs[idx - 1]().justifyContent("space-evenly")
                this.colRefs[idx - 1]().padding([24, 24, 24, 24])
                this.colRefs[idx - 1]().margin(16)

                for (let j = 0; j < props.composition[i]; j++) {
                    let jdx = this.rowRefs[i].push(createRef<Rect>())
                    this.colRefs[idx - 1]().add(<Rect 
                        ref={this.rowRefs[i][jdx - 1]}
                        alignContent={"end"}
                        justifyContent={"end"}
                        minHeight={80}
                        padding={16}
                        width={"100%"}    
                        columnGap={16}                    
                    />)
                }
            }
        }
    }
}