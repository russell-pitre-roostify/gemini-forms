import {
    ControlType,
    IControlType,
    IHasFormulaCalculatedValue,
    IHasFormulaIsRequired,
    IHasFormulaIsVisible
} from "../Control";

export type TextInputControl = {
    /**
     * Control type.
     */
    type: ControlType.Text,
    /**
     * Control options.
     */
    options: TextInputControlOptions

} & IControlType & IHasFormulaCalculatedValue & IHasFormulaIsVisible & IHasFormulaIsRequired

export type TextInputControlOptions = {
    /**
     * Max number of characters user is allowed to enter.
     */
    maxLength: number
}