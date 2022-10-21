import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import updateVisibility from "./updateVisibility";


const formDefinition: FormDefinition = {
    name: "A Form",
    description: "A sample form",
    sections: {
        "section": {
            type: ControlType.Section,
            group: "Form",
            title: "Form section",
            controls: {
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
                "full_name": {
                    type: ControlType.Text,
                    formulaIsVisible: '(length(`section:first_name`) + length(`section:last_name`)) > 0',
                    options: {
                        maxLength: 100
                    }
                }
            }
        }
    },
}

describe('updateVisibility', () => {

    beforeEach(() => {

    })

    describe('when executed', () => {

        it('placeholder', () => {

            expect(true).toBeTruthy();

        })

    })

});