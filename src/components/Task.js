import React from 'react';

class Task extends React.Component {
    constructor() {
        super();
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleDragStart(event) {
        this.props.onDragStart(event, this.props.id);
    }

    handleDragEnd() {
        this.props.onDragEnd();
    }

    render() {
        const {background, name, isDragging} = this.props;
        const className = `draggable draggable-${background} ${isDragging ? 'draggable-dragging' : ''}`;
        return (
            <div
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                draggable
                className={className}
            >
                {name}
            </div>
        );
    }
}

export default Task;
