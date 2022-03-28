import { createContext, useReducer } from 'react'

const Store = createContext()

interface ICounter {
  count: number;
}
const initialState: ICounter = {
  count: 20,
};

function reducer (state, action) {
  switch (action.type) {
    case 'increase':
      return state.count++
    case 'decrease':
      return state.count--
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
