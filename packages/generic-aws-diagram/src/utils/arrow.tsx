import { Reference } from "@motion-canvas/core/lib/utils";
import { AWSIconBase } from "../components/aws/aws-icon-base";
import { ArrowDirection, ArrowEnds } from "./lines";

export interface LineAnimationDecorator {
    startEdge: ArrowDirection;
    startElementIndex?: number;
    startOffset?: number;
    end: Reference<AWSIconBase>;
    endEdge: ArrowDirection;
    endElementIndex?: number;
    endOffset?: number,
    lineModifiers?: Array<[number,number]>,
    arrowEnds?: ArrowEnds;
    dashed?: boolean;
    color?: string;
    numPoints?: number;
    zIndex?: number;
}

export function Arrow({ startEdge, startElementIndex = 0, startOffset = 0, end, endEdge, endElementIndex = 0, endOffset=0, lineModifiers = [], dashed = false, arrowEnds = ArrowEnds.End, color = "#236071", numPoints = 2, zIndex = 21 }: LineAnimationDecorator): any {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any> ) {
    //   let currentValue: Reference<Type>;
    //   if(currentValue == undefined) {
    //     currentValue = createRef<Type>();
    //   }
  
    //   Object.defineProperty(target, propertyName, {
    //     set: (newValue: Reference<Type>) => {
    //       currentValue = newValue;
    //     },
    //     get: () => currentValue
    //   });
    };
  }