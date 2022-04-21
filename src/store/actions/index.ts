import { getError } from '@db/error'
import { store } from '@store'

import { } from '@store/slices/user/thunk'
import { } from '@store/slices/posts/thunk'
import {
  login,
  signout,
  savePost,
  toggleMenu,
  toggleEdit
} from '@store/slices/user'
import {
  setLoading,
  setPosts,
  filterPosts,
  setSearchTerm,
  expandPost
} from '@store/slices/posts'

const fetchPosts = async (url) => {
  const dispatch = store.dispatch
  dispatch(setLoading(true))
  try {
    const posts = await fetch(url).then(
      (data) => data.json()
    )
    dispatch(setPosts(posts))
    dispatch(setLoading(false))
  } catch (err) {
    alert(getError(err))
  }
}

const getPeriod = (date) => {
  const diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf())
  let days = diffTime / (24 * 60 * 60 * 1000)
  let hours = (days % 1) * 24
  let minutes = (hours % 1) * 60
  let secs = (minutes % 1) * 60;
  [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
  const updated = days
    ? days + ' days'
    : (hours
        ? hours + ' hours'
        : (minutes
            ? minutes + ' minutes'
            : secs + ' secs'
          )
      )
  return updated
}

export {
  login,
  filterPosts,
  signout,
  setSearchTerm,
  savePost,
  setLoading,
  setPosts,
  expandPost,
  toggleMenu,
  toggleEdit
}
export { fetchPosts, getPeriod }
