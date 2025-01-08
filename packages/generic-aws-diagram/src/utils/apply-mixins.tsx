import { Reference } from "@motion-canvas/core/lib/utils";
import { AWSIconBase } from "../components/aws/aws-icon-base";
import { ArrowDirection, ArrowEnds } from "./lines";

export interface LineAnimationDefinition {
  start: string;
  startEdge: ArrowDirection;
  startElementIndex?: number;
  startOffset?: number;
  end: string;
  endEdge: ArrowDirection;
  endElementIndex?: number;
  endOffset?: number,
  lineModifiers?: Array<[number, number]>,
  arrowEnds?: ArrowEnds;
  dashed?: boolean;
  color?: string;
  numPoints?: number;
  zIndex?: number;
}


export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
        Object.create(null)
      );
    });
  });
}