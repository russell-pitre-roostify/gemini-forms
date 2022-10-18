import FormulaRunner from "../formula-runner/FormulaRunner.js";
import walk from "./walk.js";
import defaultTemplateParser from "./defaultTemplateParser.js";

const updateCalculatedValues = root => {

    const runner = new FormulaRunner({
        templateParser: defaultTemplateParser(root)
    });

    walk(root.controls, node => {

        if (node.control) {
            const formula = node.control.formulaCalculatedValue
            if (formula) {
                const result = runner.run(formula);
                node.setValue(result.value);
            }
        }
    });
}

export default updateCalculatedValues;
