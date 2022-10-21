import Node from "../Node";

export type WalkToRootCallbackFunction = (node: Node) => void

export default (node: Node | undefined, fn: WalkToRootCallbackFunction) => {

    if (!node) {
        return;
    }

    let currentNode: Node | undefined = node;

    while (currentNode !== undefined) {
        fn(currentNode);
        currentNode = currentNode.getParent()
    }

}