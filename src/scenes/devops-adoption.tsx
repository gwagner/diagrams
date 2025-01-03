
import { Line, makeScene2D, Node, Rect, Txt } from '@motion-canvas/2d';
import { all, chain, createRef, makeRef, map, Reference, tween } from '@motion-canvas/core';
import { DefaultRect } from '../components/Rect';

const colors = {
  "bg": "#1a1b26",
  "bg_dark": "#16161e",
  "bg_dark1": "#0C0E14",
  "bg_highlight": "#292e42",
  "blue": "#7aa2f7",
  "blue0": "#3d59a1",
  "blue1": "#2ac3de",
  "blue2": "#0db9d7",
  "blue5": "#89ddff",
  "blue6": "#b4f9f8",
  "blue7": "#394b70",
  "comment": "#565f89",
  "cyan": "#7dcfff",
  "dark3": "#545c7e",
  "dark5": "#737aa2",
  "fg": "#c0caf5",
  "fg_dark": "#a9b1d6",
  "fg_gutter": "#3b4261",
  "green": "#9ece6a",
  "green1": "#73daca",
  "green2": "#41a6b5",
  "magenta": "#bb9af7",
  "magenta2": "#ff007c",
  "orange": "#ff9e64",
  "purple": "#9d7cd8",
  "red": "#f7768e",
  "red1": "#db4b4b",
  "teal": "#1abc9c",
  "terminal_black": "#414868",
  "yellow": "#e0af68",
};



export default makeScene2D(function*(view) {
  view.fill(colors["bg_dark"]);
  // Create your animations here

  const gap = 120;

  let container = <Rect layout alignItems={"center"} gap={gap} />;
  const review = createRef<DefaultRect>();
  const evaluate = createRef<DefaultRect>();
  const pipeline = createRef<DefaultRect>();
  const migrate = createRef<DefaultRect>();
  const measure = createRef<DefaultRect>();
  const iterate = createRef<DefaultRect>();

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
      <DefaultRect ref={review} fill={colors["green"]} text={"Review Organizational Goals"} text_color={"white"} />
      <DefaultRect ref={evaluate} fill={colors["blue"]} text={"Evaluate Existing Infrastructure"} text_color={"white"} prev_node={review} />
      <DefaultRect ref={pipeline} fill={colors["magenta"]} text={"Introduce Pipeline Automation"} text_color={"white"} prev_node={evaluate} />
    </Rect>
  );
  container.add(
    <Rect direction={"column"} gap={gap} justifyContent={"space-between"}>
      <DefaultRect ref={migrate} fill={colors["orange"]} text={"Migrate Services"} text_color={"white"} prev_node={pipeline} />
      <DefaultRect ref={measure} fill={colors["teal"]} text={"Measure KPIs Against Goals"} text_color={"white"} prev_node={migrate} />
      <DefaultRect ref={iterate} fill={colors["green"]} text={"Iterate and Update"} text_color={"white"} prev_node={measure} />
    </Rect>
  );

  let lines: Array<Reference<Line>> = [];

  lines.push(evaluate().connectHorizontalLeftToRight())
  lines.push(pipeline().connectHorizontalLeftToRight())

  // special line
  const evalRef = createRef<Line>();
  <Line
    ref={evalRef}
    end={0}
    points={
      [
        pipeline().getAbsTopCenter(),
        [
          pipeline().getAbsTopCenter().x,
          migrate().getAbsLeftCenter().y,
        ],
        migrate().getAbsLeftCenter(),
      ]}
    endArrow
    stroke={"white"}
    lineWidth={pipeline().lineWidth}
    radius={20}
  />
  lines.push(evalRef)

  lines.push(measure().connectVerticalBottomToTop())
  lines.push(iterate().connectVerticalBottomToTop())

  const migrateRef = createRef<Line>();
  <Line
    ref={migrateRef}
    end={0}
    points={[
      iterate().getAbsBottomCenter(),
      iterate().getAbsBottomCenter().addY(gap / 1.5),
      iterate().getAbsBottomCenter().addY(gap / 1.5).addX(gap / 1.2 + iterate().width() / 2),
      migrate().getAbsTopCenter().addY(-gap / 1.5).addX(gap / 1.2 + migrate().width() / 2),
      migrate().getAbsTopCenter().addY(-gap / 1.5),
      migrate().getAbsTopCenter(),
    ]}
    endArrow
    stroke={"white"}
    lineWidth={pipeline().lineWidth}
    radius={20}
  />
  lines.push(migrateRef)

  // Add all of the lines
  lines.map((l) => view.add(l()))

  // Add the container
  view.add(container)

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
