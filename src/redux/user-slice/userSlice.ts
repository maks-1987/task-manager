import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/types';

const initFormState: IUser = {
  id: '',
  name: '',
  login: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'userData',
  initialState: initFormState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
  },
  extraReducers: () => {},
});

export default userSlice.reducer;
