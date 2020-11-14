var transform = require("@babel/core").transform;

var code = "let a = (args) => console.log(args, `${args}`);";

transform(
  code,
  {
    plugins: [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-template-literals",
      "@babel/plugin-transform-block-scoping"
    ],
  },
  function (err, result) {
    console.log(result.code);
  }
);
