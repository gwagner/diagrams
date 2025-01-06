import { Line, Rect, RectProps, Txt } from "@motion-canvas/2d";
import { Color, createRef, Reference, SignalValue, useLogger, Vector2 } from "@motion-canvas/core";
import { pSBC } from "./pscb";

export interface FlowRectProps extends RectProps {
  prev_node?: Reference<FlowRect>,
  text: SignalValue<string>;
  text_color: SignalValue<string>;
}

export class FlowRect extends Rect {

  private readonly previous_node?: Reference<FlowRect>;

  private readonly text_node = createRef<Txt>();

  // implementation
  public constructor(props?: FlowRectProps) {
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

    if (props.prev_node) {
      this.previous_node = props.prev_node;
    }

    const text = <Txt ref={this.text_node} text={props.text} fill={props.text_color} fontSize={32} textWrap textAlign={"center"} fontWeight={800} />;

    this.add(text);
  }

  public connectHorizontalLeftToRight(): Reference<Line> {
    if (!this.previous_node) {
      useLogger().error("No previous node set")
      return;
    }

    const ref = createRef<Line>();

    <Line
      ref={ref}
      end={0}
      points={[this.previous_node().getAbsRightCenter(), this.getAbsLeftCenter()]}
      endArrow
      stroke={"white"}
      lineWidth={this.lineWidth}
    />

    return ref
  }

  public connectVerticalBottomToTop(): Reference<Line> {
    if (!this.previous_node) {
      useLogger().error("No previous node set")
      return;
    }

    const ref = createRef<Line>();

    <Line
      ref={ref}
      end={0}
      points={[this.previous_node().getAbsBottomCenter(), this.getAbsTopCenter()]}
      endArrow
      stroke={"white"}
      lineWidth={this.lineWidth}
    />

    return ref
  }

  public getAbsLeftCenter(): Vector2 {
    return new Vector2(this.absolutePosition().x - this.width() / 2, this.absolutePosition().y);
  }

  public getAbsRightCenter(): Vector2 {
    return new Vector2(this.absolutePosition().x + this.width() / 2, this.absolutePosition().y);
  }

  public getAbsTopCenter(): Vector2 {
    return new Vector2(this.absolutePosition().x, this.absolutePosition().y - this.height() / 2);
  }

  public getAbsBottomCenter(): Vector2 {
    return new Vector2(this.absolutePosition().x, this.absolutePosition().y + this.height() / 2);
  }
}

