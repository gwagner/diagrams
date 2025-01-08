import { Node, Rect, RectProps, Txt } from "@motion-canvas/2d/lib/components";
import { Vector2 } from "@motion-canvas/core/lib/types";
import { createRef } from "@motion-canvas/core/lib/utils";

export interface HeadingProps extends RectProps {
    
}

export class Heading extends Rect {

    public readonly container = createRef<Txt>();
    public readonly label = createRef<Txt>();

    public constructor(props?: RectProps) {
        super({
            ...props,
        });

        this.layout(false)
        this.add(
            <Rect layout ref={this.container} padding={props.padding} fontSize={props.fontSize}>
                <Txt ref={this.label}/>
            </Rect>
        )       
    }

    public alignTo(parent: Rect) {
        this.container().absolutePosition(
            Vector2.createSignal(()=>parent.absolutePosition()
                .addX(((parent.size.x() / 2) * -1) + (this.container().size.x() / 2))
                .addY(((parent.size.y() / 2) * -1) + (this.container().size.y() / 2))
            ),
        )
    }
}
