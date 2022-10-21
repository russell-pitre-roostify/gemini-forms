import {Controls} from "./Controls";
import {SectionControl} from "./control/SectionControl";
import {AnalyticsControl} from "./control/AnallyticsControl";
import {TextInputControl} from "./control/TextInputControl";
import {HeadingControl} from "./control/HeadingControl";

export type AnyControl =
    | SectionControl
    | AnalyticsControl
    | TextInputControl
    | HeadingControl;

export type Control = {
    /**
     * Type of control.
     */
    type: ControlType;
    /**
     * Children controls.
     */
    controls: Controls
    /**
     * Formula for calculating the controls value.
     */
    formulaCalculatedValue?: string
    /**
     * Formula to evaluate that determines the visibility of the control. When the formula
     * evaluates to "false" the control will not be presented to the user.
     */
    formulaIsVisible?: string;
    /**
     * Formula to evaluate that determines whether control is required. When the formula
     * evaluates to "false" the control will not require a value to be entered.
     */
    formulaIsRequired?: string;
}


export enum ControlType {
    Analytics = 'analytics',
    ButtonGroup = 'button_group',
    Container = 'container',
    Heading = 'heading',
    Hidden = 'hidden',
    Repeater = 'repeater',
    Section = 'section',
    Select = 'select',
    Text = 'text',
}
