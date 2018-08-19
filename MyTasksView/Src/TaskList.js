import React, { Component } from 'react';
import Task from "./Task.js";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: this.props.tasks };
    }


    render() {
        let itemStyle = 1;
        const items = this.props.tasks.map((t) => {
            itemStyle = itemStyle == 0 ? 1 : 0;
            return (
                <li key={t.ID}><Task task={t} taskStyle={itemStyle} toggleComplete={this.props.toggleComplete} deleteTask={this.props.deleteTask} /></li>
                
            );
        });

        return (
            <div>
                <div className={this.props.listType == "ToDo" ? "task-list-header-todo" : "task-list-header-completed"} >
                    <label>{this.props.listType}</label>
                    {this.props.listType == "ToDo" && 
                        <img src="./images/add.png" className="task-list-add-img" title="Add Task" onClick={(e) => this.props.addTask()} />
                        }
                </div>
                <div className="task-list">
                    <ol className="task-list-items">{items}</ol>
                </div>
            </div>
        );
    }
}


export default TaskList;