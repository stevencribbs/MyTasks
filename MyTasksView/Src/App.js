import React, { Component } from 'react';
import TaskList from "./TaskList.js";
import API from './Api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoTasks: [],
            completedTasks: []
        }
        this.toggleComplete = this.toggleComplete.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    async getTasksByStatus(status) {
        status = status == 1 ? 1 : 0; //check for valid status value
        const res = await API.get('tasks/tasksByStatus/' + status);
        return res.data;
    }

    componentDidMount() {
        this.populateListsByStatus();
    }

    populateListsByStatus() {
        const self = this;
        this.getTasksByStatus(0).then((res) => self.setState({ toDoTasks: res }));
        this.getTasksByStatus(1).then((res) => self.setState({ completedTasks: res }));
    }

    addTask() {
        var task = {
            Status: 0,
            Data: "",
            Category: "",
            Priority: 0,
            Owner: 1,
            TaskOrder: 0
        }
        const self = this;
        API.post('tasks/addTask/', task).then((response) => {
            console.log(response);
            self.populateListsByStatus();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    toggleComplete(id, status) {
        var task = { Status: status };
        const self = this;
        API.put('tasks/updateTask/' + id, task).then((response) => {
            console.log(response);
            self.populateListsByStatus();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    deleteTask(id) {
        const self = this;
        API.delete('tasks/deleteTask/' + id).then((response) => {
            console.log(response);
            self.populateListsByStatus();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const toDoTasks = this.state.toDoTasks;
        const completedTasks = this.state.completedTasks;
        return (
            <div className="app">
                <header className="app-header">
                    <label className="app-title">MyTasks - A To-Do List Manager to Keep You Organized</label>
                </header>
                <div className="container-fluid">
                  <div className="row">
                        <div className="col-md-6"><TaskList listType="ToDo" tasks={toDoTasks} addTask={this.addTask} toggleComplete={this.toggleComplete} deleteTask={this.deleteTask} /></div>
                        <div className="col-md-6"><TaskList listType="Completed" tasks={completedTasks} toggleComplete={this.toggleComplete} deleteTask={this.deleteTask} /></div>
                  </div>
                </div>
            </div>
        );
    }
}


export default App;