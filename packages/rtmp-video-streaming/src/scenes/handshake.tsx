import { Line, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { all, chain, createRef, Reference, useLogger, waitFor } from '@motion-canvas/core';
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
let clientAnchorPoint = 0;
let serverAnchorPoint = 0;

export default makeScene2D(
  function*(view): any {
    view.fill(Colors["bg_dark"]);


    let containerTop = <Rect layout position={[0, -300]} alignItems={"center"} gap={gap} />;
    let containerBottom = <Rect layout position={[0, 400]} alignItems={"center"} gap={gap} />;
    const client = createRef<FlowRect>();
    const server = createRef<FlowRect>();
    const clientBottom = createRef<FlowRect>();
    const serverBottom = createRef<FlowRect>();

    view.add(
      <Txt
        text={"Step 1: Handshake"}
        fill={"white"}
        fontWeight={800}
        position={[0, -450]}
      />
    )
    containerTop.add(
      <Rect direction={"row"} height={"100%"} width={width} justifyContent={"space-between"} alignContent={"center"} gap={gap} >
        <FlowRect ref={client} fill={Colors["green"]} text={"Client"} text_color={"white"} textAlign={"center"} />
        <FlowRect ref={server} fill={Colors["blue"]} text={"Server"} text_color={"white"} textAlign={"center"} prev_node={client} />
      </Rect>
    );

    containerBottom.add(
      <Rect direction={"row"} height={"100%"} width={width} justifyContent={"space-between"} alignContent={"center"} gap={gap} >
        <FlowRect ref={clientBottom} fill={Colors["green"]} text={""} text_color={"white"} prev_node={client} minHeight={50} />
        <FlowRect ref={serverBottom} fill={Colors["blue"]} text={""} text_color={"white"} prev_node={server} minHeight={50} />
      </Rect>
    );


    let lines: Array<Reference<Line>> = [];
    lines.push(clientBottom().connectVerticalBottomToTop())
    lines.push(serverBottom().connectVerticalBottomToTop())
    for (let i = 0; i < lines.length; i++) {
      lines[i]().end(1)
      lines[i]().endArrow(false)
      lines[i]().lineDash([12, 6]);
    }

    // Get the length of the vertical line from client 
    clientAnchorPoint = client().absolutePosition().y + (client().height() / 2);
    serverAnchorPoint = server().absolutePosition().y + (server().height() / 2);
    verticalLen = lines[0]().arcLength();

    view.add(lines.map((l) => l()));
    view.add(containerTop);
    view.add(containerBottom);

    yield* chain(
      lines[0]().end(1, .2),
    );

    // The initial client packet
    const connectCode = ["Message Contents:\n  AMF Version 3", "Payload: 0x03", "0x03"];
    const clientConnectRef = codePopupAndAnimate(view, connectCode, Colors["green"], "Initiate: AMF Version");
    yield* animateCodePopup(clientConnectRef, connectCode, [client().x(), clientAnchorPoint + ((verticalLen / flows) * 1)])
    const clientConnectLineRef = createConnectionLine(view, [
      [clientConnectRef().x(), clientConnectRef().y()],
      [server().x(), clientConnectRef().y()]
    ]);
    yield* animateConnectionLine(clientConnectLineRef, clientConnectRef, server().x());

    // The initial server packet response 
    const serverConnectRef = codePopupAndAnimate(view, connectCode, Colors["blue"], "Respond: AMF Version");
    yield* animateCodePopup(serverConnectRef, connectCode, [server().x(), serverAnchorPoint + ((verticalLen / flows) * 2)])
    const serverConnectLineRef = createConnectionLine(view, [
      [serverConnectRef().x(), serverConnectRef().y()],
      [client().x(), serverConnectRef().y()]
    ]);
    yield* animateConnectionLine(serverConnectLineRef, serverConnectRef, client().x());


    // Will be dumped at the end
    yield* waitFor(30);
  }
)

function codePopupAndAnimate(view: View2D, code: string[], color: string, title: string): Reference<CodePopupRect> {
  const ref = createRef<CodePopupRect>();
  view.add(
    <CodePopupRect ref={ref} height={packet_size} width={packet_size} alignItems={"center"} gap={gap} opacity={0} fill={color} title={title} title_color={"white"} code={code[0]} maxWidth={"100%"} minHeight={50} zIndex={10} />
  );

  return ref;
}

function* animateCodePopup(ref: Reference<CodePopupRect>, code: string[], position: [number, number]): any {
  yield* ref().opacity(.9, .5)
  yield* chain(
    all(
      ref().height(popup_height, 1),
      ref().width(popup_width, 1),
    ),
    ref().showContents(),
  )
  for (let i = 1; i < code.length; i++) {
    yield* ref().code_signal(code[i], .5);
  }
  yield* all(
    ref().opacity(1, .2),
    ref().width(packet_size, 2),
    ref().height(packet_size, 2),
    ref().hideContents(),
  )

  yield* ref().position(position, 1);
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