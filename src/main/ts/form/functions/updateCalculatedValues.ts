import FormulaRunner from "../../../js/formula-runner/FormulaRunner";
import Node, {NodeStateChange, StateChange_CalculatedValue} from "../Node";
import pathToChild from "./pathToChild";

const updateCalculatedValues = (root: Node, runner: FormulaRunner) => {

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {

            // @ts-ignore
            const {formulaCalculatedValue} = node.control;

            if (formulaCalculatedValue) {
                const result = runner.run(formulaCalculatedValue);

                // @ts-ignore
                if (result.errors) {
                    // @ts-ignore
                    const e = result.errors.join("; ")
                    throw new Error(e);
                }

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

export default updateCalculatedValues;
