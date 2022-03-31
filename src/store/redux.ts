
import { createStore, AnyAction, Store } from 'redux'
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import data from '@db/data'
import db from '@db'

import rootReducer from './reducers'

export interface IState {
    tick: string
    posts: ({} | string | boolean | number)[]
    users: ({} | string | boolean | number)[]
}

const initialState: IState = {
  tick: 'init',
  posts: data.posts,
  users: data.users
}

const reducer = (state: IState = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    case 'TICK':
      return { ...state, tick: action.payload.tick }
    case 'FETCH_POSTS':
      return { ...state, posts: action.payload.posts }
    case 'FETCH_USERS':
      return { ...state, users: action.payload.users }
    default:
      return state
  }
}

const makeStore = (context: Context) => createStore(reducer)

export const wrapper = createWrapper<Store<IState>>(makeStore, { debug: true })
