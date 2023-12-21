import axios from "axios";

export async function fetchTasks() {
  try {
    const tasks = await axios.get("http://localhost:3000/tasks");
    return tasks.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createTask(task: string) {
  try {
    await axios.post(`http://localhost:3000/tasks/`, { data: task });
  } catch (e) {
    console.log(e);
  }
}
