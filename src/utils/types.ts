export type ItemProps = {
  index: number;
  name: string;
  currentColumnId: string;
};

export type ItemsArray = {
  id: string;
  name: string;
  column: string;
};

export type ColumnArray = {
  _id: string;
  name: string;
  bgColor: string;
};
