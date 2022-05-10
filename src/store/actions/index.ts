import { getError } from '@db/error'
import { store } from '@store'
import axios from 'axios'

import {
  fetchAdminSummary,
  fetchAdminPosts,
  fetchAdminUsers
} from '@store/slices/admin'
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
import router from 'next/router'
import Cookies from 'js-cookie'

const dispatch = store.dispatch

const fetchData = async (url, bearer, action) => {
  try {
    const { data } = await axios.get(url, {
      headers: { authorization: `Bearer ${bearer}` }
    })
    dispatch(action(data))
  } catch (err) {
    alert(getError(err))
  }
}

const fetchPosts = async (url) => {
  dispatch(setLoading(true))
  try {
    const { data } = await axios.get(url)
    dispatch(setPosts(data))
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

// TODO: FIX signout before redirect err
const logoutHandler = () => {
  dispatch(signout())
  Cookies.remove('userInfo')
  router.push('/login')
}

export {
  fetchAdminSummary,
  fetchAdminUsers,
  fetchAdminPosts,
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
export { fetchPosts, getPeriod, fetchData, logoutHandler }
