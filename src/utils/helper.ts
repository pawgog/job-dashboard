import { TasksArray } from "./types";

type Props = {
  data: TasksArray[];
  prop: string;
  value: string;
  comparedValue: number | string;
  changedValue: string;
}

const itemObject = {
  _id: '',
  name: '',
  column: '',
  created_at: ''
}

export const changeItemAction = ({data, prop, value, comparedValue, changedValue}: Props) => {
  const newItems = data
    .filter((item: TasksArray) => item[prop as keyof typeof item] === comparedValue)
    .map((item: TasksArray) => {
      return {
        ...item,
        [value]: changedValue
      };
    });
  return { newItems };
};

export const updateItemsArray = (data: TasksArray[], name: string, columnId: string, searchValue: string, changedValue: string) => {
  return data
  .map((task) => (task[searchValue as keyof typeof task] === name ? { ...task, [changedValue]: columnId } : { ...task }))
  .find((task) => task[searchValue as keyof typeof task] === name) || itemObject;
}
