import {
    ControlType,
    IControlType,
    IHasFormulaCalculatedValue,
    IHasFormulaIsVisible
} from "../Control";

export type HeadingControl = {
    /**
     * Control type.
     */
    type: ControlType.Heading,
    /**
     * Control options.
     */
    options: HeadingControlOptions

} & IControlType & IHasFormulaCalculatedValue & IHasFormulaIsVisible

export type HeadingControlOptions = {
    /**
     * Heading level
     */
    level: 1 | 2 | 3 | 4 | 5 | 6
}