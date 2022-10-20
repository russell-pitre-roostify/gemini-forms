import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import parseFormDefinition from "./parseFormDefinition";
import updateCalculatedValues from "./updateCalculatedValues";

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

            form.toChild("section:first_name")?.setValue("Tom")
            form.toChild("section:last_name")?.setValue("Petty")

            updateCalculatedValues(form);

            const heading = form.toChild("section:heading")?.getState().value;

            expect(heading).toBe("Hello, Tom Petty")
        });

    })

});