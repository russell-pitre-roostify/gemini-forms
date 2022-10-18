import ESPrima from 'esprima';
import defaultFunctions from './functions/index.js';
import { iterateFunction } from './functions/util.js';

const doMathOperator = (left, right, fn) => iterateFunction(
  [left, right, fn],
  (l, r, fnc) => fnc(l, r)
);

const doUnaryOperator = (argument, fn) => iterateFunction(
  [argument, fn],
  (arg, fnc) => fnc(arg)
);

export default class FormulaRunner {

  /**
   * Constructor.
   *
   * @param {Object} options Options for this runner instance
   * @param {Object} options.functions Custom functions available as globals to the formula.
   * @param {function} options.templateParser Function which is called to process the contents of
   *   content strings (if not provided they are treated normally)
   */
  constructor(options = {}) {
    this.functions = options.functions || Object.assign({}, defaultFunctions);
    this.templateParser = options.templateParser;
  }

  /**
   * @typedef {object} FormulaResults
   * @property [value] {*} Result of formula (missing if errors occurred)
   * @property [error] {Error[]} Errors during evaluation (missing if no errors occurred)
   */
  /**
   * Run the provided formula with the provided functions
   * @param {string} [formula] Formula to run, will repeat previous run if not provided
   * @param {*} [runContext] Pass-through An object of any kind that will to the template parser.
   * @returns {FormulaResults} Results or errors from running the formula
   */
  run(formula, runContext) {

    const result = {};
    let formulaChanged = false;

    // Load formula or run previous one (will clear parse tree if this is a change)
    if (!this.formula || formula !== this.formula) {
      this.formula = formula;
      formulaChanged = true;
    }

    if (!this.runContext || runContext !== this.runContext) {
      this.runContext = runContext;
    }

    try {
      // Parse tree if not already parsed
      if (!this._tree || formulaChanged) {
        this._tree = ESPrima.parse(this.formula, {
          tolerant: true
        });
      }

      // Run formula on successful parse
      if (this._tree.errors.length === 0) {
        result.value = this._visit(this._tree.body[0]);
      } else {
        // Add errors on unsuccessful parse
        result.errors = this._tree.errors;
      }
    } catch (err) {
      // Add errors on unsuccessful run
      result.errors = (result.errors || []).concat([err]);
    }
    return result;
  }

  _visit(node, identifierIsKey) {
    switch (node.type) {
      case 'ExpressionStatement':
        return this._visit(node.expression);

      case 'Compound':
        // Array or comma separated args
        return node.nodes.forEach(compoundNode => this._visit(compoundNode), this);

      case 'Identifier':

        // Return string key
        if (identifierIsKey) {
          return node.name;
        }

        // Use identifier against faked global context
        if (!this.functions[node.name]) {
          throw new Error(`Unknown keyword "${node.name}"`);
        }

        return this.functions[node.name];

      case 'ObjectExpression':
        const obj = {};
        node.properties.forEach((property) => {
          obj[this._visit(property.key, true)] = this._visit(property.value);
        }, this);
        return obj;

      case 'MemberExpression':
        return this._parseMemberExpression(node);

      case 'TemplateLiteral':
        return this._parseTemplateLiteral(node);

      case 'Literal':
        return node.value;

      case 'CallExpression':
        return this._visit(node.callee)(...node.arguments.map(arg => this._visit(arg), this));

      case 'UnaryExpression':
        return this._runUnaryOperator(node.operator, this._visit(node.argument));

      case 'LogicalExpression':
      case 'BinaryExpression':
        return this._runBinaryOperator(
          node.operator,
          this._visit(node.left),
          this._visit(node.right)
        );

      case 'ConditionalExpression':
        return this._visit(node.test) ? this._visit(node.consequent) : this._visit(node.alternate);

      case 'ArrayExpression':
        return node.elements.map(arrayNode => this._visit(arrayNode), this);

      default:
        throw new Error(`Un-allowed expression of type "${node.type}" found`);
    }
  }

  _parseMemberExpression(node) {
    const memberObject = this._visit(node.object);
    let result = memberObject;
    const key = this._visit(node.property, true);

    return iterateFunction([memberObject], (value) => {
      result = value ? value[key] : undefined;
      if (typeof result === 'function') {
        throw new Error('forbidden function access in formula-runner');
      }
      return result;
    });
  }

  _parseTemplateLiteral(node) {
    if (this.templateParser) {
      return this._customParseTemplateLiteral(node);
    }

    let str = '';
    for (let i = 0; i < node.quasis.length; i++) {
      str += node.quasis[i].value.cooked;
      if (node.expressions[i]) {
        str += this._visit(node.expressions[i]);
      }
    }
    return str;
  }

  _customParseTemplateLiteral(node) {
    const results = [];
    for (let i = 0; i < node.quasis.length; i++) {
      results.push(node.quasis[i].value.cooked);
      if (node.expressions[i]) {
        results.push(this._visit(node.expressions[i]));
      }
    }

    // Simple format for template strings allowed to have a single string within them
    if (node.expressions.length === 0) {
      return this.templateParser(results[0], this.runContext);
    } // Complex custom parsing
    return this.templateParser(results, this.runContext);
  }

  _runBinaryOperator(operator, left, right) {
    switch (operator) {
      case '+':
        return doMathOperator(left, right, (l, r) => l + r);
      case '-':
        return doMathOperator(left, right, (l, r) => l - r);
      case '*':
        return doMathOperator(left, right, (l, r) => l * r);
      case '/':
        return doMathOperator(left, right, (l, r) => l / r);
      case '**':
        return doMathOperator(left, right, (l, r) => Math.pow(l, r));
      case '&&':
        return doMathOperator(left, right, (l, r) => !!(l && r));
      case '||':
        return doMathOperator(left, right, (l, r) => !!(l || r));
      case '!=':
      case '<>':
      case '!==':
        return doMathOperator(left, right, (l, r) => l !== r);
      case '<=':
        return doMathOperator(left, right, (l, r) => l <= r);
      case '>=':
        return doMathOperator(left, right, (l, r) => l >= r);
      case '==':
      case '===':
        return doMathOperator(left, right, (l, r) => l === r);
      case '<':
        return doMathOperator(left, right, (l, r) => l < r);
      case '>':
        return doMathOperator(left, right, (l, r) => l > r);
      default:
        throw new Error(`Unsupported Binary Operator: ${operator}`);
    }
  }

  _runUnaryOperator(operator, argument) {
    switch (operator) {
      case '-':
        return doUnaryOperator(argument, arg => -arg);
      case '!':
        return doUnaryOperator(argument, arg => !arg);
      default:
        throw new Error(`Unsupported Unary Operator: ${operator}`);
    }
  }
}
