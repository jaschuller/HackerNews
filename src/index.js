import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import ExplainBindingsComponent from './Examples/Bindings/ExplainBindingsComponent';
// import Counter from './Examples/Counter';
// import * as serviceWorker from './serviceWorker';

// Uses a DOM node in your HTML to replace it with JSX. This way you can
// integrat React in any foreign application easily, and you can use ReactDOM.render()
// multiple times im your application. In a plain React application you would only use it
// once to bootstrap the component tree
ReactDOM.render(<App />, document.getElementById('root'));

// Bindings demonstration
// ReactDOM.render(<ExplainBindingsComponent />, document.getElementById('root'));

// Concise class field declarations
// ReactDOM.render(<Counter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

// Hot Module Replacement
// This is not required, however it makes debugging super easy
// Rather than refresh the entire page on save, Hot Module Replacement lets you 
// keep the state of the page and only update areas that have changed
// Therefore, if you are in something like a modal or multi step situation, you can
// update the code without losing the data in the UI, console logs, etc
if (module.hot) {
    module.hot.accept();
}
