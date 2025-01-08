import { Line, LineProps } from "@motion-canvas/2d/lib/components";
import { Tags } from "./aws-landscape";
import { SimpleSignal, createSignal } from "@motion-canvas/core/lib/signals";

export interface FakeLineProps extends LineProps {
    
}

export class FakeLine extends Line {

    public end: SimpleSignal<number, this> = createSignal(() => 0, ()=>0);
    public opacity: SimpleSignal<number, this> = createSignal(() => 0, ()=>0);
    public start: SimpleSignal<number, this> = createSignal(() => 0, ()=>0);

    public constructor(props?: FakeLineProps) {
        super({
            ...props,
        });
    }
}