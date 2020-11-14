var transform = require("@babel/core").transform

var code = "let a = (args) => console.log(args, `${args}`);"

transform(
  code,
  {
    presets: ["@babel/preset-env"],
  },
  function (err, result) {
    console.log(result.code)
  }
)
