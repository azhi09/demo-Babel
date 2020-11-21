const fs = require("fs"),
  path = require("path"),
  resolve = (p = "") => path.resolve(__dirname, `./${p}`);

const parse = require("@babel/parser").parse,
  traverse = require("@babel/traverse").default,
  t = require("@babel/types");

let routerCode = fs.readFileSync(resolve("router.js"), "utf-8");

function isPathExist(code, pathText) {
  // 获取 ast
  let ast = parse(code, { sourceType: "module" }),
    isExist = false;

  const circleQuery = {
    ObjectProperty(path) {
      let { node } = path;

      let isPath = "path" === node.key.name;

      if (isPath) {
        let { value } = node.value,
          isAbsolutePath = "/" === value[0],
          fullPath = value;

        if (!isAbsolutePath) {
          let prevPath = "";
          path.findParent((p) => {
            let { node: pNode } = p;

            let ChildrenPropertyPath =
              pNode.key && "children" === pNode.key.name ? p : undefined;

            if (ChildrenPropertyPath) {
              let { container } = ChildrenPropertyPath;
              container.forEach((n) => {
                if (n.key.name === "path") {
                  prevPath = `${n.value.value}/${prevPath}`;
                }
              });
            }
          });

          fullPath = `${prevPath}${value}`;
        }
        if (
          fullPath === pathText ||
          `/${fullPath}` === pathText ||
          fullPath === `/${pathText}`
        ) {
          isExist = true;
          path.stop();
        }
      }
    },
  };

  // 遍历
  traverse(ast, {
    // 获取输出值
    ExportDefaultDeclaration(path) {
      // 情况 1：输出了一个变量
      // 情况 2：直接直接输出数组
      let { node } = path;
      let { declaration } = node;
      let outputType = t.isIdentifier(declaration) ? 1 : 2;

      if (1 === outputType) {
        let { name } = declaration;

        path.container.forEach((pcItem, idx) => {
          if (
            (t.isVariableDeclaration(pcItem) &&
              pcItem.declarations &&
              pcItem.declarations[0].id.name == name &&
              pcItem.declarations[0].init) ||
            (t.isExpressionStatement(pcItem) &&
              pcItem.expression &&
              pcItem.expression.left.name == name &&
              pcItem.expression.right)
          ) {
            path.getSibling(idx).traverse(circleQuery);
          }
        });
      } else if (2 === outputType) {
        path.traverse(circleQuery);
      }
    },
  });

  return isExist;
}

console.log(`[/page1] isExist: ${isPathExist(routerCode, "/page1")}`);
console.log(
  `[/page1/page11] isExist: ${isPathExist(routerCode, "/page1/page11")}`
);
console.log(`[/page3] isExist: ${isPathExist(routerCode, "/page3")}`);
