import {Control, ControlType} from "../Control";

export type SectionControl = {
    /**
     * Control type.
     */
    type: ControlType.Section;
    /**
     * Title of section.
     */
    title: string;
    /**
     * Groups multiple form sections under a single top-level navigation item.
     */
    group: string;
    /**
     * Formula to evaluate that determines the visibility of the form section. When the formula
     * evaluates to "false" the form section will not be presented to the user.
     */
    formulaIsVisible?: string;

} | Control