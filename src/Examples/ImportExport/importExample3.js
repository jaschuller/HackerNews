// imports can have aliases, which are nescessary when we import functionalities 
// from multiple files that have the same named export
import {firstname as username} from './exportExample';

console.log(username);
// output: Justin