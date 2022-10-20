import {ControlType, FormDefinition} from "@roostify/gemini-forms-schema";
import parseFormDefinition from "./parseFormDefinition";

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
                    options: {
                        level: 2
                    }
                },
            }
        }
    },
}


describe('parseFormDefinition', () => {

    describe('when parsing form definition', () => {

        it('should contain all nodes with correct keys', () => {
            let testKey = '';
            parseFormDefinition(formDefinition).traverse(node => testKey += node.key);
            expect(testKey).toBe("sectionanalyticsheading");
        });

    })

});