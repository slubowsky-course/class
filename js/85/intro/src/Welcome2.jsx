import { Component } from "react";
import { WelcomeC } from "./Welcome";

export default class Welcome2 extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <div style={{ color: 'red' }}>{this.state.count}</div>

        <WelcomeC first="Donald" last="Trump" />
      </>
    );
  }
}
