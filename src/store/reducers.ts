import { combineReducers } from 'redux'

import tick from '@store/slices/tick'
import posts from '@store/slices/posts'
import users from '@store/slices/users'

const rootReducer = combineReducers({ tick, posts, users })

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
