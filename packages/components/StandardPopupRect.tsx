import { Rect, RectProps, Txt } from "@motion-canvas/2d";
import { all, Color, createRef, Reference, SignalValue, useLogger, Vector2 } from "@motion-canvas/core";
import { pSBC } from "./pscb";

export interface StandardPopupRectProps extends RectProps {
  prev_node?: Reference<StandardPopupRect>,
  title: SignalValue<string>;
  title_color: SignalValue<string>;
  text: SignalValue<string>;
}

export class StandardPopupRect extends Rect {

  private readonly title_node = createRef<Txt>();
  private readonly text_node = createRef<Txt>();

  // implementation
  public constructor(props?: StandardPopupRectProps) {
    const fill = pSBC(-.95, props?.fill || "rgba(255,255,255,255)") || "white"
    super({
      // If you wanted to ensure that layout was always
      // true for this component, you could add it here
      // as such:
      gap: 40,
      layout: true,
      lineWidth: 6,
      padding: 32,
      radius: 20,
      stroke: props?.fill,
      wrap: "wrap",
      direction: "column",
      ...props,
      fill: new Color(fill),
    });


    const text =
      <Rect width={"100%"} alignItems={"start"}>
        <Txt ref={this.title_node} width={"100%"} text={props?.title || ""} fill={props?.title_color} fontSize={48} textAlign={"center"} fontWeight={800} opacity={0} />
      </Rect>;

    const codeContainer =
      <Rect grow={1} alignItems={"center"} justifyContent={"center"} />;

    codeContainer.add(
      <Txt ref={this.text_node} text={props?.text || ""} fontSize={36} textWrap textAlign={"center"} fontWeight={800} opacity={0} />
    )


    this.add(text);
    this.add(codeContainer);
  }

  public *hideContents() {
    yield* all(
      this.title_node().opacity(0, .5),
      this.text_node().opacity(0, .5)
    )
  }

  public *showContents() {
    yield* all(
      this.title_node().opacity(1, .5),
      this.text_node().opacity(1, .5)
    )
  }
}

