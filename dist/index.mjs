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
export {
  getLambdaHandler
};
//# sourceMappingURL=index.mjs.map