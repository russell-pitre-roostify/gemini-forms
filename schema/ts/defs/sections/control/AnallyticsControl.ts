import {ControlType} from "../Control";

export interface AnalyticsControl {
    /**
     * Control type.
     */
    type: ControlType.Analytics;
    /**
     * Control options.
     */
    options: AnalyticsControlOptions;
}

export type AnalyticsControlOptions = {
    /**
     * Value used by analytics library to indicate the current page.
     */
    value: string;
}