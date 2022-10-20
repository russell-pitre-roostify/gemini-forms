function* traverse(o, path = []) {
    for (let i of Object.keys(o)) {
        const itemPath = path.concat(i);
        yield [i, o[i], itemPath, o];
        if (o[i] !== null && typeof (o[i]) == "object") {
            yield* traverse(o[i], itemPath);
        }
    }
}

class TreeNode {

    constructor(
        {
            key = null,
            parent = null,
        } = {}
    ) {
        this._key = key || 'root';
        this._parent = parent;
        this._children = null;
        this._state = {}; // holds state-related data: value, isVisible, isRequired, etc.
        this._control = null; // holds the control at this node.
    }

    get key() {
        return this._key;
    }

    get parent() {
        return this._parent;
    }

    get value() {
        return this._state.value;
    }

    updateValue(value) {
        this._state.value = value;
        return this;
    }

    get control() {
        return this._control;
    }

    set control(control) {
        this._control = control;
    }

    hasChildren() {
        if (!this._children) {
            return false;
        }
        return Object.keys(this._children)?.length > 0
    }

    addChild({key}) {
        const treeNode = new TreeNode({key, parent: this});

        if (!this.hasChildren()) {
            this._children = {};
        }

        this._children[key] = treeNode;

        return treeNode;
    }


}

export default TreeNode;
