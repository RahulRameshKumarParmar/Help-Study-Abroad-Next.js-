import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    product: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
