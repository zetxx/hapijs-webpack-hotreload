import React, {Component, PropTypes} from 'react'
import style from './style.css'

export class Background extends Component {
  getStyle() {
    if (!this.props.state) {
      return style.init
    } else if (this.props.state === 'show') {
      return style.activating
    } else {
      return style.deactivating
    }
  }
  render () {
    return (
      <div className={[style.background, this.getStyle()].join(' ')} />
    )
  }
}

Background.propTypes = {
  state: PropTypes.string
}
