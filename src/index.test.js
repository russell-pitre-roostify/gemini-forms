import FormulaRunner from './formula-runner/FormulaRunner.js';
import _ from 'lodash';
import formDefinition from './json/sample.json';
import walk from "./graph/traverseFormDefinition.js";
import sampleForm from "./graph/sample-form.json";

// this is sample form data that models the sample.json form definition.
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
                const path = coordinate.replaceAll(":",".")
                return _.get(formData, path)
            }
        });

        const result = runner.run("length(`personal_information:container_borrower_name:first_name`) + length(`personal_information:container_borrower_name:last_name`)");

        expect(result.value).toBe(12)

    })

    it('Accessing a repeater data ', () => {

        const runner = new FormulaRunner({
            templateParser: (coordinate) => {
                const path = coordinate.replaceAll(":",".")
                return _.get(formData, path)
            }
        });

        const result = runner.run("val(`personal_information:addresses[1].container_city_state_zip.city`)");

        expect(result.value).toBe("Venice Beach")
    });

    it('Walk data', () => {
        const form = walk(formDefinition.sections);


        navigate(form)
            .to('container_borrower_name')
            .to('first_name')
            .set('Russell')

        console.log(form);
    });

})