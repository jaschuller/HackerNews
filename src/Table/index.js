import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import Button from '../Buttons';
// get our fontawesome imports
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(), // use .reverse() to see the list sorted by highest number of comments
    POINTS: list => sortBy(list, 'points').reverse(), // use .reverse() to see the list sorted by highest number of points
}

const Sort = ({ 
    sortKey,
    activeSortKey, 
    onSort,
    isSortReverse, 
    children 
}) => {
    /* define sortClass more efficiantly using classnames library */
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey}
    );

    // Show a sort icon if current sort instance is being activated, otherwise don't show any icon
    let sortIcon = null;
    if (sortKey===activeSortKey)
        sortIcon = (sortKey===activeSortKey && isSortReverse) ? sortUp : sortDown;   

    return (
        <Button 
        onClick={() => onSort(sortKey)}
        className={sortClass}
    >
        {children} {sortIcon}
    </Button>
    );
}

const largeColumn = {
    width: '40%',
}

const midColumn = {
    width: '30%',
}

const smallColumn = {
    width: '10%',
}

const sortDown = <FontAwesomeIcon icon={faSortDown} />
const sortUp = <FontAwesomeIcon icon={faSortUp} />

// Moving substate from one component to another is known as lifting state. We want to move
// state that isnt used in the App component into the Table component, down from parent to child 
// component. To start change table component from a functional stateless component to an ES6 class
// component.
class Table extends Component {

    // After refactoring into ES6 class and adding a constructor, we can move state and class methods
    // with the sort functionality from the App component down into the Table component
    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
            sortIcon: sortDown,
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && 
          !this.state.isSortReverse;

        this.setState({ sortKey, isSortReverse });
    }    

    render() {
        const {
            list, 
            onDismiss
        } = this.props;

        const {
            sortKey,
            isSortReverse
        } = this.state;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;        

        return(
            <div className="table">
                <div className="table-header">
                    <span style={{ width: '40%'}}>
                        <Sort
                            sortKey={'TITLE'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                            isSortReverse={isSortReverse}
                        >
                            Title
                        </Sort>
                    </span>
                    <span style={{ width: '30%'}}>
                        <Sort
                            sortKey={'AUTHOR'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                            isSortReverse={isSortReverse}
                        >
                            Author
                        </Sort>
                    </span>
                    <span style={{ width: '10%'}}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                            isSortReverse={isSortReverse}
                        >
                            Comments
                        </Sort>
                    </span>
                    <span style={{ width: '10%'}}>
                        <Sort
                            sortKey={'POINTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                            isSortReverse={isSortReverse}
                        >
                            Points
                        </Sort>
                    </span>
                    <span style={{ width: '10%'}}>
                        Archive
                    </span>                                                                
                </div>
                {reverseSortedList.map(item =>
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
        );
    }
}

// While the above works, you can define the content of an array PropType more explicity
Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
}

export default Table;