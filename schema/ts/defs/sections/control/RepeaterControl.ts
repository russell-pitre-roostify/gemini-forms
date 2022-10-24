import {ControlType, IHasChildrenControls, IHasFormulaIsVisible} from "../Control";

export interface RepeaterControl extends IHasChildrenControls, IHasFormulaIsVisible {
    /**
     * Control type.
     */
    type: ControlType.Repeater;
    /**
     * Control options.
     */
    options: RepeaterControlOptions;
}

export type RepeaterControlOptions = {
    /**
     * The maximum number items that can be added.
     */
    maxItems?: number
}