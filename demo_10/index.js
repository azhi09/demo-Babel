const parse = require("@babel/parser").parse;
const parseE = require("@babel/parser").parseExpression;
const template = require("@babel/template").default;

let code = `{name: 'name', value: 'value'}`;

// let t = template(code);
// console.log(t());

// console.log(`=====parse======`);
// console.log(parse(code));
console.log(`===== template ======`);
console.log(template.smart(code)());
console.log(`===== template ======`);
console.log(parseE(code));

// output(有删减):
// =====parse======
// Node {
//   type: 'File',
//   program: Node {
//     type: 'Program',
//     sourceType: 'script',
//     body: [ [Node] ],
//   },
// }
// =====template======
// {
//   type: 'VariableDeclaration',
//   kind: 'let',
//   declarations: [
//     {
//       type: 'VariableDeclarator',
//       id: [Object],
//       init: [Object],
//     }
//   ]
// }

