import { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    current: '0'
  }

  handleButtonClick(btn) {
    console.log(arguments);

    switch (btn) {
      case '+':
        // fall through
      case '-':
      case 'x':
      case '/':
        console.log(btn);
        this.setState({
          last: this.state.current,
          current: '',
          operator: btn
        })
        break;
      case '=':
        let answer = 0;
        switch (this.state.operator) {
          case '+':
            answer = Number(this.state.last) + Number(this.state.current);
            break;
          case '-':
            answer = Number(this.state.last) - Number(this.state.current);
            break;
          case 'x':
            answer = Number(this.state.last) * Number(this.state.current);
            break;
          case '/':
            answer = Number(this.state.last) / Number(this.state.current);
            break;
        }
        this.setState({
          last: 0,
          current: answer.toString(),
          operator: null
        });
        break;
      case 'C':
        this.setState({
          last: 0,
          current: '0',
          operator: null
        });
        break;
      case '.':
        if (this.state.current.includes('.')) {
          break;
        }
      default:
        const existing = this.state.current === '0' ? '' : this.state.current;

        this.setState({
          current: existing + btn
        });
    }


  }

  render() {
    const buttons = [
      7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, 'x', 0, '/', '.', 'C', '='
    ].map(b => <button key={b} onClick={this.handleButtonClick.bind(this, b)}>{b}</button>)

    return (
      <div className="calculator">
        <input value={this.state.current} readOnly />


        {buttons}


        {/*<button onClick={this.handleButtonClick.bind(this, 7)}>7</button>
        <button onClick={()=>this.handleButtonClick(8)}>8</button>*/}

      </div>
    );
  }
}
