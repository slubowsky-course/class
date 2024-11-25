/*import React from 'react'

export default function Welcome(props) {
  const {name} = props;
  return (
    <h1>Welcome {name}</h1>
  )
}*/

import { Component } from 'react'

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      count2: -1,
      foo: 'foo'
    };
  }

  componentDidMount() {
    console.log('componentDidMount');

    this.interval = setInterval(() => {
      //this.state.count++;
      this.setState({
        count: this.state.count + 1
      });
      console.log(this.state.count);
    }, 1000);

    this.interval2 = setInterval(() => {
      this.setState({
        count2: this.state.count2 - 1
      });
    }, 2000);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  render() {
    const { name } = this.props;
    return (
      <h1>Welcome {name} - {this.state.count} {this.state.count2} {this.state.foo}</h1>
    )
  }
}
