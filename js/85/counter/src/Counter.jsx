import React, { Component } from 'react'

export default class Counter extends Component {
  state = {
    count: 0
  }

  constructor() {
    super();
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  //handleClick = () => {
    // console.log('Button was clicked');
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <button onClick={
        /*this.handleClick*/
        /*this.handleClick.bind(this)*/
        () => this.handleClick()
      }>{this.state.count}</button>
    )
  }
}
