import { ItemsArray } from "./types";

type Props = {
  data: ItemsArray[];
  prop: string;
  value: string;
  comparedValue: number | string;
  changedValue: string;
}

export const changeItemAction = ({data, prop, value, comparedValue, changedValue}: Props) => {
  const newItems = data
    .filter((item: ItemsArray) => item[prop as keyof typeof item] === comparedValue)
    .map((item: ItemsArray) => {
      return {
        ...item,
        [value]: changedValue
      };
    });
  return { newItems };
};
