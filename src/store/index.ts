import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { Action, combineReducers } from 'redux'
import { createWrapper } from 'next-redux-wrapper'

import _tick from '@store/slices/_tick'
import posts from '@store/slices/posts'
import users from '@store/slices/users'
const rootReducer = combineReducers({ _tick, posts, users })

const makeStore = () => configureStore({
  reducer: rootReducer,
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
