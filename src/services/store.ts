import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorSliceReducer } from './slices/constructorSlice';
import { ingredientsSliceReducer } from './slices/ingredientsSlice';
import { feedsSliceReducer } from './slices/FeedsSlice';
import { userSliceReducer } from './slices/userSlice';
import { orderSliceReducer } from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  constructorItems: burgerConstructorSliceReducer,
  feeds: feedsSliceReducer,
  auth: userSliceReducer,
  order: orderSliceReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
