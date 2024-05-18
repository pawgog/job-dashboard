import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { ItemsArray } from "../utils/types";

const supabaseDBPath = "https://ashudzqkulieyzaffcfp.supabase.co"
const mongoDBPath = "https://job-tasks.onrender.com"
// const awsPath = "https://xv9gz13rca.execute-api.us-east-1.amazonaws.com";

const supabase = createClient(supabaseDBPath, `${import.meta.env.VITE_DB_ACCESS_KEY}`);

export async function fetchTasks() {
  try {
    const { data } = await supabase.from('tasks').select()
    return data as ItemsArray[];
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

export async function fetchColumn() {
  try {
    const { data } = await axios.get(`${mongoDBPath}/column`);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function updateColumn({columnId, data}: any) {
  try {
    await axios.put(`${mongoDBPath}/column${columnId}`, { data: data });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
