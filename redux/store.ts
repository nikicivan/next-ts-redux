import { Action, configureStore, Store } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import { MakeStore } from "next-redux-wrapper";
import weaponsReducer from "./slice";
import postsReducer from './sliceData';

const rootReducer = combineReducers({
  weaponsReducer: weaponsReducer,
  postsReducer: postsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<any>>;

const makeStore: MakeStore = (): Store => {
  const store: Store = configureStore({
    reducer: rootReducer
  });

  return store;
};

export default makeStore;
