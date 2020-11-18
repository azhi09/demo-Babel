var transform = require("@babel/core").transform;

var code = "let a = (args) => console.log(args, `${args}`);";

// 写在插件的参数中
transform(
  code,
  {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "chrome 30, ie 9",
        },
      ],
    ],
  },
  function (err, result) {
    console.log(result.code);
  }
);
