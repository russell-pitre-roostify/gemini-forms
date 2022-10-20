import Node from "./Node";

describe('TreeNode', () => {

    it('should construct a root node', () => {
        let root = new Node({key: 'root'});
        expect(root).not.toBeNull();
    })

    it('should traverse all children', () => {

        let count = 0;

        // @ts-ignore
        new Node({key: 'root'})
            .addChild(new Node({key: "one"}))
            .addChild(new Node({key: "two"}))
            .addChild(new Node({key: "three"}))
            .toChild("one")
            .addChild(new Node({key: "one_one"}))
            .addChild(new Node({key: "one_two"}))
            .toParent()
            .toChild("two")
            .addChild(new Node({key: "two_one"}))
            .addChild(new Node({key: "two_two"}))
            .toParent()
            .traverse(() => {
                count++
            })

        expect(count).toBe(7);
    })

})