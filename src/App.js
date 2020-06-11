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
    
    var year = 2020; //number 
    var desert = "cake";
      

// Higher-order Function: We need to pass a value to a function, and return a new function to evaluate a condition based on that value
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
        // component. For instance it can be used in the render() method.
        
        // various ways of setting state
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
                    <Search 
                        value={searchTerm}
                        onChange={this.onSearchChange}    
                    >
                        Filter by
                    </Search>
                    <Table 
                        list={list}
                        pattern={searchTerm}
                        onDismiss={this.onDismiss}
                    />                                         
                                        
                    <h2>{helloWorld}</h2>
                    <div> Welcome user {user.userName}</div>
                    <div> {user.firstName} {user.lastName} Age: {user.age}</div>
                    <br/>
                    <div> In the year {this.state.theyear} it is {isAccurate} that {dinner} and {this.state.dinner} will be on the {doesntExist} {notdefined}</div> 
                    <div> Then we will have some {this.state.desert}!</div>
                </div>
            );             
    }
}

// Composable Components: by passing children prop ("Filter by" used here) the Search 
// component can destructure the children property from the props object and specify
// where it should be displayed (next to the input in this scenario)
// In this way when the Search component is used elsewhere, you can use different entities, since
// it is not just text that can be passed as children. The children property also makes it possible
// to weave components into each other
//
// Functional Stateless Component: functions that take an input and return an output
// the inputs are props, and the output is a component instance in plain JSX
// You cannot update the state because there is no this object
// Additionally, they have no lifecycle methods except for the render() method which is applied implicitly
//
// if we needed to do more with state, we could refactor this into an ES6 functional component
// Use destructuring in the function signature as best practice
const Search = ({value, onChange, children}) =>
        <form>
            {children} <input
                type="text"
                value={value}
                onChange={onChange}
            />
        </form>

const Button = ({onClick, className, children}) =>
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>        


const Table = ({list, pattern, onDismiss}) =>
        <div>
            {list.filter(isSearched(pattern)).map(item =>
                <div key={item.objectID}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span> Author: {item.author}</span>
                    <span> Comments: {item.num_comments}</span>
                    <span> Points: {item.points}</span>
                    <span>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                        >
                            Dismiss
                        </Button>                                        
                    </span>                                                                        
                </div>
            )}
        </div>

export default App;