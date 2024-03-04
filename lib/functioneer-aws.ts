import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { Functioneer } from "functioneer";

/**
 * Gets a handler for a lamda function
 * @param runner The function runner
 * @param dataSource Where to get the input data from
 * @param functionName The function name to be executed. If null the function name will be taken from the input data
 * @returns async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> function
 */
export function getLambdaHandler(
  runner: Functioneer,
  dataSource: "BODY" | "PARAMS" | "QUERY",
  functionName?: string
) {
  if (functionName) {
    if (dataSource === "BODY") {
      return async (
        event: APIGatewayProxyEvent
      ): Promise<APIGatewayProxyResult> => {
        try {
          const result = await runner.runObj({
            ...JSON.parse(event.body!),
            functionName,
          });
          if (result["success"] === undefined) {
            return {
              statusCode: 200,
              body: result as string,
            } as APIGatewayProxyResult;
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err,
            }),
          } as APIGatewayProxyResult;
        }
      };
    } else if (dataSource === "PARAMS") {
      return async (
        event: APIGatewayProxyEvent
      ): Promise<APIGatewayProxyResult> => {
        try {
          const result = await runner.runObj({
            ...event.pathParameters!,
            functionName,
          });
          if (result["success"] === undefined) {
            return {
              statusCode: 200,
              body: result as string,
            } as APIGatewayProxyResult;
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err,
            }),
          } as APIGatewayProxyResult;
        }
      };
    } else {
      return async (
        event: APIGatewayProxyEvent
      ): Promise<APIGatewayProxyResult> => {
        try {
          const result = await runner.runObj({
            ...event.queryStringParameters!,
            functionName,
          });
          if (result["success"] === undefined) {
            return {
              statusCode: 200,
              body: result as string,
            } as APIGatewayProxyResult;
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err,
            }),
          } as APIGatewayProxyResult;
        }
      };
    }
  } else {
    if (dataSource === "BODY") {
      return async (
        event: APIGatewayProxyEvent
      ): Promise<APIGatewayProxyResult> => {
        try {
          if (JSON.parse(event.body)["functionName"] === undefined) {
            throw "functionName is required in body";
          }
          const result = await runner.runObj({
            ...JSON.parse(event.body!),
          });
          if (result["success"] === undefined) {
            return {
              statusCode: 200,
              body: result as string,
            } as APIGatewayProxyResult;
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err,
            }),
          } as APIGatewayProxyResult;
        }
      };
    } else if (dataSource === "PARAMS") {
      return async (
        event: APIGatewayProxyEvent
      ): Promise<APIGatewayProxyResult> => {
        try {
          if (event.pathParameters["functionName"] === undefined) {
            throw "functionName is required in pathParameters";
          }
          const result = await runner.runObj({
            ...event.pathParameters!,
            functionName: event.pathParameters!["functionName"],
          });
          if (result["success"] === undefined) {
            return {
              statusCode: 200,
              body: result as string,
            } as APIGatewayProxyResult;
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err,
            }),
          } as APIGatewayProxyResult;
        }
      };
    } else {
      return async (
        event: APIGatewayProxyEvent
      ): Promise<APIGatewayProxyResult> => {
        try {
          if (event.queryStringParameters["functionName"] === undefined) {
            throw "functionName is required in queryStringParameters";
          }
          const result = await runner.runObj({
            ...event.queryStringParameters!,
            functionName: event.queryStringParameters!["functionName"],
          });
          if (result["success"] === undefined) {
            return {
              statusCode: 200,
              body: result as string,
            } as APIGatewayProxyResult;
          } else if (result["success"] === true) {
            return {
              statusCode: 200,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify(result),
            } as APIGatewayProxyResult;
          }
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: err,
            }),
          } as APIGatewayProxyResult;
        }
      };
    }
  }
}
