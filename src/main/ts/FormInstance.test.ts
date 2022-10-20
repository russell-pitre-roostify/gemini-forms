import FormInstance from "./FormInstance";
import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";

const borrowerFormDefinition: FormDefinition = {
    name: "Default Borrower Form",
    description: "A sample form",
    sections: {
        "personal_information": {
            type: ControlType.Section,
            group: "Borrower",
            title: "Default Borrower Form",
            controls: {}
        }
    },
}

describe('FormInstance', () => {

    describe('constructor', () => {

        let borrowerForm: FormInstance;

        beforeEach(() => {
            borrowerForm = new FormInstance(borrowerFormDefinition)
        })

        it('should not be null', () => {
            expect(borrowerForm).not.toBeNull();
        });

        it('should not be null', () => {
            borrowerForm.subscribe((changes) => {
                console.log('something happened.')
                changes.forEach(change => {
                    console.log(``)
                })
            });

            //borrowerForm.setValue("");
        });

    })

});