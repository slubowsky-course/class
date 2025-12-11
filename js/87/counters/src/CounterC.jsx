import React, { Component } from 'react'

export default class CounterC extends Component {
  state = {
    count: 5,
    count2: 10
  };

  componentDidMount() {
    console.log('component did mount');
  }

  componentWillUnmount() {
    console.log('component will unmount');
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.count !== this.state.count) {
      document.title = 'C - ' + this.state.count; // + ' ' + this.state.count2;
    }
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  handleClick2 = () => {
    this.setState({
      count2: this.state.count2 + 1
    });
  }

  render() {
    return (
      <>
        <button onClick={this.handleClick}>{this.state.count}</button>
        <button onClick={this.handleClick2}>{this.state.count2}</button>
      </>
    )
  }
}
