import TreeNode from "./TreeNode.js";

describe('TreeNode', () => {

    describe('when "constructor" called', () => {

        it('should construct new node with "key" set to "root"', () => {
            const root = new TreeNode({});
            expect(root.key).toBe("root");
        })

    });

    describe('when "addChild" called', () => {

        it('should return TreeNode instance when "addChild" called', () => {
            const root = new TreeNode();
            const child = root.addChild({key: 'child_one'});
            expect(child instanceof TreeNode).toBeTruthy();
            expect(child.key).toBe("child_one");
        });

        it('should set "key" property on new child node', () => {
            const root = new TreeNode();
            const child = root.addChild({key: 'child_one'});
            expect(child.key).toBe("child_one");
        });

        it('should be able to call "addChild" repeatedly', () => {
            const node = new TreeNode()
                .addChild({key: "one"})
                .addChild({key: 'two'});
            expect(node.key).toBe("two");
        });

        it('should set "parent" property', () => {
            const node = new TreeNode()
                .addChild({key: "one"})
                .addChild({key: 'two'});

            expect(node.parent.key === "one");
        });

    });

    describe('when "updateValue" called', () => {

        it('should hold value state', () => {
            const node = new TreeNode()
                .updateValue("some value")

            expect(node.value === "some value");
        })

    })



});