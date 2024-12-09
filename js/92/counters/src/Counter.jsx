import { Component } from 'react'

export default class Counter extends Component {
  state = {
    count: 2
  };

  componentDidMount() {
    document.title = `C count is ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `C count is ${this.state.count}`;
  }

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <button onClick={this.incrementCount}>{this.state.count}</button>
    )
  }
}
