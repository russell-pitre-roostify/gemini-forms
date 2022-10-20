import {AnyControl, Control} from "@roostify/gemini-forms-schema";
import walk, {NodeCallbackFunction} from "./functions/walk";


/**
 * Represents a single node in a tree.
 */
export default class Node {

    readonly key: string;
    readonly control?: AnyControl;

    private parent?: Node;
    private readonly children: Map<string, Node> = new Map<string, Node>();
    private readonly state: NodeState;

    constructor(args: NodeArgs) {
        this.key = args.key
        this.parent = args.parent;
        this.control = args.control;
        this.state = {value: null, isRequired: false, isVisible: true}
    }

    traverse(fn: NodeCallbackFunction) {
        walk(this.getChildren(), fn);
    }

    addChild(node: Node) {
        if (this.children.has(node.key)) {
            throw new Error(`A child node for key [${node.key}] already exists.`);
        }

        node.setParent(this);

        this.children.set(node.key, node);
        return this;
    }

    toParent() {
        return this.parent;
    }

    toChild(path: string): Node | undefined {
        if (path.includes(":")) {
            let node: Node | undefined = this;
            path.split(":").forEach(k => {
                if(node) {
                    node = node?.toChild(k)
                }
            });
            return node;
        }
        return this.children.get(path);
    }

    setParent(parent: Node) {
        this.parent = parent;
        return this;
    }

    setValue(value: unknown) {
        this.state.value = value;
        return this;
    }

    setVisible(visible: boolean) {
        this.state.isVisible = visible;
        return this;
    }

    getChildren(): Map<string, Node> {
        return this.children;
    }

    getState(): NodeState {
        return this.state;
    }

}

interface NodeArgs {
    /**
     * A name used to identify a Node instance.
     */
    key: string;
    /**
     * Parent node.
     */
    parent?: Node;
    /**
     * Children nodes.
     */
    control?: Control;
}

interface NodeState {
    /**
     * The value stored at this node.
     */
    value: unknown;
    /**
     * Is node visible?
     */
    isVisible: boolean;
    /**
     * Is node required
     */
    isRequired: boolean;
}

export interface NodeStateChange {
    /**
     * The previous value before the change occurred.
     */
    previousValue: unknown;
    /**
     * The new value.
     */
    value: unknown;
}
