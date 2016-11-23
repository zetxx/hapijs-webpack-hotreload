import React from 'react'
import ReactDOM from 'react-dom'
import {CommentBox} from './ComponentBox'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <CommentBox title='just a title!!!' />,
  document.getElementById('content')
)
