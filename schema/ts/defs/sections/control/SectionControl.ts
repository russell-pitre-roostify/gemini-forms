import {ControlType, IControlType, IHasChildrenControls, IHasFormulaIsVisible} from "../Control";

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

} & IControlType & IHasChildrenControls & IHasFormulaIsVisible