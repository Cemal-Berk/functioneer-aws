# Functioneer-AWS

Helper functions for [Functioneer](https://github.com/Cemal-Berk/functioneer) - for use with AWS Lambda functions.

## Installation

Run `npm install i functioneer-aws` and import to your project.

## Usage

Declare a function:

    import {Functioneer} from "functioneer";
    const func = new Functioneer();
    //Declare a function to add two numbers
    func.registerFunction("add", "Adds two numbers", (a: number, b: number) => {
        return a + b;
    })
    .addField("a", "number", "The first number to add")
    .addField("b", "number", "The second number to add");

Use the lambda handler for a path:

    import { getLamdaHandler } from "./lib/functioneer-aws";
    import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

    export const lambdaHandler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult> = getLamdaHandler(func,"BODY");

## Exposed method

`getLambdaHandler(functioneerInstance,dataSource,functionName?)`

| arguement           | type        |                                                                                       |
| ------------------- | ----------- | ------------------------------------------------------------------------------------- |
| functioneerInstance | Functioneer | An instance of Functioneer                                                            |
| dataSource          | string      | Where to get the function arguements from ("BODY" or "PARAMS" or "QUERY")             |
| functionName        | string?     | The function to be called. If null then select the function name from the data source |

## Dynamic function selection

As mentioned before you can either hardcode the function to run or parse it through the dataSource:

    const func = new Functioneer();
    func.registerFunction("add", "Adds two numbers", (a: number, b: number) => { return a + b; }).
    addField("a", "number", "The first number to add").
    addField("b", "number", "The second number to add");


    // This will run the add function
    export const lambdaHandler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult> = getLamdaHandler(func,"BODY", "add");

    // This will run any function specified in body.functionName
    export const lambdaHandler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult> = getLamdaHandler(func,"BODY");

## Data sources

The following data sources are supported:

| Data source    | value    |                             |
| -------------- | -------- | --------------------------- |
| Request body   | "BODY"   | JSON data from request body |
| URL parameters | "PARAMS" | URL parameters              |
| Query string   | "QUERY"  | Query string parameters     |

# Building and testing

You can build the project by running `npm run build`.
Tests are run by running `npm run test`

# License

Functioneer-aws is licensed under MIT license
