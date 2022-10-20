import Node from "../Node";

export type NodeCallbackFunction = (node: Node) => void

const walk = (children: Map<string, Node>, fn: NodeCallbackFunction) => {

    if (!children) {
        return;
    }

    children.forEach((node, key) => {
        fn(node)
        if (node.getChildren()) {
            return walk(node.getChildren(), fn);
        }
    })
}

export default walk;