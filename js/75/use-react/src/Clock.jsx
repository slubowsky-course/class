import { Component } from "react";

export default class Clock extends Component {
  state = {
    currentTime: new Date()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        currentTime: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1>{this.state.currentTime.toLocaleTimeString()}</h1>
    );
  }
}
