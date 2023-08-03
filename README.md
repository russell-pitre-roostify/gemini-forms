

## Compiling and validating json schema

```shell
# compile json schema
$ ajv compile -s src/schema/schema.json

# validate json file
$ ajv -s src/schema/schema.json -d src/json/sample-form.json
```

## Converts yml to json

```shell
$ yq -o=json v2_borrower_TD_MortgageIntake_R320.yml > v2_borrower_TD_MortgageIntake_R320.json
```

## Commands to extract component data from schema definition json file

```shell
$ jq '.["$components"] | keys[] as $k | $k' roostify-forms-schema.json | sort | uniq > uniquie-components.csv

$ jq '.["$components"] | keys[] as $k | getpath([$k, "properties"]) | keys[] as $j | $j' roostify-forms-schema.json | sort | uniq | tr "\n" "," > uniquie-props.csv

$ jq '.["$components"] | keys[] as $k | getpath([$k, "properties"]) | keys[] as $j | "\($k), \($j)"' roostify-forms-schema.json > component-properties.txt
```

# Form Schema Design

## Entities

#### Form

- Root form object with details describing the form such as
    - name
    - title
    - account identifier
    - description


#### FormVersion

- Holds data to allow for versioning of forms. Forms need to be versioned so that they can be
  improved upon over time while allowing older versions of the form to still work.
- Basic data elements such as:
    - version number
    - status (ie. Active, Draft)


#### FormDataSource

- Hold the details for how to retrieve the data needed for form controls such as a select list of US
  States.
- A data source can be a:
    - static array of objects
    - remote datasource accessible via HTTP.
    - repeating section


#### FormSection

- Logically groups a collection of form controls as a single section for form entry. Only one
  form section will be presented to the user at a given time.
- Basic data elements such as:
    - title
    - sort order
    - tag (used for referencing from formulas)
    - controls

#### FormContainer

- A container is a user interface construct only..
- Determines layout of children form components
- Uses the flexbox model for layout

#### FormControl

- A single input control (ie. text, number, date) for user to enter data.
- Form control entity holds the meta data that is common to all form control types such as:
    - label
    - hint
    - control definition object
    - tag

#### FormControlDefinition

- A control definition is a collection of options to drive the interaction and rendering behaviour
  of a specific instance of form control.
- A few examples would be:
    - 'maxLength: 100' -> Text field will not allow more 100 characters to entered
    - 'isAllowFutureDate: false' -> Only allow future to be selected
    - 'headingLevel: 2'

-----

Test
