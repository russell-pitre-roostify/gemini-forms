import Node, {NodeStateChange, StateChange_IsVisible} from "../Node";
import FormulaRunner from "../../../js/formula-runner/FormulaRunner";
import pathToChild from "./pathToChild";
import {IHasFormulaIsVisible} from "@roostify/gemini-forms-schema";

export default (root: Node, runner: FormulaRunner) => {

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {

            const {formulaIsVisible} = node.control as IHasFormulaIsVisible;

            if (formulaIsVisible) {
                const result = runner.run(formulaIsVisible);

                // if (result.errors) {
                //    const e = result.errors.join("; ")
                //    throw new Error(e);
                //}

                const previousValue = node.getState().isVisible;

                if (previousValue !== result.value) {
                    node.setVisible(result.value);

                    changes.push({
                        type: StateChange_IsVisible,
                        path: pathToChild(node),
                        key: node.key,
                        value: result.value,
                        previousValue: previousValue
                    })
                }
            }

        }
    });

    return changes;
}