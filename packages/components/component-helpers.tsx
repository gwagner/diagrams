import { Rect, RectProps } from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { SimpleVector2Signal, Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";
import { createRef, useLogger } from "@motion-canvas/core/lib/utils";

export interface ComponentHelpersProps extends RectProps {
    containerPadding?: SignalValue<number>;
}

export class ComponentHelpers extends Rect {

    @initial(0)
    @signal()
    public declare readonly containerPadding: SimpleSignal<number, this>;

    public readonly containerNode = createRef<Rect>();

    public constructor(props?: RectProps) {
        super({
            ...props,
        });

        this.add(
            <Rect layout ref={this.containerNode} direction={"row"} wrap={"wrap"} alignContent={"center"} justifyContent={"center"}/>
        )
            
    }

    public getLeftEdge(): SimpleVector2Signal<this> {
        return this.left
        //return Vector2.createSignal(()=>this.absolutePosition().addX((this.size.x() / 2) * -1))
    }

    public getRightEdge(): SimpleVector2Signal<this> {
        return this.right
        //return Vector2.createSignal(()=>this.absolutePosition().addX((this.width() / 2)))
    }

    public getTopEdge(): SimpleVector2Signal<this> {
        return this.top
        //return Vector2.createSignal(()=>this.absolutePosition().addY((this.size.y() / 2) * -1))
    }

    public getBottomEdge(): SimpleVector2Signal<this> {
        return this.bottom
        //return Vector2.createSignal(()=>this.absolutePosition().addY((this.height() / 2)))
    }
}
