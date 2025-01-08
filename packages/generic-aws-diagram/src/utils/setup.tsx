import { ObjectMetaField } from "@motion-canvas/core/lib/meta";
import { createRef, Reference } from "@motion-canvas/core/lib/utils";


export function InstantiateRef<T extends { new(...args: any[]): {} }>(className: T) {
  return class extends className {
    constructor(...args: any[]) {
      super(...args);

      
      
      Object.keys(this).forEach((v)=>{
        if(this.hasOwnProperty(v)) {
          console.log(Object.getOwnPropertyDescriptors(this))
        }   
        
      });
    }
  }
};

export const Enumerable: {
  (target: any, name: string): void;
  (target: any, name: string, desc: PropertyDescriptor): PropertyDescriptor;
} = (target: any, name: string, desc?: any) => {
  if(desc) {
      desc.enumerable = true;
      return desc;
  }
  Object.defineProperty(target, name,  {
      set(value) {
          Object.defineProperty(this, name, {
              value, enumerable: true, writable: true, configurable: true,
          });
      },
      enumerable: true,
      configurable: true,
  });
};


// export function InstantiateType<Type>(): any {
//   return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any> ) {
//     console.log("Target: ", target)
//     console.log("Target: ", typeof target)
//     console.log("Target: ", propertyName)
//     console.log("Target hOP: ",Object.getOwnPropertyDescriptors(target).hasOwnProperty(propertyName))
//     console.log(descriptor)
//     // let currentValue: T;
//     // if(currentValue == undefined) {
//     //   currentValue = constructor;
//     // }

//     // Object.defineProperty(target, propertyName, {
//     //   set: (newValue: T) => {
//     //     currentValue = newValue;
//     //   },
//     //   get: () => currentValue
//     // });
//   };
// }

