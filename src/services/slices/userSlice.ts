import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TAuthResponse,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { RootState } from '../store';
import { TOrder } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const initialState: Pick<TAuthResponse, 'user' | 'success'> & {
  loading: boolean;
  error: null | string;
} = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  loading: false,
  error: null
};

export const getUserAuth = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  const res = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return res;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    makeLoginUserSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAuth.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })

      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.user = initialState.user;
      });
  }
});

const userSliceSelectors = (state: RootState) => state.auth;

export const getUserAuthStatus = createSelector(
  [userSliceSelectors],
  (state) => state.success
);

export const getIsAuthLoading = createSelector(
  [userSliceSelectors],
  (state) => state.loading
);

export const getUser = createSelector(
  [userSliceSelectors],
  (state) => state.user
);

export const errorUser = createSelector(
  [userSliceSelectors],
  (state) => state.error
);

export const { makeLoginUserSuccess, clearError } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
