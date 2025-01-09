import { Code, Rect, RectProps, Txt } from "@motion-canvas/2d";
import { all, Color, createRef, Reference, SignalValue, } from "@motion-canvas/core";
import { pSBC } from "./pscb";

export interface CodePopupRectProps extends RectProps {
  prev_node?: Reference<CodePopupRect>,
  title: SignalValue<string>;
  title_color: SignalValue<string>;
  code: SignalValue<string>;
}

export class CodePopupRect extends Rect {

  private readonly container: Reference<CodePopupRect>;
  private readonly title_node = createRef<Txt>();
  private readonly code_node = createRef<Code>();
  public code_signal = Code.createSignal("");

  // implementation
  public constructor(props?: CodePopupRectProps) {
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
      smoothCorners: true,
      wrap: "wrap",
      direction: "column",
      ...props,
      fill: new Color(fill),
    });

    this.container = () => this;

    const text =
      <Rect width={"100%"} alignItems={"start"}>
        <Txt ref={this.title_node} width={"100%"} text={props?.title || ""} fill={props?.title_color} fontSize={48} textAlign={"center"} fontWeight={800} opacity={0} />
      </Rect>;

    const codeContainer =
      <Rect grow={1} alignItems={"center"} justifyContent={"center"}>
        <Code ref={this.code_node} code={this.code_signal} fontSize={36} justifyContent={"center"} textWrap textAlign={"center"} fontWeight={800} opacity={0} />
      </Rect>;


    this.code_signal(props?.code || "");

    this.add(text);
    this.add(codeContainer);
  }

  public *hideContents() {
    yield* all(
      this.title_node().opacity(0, .5),
      this.code_node().opacity(0, .5)
    )
  }

  public *showContents() {
    yield* all(
      this.title_node().opacity(1, .5),
      this.code_node().opacity(1, .5)
    )
  }
}

