import path from "./path";

describe('path', () => {

    describe('when executed', () => {

        it('should return the correct path', () => {
            const p = path(['section', 'container_name', 'first_name']);
            expect(p).toBe("section:container_name:first_name")
        });

    })

});
