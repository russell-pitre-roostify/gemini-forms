import FormulaRunner, {defaultFunctions} from "../../../js/formula-runner/FormulaRunner";
import defaultTemplateParser from "./defaultTemplateParser";
import Node, {NodeStateChange} from "../Node";

const updateCalculatedValues = (root: Node) => {

    const runner = new FormulaRunner({
        functions: defaultFunctions,
        templateParser: defaultTemplateParser(root)
    });

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {

            // @ts-ignore
            const {formulaCalculatedValue} = node.control;

            if (formulaCalculatedValue) {
                const result = runner.run(formulaCalculatedValue);

                if (result?.error) {
                    const e = result?.error.join("; ")
                    throw new Error(e);
                }

                const previousValue = node.getState().value;

                node.setValue(result.value);

                changes.push({
                    value: result.value,
                    previousValue: previousValue
                })
            }
        }
    })

    return changes;
}

export default updateCalculatedValues;
