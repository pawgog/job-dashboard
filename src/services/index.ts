import axios from "axios";
import { ItemsArray } from "../utils/types";

// const localPath = "http://localhost:3000";
const awsPath = "https://xv9gz13rca.execute-api.us-east-1.amazonaws.com";

export async function fetchTasks() {
  try {
    const { data } = await axios.get(`${awsPath}/dev/tasks`);
    return data?.result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchTaskById(id: number) {
  try {
    await axios.get(`${awsPath}/dev/tasks/${id}`);
  } catch (e) {
    console.log(e);
  }
}

export async function createTask(task: string) {
  try {
    await axios.post(`${awsPath}/dev/tasks`, { data: task });
  } catch (e) {
    console.log(e);
  }
}

export async function updateTask(items: ItemsArray[]) {
  const [tasks] = items;
  try {
    await axios.post(`${awsPath}/dev/tasks`, { data: tasks });
  } catch (e) {
    console.log(e);
  }
}
