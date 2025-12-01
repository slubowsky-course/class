import { Component } from "react";

export default class Clock extends Component {
  state = {
    currentTime: new Date()
  }

  componentDidMount() {
    console.log('Clock mounted');
    this.interval = setInterval(() => {
      console.log('interval', this.state);
      this.setState({
        currentTime: new Date()
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log('render', this.state);
    //const { currentTime } = this.state;

    return (<h1>{this.state.currentTime.toLocaleTimeString()}</h1>);
  }
}
