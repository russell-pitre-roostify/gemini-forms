import Node from "./Node.js";


const createFormTree = formDefinition => {
    return genTree(formDefinition.sections);
}

export default createFormTree;


/**
 * Generates a tree data structure matching the same shape as the form definition. Each node in the
 * tree has a control instance and state (value, isVisibility, etc).
 * @param parent
 * @param node
 * @returns {Node}
 */
const genTree = (parent, node = new Node({key: "root"})) => {

    if (!parent) {
        return node;
    }

    Object.keys(parent).forEach(key => {

        const childNode = makeChildNode({key, parent});

        node.append(key, childNode);

        if (parent[key].controls) {
            return genTree(parent[key].controls, childNode);
        }
    })

    return node;
}

const makeChildNode = ({key, parent}) => {
    const control = toControl(parent[key]);
    return new Node({key, control, parent});
}

const toControl = node => {
    const {controls, ...rest} = node;
    return {...rest};
}
