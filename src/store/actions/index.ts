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
  toggleEdit,
  switchTab,
  loadingReferral,
  setReferralData,
  setRequestWithdrawal
} from '@store/slices/user'
import {
  setLoading,
  loadPosts,
  setPages,
  filterPosts,
  setSearchTerm,
  expandPost,
  setScrollPosition
} from '@store/slices/posts'
import router from 'next/router'
import Cookies from 'js-cookie'

const dispatch = store.dispatch

const fetchReferralData = async (referralCode, email) => {
  dispatch(loadingReferral(true))
  try {
    const { data } = await axios.get(`/api/users/referrals?referralCode=${referralCode
      }&email=${email}`)
    dispatch(setReferralData(data))
    console.log(data)
    dispatch(loadingReferral(false))
  } catch (err) {
    alert(getError(err))
  }
}

const initPosts = async () => {
  dispatch(setLoading(true))
  try {
    const { data } = await axios.get('/api/posts')
    dispatch(loadPosts(data.posts))
    dispatch(setPages(data.pages))
    dispatch(setLoading(false))
  } catch (err) {
    alert(getError(err))
  }
}

const fetchPosts = async (page) => {
  try {
    const { data } = await axios.get(`/api/posts?page=${page}&limit=10`)
    dispatch(loadPosts(data.posts))
    dispatch(setPages(data.pages))
  } catch (err) {
    alert(getError(err))
  }
}

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

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const logoutHandler = () => {
  router.push('/')
  Cookies.remove('userInfo')
  setTimeout(() => { dispatch(signout()) }, 1000)
}

export {
  setScrollPosition,
  fetchAdminSummary,
  fetchAdminUsers,
  fetchAdminPosts,
  login,
  filterPosts,
  signout,
  setSearchTerm,
  savePost,
  setLoading,
  expandPost,
  toggleMenu,
  initPosts,
  setPages,
  toggleEdit,
  switchTab,
  loadingReferral,
  setReferralData,
  setRequestWithdrawal
}
export { fetchPosts, getPeriod, fetchData, logoutHandler, fetchReferralData, numberWithCommas }
