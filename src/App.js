import React, { Component } from 'react';
import './App.css';

    // ES5
    var userES5 = {
        name: 'Robin',
    };
    
    // ES6 Object Initializer: allows you to use computed property names to allocate values by key in an object dynamically
    // This is a handy way to generate lookup tables in JavaScript
    const key = 'name';
    const user = {
        [key]: 'Robin',
    };

    var animals = {
        dog: "mutt",
        fish: "guppy",
    }

    // ES6 destructing assignment lets you unpack values from arrays, or properties from objects,
    // into destinct variables.
    // ES6 Destructuring provides easier access to properties in objects and arrays
    // const {dog, fish} = animals; object can be done in only one line!
    // better tp use multilines for readability though
    const {
        dog,
        fish,
    } = animals;
    console.log("ES6 " + dog + " " + fish); // variable names have to match

    // ES5 version
    var mydog = animals.dog;
    var myguppy = animals.fish;
    console.log("ES5 " + mydog + " " + myguppy);

    // also works with arrays, names do not have to match for arrays
    const users = ['Justin', 'Ben', 'Spencer'];
    const [
        userOne,
        userTwo,
        userThree
    ] = users;
    console.log("users: " + userOne + " " + userTwo + " " + userThree);
    
    // ES5
    var userServiceES5 = {
        getUserName: function (user) {
            return user.firstName + ' ' + user.lastName;
        },
    };
    
    // JavaScripts built in filter functionality. The functions takes in a list and iterates over them, returning a new list
    // (it doesnt mutate the old ones)
    const words = ['spray', 'limit', 'elite', 'exurberant', 'destruction', 'present'];
    const filteredWords = words.filter(function (word) { return word.length < 6});
    console.log("the words are: " + filteredWords);
    
    // ES6 Object Initializer you can initialize method in an object more concisely using shorthand method names
    const userService = {
        getUserName(user) {
            return user.firstName + ' ' + user.lastName;
        },
    };

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
    
    var year = 2020; //number 
    var desert = "cake";
    
    
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

// Higher-order Function: We need to pass a value to a function, and return a new function to evaluate a condition based on that value 
function isSearched_OldVersion(searchTerm) {
    return function (item) {
        // some condition which returns true or false
        // ES5 version using indexOf. If whats typed into searchTerm is contained within
        // the title, the index returns. If not -1 will return. Therefore return false when searchTerm does
        // not exist within title
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
}

// Higher-order Function: We need to pass a value to a function, and return a new function to evaluate a condition based on that value
// functionaly the same as above, but written concisely using arrow function
const isSearched = searchTerm => item =>
    // includes is an ES6 feature
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

// App is a derived class since it extends component
class App extends Component {
    
    // calling super(props) from Component sets this.props so that we can access
    // properties using this.props (they would be undefined otherwise) in the constructor
    constructor(props) {
        
        // super.method calls the parent method. super(...) here calls the parent constructor
        super(props);
        
        // state is bound to the class using the this object, so you can access the local state of the whole
        // component. For instance it can be used in the render() method. Using list in this way retrieves if from the local
        // state of the component
        
        // the first variable is the one that will be in the state, set to the value of the second one
        this.state = {            
            theyear: year,
            dinner: "Lobster",
            // ES6 Object Initializer, when the property name in your object is the same as your variable name, you can do the following
            desert,
            list,
            // set initial search state
            searchTerm: '',
        }
        
        // the method is bound to the class (which is why is uses this) and thus becomes a class method
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    // Combined with the button that calls onDismiss, this is an example of the Unidirectional data flow of React
    // An action is triggered in the view layer with onClick(), a function or class method modified the local component state,
    // and then the render() method of the component runs again to update the view.
    onDismiss(id) {
        debugger;
        /* function isNotId (declared with arrows), takes item as a param, and returns that same item if it does not match id
        const isNotId = item => item.objectID !== id;
        
        // loop over all the list items and call isNotId on each one
        const updatedList = this.state.list.filter(isNotId);
        */
        
        // whole function can be defined in a single line with the disadvantage that it might be less readable
        const updatedList = this.state.list.filter(item => item.objectID !== id);
        
        // use setState to update the state with the new list, containing all items except for the one that matched the 
        // id if the list element clicked
        this.setState({list: updatedList});
    }

    // When using a handler in your element, you get access to the synthetic React event in your callback function's signatureate
    // the event has the value of the input field in its target object, so you can update the local state with a search term
    // using this.setState()
    onSearchChange(event) {
        // Reacts setState is a shallow merge, which means that it preserves the values of sibling properties 
        // in the state object when it updates a property 
        this.setState({searchTerm: event.target.value})
        console.log(event.target.value);
    }
        
    render() { 
        
        // ES6 use destructuring to set values
        const { searchTerm, list } = this.state;

        // ES5 way would look like this
        /* 
            var searchTerm = this.state.searchTerm;
            var list = this.state.list;
        */
            
        // JavaScript primitives
        var dinner = "Turkey"; //string        
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
        
        if(basicOrArrow === "arrow") {
            return (
                // Use JSX to render the JavaScript variables and object into HTML
                // IMPORTANT Controlled Components vs Uncontrolled Components
                // Form elements such as <input>, <textarea>, and <select> hold their own
                // state in plain HTML. They modify the value internally once someonce changes
                // it from the outside. In React, thats called an uncontrolled component, because
                // it handles its own state. We want to make sure those elemens are controlled components
                // instead. Therefore we will set value of the input, set value={searchTerm}                       
                // This creates a self-contained unidirectional data flow loop, and the local component state
                // is the single source of truth for the input field. 
                <div className="App">                                                        
                    <form>
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={this.onSearchChange} 
                        />
                    </form>
                                        
                    <h2>{helloWorld}</h2>
                    <div> Welcome user {user.userName}</div>
                    <div> {user.firstName} {user.lastName} Age: {user.age}</div>
                    <br/>
                    <div> In the year {this.state.theyear} it is {isAccurate} that {dinner} and {this.state.dinner} will be on the {doesntExist} {notdefined}</div> 
                    <div> Then we will have some {this.state.desert}!</div>
                    
                    {/* filter the list elements by the search term, then map whats left into item objects */}
                    {list.filter(isSearched(searchTerm)).map(item => {
                    
                            // Event handling: pass this function into the onClick for the button
                            // Alternatively you can define the function inline as shown for "Dismiss inline" 
                            const onHandleDismiss = () => this.onDismiss(item.objectID);
                            
                            // Use built in JavaScript map functionality in JSX, which iterates over a list of items to display them according to specific attributes
                            // IMPORTANT by specifying a unique key, you are helping React embrace its full potential, in that it can identify modified items
                            // when the list changes. Also you will see a warning about each item needing a unique key in the console if one is not provided. Make
                            // sure that the key is stable (not something like list index, which is prove to change if items in list are reordered)
                            
                            // item => { replaces the need for function(item) {
                            return (
                                <div key={item.objectID}>
                                    <span>
                                        <a href={item.url}>{item.title}</a>
                                    </span>
                                    <span> Author: {item.author}</span>
                                    <span> Comments: {item.num_comments}</span>
                                    <span> Points: {item.points}</span>
                                    <span>
                                        <button
                                            onClick={onHandleDismiss}
                                            type="button"
                                        >
                                        Dismiss
                                        </button>                                        
                                        <button
                                            onClick={()=>this.onDismiss(item.objectID)}
                                            type="button"
                                        >
                                        Dismiss inline
                                        </button>
                                    </span>
                                    <span>
                                        <button
                                            onClick={console.log("this runs when the application is opened in the browser, not on button click: " + item.objectID)}
                                            type="button"
                                        >
                                        On app load
                                        </button>
                                    </span>
                                    <span>
                                        <button
                                            onClick={function() {
                                                console.log("since this is a function it works on click " + item.objectID);
                                            }}
                                            type="button"
                                        >
                                        On click
                                        </button>
                                        <button
                                            onClick={()=> console.log("same as above but using arrow function " + item.objectID)}
                                            type="button"
                                        >
                                        Another way
                                        </button>                                        
                                    </span>                                                                        
                                </div>
                            );
                        }
                    )}
                </div>
            );            
        } else if(basicOrArrow === "basic") { // use the arrow function to return, which is equivalent to the above
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