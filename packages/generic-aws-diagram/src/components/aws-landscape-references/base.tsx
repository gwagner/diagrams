import { Line, Shape, View2D } from "@motion-canvas/2d/lib/components";
import { Vector2, Vector2Signal } from "@motion-canvas/core/lib/types";
import { Reference } from "@motion-canvas/core/lib/utils";
import { AWSIconBase } from "components/aws/aws-icon-base";
import { AWSLandscape, AWSLandscapeProps, Tags } from "../aws-landscape";
import { Arrow } from "../../../../components/arrow/line";

let zero: [number, number] = [-1920 / 2, -1080 / 2]

export enum Edge {
    Top = 1,
    Bottom,
    Left,
    Right
}

export enum ArrowEnds {
    Start = 1,
    End,
    Both
}

enum NextDirection {
    Vertical = 1,
    Horizontal
}

export interface AwsLandscapeComponentRef {
    drawLines(view: View2D, parent: AWSLandscape): void;
    get tags(): Tags[];
    get componentRefs(): Reference<Shape>[];
}

export abstract class BaseRef  {

    protected props: AWSLandscapeProps;

    private _tags: Tags[] = [];
    private _componentRefs: Reference<Shape>[] = [];
    
    constructor(props: AWSLandscapeProps) {
        if(this.props == undefined) this.props = props;
    }

    public get tags(): Tags[] {
        return this._tags;
    }

    protected set tags(value: Tags[]) {
        this._tags = value;
    }

    public get componentRefs(): Reference<Shape>[] {
        return this._componentRefs;
    }

    protected addComponentRefs(r: Reference<Shape> | Reference<Shape>[]) {
        if(!Array.isArray(r)) {
            r = [r]
        }
        this._componentRefs.push(...r);
    }
}