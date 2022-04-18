import { store } from '@store'
import { login, fetchSaved } from '@store/slices/user'
import { } from '@store/slices/user/thunk'
import { setLoading, setPosts } from '@store/slices/posts'
import { } from '@store/slices/posts/thunk'

const fetchPosts = async (url) => {
  const dispatch = store.dispatch
  dispatch(setLoading(true))
  try {
    const posts = await fetch(url).then(
      (data) => data.json()
    )
    console.log(posts)
    dispatch(setPosts(posts))
    dispatch(setLoading(false))
  } catch (error) {
    console.log(error)
  }
}

export { login, fetchSaved, setLoading, setPosts }
export { fetchPosts }
