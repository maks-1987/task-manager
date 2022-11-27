// const URL = 'http://localhost:4000';

// export const Endpoints = {
//   ROOT: `${URL}`,
//   USERS: `${URL}/users`,
//   SIGN_IN: `${URL}/signin`,
//   SIGN_UP: `${URL}/signup`,
//   BOARDS: `${URL}/boards`,
//   FILE: `${URL}/file`,
//   LOGS: `${URL}/logs`,
// };

const URL = 'https://task-manager-be.up.railway.app';
export const Endpoints = {
  ROOT: `${URL}`,
  USERS: `${URL}/users`,
  BOARDS: `${URL}/boards`,
  FILE: `${URL}/file`,
  LOGS: `${URL}/logs`,
  BOARDS_SET: `${URL}/boardsSet`,
  TASKS_SET: `${URL}/tasksSet`,
  POINTS: `${URL}/points`,
  SIGN_IN: `${URL}/auth/signin`,
  SIGN_UP: `${URL}/auth/signup`,
};
