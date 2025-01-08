import { Reference, createRef } from "@motion-canvas/core/lib/utils";
import { ArrowEnds, Edge } from "./enums";
import { Line, View2D } from "@motion-canvas/2d/lib/components";
import { AWSIconBase } from "components/aws/aws-icon-base";
import { Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";
import { Tags } from "../../generic-aws-diagram/src/components/aws-landscape";
import { Arrow as ArrowComponent } from "./line";

export class Arrow {
    protected readonly _ref: Reference<any>;
    protected _edge: Edge = Edge.Right;
    protected _end: Arrow;
    protected _color: string;
    protected _dashed: boolean;
    protected _lineModifiers: Array<[number, number]> = [];
    protected _offset: number = 0;
    protected _points: number = 2;
    protected _parent: Arrow;
    protected _tags: Tags[] = [];

    constructor(ref: Reference<any>, protected parent?: Arrow) {
        this._ref = ref;
        if (parent != undefined) {
            this._parent = parent;
        }
    }
    top(): Arrow {
        this._edge = Edge.Top;
        return this;
    }
    bottom(): Arrow {
        this._edge = Edge.Bottom;
        return this;
    }
    left(): Arrow {
        this._edge = Edge.Left;
        return this;
    }
    right(): Arrow {
        this._edge = Edge.Right;
        return this;
    }

    to(ref: Reference<any>): Arrow {
        // Cannot (currently) draw a line with more than a single destination
        if (this._parent != undefined) {
            return;
        }

        this._end = new Arrow(ref, this);
        return this._end;
    }

    ref(): Reference<any> {
        return this._ref;
    }

    edge(): Edge {
        return this._edge;
    }

    color(): string;
    color(c: string): Arrow;
    color(c?: any): any {
        if (c == undefined) {
            if (this._parent != undefined) {
                return this._parent.color();
            }
            return this._color;
        }

        if (this._parent != undefined) {
            return this._parent.color(c);
        }

        this._color = c;
        return this;
    }

    dashed(): boolean;
    dashed(d: boolean): Arrow;
    dashed(d?: any): any {
        if (d == undefined) {
            if (this._parent != undefined) {
                return this._parent.dashed();
            }
            return this._dashed;
        }

        if (this._parent != undefined) {
            return this._parent.dashed(d);
        }

        this._dashed = d;
        return this;
    }

    lineModifiers(): Array<[number, number]>;
    lineModifiers(l: Array<[number, number]>): Arrow;
    lineModifiers(l?: any): any {
        if (l == undefined) {
            return this._lineModifiers;
        }
        this._lineModifiers = l;
        return this;
    }

    offset(): number;
    offset(o: number): Arrow;
    offset(o?: any): any {
        if (o == undefined) {
            return this._offset;
        }
        this._offset = o;
        return this;
    }


    points(): number;
    points(p: number): Arrow;
    points(p?: any): any {
        if (p == undefined) {
            if (this._parent != undefined) {
                return this._parent.points();
            }
            return this._points;
        }
        if (this._parent != undefined) {
            return this._parent.points(p);
        }
        this._points = p;
        return this;
    }

    tags(): Tags[];
    tags(p: Tags[]): Arrow;
    tags(p?: any): any {
        if (p == undefined) {
            if (this._parent != undefined) {
                return this._parent.tags();
            }
            return this._tags;
        }
        if (this._parent != undefined) {
            return this._parent.tags(p);
        }
        this._tags = p;
        return this;
    }

    draw(view: View2D): Reference<ArrowComponent> {
        if (this._parent != undefined) {
            return this._parent.draw(view);
        }

        let line: Reference<ArrowComponent> = createRef<ArrowComponent>();
        getLineAnimation({
            view: view,
            ref: line,
            start: this.ref(),
            startEdge: this.edge(),
            startOffset: this.offset(),
            end: this._end.ref(),
            endEdge: this._end.edge(),
            endOffset: this._end.offset(),
            lineModifiers: this._lineModifiers,
            numPoints: this.points(),
            dashed: this.dashed(),
            color: this.color(),
            tags: this.tags(),
        });
        return line;
    }
}

interface LineAnimation {
    view: View2D;
    ref: Reference<ArrowComponent>;
    start: Reference<AWSIconBase>;
    startEdge?: Edge;
    startElementIndex?: number;
    startOffset?: number;
    end: Reference<AWSIconBase>;
    endEdge?: Edge;
    endElementIndex?: number;
    endOffset?: number,
    lineModifiers?: Array<[number, number]>,
    arrowEnds?: ArrowEnds;
    dashed?: boolean;
    color?: string;
    numPoints?: number;
    zIndex?: number;
    tags?: Tags[];
}

enum NextDirection {
    Vertical = 1,
    Horizontal
}

//let zero: [number, number] = [-1920 / 2, -1080 / 2]

function getLineAnimation({ view, ref, start, startEdge, startElementIndex = 0, startOffset = 0, end, endEdge, endElementIndex = 0, endOffset = 0, lineModifiers = [], dashed = false, arrowEnds = ArrowEnds.End, color = "#236071", numPoints = 2, zIndex = 21, tags = [] }: LineAnimation) {

    let zero: [number, number] = [(view.width() * -1) / 2, (view.height() * -1) / 2];
    let points: Vector2Signal<void>[] = [];
    let isStartOffset = (Math.abs(startOffset) > 0 ? true : false);
    let isEndOffset = (Math.abs(endOffset) > 0 ? true : false);

    // make sure we always have atleast 2 points
    if (numPoints < 2) { numPoints = 2; }

    let endPoint = getEdge(endEdge, end, endElementIndex);
    let startPoint = getEdge(startEdge, start, startElementIndex);
    let nextDirection: NextDirection = (startEdge == Edge.Left || startEdge == Edge.Right) ? NextDirection.Horizontal : NextDirection.Vertical;

    // add the first point to the points array and decrement by 1
    points.push(modifyPoint(startPoint, getPointModifierByIndex(0, lineModifiers)));
    numPoints--;

    // if we have another point to calculate, do it here
    if (numPoints > 1) {

        let riseStep: number;
        let runStep: number;
        let startPointIndexOffset = (isStartOffset ? 1 : 0);

        // logger.debug("Start Offset: "+startOffset)
        // logger.debug("Index Offset: "+startPointIndexOffset)

        if (isStartOffset) {
            switch (nextDirection) {
                case NextDirection.Vertical: {
                    points.push(Vector2.createSignal(() => [points[0].x(), points[0].y() + startOffset]));
                    nextDirection = NextDirection.Horizontal;
                    break;
                }
                case NextDirection.Horizontal: {
                    points.push(Vector2.createSignal(() => [points[0].x() + startOffset, points[0].y()]));
                    nextDirection = NextDirection.Vertical;
                    break;
                }
            }
        }

        switch ((endEdge == Edge.Left || endEdge == Edge.Right) ? NextDirection.Horizontal : NextDirection.Vertical) {
            case NextDirection.Vertical: {
                riseStep = (endPoint.y() - points[0 + startPointIndexOffset].y()) / (numPoints);
                runStep = (endPoint.x() - points[0 + startPointIndexOffset].x()) / (numPoints - 1);
                break;
            }
            case NextDirection.Horizontal: {
                riseStep = (endPoint.y() - points[0 + startPointIndexOffset].y()) / (numPoints - 1);
                runStep = (endPoint.x() - points[0 + startPointIndexOffset].x()) / (numPoints);
                break;
            }
        }

        for (let i = 0; i < ((numPoints - 1) * 2); i++) {

            let modifier = getPointModifierByIndex(i + 1, lineModifiers);

            switch (nextDirection) {
                case NextDirection.Vertical: {
                    points.push(Vector2.createSignal(() => [points[i + startPointIndexOffset].x() + modifier[0], points[i + startPointIndexOffset].y() + riseStep + modifier[1]]));
                    nextDirection = NextDirection.Horizontal;
                    break;
                }
                case NextDirection.Horizontal: {
                    points.push(Vector2.createSignal(() => [points[i + startPointIndexOffset].x() + runStep + modifier[0], points[i + startPointIndexOffset].y() + modifier[1]]));
                    nextDirection = NextDirection.Vertical;
                    break;
                }
            }
        }
    }

    if (isEndOffset) {
        switch ((endEdge == Edge.Left || endEdge == Edge.Right) ? NextDirection.Horizontal : NextDirection.Vertical) {
            case NextDirection.Vertical: {
                points.push(Vector2.createSignal(() => [endPoint.x(), endPoint.y() + endOffset]));
                break;
            }
            case NextDirection.Horizontal: {
                points.push(Vector2.createSignal(() => [endPoint.x() + endOffset, endPoint.y()]));
                break;
            }
        }
    }

    // add the final point to the array
    points.push(modifyPoint(endPoint, getPointModifierByIndex(points.length - 1, lineModifiers)));

    view.add(
        <ArrowComponent
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
            tags={tags}
        />
    );

    switch (arrowEnds) {
        case ArrowEnds.Start: {
            ref().startArrow(true);
            break;
        }
        case ArrowEnds.End: {
            ref().endArrow(true);
            break;
        }
        case ArrowEnds.Both: {
            ref().startArrow(true);
            ref().endArrow(true);
            break;
        }
    }

    if (dashed) {
        ref().arrowSize(5);
        ref().lineWidth(1);
        ref().lineDash([5, 2]);
    }
}

function getEdge(edge: Edge, ele: Reference<AWSIconBase>, index: number): Vector2Signal<void> {
    switch (edge) {
        case Edge.Top: {
            //return Vector2.createSignal(() => ele().top());
            return ele().getChildElementTopEdge(index);
        }

        case Edge.Bottom: {
            //return Vector2.createSignal(() => ele().bottom());
            return ele().getChildElementBottomEdge(index);
        }

        case Edge.Left: {
            //return Vector2.createSignal(() => ele().left());
            return ele().getChildElementLeftEdge(index);
        }

        case Edge.Right: {
            //return Vector2.createSignal(() => ele().right());
            return ele().getChildElementRightEdge(index);
        }
    }
}

function modifyPoint(point: Vector2Signal<void>, pointModifier: [number, number]): Vector2Signal<void> {
    return Vector2.createSignal(() => point().addX(pointModifier[0]).addY(pointModifier[1]));
}

function getPointModifierByIndex(index: number, lineModifiers: Array<[number, number]>): [number, number] {
    if (typeof lineModifiers[index] === 'undefined') {
        return [0, 0];
    }

    return lineModifiers[index];
}