import React, { Component } from 'react';
import API from './Api';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = { task: props.task }
    }

    handleChange(e) {
        var data=e.target.value;
        var task = { Data: e.target.value };
        API.put('tasks/updateTask/' + this.state.task.ID, task).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    render() {
        const taskClass = this.props.taskStyle == 1 ? "task-b" : "task-a";
        return (
            <div className={taskClass}>
                <div className="input-group">
                    <div className="input-group-addon"><img src={this.props.task.Status == 1 ? "./images/checkmark.png" : "./images/lightbulb.png"} className="task-img-icon" /></div>
                    <textarea type="text" className="form-control vresize task-msg" id="taskMsg" placeholder="enter task message" onChange={(e)=>this.handleChange(e)} defaultValue={this.props.task.Data} ></textarea>
                    <div className="input-group-addon">
                        {this.props.task.Status == 1 ? (
                            <img src="./images/undo.png" title="Mark as Todo" className="task-img-work" onClick={(e) => this.props.toggleComplete(this.state.task.ID, 0)} />
                        ) : (
                            <img src="./images/checkmarkcircle.png" title="Mark as Complete" className="task-img-work" onClick={(e) => this.props.toggleComplete(this.state.task.ID, 1)} />
                            )}
                        <img src="./images/delete.png" title="Delete Task" className="task-img-work" onClick={(e) => this.props.deleteTask(this.state.task.ID)} />
                    </div>
                </div>
            </div>
        );
    }
}


export default Task;