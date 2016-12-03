import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Store} from './Store'
import reducers from './reducers'
import {Main} from './Containers/Main'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Provider store={Store({...reducers})}>
    <Main />
  </Provider>,
  document.getElementById('content')
)
