import { Component } from 'react';

export default class Counter extends Component {
  state = {
    count: 0
  };

  constructor() {
    super();

    console.log('in ctor');

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('component did mount');

    /*this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);*/
  }

  componentWillUnmount() {
    console.log('component will unmount');

    //clearInterval(this.interval);
  }

  componentDidUpdate() {
    console.log(
      'componentDidUpdate');
  }

  handleClick = () => {
    console.log('handle click');

    console.log(this);

    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    //const boundClick = this.handleClick.bind(this);

    console.log('in render', this);

    return (
      <button onClick={
        this.handleClick
        /*
        //this.handleClick
        //boundClick
        //this.handleClick.bind(this)
        */
        //() => this.handleClick()
      } >{this.state.count}</button>
    );
  }
}
