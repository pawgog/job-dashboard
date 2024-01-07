import { dynamodb, TABLE_NAME } from "../config/dynamo"

const getTasks = async () => {
  try {
      const params = {
          TableName: TABLE_NAME
      };

      const result = await dynamodb.scan(params).promise();

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


export { getTasks, addOrUpdateTasks }
