import {SectionControl} from "./control/SectionControl";

export interface Sections {
    /**
     * Section.
     */
    [key: string]: SectionControl;
}