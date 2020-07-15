import React from 'react';
import PropTypes from 'prop-types';

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