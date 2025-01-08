import { Line, LineProps } from "@motion-canvas/2d/lib/components";
import { Tags } from "./aws-landscape";
import { SignalContext, SimpleSignal, createSignal } from "@motion-canvas/core/lib/signals";

export class FakeSignalContext extends SignalContext<TSetterValue, TValue extends TSetterValue = TSetterValue, TOwner = void> {

}