export type ItemProps = {
  index: number;
  name: string;
  currentColumnId: string;
};

export type NewTask = {
  name: string;
  column: string;
  created_at: string;
};

export interface TasksArray extends NewTask {
  _id: string;
};

export type NewColumn = {
  name: string;
  bgColor: string;
};

export type ColumnArray = {
  _id: string;
  name: string;
  bgColor: string;
};
