import React, { Component } from 'react';
import './App.css';

    // Sample data which will be fetched from an API later on
    const list = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org',
            author: 'Dan Abromov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        }
    ];
    
    
    // Arrow Functions introduced in ES6, they are shorter than a function expression
    // function declaration
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    
    // function(){...} 

    // arrow function declaration
    // () => {...}    
    
    // You can remove the parentheses in the arrow function expression if it only has one argument,
    // but you have to keep the parentheses if it gets multiple arguments           
    
    var myFunc = () => {console.log("A function that doesn't have any parameters")}
    var myFunc2 = (x) => {console.log("A function that doesn't has one param:" + x)}
    var myFunc3 = x => {console.log("A function that doesn't has one param does not need to wrap the param in () :" + x)}
    var myFunc4 = (x, y) => {console.log("A function that has multiple params has to wrap them in ():" + x + y)}
    
    myFunc();
    myFunc2("first param");
    myFunc3("also the first param");
    myFunc4("first param", "and second param");    
    
    // not allowed
    // item, key =>{}    
    
    // Advantages of using Javascript alongside HTML in JSX, you can take some static data and 
    // easily convert the list from one to another as shown below
    const array = [1, 4, 9, 16];
    // pass a funtion to map
    const newArray = array.map(function (x) { return x * 2; });
    console.log(newArray);

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
            age: "41"
        }
                    
        // const and let
        // In JavaScript ES6, you will rarely find var used anymore
        // Variables declared directly with const cannot be changed, however when the variable is
        // an array or object the values it holds can get updated through indirect means
        // Variables declared with let can be changed
        const helloWorld = 'Welcome to the Road to learn React';

        const basicOrArrow = "arrow";
        
        if(basicOrArrow == "basic") {               
            return (
                // Use JSX to render the JavaScript variables and object into HTML                       
                <div className="App">
                    <h2>{helloWorld}</h2>
                    <div> Welcome user {user.userName}</div>
                    <div> {user.firstName} {user.lastName} Age: {user.age}</div>
                    <br/>
                    <div> In the year {year} it is {isAccurate} that {dinner} will be on the {doesntExist} {notdefined}</div> 
                    
                    {list.map(
                        // Use built in JavaScript map functionality in JSX, which iterates over a list of items to display them according to specific attributes
                        // IMPORTANT by specifying a unique key, you are helping React embrace its full potential, in that it can identify modified items
                        // when the list changes. Also you will see a warning about each item needing a unique key in the console if one is not provided. Make
                        // sure that the key is stable (not something like list index, which is prove to change if items in list are reordered)
                        function(item) {
                        return (
                            <div key={item.objectID}>
                                <span>
                                    <a href={item.url}>{item.title}</a>
                                </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                            </div>
                        );
                    })}
                </div>
            );
        } else if(basicOrArrow == "arrow") { // use the arrow function to return, which is equivalent to the above
            return (
                // Use JSX to render the JavaScript variables and object into HTML                       
                <div className="App">
                    <h2>{helloWorld}</h2>
                    <div> Welcome user {user.userName}</div>
                    <div> {user.firstName} {user.lastName} Age: {user.age}</div>
                    <br/>
                    <div> In the year {year} it is {isAccurate} that {dinner} will be on the {doesntExist} {notdefined}</div>                     
                    
                    {list.map(
                        // Use built in JavaScript map functionality in JSX, which iterates over a list of items to display them according to specific attributes
                        // IMPORTANT by specifying a unique key, you are helping React embrace its full potential, in that it can identify modified items
                        // when the list changes. Also you will see a warning about each item needing a unique key in the console if one is not provided. Make
                        // sure that the key is stable (not something like list index, which is prove to change if items in list are reordered)
                        function(item) {
                        return (
                            <div key={item.objectID}>
                                <span>
                                    <a href={item.url}>{item.title}</a>
                                </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                            </div>
                        );
                    })}
                </div>
            );            
        }  
    }
}

export default App;