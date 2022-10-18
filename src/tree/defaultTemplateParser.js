
const defaultTemplateParser = root => template => {
    const paths = template.split(":")
    let node = root;
    paths.forEach(path => {
        node = node.childAt(path)
    })
    return node.value;
}

export default defaultTemplateParser;
