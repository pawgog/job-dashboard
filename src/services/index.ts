import axios from "axios";
import { ItemsArray } from "../utils/types";

export async function fetchTasks() {
  try {
    const { data } = await axios.get("https://xv9gz13rca.execute-api.us-east-1.amazonaws.com/dev/tasks");
    return data?.result;
  } catch (e) {
    console.log(e);
  }
}

export async function createUpdateTask(tasks: ItemsArray[]) {
  try {
    await axios.post(`https://xv9gz13rca.execute-api.us-east-1.amazonaws.com/dev/tasks`, { data: tasks });
  } catch (e) {
    console.log(e);
  }
}
