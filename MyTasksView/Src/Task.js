import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);
        //this.state = { page: "results" };
    }


    render() {
        const taskClass = this.props.taskStyle == 1 ? "task-b" : "task-a";
        return (
            <div className={taskClass}>
                
                <p className="task-msg">{this.props.task.Data}</p>
            </div>
        );
    }
}


export default Task;