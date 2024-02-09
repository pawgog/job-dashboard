import AWS from 'aws-sdk';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { config } from './config';

AWS.config.update({
    region: config.aws_remote_config.region,
    accessKeyId: config.aws_remote_config.accessKeyId,
    secretAccessKey: config.aws_remote_config.secretAccessKey
});

const TABLE_NAME = config.TABLE_NAME;
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export { docClient, TABLE_NAME }
