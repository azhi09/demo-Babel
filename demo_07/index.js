var transform = require("@babel/core").transform;

var entryCode = `
		let a = (args) => console.log(args);
		new Promise();
`;

transform(
  entryCode,
  {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "chrome 30",
          useBuiltIns: "entry",
          corejs: 3,
        },
      ],
    ],
  },
  function (err, result) {
    console.log("================= entry output =========================================");
    console.log(result.code);
    console.log("================= entry output end =========================================");
  }
);

var entryPolyfillCode = `
		require('core-js');
        require('regenerator-runtime/runtime');

		let a = (args) => console.log(args);
		new Promise();
`;

transform(
  entryPolyfillCode,
  {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "chrome 30",
          useBuiltIns: "entry",
          corejs: 3,
        },
      ],
    ],
  },
  function (err, result) {
    console.log("================= entry polyfill output =========================================");
    console.log(result.code);
    console.log("================= entry polyfill output end =========================================");
  }
);

var usageCode = `
		let a = (args) => console.log(args);
		new Promise();
`;
transform(
  usageCode,
  {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "chrome 30, ie 9",
          useBuiltIns: "usage",
          corejs: 3,
        },
      ],
    ],
  },
  function (err, result) {
    console.log("================= usage output =========================================");
    console.log(result.code);
    console.log("================= usage output end =========================================");
  }
);
