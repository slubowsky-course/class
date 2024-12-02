import React, { Component } from 'react'

export default class CounterComponent extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      count: props.count
    }*/
  }

  /*handleClick = () => {
    /*this.setState({
      count: this.state.count + 1
    });* /
    this.props.counter.count++;
  }*/

  render() {
    //const {count} = this.state;
    const {count} = this.props.counter;
    const { incrementCount, counter }= this.props;

    return (
      <button onClick={
        /*this.handleClick*/
        () => incrementCount(counter)}>{count}</button>
    )
  }
}
