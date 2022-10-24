import {ControlType, IHasChildrenControls, IHasFormulaIsVisible} from "../Control";

export interface ContainerControl extends IHasChildrenControls, IHasFormulaIsVisible {
    /**
     * Control type.
     */
    type: ControlType.Container;
    /**
     * Control options.
     */
    options: ContainerControlOptions;
}

export type ContainerControlOptions = {
    /**
     * Orientation of container layout.
     */
    orientation: "VERTICAL" | "HORIZONTAL";
}