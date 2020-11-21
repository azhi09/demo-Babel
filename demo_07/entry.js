var transform = require("@babel/core").transform;

var code =`
		require('core-js');
		require('regenerator-runtime/runtime');
		let a = (args) => console.log(args);
		new Promise();
`;

transform(
  code,
  {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "chrome 30",
          useBuiltIns: 'entry',
          corejs: 3
        },
      ],
    ],
  },
  function (err, result) {
    console.log(result.code);
  }
);
