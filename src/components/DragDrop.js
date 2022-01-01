import React from 'react';
import Task from './Task';

class DragDrop extends React.Component {
    constructor() {
        super();

        this.state = {
            dragging: '',
            tasks: [
                {
                    id: 'ff349d19-5004-137e-3aa5-ff61f638eb85',
                    name:'Task 1',
                    category: 'wip',
                    background: 'yellow'
                },
                {
                    id: '8319aaa1-0551-1d85-9e90-49a327cb6a94',
                    name:'Task 2',
                    category: 'wip',
                    background: 'pink'
                },
                {
                    id: '6e4b1b37-4ec8-558c-68af-2fc77477e9d2',
                    name:'Task 3',
                    category: 'complete',
                    background: 'skyblue'
                },
                {
                    id: 'b6140259-ff9c-c376-19b0-c3f1329dd10b',
                    name:'Task 4',
                    category: 'complete',
                    background: 'green'
                }
            ]
        };

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDropWip = this.handleDropWip.bind(this);
        this.handleDropComplete = this.handleDropComplete.bind(this);
    }

    handleDragStart(event, id) {
        event.dataTransfer.setData('id', id);
        this.setState({dragging: id});
        // For
        // event.dataTransfer.setData('text/plain', id);
    }

    handleDragEnd() {
        this.setState({dragging: ''});
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDropWip(event) {
        const {tasks} = this.state;
        const id = event.dataTransfer.getData('id');
        // For IE
        // const id = event.dataTransfer.getData('text');
        this.setState({
            dragging: '',
            tasks: tasks.map(task => {
                if (task.id === id) {
                    task.category = 'wip';
                }
                return task;
            })
        });
    }

    handleDropComplete(event) {
        const {tasks} = this.state;
        const id = event.dataTransfer.getData('id');
        // For IE
        // const id = event.dataTransfer.getData('text');
        this.setState({
            dragging: '',
            tasks: tasks.map(task => {
                if (task.id === id) {
                    task.category = 'complete';
                }
                return task;
            })
        });
    }

    render() {
        const {tasks} = this.state;
        const reduced = tasks.reduce((memo, task) => {
            memo[task.category].push(
                <Task
                    {...task}
                    key={task.id}
                    isDragging={task.id === this.state.dragging}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />
            );
            return memo;
        }, {wip: [], complete: []});
        return (
            <div className="drag-container">
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div
                    className="wip"
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDropWip}
                >
                    <span className="task-header">WIP</span>
                    {reduced.wip}
                </div>
                <div
                    className="droppable"
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDropComplete}>
                    <span className="task-header">COMPLETED</span>
                    {reduced.complete}
                </div>
            </div>
        );
    }
}

export default DragDrop;
