export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUserForm {
  name?: string;
  login: string;
  password?: string;
}

export interface IUserBoard {
  id: string;
  title: string;
  description?: string;
}

export interface IFetchQuery {
  boardData?: IUserBoard;
  columnData?: IComleteColumn;
  boardId?: string;
  columnId?: string;
  taskId?: string;
  token: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns?: IColumn;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask;
}
export interface IFiles {
  filename: string;
  fileSize: number;
}
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: IFiles;
}

export type UserId = {
  [key: number]: string;
};

export type BoardId = {
  [key: number]: string;
};

export interface IComleteColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}
