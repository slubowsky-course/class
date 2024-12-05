import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    current: '0'
  };

  handleButtonClick(btn) {
    const { last, current, operator } = this.state;
    let result = 0;

    switch (btn) {
      case '+':
      // falls through
      case '-':
      // falls through
      case '*':
      // falls through
      case '/':
        this.setState({
          last: current,
          current: '',
          operator: btn
        });
        break;
      case '=':
        switch (operator) {
          case '+':
            result = Number(last) + Number(current);
            break;
          case '-':
            result = Number(last) - Number(current);
            break;
          case '*':
            result = Number(last) * Number(current);
            break;
          case '/':
            result = Number(last) / Number(current);
            break;
        }
        this.setState({
          last: null,
          current: result.toString(),
          operator: null
        });
        break;
      case 'C':
        this.setState({
          last: null,
          operator: null,
          current: '0'
        });
        break;
      case '.':
        if (current.includes('.'))
          break;
      // falls through
      default:
        this.setState({
          current: current === '0' ? btn.toString() : current + btn
        });
    }
  }

  render() {
    const { current } = this.state;

    const buttons = [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*',
      'C', 0, '.', '/', '='].map(b => <button key={b} onClick={() => this.handleButtonClick(b)}>{b}</button>);

    return (
      <div className="calculator">
        <input type="text" name="" id="" value={current} readOnly />
        {/*<button onClick={() => this.handleButtonClick(7)}>7</button>*/}

        {buttons}
      </div>
    );
  }
}

export default App
