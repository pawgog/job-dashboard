import axios from "axios";
import { ColumnArray, TasksArray, NewTask } from "../utils/types";

const mongoDBPath = "https://job-tasks.onrender.com"

export async function fetchTasks() {
  try {
    const { data } = await axios.get(`${mongoDBPath}/tasks`);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function createTask(task: NewTask) {
  try {
    await axios.post(`${mongoDBPath}/tasks`, task);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function updateTask(task: TasksArray) {
  const { _id } = task
  try {
    await axios.put(`${mongoDBPath}/tasks/${_id}`, task);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function deleteTask(id: string) {
  try {
    await axios.delete(`${mongoDBPath}/tasks/${id}`);
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

export async function updateColumn(column: ColumnArray) {
  const { _id } = column;

  try {
    await axios.put(`${mongoDBPath}/column/${_id}`, column);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
