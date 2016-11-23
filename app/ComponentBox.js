import React, {Component, PropTypes} from 'react'

export class CommentBox extends Component {
  render () {
    return (
      <div>
        {this.props.title}
      </div>
    )
  }
}

CommentBox.propTypes = {
  title: PropTypes.string
}
