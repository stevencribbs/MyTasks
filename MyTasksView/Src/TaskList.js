import React, { Component } from 'react';
import Task from "./Task.js";

class TaskList extends Component {
    constructor(props) {
        super(props);
        //this.state = { page: "results" };
        this.state = { tasks: this.props.tasks };
    }


    render() {
        let itemStyle = 1;
        const items = this.props.tasks.map((t) => {
            itemStyle = itemStyle == 0 ? 1 : 0;
            return (
                <li key={t.ID}><Task task={t} taskStyle={itemStyle} /></li>
                
            );
        });

        return (
            <div>
                <div className="task-list-header">
                    <label>{this.props.listType}</label>
                </div>
                <div className="task-list">
                    <ol className="task-list-items">{items}</ol>
                    
                </div>
            </div>
        );
    }
}


export default TaskList;