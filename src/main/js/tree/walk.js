
const walk = (parent, fn) => {

    if (!parent) {
        return;
    }

    Object.keys(parent).forEach(key => {
        const node = parent[key];

        fn(node)

        if (node.controls) {
            return walk(node.controls, fn);
        }
    });
}

export default walk;