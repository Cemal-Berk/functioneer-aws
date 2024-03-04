import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Functioneer } from 'functioneer';

/**
 * Gets a handler for a lamda function
 * @param runner The function runner
 * @param dataSource Where to get the input data from
 * @param functionName The function name to be executed. If null the function name will be taken from the input data
 * @returns async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> function
 */
declare function getLambdaHandler(runner: Functioneer, dataSource: "BODY" | "PARAMS" | "QUERY", functionName?: string): (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export { getLambdaHandler };
