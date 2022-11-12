import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserForm } from '../../types/types';
import { Endpoints } from '../../endpoints/endpoints';

interface IUserState {
  user: IUser;
  token: string;
  error: string;
  password?: string;
}

const initFormState: IUserState = {
  user: {
    id: '',
    name: '',
    login: '',
  },
  password: '',
  token: '',
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

    if (!response.ok) {
      const userData = await response.json();
      return rejectWithValue(userData.message);
    }

    const userData: IUser = await response.json();
    if (user.password != null) {
      dispatch(userSlice.actions.setPassword(user.password));
    }
    return userData;
  }
);

export const fetchLogin = createAsyncThunk<string, IUserForm, { rejectValue: string }>(
  'login/fetchLogin',
  async (user, { rejectWithValue, dispatch }) => {
    const response = await fetch(Endpoints.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const userData = await response.json();
      return rejectWithValue(userData.message);
    }

    const userData = await response.json();
    dispatch(userSlice.actions.setUserLogin(user.login));
    dispatch(userSlice.actions.setPassword(''));
    return userData.token;
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
    setUserLogin(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = '';
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.token = '';
        state.user.login = '';
        state.user.name = '';
        state.user.id = '';
        state.error = action.payload ? action.payload : '';
      })
      .addCase(fetchLogin.pending, (state) => {
        state.user.name = '';
        state.user.id = '';
        state.error = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = '';
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.payload ? action.payload : '';
        state.user.name = '';
        state.user.id = '';
      });
  },
});

export default userSlice.reducer;
