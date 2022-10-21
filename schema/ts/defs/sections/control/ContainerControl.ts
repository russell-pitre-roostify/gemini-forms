import {ControlType, IControlType, IHasChildrenControls, IHasFormulaIsVisible} from "../Control";

export type ContainerControl = {
    /**
     * Control type.
     */
    type: ControlType.Container,
    /**
     * Control options.
     */
    options: ContainerControlOptions

} & IControlType & IHasChildrenControls & IHasFormulaIsVisible

export type ContainerControlOptions = {
    /**
     * Orientation of container layout.
     */
    orientation: "VERTICAL" | "HORIZONTAL"
}