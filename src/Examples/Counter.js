import React, { Component } from 'react';

class Counter extends Component {
  state = { value: 0 };

  // React Class Components can be made much more concise using the class field declarations. 
  // You can initialize local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them.
  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
  };

  render() {
    return (
      <div>
        {this.state.value}

        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    )
  }
}

export default Counter;