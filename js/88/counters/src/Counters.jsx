import { Component } from 'react'
import Counter from './Counter'

export default class Counters extends Component {
  render() {
    const { counters, incrementCounter } = this.props;

    return (
      <>
        {counters.map(c => <Counter key={c.id} counter={c} incrementCounter={incrementCounter} />)}
      </>
    )
  }
}
