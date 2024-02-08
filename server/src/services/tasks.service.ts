// import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
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
const addOrUpdateTasks = async (item: Object) => {
  try {
      const params = {
          TableName: TABLE_NAME,
          Item: item
      };

      const result = await dynamodb.put(params).promise();

      return result;
  } catch (err: any) {
      throw new Error(err.message);
  }
}

export { getTasks, getTaskById, updateTask }
