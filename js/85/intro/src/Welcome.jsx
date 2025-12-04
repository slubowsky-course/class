import { Component } from "react";

export default function Welcome(props) {
  console.log(props);

  const { first, last } = props;

  return (<h1>Welcome {first} {last}!</h1>);
}

export class WelcomeC extends Component {
  state = {
    count: 0,
    foo: 0
  };

  constructor(props) {
    super(props);

    // props.first = 'Joe';
  }

  componentDidMount() {
    console.log('component did mount');
    this.interval = setInterval(() => {
      /*this.setState({
        count: this.state.count + 1
      });*/
      this.state.count = this.state.count + 1;
    }, 1000);

    this.interval2 = setInterval(() => {
      /*this.setState({
        foo: this.state.foo - 1
      });*/
      --this.state.foo;
    }, 1000);
  }

  componentWillUnmount() {
    console.log('component will unmount');
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  render() {

    const { first, last } = this.props;

    return (<>
      <h1>Welcome {first} {last}!</h1>
      <h2>Current count {this.state.count}</h2>
      <h2>Current foo {this.state.foo}</h2>
    </>);
  }
}
