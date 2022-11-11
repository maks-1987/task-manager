export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUserForm {
  name?: string;
  login: string;
  password: string;
}
export interface IUserBoard {
  id: string;
  title: string;
  description?: string;
}
export interface IFetchQuery {
  boardData?: IUserBoard;
  boardId?: string;
  token: string;
}
