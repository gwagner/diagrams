import {
    Layout,
    LayoutProps,
    Node,
    Rect,
    RectProps,
    Txt,
} from '@motion-canvas/2d/lib/components';
import { CodeBlock } from '@motion-canvas/2d/lib/components/CodeBlock';
import { canvasStyleSignal, initial, signal } from '@motion-canvas/2d/lib/decorators';
import { DEFAULT, Signal, SignalValue, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { createRef, useLogger } from '@motion-canvas/core/lib/utils';
import { Length, PossibleCanvasStyle } from '@motion-canvas/2d/lib/partials';
import { Vector2, Vector2Signal } from '@motion-canvas/core/lib/types';
import { ComponentHelpers, ComponentHelpersProps } from 'valewood-components/component-helpers';

export interface CodeProps extends ComponentHelpersProps {
    background?: SignalValue<PossibleCanvasStyle>;
    code?: SignalValue<string>;
    lang?: string;
    radius?: SignalValue<number>;
}

export class Code extends ComponentHelpers {

    @initial('white')
    @canvasStyleSignal()
    public declare readonly background: SignalValue<PossibleCanvasStyle>;

    @initial("")
    @signal()
    public declare readonly code: SimpleSignal<string, this>;

    @initial('yaml')
    @signal()
    public declare readonly lang: string;

    public readonly codeBlock = createRef<CodeBlock>();

    public constructor(props?: CodeProps) {
        super({
            ...props,
        });


        const logger = useLogger()

        this.containerNode().add(
            <>
                <CodeBlock
                    ref={this.codeBlock}
                    language={props.lang}
                    fontSize={this.fontSize}
                    code={props.code}
                    //compositeOperation={'source-atop'}
                />
            </>
        );

        this.containerNode().fill(this.background)
        this.containerNode().padding(this.containerPadding)
        this.containerNode().lineWidth(2)
        this.containerNode().radius(this.radius)
        this.containerNode().stroke("#FFFFFF")
        this.containerNode().smoothCorners(true)
    }

}