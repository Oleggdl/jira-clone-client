import React, {useContext, useEffect} from 'react'
import TaskBacklogComponent from "./TaskBacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/sprints-reducer"
import {TaskContext} from "../../../context/TaskContext"
import {getCurrentTaskFromServer, setCurrentTask} from "../../../redux/tasks-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {deleteMarksScrum, getMarksScrumAll} from "../../../redux/marksScrum-reducer"

const TaskBacklogContainer = props => {

    const taskScrumId = props.task.task_scrum ? props.task.task_scrum.id : props.task.scrum_task_id.id

    const {setIsTaskInfo} = useContext(TaskContext)
    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const taskInfoHandler = (value) => {
        props.setCurrentTask(value)
    }

    const getCurrentTaskFromServer = (value) => {
        const id = !!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        props.getCurrentTaskFromServer(id, headers)
    }

    useEffect(() => {
        props.getMarksScrumAll(taskScrumId, headers)
    }, [])

    return (
        <>
            <TaskBacklogComponent
                provided={props.provided}
                currentProject={props.currentProject.scrum_project}
                taskInfoHandler={taskInfoHandler} index={props.index} task={props.task}
                getCurrentTaskFromServer={getCurrentTaskFromServer}
                setIsTaskInfo={setIsTaskInfo}
                marksScrumAll={props.marksScrumAll}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject,
    marksScrumAll: state.marksScrumReducer.marksScrumAll
})

export default compose(
    connect(mapStateToProps, {getSprints, setCurrentTask, getCurrentTaskFromServer, getMarksScrumAll, deleteMarksScrum})
)(TaskBacklogContainer)
