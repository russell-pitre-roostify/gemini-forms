import {Controls} from "./Controls";
import {AnalyticsControl} from "./control/AnallyticsControl";
import {HeadingControl} from "./control/HeadingControl";
import {SectionControl} from "./control/SectionControl";
import {TextInputControl} from "./control/TextInputControl";
import {ContainerControl} from "./control/ContainerControl";

export type Control =
    | AnalyticsControl
    | HeadingControl
    | SectionControl
    | TextInputControl
    | ContainerControl

export interface IControlType {
    /**
     * Type of control.
     */
    type: ControlType;
}

export type IHasChildrenControls = {
    /**
     * Children controls.
     */
    controls: Controls
}

export type IHasFormulaCalculatedValue = {
    /**
     * Formula for calculating the controls value.
     */
    formulaCalculatedValue?: string
}

export type IHasFormulaIsVisible = {
    /**
     * Formula to evaluate that determines the visibility of the control. When the formula
     * evaluates to "false" the control will not be presented to the user.
     */
    formulaIsVisible?: string;
}

export type IHasFormulaIsRequired = {
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
