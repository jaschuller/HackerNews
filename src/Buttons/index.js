import React from 'react';
import PropTypes from 'prop-types';

// Functional Stateless Component: functions that take an input and return an output
// the inputs are props, and the output is a component instance in plain JSX
// You cannot update the state because there is no this object
// Additionally, they have no lifecycle methods except for the render() method which is applied implicitly
//
// if we needed to do more with state, we could refactor this into an ES6 functional component
// Use destructuring in the function signature as best practice
const Button = ({onClick, className, children}) =>
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>

// In ES6 className could be defined in the component signature with a default parameter.
// However another way is to use default prop to ensure the property is set to a default value when
// the parent component does not specify it.
Button.defaultProps = {
    className: '',
};        

// React comes with a built in type checker to prevent bugs. You can use PropTypes to
// describe your component interface. All the props passed from a parent compnent to a child
// get validated based on the PropTypes interface assigned to the child.
Button.propTypes = {
    // Using isRquired makes the property required, otherwise it can be null or undefined
    onClick: PropTypes.func.isRequired,
    // className is not required because it can default to an empty string
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default Button;