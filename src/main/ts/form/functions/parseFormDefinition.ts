import Node from "../Node";
import {Control, Controls, FormDefinition, Sections} from "@roostify/gemini-forms-schema";

/**
 * Generates a tree data structure matching the same shape as the form definition. Each node in the
 * tree has a control instance and state (value, isVisibility, etc).
 *
 * @param formDefinition
 */
export default (formDefinition: FormDefinition) => {
    return genTree(formDefinition.sections);
}

const genTree = (controls: Sections | Controls, node = new Node({key: "root"})) => {

    if (!controls) {
        return node;
    }

    Object.keys(controls).forEach(key => {

        const currentNode = controls[key] as Control;

        const childNode = new Node({
                key,
                parent: node,
                control: toControl(currentNode)
            }
        );

        node.addChild(childNode);

        if (currentNode.controls) {
            return genTree(currentNode.controls, childNode)
        }
    });

    return node;
}

const toControl = (node: Control): Control => {
    const {controls, ...rest} = node;
    return {...rest} as Control;
}