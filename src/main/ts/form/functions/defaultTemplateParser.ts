import Node from "../Node";

const defaultTemplateParser = (root: Node) => (template: string) => {

    const paths = template.split(":")

    let node = root;

    paths.forEach(path => {
        const n = node.toChild(path)
        if (n) {
            node = n;
        }
    })

    return node.getState().value;
}

export default defaultTemplateParser;
