import {Controls} from "./Controls";
import {SectionControl} from "./control/SectionControl";
import {AnalyticsControl} from "./control/AnallyticsControl";
import {TextInputControl} from "./control/TextInputControl";
import {HeadingControl} from "./control/HeadingControl";

export type AnyControl = SectionControl | AnalyticsControl | TextInputControl | HeadingControl;

export type Control = {
    /**
     * Type of control.
     */
    type: ControlType;
    /**
     * Children controls.
     */
    controls: Controls
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
