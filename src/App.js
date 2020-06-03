import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {        
        
        // JavaScript primitives
        var dinner = "Turkey"; //string
        var year = 2020; //number
        var isAccurate = true; //boolean
        var doesntExist = null;
        var notdefined = undefined;
        
        // JavaScript object
        var user = {
            userName: "jdoe",
            firstName: "John",
            lastName: "Doe",
            age: "40"
        }
        
        // const and let
        // In JavaScript ES6, you will rarely find var used anymore
        // Variables declared directly with const cannot be changed, however when the variable is
        // an array or object the values it holds can get updated through indirect means
        // Variables declared with let can be changed
        const helloWorld = 'Welcome to the Road to learn React';
         
       
        return (
            /* Use JSX to render the JavaScript variables and object into HTML */
            <div className="App">
                <h2>{helloWorld}</h2>
                <div> Welcome user {user.userName}</div>
                <div> {user.firstName} {user.lastName} Age: {user.age}</div>
                <br/>
                <div> In the year {year} it is {isAccurate} that {dinner} will be on the {doesntExist} {notdefined}</div> 
            </div>
        );
    }
}

export default App;