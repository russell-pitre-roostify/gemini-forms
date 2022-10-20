import {get, isArray} from "lodash";

function* traverse(o, path = []) {
    for (let i of Object.keys(o)) {
        const itemPath = path.concat(i);
        yield [i, o[i], itemPath, o];
        if (o[i] !== null && typeof (o[i]) == "object") {
            yield* traverse(o[i], itemPath);
        }
    }
}

class Node {

    constructor({key = null, parent = null, control = null, value = null}) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.control = control;
        this.isVisible = true;
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

    setValue({value}) {
        if (this.control.type === 'repeater') {
            throw new Error(`This control is a repeater, use one of the array-based accessors.`);
        }
        this.value = value;
        return this;
    }

    _copyControls() {
        return {...this.controls};
    }

    pushValue({value}) {
        if (this.control.type !== 'repeater') {
            throw new Error(`This control is NOT a repeater, you can only push values onto a repeater control.`);
        }

        if (!isArray(this.value)) {
            this.value = [];
        }

        const currentNode = this;

        // currentNode.key => "addresses"
        // currentNode.value => []
        // currentNode.parent => []
        // currentNode.controls => { street_address_1: Node, street_address_1: Node, container_city_state_zip: Noe }

        currentNode.value.push(currentNode._copyControls())

        const that = currentNode.value[currentNode.value.length - 1];

        for (let [key, val, path, parent] of traverse(value)) {

            const pathCompiled = path.join('.')
            const nextValue = get(value, pathCompiled)

            let nodeToUpdate = that;

            path.forEach(p => {
                nodeToUpdate = nodeToUpdate.childAt(p)
            })

            if (nodeToUpdate.control.type !== 'container') {
                nodeToUpdate.setValue({value: nextValue})
            }

        }

        console.log('hello', currentNode);
    }

    setVisible(visible) {
        this.isVisible = visible;
        return this;
    }
}

export default Node;
