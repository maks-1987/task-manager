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
