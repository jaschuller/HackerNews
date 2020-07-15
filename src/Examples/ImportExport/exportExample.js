const firstname = 'Justin';
const lastname = 'Schuller';

// In JavaScript ES6, you can import and export functionalities from modules. These can be functions, 
// classes, components, constants, essentially anything you can assign to a variable. JavaScript ES6 
// added this as a native behavior

// The act of exporting one or multiple variables is called a named export
// File exports are basically a public API to a file, where only the exported functionalities are available
// to be reused elsewhere. This follows the best practice of encapsulation
export {firstname, lastname};

// see importExample.js importExample2.js and importExample3.js for use