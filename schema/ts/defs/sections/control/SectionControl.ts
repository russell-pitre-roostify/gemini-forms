import {ControlType, IHasChildrenControls, IHasFormulaIsVisible} from "../Control";

export interface SectionControl extends IHasChildrenControls, IHasFormulaIsVisible {
    /**
     * Control type.
     */
    type: ControlType.Section;
    /**
     * Title of section.
     */
    title?: string;
    /**
     * Groups multiple form sections under a single top-level navigation item.
     */
    group?: string;
}