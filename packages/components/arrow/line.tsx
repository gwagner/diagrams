import { Line, LineProps } from "@motion-canvas/2d/lib/components";
import { Tags } from "../../generic-aws-diagram/src/components/aws-landscape";

export interface ArrowProps extends LineProps {
    tags: Tags[];
}

export class Arrow extends Line {

    private _tags: Tags[] = [];

    public constructor(props?: ArrowProps) {
        super({
            ...props,
        });

        this.tags = props.tags
    }

    public get tags(): Tags[] {
        return this._tags;
    }

    protected set tags(value: Tags[]) {
        this._tags = value;
    }
}