import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Store} from './Store'
import reducers from './reducers'
import {CommentBox} from './ComponentBox'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Provider store={Store({...reducers})}>
    <CommentBox title='just a title!' />
  </Provider>,
  document.getElementById('content')
)
