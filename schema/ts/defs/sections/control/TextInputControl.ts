import {Control, ControlType} from "../Control";

export type TextInputControl = {
    /**
     * Control type.
     */
    type: ControlType.Text,
    /**
     * Control options.
     */
    options: TextInputControlOptions

} | Control

export type TextInputControlOptions = {
    /**
     * Max number of characters user is allowed to enter.
     */
    maxLength: number
}