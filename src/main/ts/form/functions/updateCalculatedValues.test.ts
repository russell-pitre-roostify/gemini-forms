import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import parseFormDefinition from "./parseFormDefinition";
import updateCalculatedValues from "./updateCalculatedValues";
import FormulaRunner, {defaultFunctions} from "../../../js/formula-runner/FormulaRunner";
import defaultTemplateParser from "./defaultTemplateParser";
import {NodeStateChange, StateChange_CalculatedValue} from "../Node";

const formDefinition: FormDefinition = {
    name: "A Form",
    description: "A sample form",
    sections: {
        "section": {
            type: ControlType.Section,
            group: "Borrower",
            title: "Default Borrower Form",
            controls: {
                "analytics": {
                    type: ControlType.Analytics,
                    options: {
                        "value": "blah blah blah"
                    }
                },
                "heading": {
                    type: ControlType.Heading,
                    formulaCalculatedValue: "'Hello, ' + `section:first_name` + ' ' + `section:last_name`",
                    options: {
                        level: 2
                    }
                },
                "first_name": {
                    type: ControlType.Text,
                    options: {
                        maxLength: 100
                    }
                },
                "last_name": {
                    type: ControlType.Text,
                    options: {
                        maxLength: 100
                    }
                },
            }
        }
    },
}


describe('updateCalculatedValues', () => {

    describe('when executed', () => {

        it('should update heading value', () => {
            const form = parseFormDefinition(formDefinition)

            let runner = new FormulaRunner({
                functions: defaultFunctions,
                templateParser: defaultTemplateParser(form)
            })

            form.toChild("section:first_name")?.setValue("Tom")
            form.toChild("section:last_name")?.setValue("Petty")

            let changes: NodeStateChange[];

            changes = updateCalculatedValues(form, runner);

            const heading = form.toChild("section:heading")?.getState().value;

            expect(heading).toBe("Hello, Tom Petty")
            expect(changes[0].type).toBe(StateChange_CalculatedValue);
        });

    })

});