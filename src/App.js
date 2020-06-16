import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100'; // number of results returned per page of pagination

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// App is a derived class since it extends component
class App extends Component {
    
    // calling super(props) from Component sets this.props so that we can access
    // properties using this.props (they would be undefined otherwise) in the constructor
    // Constructor: Lifecycle method which is only called when an instance of the component is created and inserted
    // into the DOM. The component gets instantiated in a process called mounting.
    constructor(props) {
        
        // super.method calls the parent method. super(...) here calls the parent constructor
        super(props);
        
        // state is bound to the class using the this object, so you can access the local state of the whole
        // component. For instance it can be used in the render() method.
        
        // various ways of setting state
        this.state = {
            result: null,
            // set initial search state
            searchTerm: DEFAULT_QUERY,
        };
        
        // the method is bound to the class (which is why is uses this) and thus becomes a class method
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    setSearchTopStories(result) {
        const { hits, page } = result;

        const oldHits = page !== 0
            ? this.state.result.hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({ 
            result: { hits: updatedHits, page } 
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        // the page argument uses JavaScript ES6 default parameter to introduce the fallback to page 0
        // in case no defined page argument is provided for the function
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }    

    // Combined with the button that calls onDismiss, this is an example of the Unidirectional data flow of React
    // An action is triggered in the view layer with onClick(), a function or class method modified the local component state,
    // and then the render() method of the component runs again to update the view.
    onDismiss(id) {

        const isNotId = item => item.objectID !== id;

        // whole function can be defined in a single line with the disadvantage that it might be less readable
        const updatedHits = this.state.result.hits.filter(isNotId);
        
        // React embraces immutable data structures, so we don't want to mutate an object (or mutate the state directly).
        // We want to generate a new object based on the information given, so none of the objects get altered and we keep the immutable 
        // data structures. You will always return a new object, but never alter the original object
        //
        // For this, we use JavaScript ES6's Object.assign(). It taks a target bjects as first argument. All following arguments
        // are source objects, which are merged into the target object. The target object can be an empty object. It embraces immutability,
        // because no source object gets mutated.
        //
        // Source objects wtill override previously merged objects with the same property name.
        // const updatedResult = Object.assign({}, this.state.result, updatedHits);


        // use setState to update the state with the new list, containing all items except for the one that matched the 
        // id if the list element clicked
        this.setState({
            // result: Object.assign({}, this.state.result, {hits:updatedHits})
            // Can also be done with object spread operator (its not ES6, it is part of proposal for next JS version, and already being
            // used by the React community). Works just like the JS ES6 array spread operator, but for objects. Each key value pair is copied
            // into a new object.
            result: {...this.state.result, hits: updatedHits}
        });
    }    

    // componentDidMount is one of the lifecycle methods. It is called once, when the component is mounted (put into the DOM).
    // fetch the top stories when the element is first mounted 
    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
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

    // fetch the top stories whenever search is submitted
    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);

        // if you try to search without this, the browser will reload. That's a native browser behavior
        // for a submit callback in an HTML form. In React, you will often come across the preventDefault()
        // event method to suppress the native browser behavior
        event.preventDefault();
    }    
        
    render() { 
        
        // ES6 use destructuring to set values
        const { searchTerm, result } = this.state;
        const page = (result && result.page) || 0;        

        if (!result) { return null; }                    
        
        return (
            // Use JSX to render the JavaScript variables and object into HTML
            // IMPORTANT Controlled Components vs Uncontrolled Components
            // Form elements such as <input>, <textarea>, and <select> hold their own
            // state in plain HTML. They modify the value internally once someone changes
            // it from the outside. In React, thats called an uncontrolled component, because
            // it handles its own state. We want to make sure those elements are controlled components
            // instead. Therefore we will set value of the input, set value={searchTerm}                       
            // This creates a self-contained unidirectional data flow loop, and the local component state
            // is the single source of truth for the input field. 
            <div className="page">
                <div className="interactions">
                    <Search 
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}    
                    >
                        Filter by
                    </Search>
                </div>
                { result && 
                    <Table 
                    list={result.hits}
                    onDismiss={this.onDismiss}
                />
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
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
const Search = ({
        value, 
        onChange,
        onSubmit, 
        children
    }) =>
        <form onSubmit={onSubmit}>
             <input
                type="text"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                {children}
            </button>
        </form>

const Button = ({onClick, className, children}) =>
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>        


const largeColumn = {
    width: '40%',
}

const midColumn = {
    width: '30%',
}

const smallColumn = {
    width: '10%',
}

const Table = ({list, onDismiss}) =>
        <div className="table">
            {list.map(item =>
                <div key={item.objectID} className="table-row">
                    <span style={largeColumn}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={midColumn}> Author: {item.author}</span>
                    <span style={smallColumn}> Comments: {item.num_comments}</span>
                    <span style={smallColumn}> Points: {item.points}</span>
                    <span style={smallColumn}>
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