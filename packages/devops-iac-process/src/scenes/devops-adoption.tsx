
import { Line, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { chain, createRef, Reference } from '@motion-canvas/core';
import { FlowRect } from 'valewood-components/Rect';
import { Colors } from "valewood-components/Colors";
import { Arrow } from 'valewood-components/arrow/generic-arrow';

export default makeScene2D(
  function*(view): any {
    view.fill(Colors["bg_dark"]);
    // Create your animations here

    const gap = 120;

    let container = <Rect layout alignItems={"center"} gap={gap} />;
    const review = createRef<FlowRect>();
    const evaluate = createRef<FlowRect>();
    const pipeline = createRef<FlowRect>();
    const migrate = createRef<FlowRect>();
    const measure = createRef<FlowRect>();
    const iterate = createRef<FlowRect>();

    view.add(
      <Txt
        text={"DevOps IaC Adoption Process"}
        fill={"white"}
        fontWeight={800}
        position={[-465, -350]}
      />
    )
    container.add(
      <Rect direction={"row"} height={"100%"} justifyContent={"space-between"} alignContent={"center"} gap={gap} >
        <FlowRect ref={review} fill={Colors["green"]} text={"Review Organizational Goals"} text_color={"white"} />
        <FlowRect ref={evaluate} fill={Colors["blue"]} text={"Evaluate Existing Infrastructure"} text_color={"white"} prev_node={review} />
        <FlowRect ref={pipeline} fill={Colors["magenta"]} text={"Introduce Pipeline Automation"} text_color={"white"} prev_node={evaluate} />
      </Rect>
    );
    container.add(
      <Rect direction={"column"} gap={gap} justifyContent={"space-between"}>
        <FlowRect ref={migrate} fill={Colors["orange"]} text={"Migrate Services"} text_color={"white"} prev_node={pipeline} />
        <FlowRect ref={measure} fill={Colors["teal"]} text={"Measure KPIs Against Goals"} text_color={"white"} prev_node={migrate} />
        <FlowRect ref={iterate} fill={Colors["green"]} text={"Iterate and Update"} text_color={"white"} prev_node={measure} />
      </Rect>
    );
    view.add(container)

    let lines: Array<Reference<Line>> = [];

    lines.push(review().connectLeftToRight(evaluate).draw(view))
    lines.push(evaluate().connectLeftToRight(pipeline).draw(view))
    lines.push(
      new Arrow(pipeline).top().to(migrate).left()
        .points(3)
        .draw(view)
    )

    lines.push(migrate().connectBottomToTop(measure).draw(view))
    lines.push(measure().connectBottomToTop(iterate).draw(view))
    lines.push(
      new Arrow(iterate).bottom().offset(60).to(migrate).top().offset(-60)
        .lineModifiers([
          [0, 0],
          [200, 0],
          [0, -479],
        ])
        .points(3)
        .draw(view)
    )


    const drawTime = .75
    yield* chain(...lines.map(l => l().end(1, drawTime)))
    for (let j = 0; j < 3; j++) {
      for (let i = 3; i < lines.length; i++) {
        yield* lines[i]().endArrow(false)
        yield* lines[i]().end(0, .2)
        yield* lines[i]().endArrow(true)
        yield* lines[i]().end(1, drawTime)
      }
    }
  });
