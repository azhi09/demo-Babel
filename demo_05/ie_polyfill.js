import "@babel/polyfill";
// require("@babel/polyfill");

let output = JSON.stringify(new Array(10).fill("_"));

alert(`
    code: new Array(10).fill("_")
    output: ${output}
`);
