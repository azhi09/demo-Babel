const parse = require("@babel/parser").parse;
const pE = require("@babel/parser").parseExpression;

let code = `let a = 1, b = 2; const add = (x, y) => x + y; console.log(add(a, b));`,
  pECode = `let a`;
//   pECode = `a = {name: 'name', value: 'value'}`;

console.log(`======== parse ========`);
console.log(parse(code));
console.log(`======== parse end ========`);
console.log(`======== parseExpression ========`);
console.log(pE(pECode));
// console.log(parse(pECode));
console.log(`======== parseExpression end ========`);


    // ======== parse ========
    // Node {
    //   type: 'File',
    //   program: Node {
    //     type: 'Program',
    //     body: [ [Node], [Node], [Node] ],
    //   },
    // }
    // ======== parse end ========
    // ======== parseExpression ========
    // Node {
    //   type: 'ObjectExpression',
    //   properties: [
    //     Node {
    //       type: 'ObjectProperty',
    //       key: [Node],
    //       value: [Node]
    //     },
    //     Node {
    //       type: 'ObjectProperty',
    //       key: [Node],
    //       value: [Node]
    //     }
    // }
    // ======== parseExpression end ========