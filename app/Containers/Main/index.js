import React, {Component} from 'react'
import {Background} from '../Background'
import {Login} from '../Login'
import {Setting} from '../Setting'

var lastMove = Date.now()

export class Main extends Component {
  componentDidMount () {
    setInterval(() => {
      let diff = Math.floor((Date.now() - lastMove) / 1000)
      if (diff > 5) {
        this.setState({state: 'hide'})
      } else {
        this.setState({state: 'show'})
      }
    }, 1000)
  }
  handleMove() {
    lastMove = Date.now()
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (this.state && (nextState.state !== this.state.state)) {
      return true
    }
    return false
  }
  render () {
    let state = (this.state && this.state.state)
    return (
      <div onMouseMove={this.handleMove}>
        <Background state={state} />
        <Login state={state} />
        <Setting state={state} />
      </div>
    )
  }
}
