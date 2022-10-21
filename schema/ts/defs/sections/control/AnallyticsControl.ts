import {Control, ControlType} from "../Control";

export type AnalyticsControl = {
    /**
     * Control type.
     */
    type: ControlType.Analytics,
    /**
     * Control options.
     */
    options: AnalyticsControlOptions

}

export type AnalyticsControlOptions = {
    /**
     * ?
     */
    value: string
}