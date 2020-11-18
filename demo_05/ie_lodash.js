import _ from "lodash";

let output = JSON.stringify(_.fill(new Array(10), "_"));

alert(`
    code: _.fill(new Array(10), "_")
    output: ${output}
`);
