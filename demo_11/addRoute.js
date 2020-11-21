const parse = require("@babel/parser").parse;
const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");

function addRoute( code,
  { routeName, routePath, routeComponentPath, routeTitle }
) {
  let newRoute = template.expression(`
    {
        name: '${routeName}',
        path: '${routePath}',
        component: () => import('${routeComponentPath}'),
        meta: {title: '${routeTitle}'}
    }
    `);


  let newRouteAST = newRoute();

  let originRouteFileAST = parse(code, { sourceType: "module" });

  // 找到输出的routes
  traverse(originRouteFileAST, {
    // 获取输出值
    ExportDefaultDeclaration(path) {
      // 情况 1：输出了一个变量
      // 情况 2：直接直接输出数组
      let { node, container } = path;
      let { declaration } = node;
      let outputType = t.isIdentifier(declaration) ? 1 : 2;

      if (1 === outputType) {
        let { name } = declaration;

        container.forEach((pcItem, idx) => {
          // 先拿到数组path，然后判断parent的类型
          // 处理: let route = []; export default route;

          if (
            t.isVariableDeclaration(pcItem) &&
            pcItem.declarations &&
            pcItem.declarations[0] &&
            pcItem.declarations[0].id.name == name &&
            pcItem.declarations[0].init
          ) {
            path.getSibling(idx).traverse({
              ArrayExpression(innerPath) {
                if (t.isVariableDeclarator(innerPath.parent)) {
                  innerPath.pushContainer("elements", newRouteAST);
                }
              },
            });
          }

          // 处理: let route; route = []; export default route;
          else if (
            t.isExpressionStatement(pcItem) &&
            pcItem.expression &&
            pcItem.expression.left.name == name &&
            pcItem.expression.right
          ) {
            path.getSibling(idx).traverse({
              ArrayExpression(innerPath) {
                if (t.isAssignmentExpression(innerPath.parent)) {
                  innerPath.pushContainer("elements", newRouteAST);
                }
              },
            });
          }
        });
      } else if (2 === outputType) {
        // 处理: export default [];
        path.traverse({
          ArrayExpression(innerPath) {
            if (t.isExportDefaultDeclaration(innerPath.parent)) {
              innerPath.pushContainer("elements", newRouteAST);
            }
          },
        });
      }
    },
  });

  let output = generator(originRouteFileAST).code;

  return output;
}

let routerCode =  require("fs").readFileSync(require('path').resolve(__dirname, "./router.js"), "utf-8");

let output = addRoute(routerCode, {
  routeName: 'routeName',
  routePath: '/routePath',
  routeChunkName: 'module_author',
  routeComponentPath:'/path/to/file',
  routeTitle: 'routeFile',
});



console.log(output);