import Node from "./Node.js";

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

const toControl = node => {
    const {controls, ...rest} = node;
    return {...rest};
}

const makeChildNode = ({key, parent}) => {
    const control = toControl(parent[key]);
    return new Node({key, control, parent});
}

const makeDataTree = formDefinition => {
    return genTree(formDefinition.sections);
}

export default makeDataTree;