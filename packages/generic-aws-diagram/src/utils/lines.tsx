import { Line, View2D } from "@motion-canvas/2d/lib/components";
import { Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";
import { createRef, Reference, useLogger } from "@motion-canvas/core/lib/utils";
import { AWSIconBase } from "components/aws/aws-icon-base";
import "reflect-metadata"

let zero: [number, number] = [-1920 / 2, -1080 / 2]

export enum ArrowDirection {
    Top = 1,
    Bottom,
    Left,
    Right
}

enum NextDirection {
    Vertical = 1,
    Horizontal
}

export enum ArrowEnds {
    Start = 1,
    End,
    Both
}

export interface LineAnimation {
    view: View2D;
    start: Reference<AWSIconBase>;
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

export function getLineAnimationV2({ view, start, startEdge, startElementIndex = 0, startOffset = 0, end, endEdge, endElementIndex = 0, endOffset=0, lineModifiers = [], dashed = false, arrowEnds = ArrowEnds.End, color = "#236071", numPoints = 2, zIndex = 21 }: LineAnimation): Reference<Line> {

    let logger = useLogger();

    let reference = createRef<Line>();
    let points: Vector2Signal<void>[] = [];
    let isStartOffset = (Math.abs(startOffset) > 0 ? true : false)
    let isEndOffset = (Math.abs(endOffset) > 0 ? true : false)

    // make sure we always have atleast 2 points
    if (numPoints < 2) { numPoints = 2 }

    let endPoint = getEdgeV2(endEdge, end, endElementIndex);
    let startPoint = getEdgeV2(startEdge, start, startElementIndex)
    let nextDirection: NextDirection = (startEdge == ArrowDirection.Left || startEdge == ArrowDirection.Right) ? NextDirection.Horizontal : NextDirection.Vertical

    // add the first point to the points array and decrement by 1
    points.push(modifyPoint(startPoint, getPointModifierByIndex(0, lineModifiers)))
    numPoints--;

    // if we have another point to calculate, do it here
    if (numPoints > 1) {

        let riseStep: number;
        let runStep: number;
        let startPointIndexOffset = (isStartOffset ? 1 : 0)

        // logger.debug("Start Offset: "+startOffset)
        // logger.debug("Index Offset: "+startPointIndexOffset)

        if (isStartOffset) {
            switch (nextDirection) {
                case NextDirection.Vertical: {
                    points.push(Vector2.createSignal(() => [points[0].x(), points[0].y() + startOffset]))
                    nextDirection = NextDirection.Horizontal
                    break;
                }
                case NextDirection.Horizontal: {
                    points.push(Vector2.createSignal(() => [points[0].x() + startOffset, points[0].y()]))
                    nextDirection = NextDirection.Vertical
                    break;
                }
            }
        }

        switch ((endEdge == ArrowDirection.Left || endEdge == ArrowDirection.Right) ? NextDirection.Horizontal : NextDirection.Vertical) {
            case NextDirection.Vertical: {
                riseStep = (endPoint.y() - points[0 + startPointIndexOffset].y()) / (numPoints)
                runStep = (endPoint.x() - points[0 + startPointIndexOffset].x()) / (numPoints - 1)
                break;
            }
            case NextDirection.Horizontal: {
                riseStep = (endPoint.y() - points[0 + startPointIndexOffset].y()) / (numPoints - 1)
                runStep = (endPoint.x() - points[0 + startPointIndexOffset].x()) / (numPoints)
                break;
            }
        }

        for (let i = 0; i < ((numPoints - 1) * 2); i++) {
            
            let modifier = getPointModifierByIndex(i+1, lineModifiers)

            switch (nextDirection) {
                case NextDirection.Vertical: {
                    points.push(Vector2.createSignal(() => [points[i + startPointIndexOffset].x() + modifier[0], points[i + startPointIndexOffset].y() + riseStep + modifier[1]]));
                    nextDirection = NextDirection.Horizontal;
                    break;
                }
                case NextDirection.Horizontal: {
                    points.push(Vector2.createSignal(() => [points[i + startPointIndexOffset].x() + runStep + modifier[0], points[i + startPointIndexOffset].y() + modifier[1]]))
                    nextDirection = NextDirection.Vertical;
                    break;
                }
            }
        }
    }

    if(isEndOffset) {
        switch ((endEdge == ArrowDirection.Left || endEdge == ArrowDirection.Right) ? NextDirection.Horizontal : NextDirection.Vertical) {
            case NextDirection.Vertical: {
                points.push(Vector2.createSignal(() => [endPoint.x(), endPoint.y() + endOffset]))
                break;
            }
            case NextDirection.Horizontal: {
                points.push(Vector2.createSignal(() => [endPoint.x() + endOffset, endPoint.y()]))
                break;
            }
        }
    }

    // add the final point to the array
    points.push(modifyPoint(endPoint, getPointModifierByIndex(points.length - 1, lineModifiers)))

    // if(lineModifiers.length > 1) {
    //     points.forEach((v)=>{
    //         logger.debug("["+v().x + ","+v().y+"]")
    //     })
    // }

    view.add(
        <Line
            ref={reference}
            lineWidth={3}
            arrowSize={10}
            stroke={color}
            position={zero}
            points={points}
            start={0}
            end={0}
            zIndex={zIndex}
            shadowColor={"#d3d3d3"}
            shadowOffset={[2, 2]}
            radius={8}
        />
    )

    switch (arrowEnds) {
        case ArrowEnds.Start: {
            reference().startArrow(true)
            break;
        }
        case ArrowEnds.End: {
            reference().endArrow(true)
            break;
        }
        case ArrowEnds.Both: {
            reference().startArrow(true)
            reference().endArrow(true)
            break;
        }
    }

    if (dashed) {
        reference().arrowSize(5)
        reference().lineWidth(1)
        reference().lineDash([5, 2])
    }

    return reference
}

export interface LineAnimationV3 {
    view: View2D;
    ref: Reference<Line>;
    start: Reference<AWSIconBase>;
    startEdge?: ArrowDirection;
    startElementIndex?: number;
    startOffset?: number;
    end: Reference<AWSIconBase>;
    endEdge?: ArrowDirection;
    endElementIndex?: number;
    endOffset?: number,
    lineModifiers?: Array<[number,number]>,
    arrowEnds?: ArrowEnds;
    dashed?: boolean;
    color?: string;
    numPoints?: number;
    zIndex?: number;
}

export function getLineAnimationV3({ view, ref, start, startEdge, startElementIndex = 0, startOffset = 0, end, endEdge, endElementIndex = 0, endOffset=0, lineModifiers = [], dashed = false, arrowEnds = ArrowEnds.End, color = "#236071", numPoints = 2, zIndex = 21 }: LineAnimationV3) {

    let logger = useLogger();

    console.log("Start Edge: "+startEdge)
    console.log("End Edge: "+endEdge)

    if(startEdge == undefined) {
        console.log(Reflect.getOwnMetadata("startEdge", ref))
        startEdge = Reflect.getOwnMetadata("startEdge", ref)
    }

    if(endEdge == undefined) {
        endEdge = Reflect.getOwnMetadata("endEdge", ref)
    }

    console.log("Start Edge: "+startEdge)
    console.log("End Edge: "+endEdge)

    let points: Vector2Signal<void>[] = [];
    let isStartOffset = (Math.abs(startOffset) > 0 ? true : false)
    let isEndOffset = (Math.abs(endOffset) > 0 ? true : false)

    // make sure we always have atleast 2 points
    if (numPoints < 2) { numPoints = 2 }

    let endPoint = getEdgeV2(endEdge, end, endElementIndex);
    let startPoint = getEdgeV2(startEdge, start, startElementIndex)
    let nextDirection: NextDirection = (startEdge == ArrowDirection.Left || startEdge == ArrowDirection.Right) ? NextDirection.Horizontal : NextDirection.Vertical

    // add the first point to the points array and decrement by 1
    points.push(modifyPoint(startPoint, getPointModifierByIndex(0, lineModifiers)))
    numPoints--;

    // if we have another point to calculate, do it here
    if (numPoints > 1) {

        let riseStep: number;
        let runStep: number;
        let startPointIndexOffset = (isStartOffset ? 1 : 0)

        // logger.debug("Start Offset: "+startOffset)
        // logger.debug("Index Offset: "+startPointIndexOffset)

        if (isStartOffset) {
            switch (nextDirection) {
                case NextDirection.Vertical: {
                    points.push(Vector2.createSignal(() => [points[0].x(), points[0].y() + startOffset]))
                    nextDirection = NextDirection.Horizontal
                    break;
                }
                case NextDirection.Horizontal: {
                    points.push(Vector2.createSignal(() => [points[0].x() + startOffset, points[0].y()]))
                    nextDirection = NextDirection.Vertical
                    break;
                }
            }
        }

        switch ((endEdge == ArrowDirection.Left || endEdge == ArrowDirection.Right) ? NextDirection.Horizontal : NextDirection.Vertical) {
            case NextDirection.Vertical: {
                riseStep = (endPoint.y() - points[0 + startPointIndexOffset].y()) / (numPoints)
                runStep = (endPoint.x() - points[0 + startPointIndexOffset].x()) / (numPoints - 1)
                break;
            }
            case NextDirection.Horizontal: {
                riseStep = (endPoint.y() - points[0 + startPointIndexOffset].y()) / (numPoints - 1)
                runStep = (endPoint.x() - points[0 + startPointIndexOffset].x()) / (numPoints)
                break;
            }
        }

        for (let i = 0; i < ((numPoints - 1) * 2); i++) {
            
            let modifier = getPointModifierByIndex(i+1, lineModifiers)

            switch (nextDirection) {
                case NextDirection.Vertical: {
                    points.push(Vector2.createSignal(() => [points[i + startPointIndexOffset].x() + modifier[0], points[i + startPointIndexOffset].y() + riseStep + modifier[1]]));
                    nextDirection = NextDirection.Horizontal;
                    break;
                }
                case NextDirection.Horizontal: {
                    points.push(Vector2.createSignal(() => [points[i + startPointIndexOffset].x() + runStep + modifier[0], points[i + startPointIndexOffset].y() + modifier[1]]))
                    nextDirection = NextDirection.Vertical;
                    break;
                }
            }
        }
    }

    if(isEndOffset) {
        switch ((endEdge == ArrowDirection.Left || endEdge == ArrowDirection.Right) ? NextDirection.Horizontal : NextDirection.Vertical) {
            case NextDirection.Vertical: {
                points.push(Vector2.createSignal(() => [endPoint.x(), endPoint.y() + endOffset]))
                break;
            }
            case NextDirection.Horizontal: {
                points.push(Vector2.createSignal(() => [endPoint.x() + endOffset, endPoint.y()]))
                break;
            }
        }
    }

    // add the final point to the array
    points.push(modifyPoint(endPoint, getPointModifierByIndex(points.length - 1, lineModifiers)))

    // if(lineModifiers.length > 1) {
    //     points.forEach((v)=>{
    //         logger.debug("["+v().x + ","+v().y+"]")
    //     })
    // }

    view.add(
        <Line
            ref={ref}
            lineWidth={3}
            arrowSize={10}
            stroke={color}
            position={zero}
            points={points}
            end={1}
            zIndex={zIndex}
            shadowColor={"#d3d3d3"}
            shadowOffset={[2, 2]}
            radius={8}
        />
    )

    switch (arrowEnds) {
        case ArrowEnds.Start: {
            ref().startArrow(true)
            break;
        }
        case ArrowEnds.End: {
            ref().endArrow(true)
            break;
        }
        case ArrowEnds.Both: {
            ref().startArrow(true)
            ref().endArrow(true)
            break;
        }
    }

    if (dashed) {
        ref().arrowSize(5)
        ref().lineWidth(1)
        ref().lineDash([5, 2])
    }
}


export function getEdgeV2(edge: ArrowDirection, ele: Reference<AWSIconBase>, index: number): Vector2Signal<void> {
    switch (edge) {
        case ArrowDirection.Top: {
            return ele().getChildElementTopEdge(index)
        }

        case ArrowDirection.Bottom: {
            return ele().getChildElementBottomEdge(index)
        }

        case ArrowDirection.Left: {
            return ele().getChildElementLeftEdge(index)
        }

        case ArrowDirection.Right: {
            return ele().getChildElementRightEdge(index)
        }
    }
}

export interface LineAnimationV3 {
    view: View2D;
    ref: Reference<Line>;
    start: Reference<AWSIconBase>;
    startEdge?: ArrowDirection;
    startElementIndex?: number;
    startOffset?: number;
    end: Reference<AWSIconBase>;
    endEdge?: ArrowDirection;
    endElementIndex?: number;
    endOffset?: number,
    lineModifiers?: Array<[number,number]>,
    arrowEnds?: ArrowEnds;
    dashed?: boolean;
    color?: string;
    numPoints?: number;
    zIndex?: number;
}

function modifyPoint(point: Vector2Signal<void>, pointModifier: [number,number]): Vector2Signal<void> {
    return Vector2.createSignal(() => point().addX(pointModifier[0]).addY(pointModifier[1]))
}

function getPointModifierByIndex(index: number, lineModifiers: Array<[number,number]>): [number,number] {
    if(typeof lineModifiers[index] === 'undefined') {
        return [0, 0]
    }

    return lineModifiers[index];
}