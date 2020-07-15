import React, { Component } from 'react';
import PropTypes from 'prop-types';

// ES6 Class Component. The this object of an ES6 class component helps us to reference the DOM element with the ref attribute.
// The official documentation mentions three cases where you need to access the DOM node (this us usually an anti pattern in React,
// because you should use its declarative way of doing things and its unidirectional data flow).
//  - to use the DOM API (focus, media playback, etc.)
//  - to invoke imperative DOM node animations
//  - to integrate with a third-party library that nees the DOM node (e.g. D3.js)
//
// Composable Components: by passing children prop ("Filter by" in App.js) the Search 
// component can destructure the children property from the props object and specify
// where it should be displayed (as text for a button in this scenario)
// In this way when the Search component is used elsewhere, you can use different entities, since
// it is not just text that can be passed as children. The children property also makes it possible
// to weave components into each other
class Search extends Component {
    // Now you can focus the input field when the component mounted by using the this object, 
    // the appropriate lifecycle method, and the DOM API. The input should be focused when the application renders.
    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }
    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                type="text"
                value={value}
                onChange={onChange}
                ref={el => this.input = el}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        );
    }
}

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}  

export default Search;