import {ControlType, IHasFormulaCalculatedValue, IHasFormulaIsVisible} from "../Control";

export interface HeadingControl extends IHasFormulaIsVisible, IHasFormulaCalculatedValue {
    /**
     * Control type.
     */
    type: ControlType.Heading;
    /**
     * Control options.
     */
    options: HeadingControlOptions;

}

export type HeadingControlOptions = {
    /**
     * Heading level
     */
    level: 1 | 2 | 3 | 4 | 5 | 6;
}