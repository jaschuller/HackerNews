import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// Enzyme is a testing utility by Airbnb to assert, manipulate, and traverse React components.
// It is used to conduct unit tests to complement snapshot tests in React. These do not come
// bundled with create-react-app
import Enzyme, { shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';

import App from './App';
import Search from './Search';
import Button from './Buttons';
import Table from './Table';

Enzyme.configure({ adapter: new Adaptor() });

// Empty function, needed since these components have functions marked as required in their prop types
const mockFunction = () => {};

// run npm test from HackerNew to execute test

describe('App', () => {

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshop', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

describe('Search', () => {

  it('renders without crashing', () => {
      const div = document.createElement('div');
      // ReactDOM.render(<Search>Search</Search>, div);
      ReactDOM.render(<Search onChange={mockFunction} onSubmit={mockFunction}>Search</Search>, div);      
      ReactDOM.unmountComponentAtNode(div);
    });
  
    test('has a valid snapshop', () => {
      const component = renderer.create(
        <Search onChange={mockFunction} onSubmit={mockFunction}>Search</Search>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  
  });

  describe('Button', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button onClick={mockFunction}>Give Me More</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
    
      test('has a valid snapshop', () => {
        const component = renderer.create(
          <Button onClick={mockFunction}>Give Me More</Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('shows two items in the list', () => {
        // Shallow renders the compnent without its child components, so you can dedicate the test to one component
        const element = shallow(
          <Button onClick={mockFunction}>Click me!</Button>
        );

        expect(element.text().includes("Click me!")).toBe(true);
      });      
    });

    describe('Table', () => {

      const props = {
        list: [
          { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y '},
          { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z '},
        ],
        sortTitle: 'TITLE',
        isSortReverse: false,
        onDismiss: () => {/*Mocked Function */}
      };

      it('renders without crashing', () => {
          const div = document.createElement('div');
      ReactDOM.render(<Table { ...props }/>, div);
          ReactDOM.unmountComponentAtNode(div);
        });
      
        test('has a valid snapshop', () => {
          const component = renderer.create(
            <Table { ...props }/>
          );
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });

        // Enzyme has three rendering mechanism in its API. shallow() as shown above, and also mount() and render()
        //  - Always begin with a shallow test
        //  - If componentDidMount() or componentDidUpdate() should be tested, use moount()
        //  - If you want to test a component's children rendering with less overhead than mount() and you
        //    are not interested in lifecycle methods, use render()
        it('shows two items in the list', () => {
          // shallow renders the compnent without its child components, so you can dedicate the test to one component
          const element = shallow(
            <Table { ...props }/>
          );

          expect(element.find('.table-row').length).toBe(2);
        });
      });    
