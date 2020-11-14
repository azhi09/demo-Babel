var transform = require("@babel/core").transform

var code = "let a = (args) => console.log(args, `${args}`);"

transform(
  code,
  {
    plugins: ["@babel/plugin-transform-arrow-functions"],
  },
  function (err, result) {
    if (err) {
      throw err
    }

    console.log(result.code)
  }
)
