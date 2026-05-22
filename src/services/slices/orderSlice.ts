import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export type IOrders = {
  orders: TOrder[];
  lastOrder: TOrder | null;
  orderRequestData: boolean;
  loading: boolean;
  orderCreate: boolean;
};
export const initialState: IOrders = {
  orders: [],
  lastOrder: null,
  orderRequestData: false,
  loading: false,
  orderCreate: false
};

export const getUserOrders = createAsyncThunk('order/getUserOrders', async () =>
  getOrdersApi()
);

export const newUserOrder = createAsyncThunk(
  'order/newUserOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(newUserOrder.pending, (state) => {
        state.loading = true;
        state.orderRequestData = true;
        state.orderCreate = false;
      })
      .addCase(newUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequestData = false;
        state.orderCreate = false;
      })
      .addCase(newUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
        state.lastOrder = action.payload.order;
        state.orderRequestData = false;
        state.orderCreate = true;
      });
  }
});

const orderSliceSelectors = (state: RootState) => state.order;

export const getOrders = createSelector(
  [orderSliceSelectors],
  (state) => state.orders
);

export const getOrderRequestStatus = createSelector(
  [orderSliceSelectors],
  (state) => state.orderRequestData
);

export const getLastOrder = createSelector(
  [orderSliceSelectors],
  (state) => state.lastOrder
);

export const getOrderCreate = createSelector(
  [orderSliceSelectors],
  (state) => state.orderCreate
);

export const { setLastOrder } = orderSlice.actions;
export const orderSliceReducer = orderSlice.reducer;
