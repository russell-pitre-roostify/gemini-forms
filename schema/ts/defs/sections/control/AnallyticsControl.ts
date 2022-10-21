import {
    ControlType,
    IControlType,
    IHasFormulaCalculatedValue,
    IHasFormulaIsVisible
} from "../Control";

export type AnalyticsControl = {
    /**
     * Control type.
     */
    type: ControlType.Analytics,
    /**
     * Control options.
     */
    options: AnalyticsControlOptions

} & IControlType & IHasFormulaCalculatedValue & IHasFormulaIsVisible

export type AnalyticsControlOptions = {
    /**
     * ?
     */
    value: string
}