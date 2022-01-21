import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import targetManpowerReducer from "./targetManpower/reducer";

const store = configureStore({
  reducer: {
    targetManpower: targetManpowerReducer,
  },
  middleware: [thunk],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]
