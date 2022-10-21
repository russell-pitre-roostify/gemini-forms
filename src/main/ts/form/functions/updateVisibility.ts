import Node, {NodeStateChange, StateChange_IsVisible} from "../Node";
import FormulaRunner from "../../../js/formula-runner/FormulaRunner";
import pathToChild from "./pathToChild";

export default (root: Node, runner: FormulaRunner) => {

    const changes: NodeStateChange[] = [];

    root.traverse(node => {
        if (node.control) {

            // @ts-ignore
            const {formulaIsVisible} = node.control;

            if (formulaIsVisible) {
                const result = runner.run(formulaIsVisible);

                // @ts-ignore
                if (result.errors) {
                    // @ts-ignore
                    const e = result.errors.join("; ")
                    throw new Error(e);
                }

                const previousValue = node.getState().isVisible;

                if (previousValue !== result.value) {
                    node.setVisible(result.value);

                    changes.push({
                        type: StateChange_IsVisible,
                        path: pathToChild(node),
                        key: node.key,
                        value: result.value,
                        previousValue: previousValue
                    })
                }
            }


        }
    });

    return changes;
}