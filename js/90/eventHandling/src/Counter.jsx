import React, { Component } from 'react'

export default class Counter extends Component {
  /*state = {
    count: 0
  };*/

  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    //this.handleClick = this.handleClick.bind(this);

    console.log(this);
  }

  //handleClick() {
  handleClick = () => {
    console.log('handleClick called');
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    const {count} = this.state;

    return (
      <button onClick={
        /*this.handleClick.bind(this)*/
        /*this.handleClick*/
        /*() => this.handleClick()*/
        this.handleClick
      }>{count}</button>
    )
  }
}
