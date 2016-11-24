import {createStore, combineReducers} from 'redux'

export const Store = (reducers) => {
  const store = createStore(combineReducers(reducers))
  return store
}
