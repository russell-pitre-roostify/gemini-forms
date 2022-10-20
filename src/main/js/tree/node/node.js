import {isString} from "lodash";

const defaultArgs = {
    key: 'root'
}

const node = ({key = "root", parent} = defaultArgs) => {

    if (!isString(key)) {
        throw new Error('Cannot create a node without a "key".');
    }

    const _internal = {
        key: key,
        parent: parent,
        children: new Map()
    };

    const _state = {
        value: null,
        isVisible: true,
        isRequired: false
    }

    const hasChild = (key) => {
        return _internal.children.has(key);
    }

    const getChild = (key) => {
        return _internal.children.get(key);
    }

    const updateValue = (node, value) => {
        if (node.value !== value) {
            node.value = value;
        }
    }

    const out = {

        withChild: function ({key}) {
            _internal.children.set(key, node({key, parent: this}));
            return this;
        },

        withValue: function (value) {
            _state.value = value;
            return this;
        },

        to: function (key) {

            if (hasChild(key)) {
                return getChild(key);
            }

            throw new Error(`No child with key "${key}" exists.`);
        },

    };

    Object.defineProperty(out, 'key', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: _internal.key,
    });

    Object.defineProperty(out, 'parent', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: _internal.parent,
    });

    Object.defineProperty(out, 'value', {
        enumerable: false,
        configurable: false,
        get: function () {
            return _state.value;
        },
        set: function (v) {
            _state.value = v;
        }
    });

    return out;
}

export default node;