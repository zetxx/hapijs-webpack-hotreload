import {Map} from 'immutable'
const defTest = Map({})
export default {
  test: (store = defTest, action) => {
    return store
  }
}
