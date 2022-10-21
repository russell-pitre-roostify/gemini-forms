import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import parseFormDefinition from "./parseFormDefinition";
import walkToRoot from "./walkToRoot";
import Node, {PathSeparator} from "../Node";

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
                    formulaCalculatedValue: "'Hello, ' + `section:first_name` + ' ' + `section:last_name`",
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

describe('walkToRoot', () => {

    describe('when executed', () => {

        it('should return the correct path to root node', () => {

            const form = parseFormDefinition(formDefinition);

            const startAtNode: Node | undefined = form.toChild("section:container_name:first_name");

            let keys: string[] = [];

            walkToRoot(startAtNode, (node: Node) => {
                keys.push(node.key)
            })

            expect(keys.reverse().join(PathSeparator)).toBe("root:section:container_name:first_name")

        });

    })

});
