import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserForm } from '../../types/types';
import { Endpoints } from '../../endpoints/endpoints';

interface IUserState {
  user: IUser;
  token: string;
  loading: boolean;
  error: string;
}

const initFormState: IUserState = {
  user: {
    id: '',
    name: '',
    login: '',
  },
  token: '',
  loading: false,
  error: '',
};

export const fetchRegistration = createAsyncThunk<IUser, IUserForm, { rejectValue: string }>(
  'register/fetchRegister',
  async (user, { rejectWithValue, dispatch }) => {
    const response = await fetch(Endpoints.SIGN_UP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) console.error(response.status);
    const userData: IUser = await response.json();
    dispatch(userSlice.actions.setUserData(userData));
    return userData;
  }
);

export const fetchLogin = createAsyncThunk<string, IUserForm, { rejectValue: string }>(
  'register/fetchRegister',
  async (user, { rejectWithValue, dispatch }) => {
    const response = await fetch(Endpoints.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) console.error(response.status);
    const userData: string = await response.json();
    // dispatch(userSlice.actions.setUserData(userData));
    return userData;
  }
);

export const userSlice = createSlice({
  name: 'userData',
  initialState: initFormState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: () => {},
});

export default userSlice.reducer;
