const parse = require('@babel/parser').parse;
const generate  = require('@babel/generator').default;

let code = `let a = 1, b = 2; const add = (x, y) => x + y; console.log(add(a, b));`;

let ast = parse(code);

console.log(generate(ast))