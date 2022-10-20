import FormulaRunner from "../formula-runner/FormulaRunner.js";
import walk from "./walk.js";
import defaultTemplateParser from "../../ts/form/functions/defaultTemplateParser.ts";

const updateVisibility = root => {

    const runner = new FormulaRunner({
        templateParser: defaultTemplateParser(root)
    });

    walk(root.controls, node => {

        if (node.control) {
            const visibilityFormula = node.control.formulaIsVisible
            if (visibilityFormula) {
                const result = runner.run(visibilityFormula);
                node.setVisible(result.value)
            }
        }
    });
}

export default updateVisibility;
