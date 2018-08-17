import React, { Component } from 'react';
import TaskList from "./TaskList.js";
import API from './Api';

class App extends Component {
    constructor(props) {
        super(props);
        //this.state = { page: "results" };
        this.state = {
            toDoTasks: [],
            completedTasks: []
        }
    }

    async getTasksByStatus(status) {
        status = status == 1 ? 1 : 0; //check for valid status value
        const res = await API.get('tasks/tasksByStatus/' + status);
        return res.data;
    }

    componentDidMount() {
        const self = this;
        this.getTasksByStatus(0).then((res) => self.setState({ toDoTasks: res }));
        this.getTasksByStatus(1).then((res) => self.setState({ completedTasks: res }));
        

    }

    render() {
        const toDoTasks = this.state.toDoTasks;
        const completedTasks = this.state.completedTasks;
        return (
            <div className="app">
                <header className="app-header">
                    <label className="app-title">MyTasks - A To-Do List Manager to Keep You Organized</label>
                </header>
                <TaskList listType="ToDo" tasks={toDoTasks} />
                <TaskList listType="Completed" tasks={completedTasks} />
            </div>
        );
    }
}


export default App;