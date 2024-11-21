import {Component} from 'react';

export default function Welcome(/*{first, last}*/props) {
  const {first, last} = props;

  //props.first = 'Donald';

  return (<h1>Hi {first} {last}! Welcome to React</h1>);
}

// not recommended
export class Welcome2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {first, last} = this.props;
    return (
      <div>I am a class Welcome. Hi {first} {last}!</div>
    )
  }
}
