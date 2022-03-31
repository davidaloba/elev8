import { configureStore, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import rootReducer from './reducers'

const makeStore = () => configureStore({ reducer: rootReducer, devTools: true })

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore)

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>()

// export default store
