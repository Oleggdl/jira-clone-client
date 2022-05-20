import React, {useContext} from 'react'
import TaskBoardComponent from "./TaskBoardComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrentTaskFromServer, setCurrentTask} from "../../../redux/tasks-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getMarksScrumAll} from "../../../redux/marksScrum-reducer"
import {TaskContext} from "../../../context/TaskContext"
import {getStartedSprint} from "../../../redux/sprints-reducer"

const TaskBoardWithTaskContext = props => {
    const {setIsTaskInfo} = useContext(TaskContext)
    return <TaskBoardContainer setIsTaskInfo={setIsTaskInfo} {...props}/>
}


class TaskBoardContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {}
        }

    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.headers !== prevState.headers) {
            this.props.getMarksScrumAll(this.props.taskSprint?.task_scrum.id, this.state.headers)
        }
        if (this.props.usersOnProject !== prevProps.usersOnProject) {
            this.props.getStartedSprint(this.props.currentProject.scrum_project.id, this.state.headers)
        }
    }

    taskInfoHandler = (value) => {
        this.props.setCurrentTask(value)
    }

    getCurrentTaskFromServer = (value) => {
        const id = !!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        this.props.getCurrentTaskFromServer(id, this.state.headers)
    }

    render() {

        return (
            <>
                <TaskBoardComponent taskInfoHandler={this.taskInfoHandler} taskSprint={this.props.taskSprint}
                                    currentProject={this.props.currentProject.scrum_project}
                                    getCurrentTaskFromServer={this.getCurrentTaskFromServer}
                                    setIsTaskInfo={this.props.setIsTaskInfo} marksScrumAll={this.props.marksScrumAll}
                                    provided={this.props.provided}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    marksScrum: state.marksScrumReducer.marksScrum,
    marksScrumAll: state.marksScrumReducer.marksScrumAll,
    usersOnProject: state.tasksReducer.usersOnProject
})

export default compose(
    connect(mapStateToProps, {getCurrentTaskFromServer, setCurrentTask, getMarksScrumAll, getStartedSprint})
)(TaskBoardWithTaskContext)
