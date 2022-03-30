import { combineReducers } from 'redux'

import posts from '@store/slices/posts'
import users from '@store/slices/users'

const rootReducer = combineReducers({ posts, users })

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
