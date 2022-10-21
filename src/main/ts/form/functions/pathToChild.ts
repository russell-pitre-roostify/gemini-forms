import walkToRoot from "./walkToRoot";
import Node from "../Node";


export default (node: Node | undefined): string | undefined => {

    if (!node) {
        return undefined;
    }

    const parts: string[] = [];

    walkToRoot(node, (n) => {
        parts.push(n.key);
    })

    // The last element is the "root" node, pop it because we don't need to include it in the final
    // generated path.
    parts.pop();

    return parts.reverse().join(":")
}