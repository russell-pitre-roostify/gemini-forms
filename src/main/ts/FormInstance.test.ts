import FormInstance from "./FormInstance";
import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import {NodeStateChange, StateChange_CalculatedValue} from "./form/Node";

const borrowerFormDefinition: FormDefinition = {
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

describe('FormInstance', () => {

    describe('constructor', () => {

        let borrowerForm: FormInstance;

        beforeEach(() => {
            borrowerForm = new FormInstance(borrowerFormDefinition)
        })

        it('should not be null', () => {
            expect(borrowerForm).not.toBeNull();
        });

        it('should received batch changes', () => {

            const mockChangeCallback = jest.fn((change: NodeStateChange) => {
            })

            const mockCallback = jest.fn((changes: NodeStateChange[]) => {
                changes.forEach(change => {
                    mockChangeCallback(change);
                })
            })

            borrowerForm.subscribe(mockCallback);

            borrowerForm.batchSetValues([
                {path: "section:first_name", value: "Tom"},
                {path: "section:last_name", value: "Petty"},
            ])

            expect(mockCallback).toHaveBeenCalledTimes(1)
            expect(mockChangeCallback).toHaveBeenCalledWith({
                type: StateChange_CalculatedValue,
                path: "section:heading",
                key: "heading",
                previousValue: null,
                value: "Hello, Tom Petty"
            })
        });

    })

});