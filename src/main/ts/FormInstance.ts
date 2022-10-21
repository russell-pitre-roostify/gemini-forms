import FormulaRunner, {defaultFunctions} from "../js/formula-runner/FormulaRunner";
import parseFormDefinition from "./form/functions/parseFormDefinition";
import Node, {NodeStateChange} from "./form/Node";
import {FormDefinition} from "@roostify/gemini-forms-schema";
import defaultTemplateParser from "./form/functions/defaultTemplateParser";
import updateCalculatedValues from "./form/functions/updateCalculatedValues";
import updateVisibility from "./form/functions/updateVisibility";

export type SubscriberFunction = (changes: NodeStateChange[]) => void

export type BatchOperationSetValue = {
    /**
     * Path to node.
     */
    path: string
    /**
     * New node value.
     */
    value: unknown
}

/**
 * Represents a new instance of a form derived from a FormDefinition.
 */
export default class FormInstance {

    private readonly root: Node;
    private readonly formulaRunner: FormulaRunner;

    private subscriberFunction: SubscriberFunction | undefined;

    constructor(definition: FormDefinition) {
        this.root = parseFormDefinition(definition);
        this.formulaRunner = new FormulaRunner({
            functions: defaultFunctions,
            templateParser: defaultTemplateParser(this.root)
        });
        this.initState();
    }

    private initState(): void {
        updateCalculatedValues(this.root, this.formulaRunner);
        updateVisibility(this.root, this.formulaRunner);
    }

    batchSetValues(values: BatchOperationSetValue[]) {
        values.forEach(operation => {
            this.root.toChild(operation.path)?.setValue(operation.value);
        })
        const changes = updateCalculatedValues(this.root, this.formulaRunner);
        this.callSubscriberFunction(changes);
    }

    setValue(path: string, value: any) {
        this.root.toChild(path)?.setValue(value);
        const changes = updateCalculatedValues(this.root, this.formulaRunner);
        this.callSubscriberFunction(changes);
    }

    subscribe(fn: SubscriberFunction): void {
        this.subscriberFunction = fn;
    }

    private callSubscriberFunction(changes: NodeStateChange[]) {
        if (this.subscriberFunction) {
            this.subscriberFunction(changes);
        }
    }
}


