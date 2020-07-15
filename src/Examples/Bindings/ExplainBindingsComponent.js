import React, { Component } from 'react';

class ExplainBindingsComponent extends Component {
    constructor() {
        super();

        // The Correct way to bind the method
        this.onClickMe_Proper = this.onClickMe_Proper.bind(this);

        // Bad practice: Binding business logic of the class in the constructor. Doing this
        // will clutter the constructor over time. The constructor is to instantiate your class with all
        // its properties, so business logic of class methods should be defined outside of the constructor.
        this.onClickMe_ConstructorBind = () => {
            console.log(this);
        }
    }

    // properly bound in constructor, so it has the reference to the class instance
    onClickMe_Proper() {
        console.log(this);
    }

    // onClickMe2 this will return undefined, since class methods are not automatically bound to the class instance
    onClickMe_NotBound() {
        console.log(this);
    }
    
    // Class method binding can happen somewhere else too
    // This one is bound in the render() class, however avoid this practice since
    // is bind on every render() run and can hurt the application's performance
    onClickMe_RenderBind() {
        console.log(this);
    }
    
    // Autobinding using JavaScript ES6 arrow function
    // Use this method if repetitive binding in the constructor annoys you
    // The official react documentation sticks to class method binding in the constructor, so 
    // follow onClickMe_Proper implementation for developing by-the-book
    onClick_Autobind = () => {
        console.log(this);
    }
    
    render() {
        return (
            <div>
            <button
                onClick={this.onClickMe_Proper}
                type="button"
            >
                Click Me (Bound in constructor)
            </button>
            <button
                onClick={this.onClickMe_NotBound}
                type="button"
            >
                Not bound
            </button>
            <button
                onClick={this.onClickMe_RenderBind.bind(this)}
                type="button"
            >
                Bounded in render, bad practice
            </button>
            <button
                onClick={this.onClickMe_ConstructorBind}
                type="button"
            >
                Bounded but another bad practice
            </button>
            <button
                onClick={this.onClick_Autobind}
                type="button"
            >
                Autobound using ES6 arrow function
            </button>                                    
            </div>            
        );
    }
}

export default ExplainBindingsComponent;