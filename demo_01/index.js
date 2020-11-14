const transform = require("@babel/core").transform

const code = "let a = (args) => console.log(args, `${args}`);"

transform(code, {}, function (err, result) {
  if (err) {
    throw err
  }

  console.log(result.code)
})
