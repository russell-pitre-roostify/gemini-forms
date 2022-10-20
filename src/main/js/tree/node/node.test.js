import node from "./node.js";

describe('node', () => {

    describe('when "constructor" called', () => {

        it('should construct new node with "key" set to "root"', () => {
            const root = node({key: "root"});
            expect(root.key).toBe("root");
        })

    });

    describe('when "addChild" called', () => {

        it('should return TreeNode instance when "addChild" called', () => {
            const child = node()
                .withChild({key: 'child_one'})
                .withChild({key: 'child_two'})
                .withChild({key: 'child_three'})
                .to('child_one');

            expect(child.key).toBe("child_one");
        });

        it('should set "key" property on new child node', () => {
            const child = node()
                .withChild({key: 'child_one'})
                .to('child_one')
                .withValue('some value');

            expect(child.key).toBe("child_one");
            expect(child.value).toBe("some value");
        });

        it('should be able to call "addChild" repeatedly', () => {
            const n = node()
                .withChild({key: "one"})
                .withChild({key: 'two'})
                .to("two")
            expect(n.key).toBe("two");
        });

        it('should set "parent" property', () => {
            const n = node()
                .withChild({key: "one"})
                .withChild({key: 'two'})
                .to('one')
                .withChild({key: "one_child"});

            expect(n.parent.key === "one");
        });

    });

    describe('when "value" called', () => {

        it('should hold value state', () => {
            const n = node().withValue("some value");

            expect(n.value === "some value");
        })

    })
});