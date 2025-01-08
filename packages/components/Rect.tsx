import { Line, Rect, RectProps, Txt } from "@motion-canvas/2d";
import { Color, createRef, makeRef, Reference, SignalValue, useLogger, Vector2, Vector2Signal } from "@motion-canvas/core";
import { Arrow } from "valewood-components/arrow/generic-arrow"
import { pSBC } from "./pscb";
import { Edge } from "./arrow/enums";

export interface FlowRectProps extends RectProps {
  prev_node?: Reference<FlowRect>,
  text: SignalValue<string>;
  text_color: SignalValue<string>;
}

export class FlowRect extends Rect {

  private readonly container: Reference<FlowRect>;
  private readonly previous_node?: Reference<FlowRect>;

  private readonly text_node = createRef<Txt>();

  // implementation
  public constructor(props?: FlowRectProps) {
    const ref = createRef<FlowRect>();

    super({
      // If you wanted to ensure that layout was always
      // true for this component, you could add it here
      // as such:
      alignItems: "center",
      layout: true,
      lineWidth: 6,
      maxWidth: 300,
      minWidth: 300,
      minHeight: 180,
      padding: 32,
      radius: 20,
      stroke: props.fill,
      ...props,
      fill: new Color(pSBC(-.95, props.fill)),
    });

    this.container = () => this;
    if (props.prev_node) {
      this.previous_node = props.prev_node;
    }

    const text = <Txt ref={this.text_node} width={"100%"} text={props.text} fill={props.text_color} fontSize={32} textWrap textAlign={"center"} fontWeight={800} />;

    this.add(text);
  }

  public connectLeftToRight(next: Reference<Rect>): Arrow {
    return new Arrow(this.container).right().to(next).left();

  }

  public connectRightToLeft(next: Reference<Rect>): Arrow {
    return new Arrow(this.container).left().to(next).right();

  }

  public connectBottomToTop(next: Reference<Rect>): Arrow {
    return new Arrow(this.container).bottom().to(next).top();
  }

  public connectTopToBottom(next: Reference<Rect>): Arrow {
    return new Arrow(this.container).top().to(next).bottom();

  }

  public getAbsLeftCenter(): Vector2Signal {
    return Vector2.createSignal(() => [this.absolutePosition().x - this.width() / 2, this.absolutePosition().y]);
  }

  public getAbsRightCenter(): Vector2Signal {
    return Vector2.createSignal(() => [this.absolutePosition().x + this.width() / 2, this.absolutePosition().y]);
  }

  public getAbsTopCenter(): Vector2Signal {
    return Vector2.createSignal(() => [this.absolutePosition().x, this.absolutePosition().y - this.height() / 2]);
  }

  public getAbsBottomCenter(): Vector2Signal {
    return Vector2.createSignal(() => [this.absolutePosition().x, this.absolutePosition().y + this.height() / 2]);
  }
}

