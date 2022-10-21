import Node, {NodeStateChange, StateChange_IsRequired} from "../Node";
import FormulaRunner from "../../../js/formula-runner/FormulaRunner";
import pathToChild from "./pathToChild";

export default (root: Node, runner: FormulaRunner) => {

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {
            // @ts-ignore
            const {formulaIsRequired} = node.control;

            if (formulaIsRequired) {
                const result = runner.run(formulaIsRequired);

                // @ts-ignore
                if (result.errors) {
                    // @ts-ignore
                    const e = result.errors.join("; ")
                    throw new Error(e);
                }

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