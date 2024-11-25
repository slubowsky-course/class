import './Clock.css';
import React, { Component } from 'react'

export default class Clock extends Component {
  state = {
    currentTime: new Date()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        currentTime: new Date()
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const style = { fontFamily: 'cursive' };

    return (
      <h2 className="clock" style={style}>{this.state.currentTime.toLocaleTimeString()}</h2>
    )
  }
}
