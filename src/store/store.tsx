import { createContext, useReducer } from 'react'

const Store = createContext()

const initialState = {}

function reducer (state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, }
    case 'DARK_MODE_OFF':
      return { ...state, }
    default:
      return state
  }
}

function StoreProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

export { Store, StoreProvider }
