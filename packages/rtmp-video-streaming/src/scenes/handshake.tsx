import { Line, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { all, chain, createRef, DEFAULT, Reference, useLogger, Vector2, Vector2Signal, waitFor } from '@motion-canvas/core';
import { FlowRect } from 'valewood-components/Rect';
import { CodePopupRect } from 'valewood-components/CodePopupRect';
import { Colors } from "valewood-components/Colors";

const gap = 120;
const popup_height = 700;
const popup_width = 700;
const packet_size = 50;
const width = 1400;
let flows = 7;
let verticalLen = 0;
let clientAnchorPoint: Vector2Signal<void>;
let serverAnchorPoint: Vector2Signal<void>;

export default makeScene2D(
  function*(view): any {
    view.fill(Colors["bg_dark"]);

    view.add(
      <Txt
        text={"Step 1: Handshake"}
        fill={"white"}
        fontWeight={800}
        position={[0, -450]}
      />
    )

    const top = createRef<Rect>();
    const bottom = createRef<Rect>();
    const client = createRef<FlowRect>();
    const server = createRef<FlowRect>();
    const clientBottom = createRef<FlowRect>();
    const serverBottom = createRef<FlowRect>();

    view.add(
      <Rect layout ref={top} position={[0, -300]} width={width} alignItems={"center"} justifyContent={"space-between"} gap={gap}>
        <FlowRect ref={client} fill={Colors["green"]} text={"Client"} text_color={"white"} textAlign={"center"} />
        <FlowRect ref={server} fill={Colors["blue"]} text={"Server"} text_color={"white"} textAlign={"center"} />
      </Rect>
    );

    view.add(
      <Rect layout ref={bottom} position={[0, 400]} width={width} alignItems={"center"} justifyContent={"space-between"} gap={gap} >
        <FlowRect ref={clientBottom} fill={Colors["green"]} text={""} text_color={"white"} prev_node={client} minHeight={50} />
        <FlowRect ref={serverBottom} fill={Colors["blue"]} text={""} text_color={"white"} prev_node={server} minHeight={50} />
      </Rect>
    );
    client().maxWidth(DEFAULT);
    server().maxWidth(DEFAULT);


    // Vertical connection lines
    let lines: Array<Reference<Line>> = [];
    lines.push(client().connectBottomToTop(clientBottom).draw(view))
    lines.push(server().connectBottomToTop(serverBottom).draw(view))
    for (let i = 0; i < lines.length; i++) {
      lines[i]().end(0)
      lines[i]().endArrow(false)
      lines[i]().lineDash([12, 6]);
    }

    yield* all(
      ...lines.map((l) => l().end(1, .5))
    )

    // Get the length of the vertical line from client 
    clientAnchorPoint = Vector2.createSignal(() => [client().position().x, top().position().y + (client().height() / 2)]);
    serverAnchorPoint = Vector2.createSignal(() => [server().position().x, top().position().y + (server().height() / 2)]);
    verticalLen = lines[0]().arcLength();

    let c0Code = ["Message Contents:\n  AMF Version 3", "Payload:\n  0x03"];
    yield* sendMessage(view, "C0", c0Code, Colors["green"], clientAnchorPoint, serverAnchorPoint, 1)
    yield* sendMessage(view, "S0", c0Code, Colors["blue"], serverAnchorPoint, clientAnchorPoint, 2)

    const c1Code = [
      "   Message Contents:\n    Time (4 Bytes)\n    Zeros (4 Bytes)\nRand Data (1528 Bytes)",
      "      Payload: \n0x67 0x7C 0x48 0x1A\n0x00 0x00 0x00 0x00\n0x01 0x02 0x03 0x04\n        ...\n0x21 0x22 0x23 0x24",
    ];
    yield* sendMessage(view, "C1", c1Code, Colors["green"], clientAnchorPoint, serverAnchorPoint, 3)

    const s1Code = [
      "   Message Contents:\n    Time (4 Bytes)\n    Zeros (4 Bytes)\nRand Data (1528 Bytes)",
      "      Payload: \n0x67 0x7C 0x48 0x1A\n0x00 0x00 0x00 0x00\n0x01 0x02 0x03 0x04\n        ...\n0x21 0x22 0x23 0x24",
    ];
    yield* sendMessage(view, "S1", s1Code, Colors["blue"], serverAnchorPoint, clientAnchorPoint, 4)


    // The initial client packet
    const c2Code = [
      "  Message Contents:\n    Time (4 Bytes)\n  S1 Time (4 Bytes)\n S1 Rand (1528 Bytes)",
      "      Payload: \n0x67 0x7C 0x48 0x1A\n0x67 0x7C 0x48 0x1A\n0x01 0x02 0x03 0x04\n        ...\n0x21 0x22 0x23 0x24",
    ];
    yield* sendMessage(view, "C2", c2Code, Colors["green"], clientAnchorPoint, serverAnchorPoint, 5)

    const s2Code = [
      "    Message Contents:\n      Time (4 Bytes)\n    C1 Time (4 Bytes)\nC1 Rand Data (1528 Bytes)",
      "      Payload: \n0x67 0x7C 0x48 0x1A\n0x67 0x7C 0x48 0x1A\n0x01 0x02 0x03 0x04\n        ...\n0x21 0x22 0x23 0x24",
    ];
    yield* sendMessage(view, "S2", s2Code, Colors["blue"], serverAnchorPoint, clientAnchorPoint, 6)

    // Will be dumped at the end
    yield* waitFor(5);

    const transitionTime = .5
    const transitionHeight = 800
    yield* all(
      ...messages.map((r) => r().opacity(0, transitionTime)),
      ...lines.map((r) => r().opacity(0, transitionTime)),
      clientBottom().opacity(0, transitionTime),
      serverBottom().opacity(0, transitionTime),
      top().width(width + 200, transitionTime),
      top().position([0, 0], transitionTime),
    )

    yield* all(
      top().height(transitionHeight, transitionTime),
      client().height(transitionHeight, transitionTime),
      server().height(transitionHeight, transitionTime),
      client().width((width + 200 - gap) / 2, transitionTime),
      server().width((width + 200 - gap) / 2, transitionTime),
    );

    // Remove unnecessary elements from the canvas
    bottom().remove();
    lines.map((r) => r().remove());
    messages.map((r) => r().remove());

    // Will be dumped at the end
    yield* waitFor(5);
  }
)

let messages: Array<Reference<CodePopupRect> | Reference<Line>> = []

function* sendMessage(view: View2D, title: string, code: string[], color: string, anchor: Vector2Signal<void>, destination: Vector2Signal<void>, index: number) {
  // The initial client packet
  const popup = codePopupAndAnimate(view, code, color, title);
  messages.push(popup);

  // TODO, no need for this to be its own function
  yield* animateCodePopup(popup, code, anchor().addY(((verticalLen / flows) * index)))

  const connection = createConnectionLine(view, [
    [popup().x(), popup().y()],
    [destination().x - transitPadding(destination().x), popup().y()]
  ]);
  messages.push(connection);

  // TODO, no need for this to be its own function
  yield* animateConnectionLine(connection, popup, destination().x);
}

function transitPadding(d: number): number {
  if (d > 0) {
    return 8 + (packet_size / 2)
  }
  return -1 * (8 + (packet_size / 2))
}

function codePopupAndAnimate(view: View2D, code: string[], color: string, title: string): Reference<CodePopupRect> {
  const ref = createRef<CodePopupRect>();
  view.add(
    <CodePopupRect
      ref={ref}
      height={packet_size}
      width={packet_size}
      alignItems={"center"}
      gap={gap}
      opacity={0}
      fill={color}
      title={title}
      title_color={"white"}
      code={code[0]}
      //text_color={"white"}
      maxWidth={"100%"}
      minHeight={50}
      zIndex={10}
    />
  );

  return ref;
}

function* animateCodePopup(ref: Reference<CodePopupRect>, code: string[], position: [number, number] | Vector2): any {
  yield* ref().opacity(.9, .5)
  yield* chain(
    all(
      ref().height(popup_height, .5),
      ref().width(popup_width, .5),
    ),
    ref().showContents(),
  )
  yield* waitFor(.75)
  for (let i = 1; i < code.length; i++) {
    yield* ref().code_signal(code[i], .5);
  }
  yield* waitFor(.75)
  yield* all(
    ref().opacity(1, .2),
    ref().width(packet_size, 1),
    ref().height(packet_size, 1),
    ref().hideContents(),
    ref().position(position, 1)
  )
}

function createConnectionLine(view: View2D, points: Array<[number, number]>): Reference<Line> {
  const ref = createRef<Line>();
  view.add(
    <Line
      ref={ref}
      lineWidth={2}
      stroke={"white"}
      endArrow
      points={points}
      end={0}
    />
  );

  return ref;
}

function* animateConnectionLine(line: Reference<Line>, packet: Reference<CodePopupRect>, end: number): any {
  yield* all(
    line().end(1, 1),
    packet().x(end, 1),
  )
}
