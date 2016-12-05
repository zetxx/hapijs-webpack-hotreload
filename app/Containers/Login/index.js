import React, {Component, PropTypes} from 'react'
import style from './style.css'

export class Login extends Component {
  getStyle() {
    if (!this.props.state) {
      return style.init
    } else if (this.props.state === 'show') {
      return style.showing
    } else {
      return style.hiding
    }
  }
  render () {
    return (
      <div className={[style.aligner, this.getStyle()].join(' ')}>
        <div className={style.alignerItem}>
          <div>
            <div><label>User</label><input type='text' /></div>
            <div><label>Password</label><input type='password' /></div>
            <button>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  state: PropTypes.string
}
