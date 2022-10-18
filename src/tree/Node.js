import {isArray} from "lodash";
import walk from "./walk.js";

class Node {
    constructor({key = null, parent = null, control = null, value = null}) {
        this.value = value;
        this.key = key;
        this.parent = parent;
        this.control = control;

        this.isVisible = true;
        this.isRequired = false;
        this.controls = null;
    }

    append(key, node) {
        if (!this.controls) {
            this.controls = {};
        }
        this.controls[key] = node;
    }

    firstChild() {
        if (this.controls) {
            return this.controls[Object.keys(this.controls)[0]];
        }
        return null;
    }

    childAt(nodeKey) {
        if (this.controls) {
            const found = this.controls[nodeKey]
            if (found) {
                return found;
            }
        }
        return null;
    }

    setValue({value, index = null}) {
        if (this.control.type === 'repeater') {
            throw new Error(`This control is a repeater, you must use of the array-based accessors.`);
        }
        this.value = value;
        return this;
    }

    pushValue({value}) {
        if (this.control.type !== 'repeater') {
            throw new Error(`This control is NOT a repeater, you can only push values onto a repeater control.`);
        }

        if (!isArray(this.value)) {
            this.value = [];
        }

        let paths = [];

        walk(this.controls, node => {
            if (node.type === 'container') {
                paths.push(node.key)
            } else {
                paths = [node.key]
            }
        })

        console.log('this.controls', this.controls);
    }

    setVisible(visible) {
        this.isVisible = visible;
        return this;
    }

}

export default Node;
