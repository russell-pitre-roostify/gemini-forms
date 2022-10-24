import FormulaRunner from "../../../js/formula-runner/FormulaRunner";
import Node, {NodeStateChange, StateChange_CalculatedValue} from "../Node";
import pathToChild from "./pathToChild";
import {IHasFormulaCalculatedValue} from "@roostify/gemini-forms-schema";

export default (root: Node, runner: FormulaRunner) => {

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {

            const {formulaCalculatedValue} = node.control as IHasFormulaCalculatedValue;

            if (formulaCalculatedValue) {
                const result = runner.run(formulaCalculatedValue);

                //if (result.errors) {
                //    const e = result.errors.join("; ")
                //    throw new Error(e);
                //}

                const previousValue = node.getState().value;

                if (previousValue !== result.value) {
                    node.setValue(result.value);

                    changes.push({
                        type: StateChange_CalculatedValue,
                        path: pathToChild(node),
                        key: node.key,
                        value: result.value,
                        previousValue: previousValue
                    })
                }
            }
        }
    })

    return changes;
}
