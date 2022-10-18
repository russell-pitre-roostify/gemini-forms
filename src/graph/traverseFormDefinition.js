class Node {
    constructor(value = null) {
        this.value = value;
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

}

export default function walk(sourceNode, targetNode = new Node()) {

    if (!sourceNode) {
        return targetNode;
    }

    Object.keys(sourceNode).forEach(key => {
        const newNode = new Node()

        targetNode.append(key, newNode);

        if (sourceNode[key].controls) {
            return walk(sourceNode[key].controls, newNode);
        }
    })

    return targetNode;
}
