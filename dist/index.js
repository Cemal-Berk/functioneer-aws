var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  getLambdaHandler: () => getLambdaHandler
});
module.exports = __toCommonJS(lib_exports);

// lib/functioneer-aws.ts
function getLambdaHandler(runner, dataSource, functionName) {
  if (functionName) {
    if (dataSource === "BODY") {
      return async (event) => {
        try {
          const result = await runner.runObj({
            ...JSON.parse(event.body),
            functionName
          });
          if (result["success"] === void 0) {
            return {
              statusCode: 200,
              body: result
            };
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result)
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result)
            };
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };
        }
      };
    } else if (dataSource === "PARAMS") {
      return async (event) => {
        try {
          const result = await runner.runObj({
            ...event.pathParameters,
            functionName
          });
          if (result["success"] === void 0) {
            return {
              statusCode: 200,
              body: result
            };
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result)
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result)
            };
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };
        }
      };
    } else {
      return async (event) => {
        try {
          const result = await runner.runObj({
            ...event.queryStringParameters,
            functionName
          });
          if (result["success"] === void 0) {
            return {
              statusCode: 200,
              body: result
            };
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result)
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result)
            };
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };
        }
      };
    }
  } else {
    if (dataSource === "BODY") {
      return async (event) => {
        try {
          if (JSON.parse(event.body)["functionName"] === void 0) {
            throw "functionName is required in body";
          }
          const result = await runner.runObj({
            ...JSON.parse(event.body)
          });
          if (result["success"] === void 0) {
            return {
              statusCode: 200,
              body: result
            };
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result)
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result)
            };
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };
        }
      };
    } else if (dataSource === "PARAMS") {
      return async (event) => {
        try {
          if (event.pathParameters["functionName"] === void 0) {
            throw "functionName is required in pathParameters";
          }
          const result = await runner.runObj({
            ...event.pathParameters,
            functionName: event.pathParameters["functionName"]
          });
          if (result["success"] === void 0) {
            return {
              statusCode: 200,
              body: result
            };
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result)
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result)
            };
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };
        }
      };
    } else {
      return async (event) => {
        try {
          if (event.queryStringParameters["functionName"] === void 0) {
            throw "functionName is required in queryStringParameters";
          }
          const result = await runner.runObj({
            ...event.queryStringParameters,
            functionName: event.queryStringParameters["functionName"]
          });
          if (result["success"] === void 0) {
            return {
              statusCode: 200,
              body: result
            };
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result)
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result)
            };
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };
        }
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLambdaHandler
});
//# sourceMappingURL=index.js.map