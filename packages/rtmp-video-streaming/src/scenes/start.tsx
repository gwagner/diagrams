import { Line, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { chain, createRef, Reference } from '@motion-canvas/core';
import { FlowRect } from 'valewood-components/Rect';
import { Colors } from "valewood-components/Colors";

export default makeScene2D(
  function*(view): any {
    view.fill(Colors["bg_dark"]);

  }
)
