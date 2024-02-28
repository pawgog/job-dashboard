import axios from "axios";
import { ItemsArray } from "../utils/types";

// const localPath = "http://localhost:3000";
const awsPath = "https://xv9gz13rca.execute-api.us-east-1.amazonaws.com";

export async function fetchTasks() {
  try {
    const { data } = await axios.get(`${awsPath}/dev/tasks`);
    return data?.result;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function fetchTaskById(id: number) {
  try {
    await axios.get(`${awsPath}/dev/tasks/${id}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function createTask(task: ItemsArray) {
  try {
    await axios.post(`${awsPath}/dev/tasks`, { data: task });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function updateTask(items: ItemsArray[]) {
  const [tasks] = items;
  try {
    await axios.put(`${awsPath}/dev/tasks`, { data: tasks });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function deleteTask(id: string) {
  try {
    await axios.delete(`${awsPath}/dev/tasks/${id}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
