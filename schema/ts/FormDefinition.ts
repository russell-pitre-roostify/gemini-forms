import {DataSources} from "./defs/data-sources/DataSources";
import {Sections} from "./defs/sections/Sections";
import {Version} from "./defs/version/Version";

export interface FormDefinition {
    /**
     * Name of the form.
     */
    name: string;
    /**
     * Describes the purpose of the form.
     */
    description?: string;
    /**
     * Account ID associated with the form.
     */
    accountId?: string;
    /**
     * Form version information.
     */
    version?: Version
    /**
     * A datasource provides data to form controls for rendering, such as a list of US States for
     * a select control. A datasource can include a "data" property consisting of a static array
     * of data elements, or can be a "remote" data source having an "options" property containing
     * details of how to make remote calls.
     */
    dataSources?: DataSources
    /**
     * Form sections
     */
    sections: Sections
}