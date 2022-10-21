import Node, {NodeStateChange, StateChange_IsVisible} from "../Node";
import FormulaRunner, {defaultFunctions} from "../../../js/formula-runner/FormulaRunner";
import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import parseFormDefinition from "./parseFormDefinition";
import defaultTemplateParser from "./defaultTemplateParser";
import updateVisibility from "./updateVisibility";
import updateCalculatedValues from "./updateCalculatedValues";


const formDefinition: FormDefinition = {
    name: "A Form",
    description: "A sample form",
    sections: {
        "section": {
            type: ControlType.Section,
            group: "Form",
            title: "Form section",
            controls: {
                "do_you_agree": {
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
                "full_name": {
                    type: ControlType.Text,
                    formulaIsRequired: '`section:do_you_agree` === "yes"',
                    options: {
                        maxLength: 100
                    }
                }
            }
        }
    },
}

describe('updateVisibility', () => {

    let form: Node;
    let runner: FormulaRunner;

    beforeEach(() => {
        form = parseFormDefinition(formDefinition)

        runner = new FormulaRunner({
            functions: defaultFunctions,
            templateParser: defaultTemplateParser(form)
        })

        form.toChild("section:first_name")?.setValue("");
        form.toChild("section:last_name")?.setValue("");

        updateCalculatedValues(form, runner);
        updateVisibility(form, runner);
    })

    describe('when executed', () => {

        it('should update isVisible flag', () => {

            form.toChild("section:first_name")?.setValue("Tom")
            form.toChild("section:last_name")?.setValue("Petty")

            let changes: NodeStateChange[];

            changes = updateVisibility(form, runner);

            const isFullNameVisible = form.toChild("section:full_name")?.getState().isVisible;

            expect(isFullNameVisible).toBe(true);
            expect(changes[0]?.value).toBe(true);
            expect(changes[0]?.type).toBe(StateChange_IsVisible);
        });

    })

});