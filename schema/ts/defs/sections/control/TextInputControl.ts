import {
    ControlType,
    IHasFormulaCalculatedValue,
    IHasFormulaIsRequired,
    IHasFormulaIsVisible
} from "../Control";

export interface TextInputControl extends IHasFormulaIsRequired, IHasFormulaIsVisible, IHasFormulaCalculatedValue {
    /**
     * Control type.
     */
    type: ControlType.Text,
    /**
     * Control options.
     */
    options: TextInputControlOptions
}

export type TextInputControlOptions = {
    /**
     * Max number of characters user is allowed to enter.
     */
    maxLength: number
}