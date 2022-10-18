import FormulaRunner from './formula-runner/FormulaRunner.js';
import _ from 'lodash';
import sampleFormDefinition from './json/sample-form.json';
import makeDataTree from "./tree/makeDataTree.js";
import updateVisibility from "./tree/updateVisibility.js";
import updateCalculatedValues from "./tree/updateCalculatedValues.js";

//
// Sample form data
//
const formData = {
    "personal_information": {
        "analytics_personal_information": "some-analytics-key-data",
        "heading_personal_info": "Personal Information",
        "container_borrower_name": {
            "first_name": "Russell",
            "last_name": "Pitre",
            "has_alternate_name": true,
            "alternate_first_name": "Russ",
            "alternate_last_name": "Petrie",
        },
        "addresses": [
            {
                "street_address_1": "123 Petty Lane",
                "street_address_2": "",
                "container_city_state_zip": {
                    "city": "Hollywood",
                    "state": "CA",
                    "zip": "054323-1234"
                }
            },
            {
                "street_address_1": "456 Axel Circle",
                "street_address_2": "",
                "container_city_state_zip": {
                    "city": "Venice Beach",
                    "state": "CA",
                    "zip": "05843-5678"
                }
            },
        ]
    }
}

describe('formula runner', () => {

    it('Simple example', () => {

        const runner = new FormulaRunner();

        const result = runner.run("val('hello world')");

        expect(result.value).toBe("hello world")
    });

    it('Example with tag template literals', () => {

        const runner = new FormulaRunner({
            templateParser: (coordinate) => {
                if (coordinate === 'CONTROL_ONE') {
                    return 100
                }
                if (coordinate === 'CONTROL_TWO') {
                    return 200
                }

                return null;
            }
        });

        const result = runner.run("val(`CONTROL_ONE`) + val(`CONTROL_TWO`)");

        expect(result.value).toBe(300)

    })

    it('Form data with tag template literals', () => {

        const runner = new FormulaRunner({
            templateParser: (coordinate) => {
                const path = coordinate.replaceAll(":", ".")
                return _.get(formData, path)
            }
        });

        const result = runner.run("length(`personal_information:container_borrower_name:first_name`) + length(`personal_information:container_borrower_name:last_name`)");

        expect(result.value).toBe(12)

    })

    it('Accessing a repeater data ', () => {

        const runner = new FormulaRunner({
            templateParser: (coordinate) => {
                const path = coordinate.replaceAll(":", ".")
                return _.get(formData, path)
            }
        });

        const result = runner.run("val(`personal_information:addresses[1].container_city_state_zip.city`)");

        expect(result.value).toBe("Venice Beach")
    });

    it('Walk data', () => {

        const tree = makeDataTree(sampleFormDefinition);

        tree.childAt("personal_information")
            .childAt("container_borrower_name")
            .childAt("first_name")
            .setValue({value: 'Trey'})

        const runner = new FormulaRunner({
            templateParser: (coordinate = '') => {
                const paths = coordinate.split(":")
                let node = tree;
                paths.forEach(path => {
                    node = node.childAt(path)
                })
                return node.value;
            }
        });

        const result = runner.run("val(`personal_information:container_borrower_name:first_name`)");

        expect(result.value).toBe("Trey")
    });

    it('Update visibility', () => {

        const tree = makeDataTree(sampleFormDefinition);

        tree.childAt("personal_information")
            .childAt("container_borrower_name")
            .childAt("first_name")
            .setValue({value: 'Trey'})

        tree.childAt("personal_information")
            .childAt("container_borrower_name")
            .childAt("last_name")
            .setValue({value: 'Anastasio'})

        updateVisibility(tree);


        const alternateFirstName = tree.childAt("personal_information")
            .childAt("container_borrower_name")
            .childAt("alternate_first_name");

        const alternateLastName = tree.childAt("personal_information")
            .childAt("container_borrower_name")
            .childAt("alternate_last_name")

        expect(alternateFirstName.isVisible).toBe(false)
        expect(alternateLastName.isVisible).toBe(false)
    });

    it('should update hidden address count', () => {

        const tree = makeDataTree(sampleFormDefinition);

        tree.childAt("personal_information")
            .childAt("addresses")
            .pushValue({
                value: {
                    street_address_1: "123 Petty Lane",
                    street_address_2: "Suite 201",
                    container_city_state_zip: {
                        "city": "Hollywood",
                        "state": "CA",
                        "zip": "02069"
                    }
                }
            })

        updateCalculatedValues(tree);
    });

})