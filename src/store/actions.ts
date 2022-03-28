import Axios from 'axios'
// import data from './data'

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

export const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST'
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS'
export const PRODUCT_CREATE_FAIL = 'PRODUCT_CREATE_FAIL'

export const PRODUCT_REVIEW_CREATE_REQUEST = 'PRODUCT_REVIEW_CREATE_REQUEST'
export const PRODUCT_REVIEW_CREATE_SUCCESS = 'PRODUCT_REVIEW_CREATE_SUCCESS'
export const PRODUCT_REVIEW_CREATE_FAIL = 'PRODUCT_REVIEW_CREATE_FAIL'

export const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST'
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS'
export const PRODUCT_UPDATE_FAIL = 'PRODUCT_UPDATE_FAIL'

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL'

export const PRODUCT_CATEGORY_LIST_REQUEST = 'PRODUCT_CATEGORY_LIST_REQUEST'
export const PRODUCT_CATEGORY_LIST_SUCCESS = 'PRODUCT_CATEGORY_LIST_SUCCESS'
export const PRODUCT_CATEGORY_LIST_FAIL = 'PRODUCT_CATEGORY_LIST_FAIL'

export const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET'
export const PRODUCT_REVIEW_CREATE_RESET = 'PRODUCT_REVIEW_CREATE_RESET'
export const PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET'
export const PRODUCT_DELETE_RESET = 'PRODUCT_DELETE_RESET'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
export const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL'

export const USER_SIGNOUT = 'USER_SIGNOUT'

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL'
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAIL = 'USER_LIST_FAIL'

export const USER_TOPSELLERS_LIST_REQUEST = 'USER_TOPSELLERS_LIST_REQUEST'
export const USER_TOPSELLERS_LIST_SUCCESS = 'USER_TOPSELLERS_LIST_SUCCESS'
export const USER_TOPSELLERS_LIST_FAIL = 'USER_TOPSELLERS_LIST_FAIL'

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST'
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS'
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL'
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL'
export const USER_UPDATE_RESET = 'USER_UPDATE_RESET'

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAIL = 'USER_DELETE_FAIL'
export const USER_DELETE_RESET = 'USER_DELETE_RESET'

export const USER_ADDRESS_MAP_CONFIRM = 'USER_ADDRESS_MAP_CONFIRM'

export const listProducts =
  ({
    pageNumber = '',
    seller = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0
  }) =>
    async (dispatch) => {
      dispatch({
        type: PRODUCT_LIST_REQUEST
      })
      try {
        const { data } = await Axios.get(
        `/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
        )
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
      }
    }

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST
  })
  try {
    const { data } = await Axios.get('/api/products/categories')
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message })
  }
}

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
  try {
    const { data } = await Axios.get(`/api/products/${productId}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.post(
      '/api/products',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      }
    )
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message })
  }
}
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message })
  }
}
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    await Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message })
  }
}
export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST })
    const {
      userSignin: { userInfo }
    } = getState()
    try {
      const { data } = await Axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        }
      )
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message })
    }
  }

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password
    })
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  dispatch({ type: USER_SIGNOUT })
  document.location.href = '/signin'
}
export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` }
    })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: USER_DETAILS_FAIL, payload: message })
  }
}
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.put('/api/users/profile', user, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message })
  }
}
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: USER_UPDATE_FAIL, payload: message })
  }
}
export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST })
  try {
    const {
      userSignin: { userInfo }
    } = getState()
    const { data } = await Axios.get('/api/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: USER_LIST_FAIL, payload: message })
  }
}
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: USER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: USER_DELETE_FAIL, payload: message })
  }
}
export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST })
  try {
    const { data } = await Axios.get('/api/users/top-sellers')
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message })
  }
}
