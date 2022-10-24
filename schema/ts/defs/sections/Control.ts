import {Controls} from "./Controls";
import {AnalyticsControl} from "./control/AnallyticsControl";
import {HeadingControl} from "./control/HeadingControl";
import {TextInputControl} from "./control/TextInputControl";
import {ContainerControl} from "./control/ContainerControl";
import {RepeaterControl} from "./control/RepeaterControl";

export type Control =
    | AnalyticsControl
    | HeadingControl
    | TextInputControl
    | ContainerControl
    | RepeaterControl

export interface IHasChildrenControls {
    /**
     * Children controls.
     */
    controls?: Controls;
}

export interface IHasFormulaCalculatedValue {
    /**
     * Formula for calculating the controls value.
     */
    formulaCalculatedValue?: string | null;
}

export interface IHasFormulaIsVisible {
    /**
     * Formula to evaluate that determines the visibility of the control. When the formula
     * evaluates to "false" the control will not be presented to the user.
     */
    formulaIsVisible?: string | null;
}

export interface IHasFormulaIsRequired {
    /**
     * Formula to evaluate that determines whether control is required. When the formula
     * evaluates to "false" the control will not require a value to be entered.
     */
    formulaIsRequired?: string | null;
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
