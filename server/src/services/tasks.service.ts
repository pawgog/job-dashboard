import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { docClient, TABLE_NAME } from "../config/dynamo"

type Items = {
  id: number;
  name: string;
  column: string;
};

const getTasks = async () => {
  try {
    const params = new ScanCommand({
        TableName: TABLE_NAME,
    });

    const result = await docClient.send(params);

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }

}

const getTaskById = async (id: string) => {
  try {
    const params = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
          id: id,
      }
    });

    const result = await docClient.send(params);
    return result.Item;
  } catch (err: any) {
      throw new Error(err.message);
  }
}

const updateTask = async (item: Items) => {
  const { id, name, column } = item;
  try {
    const params = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        id: id,
        name: name,
        column: column,
      }
    });

    const response = await docClient.send(params);
    return response;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export { getTasks, getTaskById, updateTask }
