import { Reference } from "@motion-canvas/core/lib/utils";
import { AWSIconBase } from "../components/aws/aws-icon-base";
import { ArrowDirection, ArrowEnds } from "./lines";



export function Landscape<Type>(): any {
    return function (target: Type, propertyName: string, descriptor: TypedPropertyDescriptor<any> ) {
        console.log(target)
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