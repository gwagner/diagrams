import { Rect, RectProps, Txt } from "@motion-canvas/2d";
import { all, Color, createRef, createSignal, Reference, SignalValue, } from "@motion-canvas/core";
import { pSBC } from "./pscb";

export interface StandardPopupRectProps extends RectProps {
  prev_node?: Reference<StandardPopupRect>,
  title: SignalValue<string>;
  title_color: SignalValue<string>;
  text: SignalValue<string>;
  text_color: SignalValue<string>;
}

export class StandardPopupRect extends Rect {

  private readonly container: Reference<StandardPopupRect>;
  private readonly title_node = createRef<Txt>();
  private readonly text_node = createRef<Txt>();
  public text_signal = createSignal("");

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

    this.container = () => this;

    const title =
      <Rect width={"100%"} alignItems={"start"}>
        <Txt ref={this.title_node} width={"100%"} text={props?.title || ""} fill={props?.title_color || "white"} fontSize={48} textAlign={"center"} fontWeight={800} opacity={0} />
      </Rect>;

    const textContainer =
      <Rect grow={1} alignItems={"center"} justifyContent={"center"} >
        <Txt ref={this.text_node} text={this.text_signal} fill={props?.title_color || "white"} fontSize={36} textWrap textAlign={"center"} fontWeight={800} opacity={0} />
      </Rect>;

    this.text_signal(props?.text || "")


    this.add(title);
    this.add(textContainer);
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

