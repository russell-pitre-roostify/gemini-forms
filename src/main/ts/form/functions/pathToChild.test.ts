import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import parseFormDefinition from "./parseFormDefinition";
import pathToChild from "./pathToChild";

const formDefinition: FormDefinition = {
    name: "A Form",
    description: "A sample form",
    sections: {
        "section": {
            type: ControlType.Section,
            group: "Borrower",
            title: "Default Borrower Form",
            controls: {
                "heading": {
                    type: ControlType.Heading,
                    options: {
                        level: 2
                    }
                },
                "container_name": {
                    type: ControlType.Container,
                    controls: {
                        "first_name": {
                            type: ControlType.Text,
                            options: {
                                maxLength: 100
                            }
                        }
                    }
                }
            }
        }
    },
}

describe('pathToChild', () => {

    describe('when executed', () => {

        it('should return the correct path to child node from root node', () => {

            const form = parseFormDefinition(formDefinition);

            const child = form.toChild("section:container_name:first_name");

            expect(pathToChild(child)).toBe("section:container_name:first_name")

        });

    })

});
