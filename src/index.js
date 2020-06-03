import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

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
