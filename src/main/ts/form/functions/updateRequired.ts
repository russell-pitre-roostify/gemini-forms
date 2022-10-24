import Node, {NodeStateChange, StateChange_IsRequired} from "../Node";
import FormulaRunner from "../../../js/formula-runner/FormulaRunner";
import pathToChild from "./pathToChild";
import {IHasFormulaIsRequired} from "@roostify/gemini-forms-schema";

export default (root: Node, runner: FormulaRunner) => {

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {

            const {formulaIsRequired} = node.control as IHasFormulaIsRequired;

            if (formulaIsRequired) {
                const result = runner.run(formulaIsRequired);

                //if (result.errors) {
                //    const e = result.errors.join("; ")
                //    throw new Error(e);
                //}

                const previousValue = node.getState().isRequired;

                if (previousValue !== result.value) {
                    node.setRequired(result.value);

                    changes.push({
                        type: StateChange_IsRequired,
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