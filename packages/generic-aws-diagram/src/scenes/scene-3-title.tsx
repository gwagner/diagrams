import "./global.css"
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, chain, delay, waitFor } from '@motion-canvas/core/lib/flow';
import { Line, Rect, Txt } from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import { Direction } from "@motion-canvas/core/lib/types";


export default makeScene2D(function* (view) {
  const rect = createRef<Rect>();
  const text = createRef<Txt>();

  view.add(
    <Rect
      ref={rect}
      width={'100%'}
      height={'100%'}
      fill={'lightcoral'}
      layout
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Txt
        ref={text}
        fontSize={96}
        fontWeight={700}
        fill={'#fff'}
        fontFamily={'"JetBrains Mono", monospace'}
      >
        End User Application Flow
      </Txt>
    </Rect>,
  );

  yield* waitFor(2)
  //yield* 

});
