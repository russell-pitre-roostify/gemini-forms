import {Control, ControlType} from "../Control";

export type HeadingControl = {
    /**
     * Control type.
     */
    type: ControlType.Heading,
    /**
     * Control options.
     */
    options: HeadingControlOptions
    /**
     * Formula for calculating a value.
     */
    formulaCalculatedValue?: string

} | Control

export type HeadingControlOptions = {
    /**
     * Heading level
     */
    level: 1 | 2 | 3 | 4 | 5 | 6
}