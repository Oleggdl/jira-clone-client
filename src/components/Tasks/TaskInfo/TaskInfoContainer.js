import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInfoComponent from "./TaskInfoComponent"
import {useForm} from "antd/es/form/Form"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/sprints-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getCurrentTaskFromServer, updateTaskDescription, updateTaskName} from "../../../redux/tasks-reducer"
import {deleteTask, getBacklogForProject} from "../../../redux/backlog-reducer"
import {getMarksScrum} from "../../../redux/marksScrum-reducer"
import {useMessage} from "../../../hooks/message.hook"
import {LanguageContext} from "../../../context/LanguageContext"

const TaskInfoContainer = (props) => {

    const [isComments, setIsComments] = useState(true)
    const [isCommentsActive, setIsCommentsActive] = useState('button-active')
    const [isHistoryActive, setIsHistoryActive] = useState('')
    const [isTaskNameEditable, setIsTaskNameEditable] = useState(false)
    const [isDeleteTask, setIsDeleteTask] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const message = useMessage()
    const {text} = useContext(LanguageContext)

    useEffect(() => {
        window.M.updateTextFields()
    })

    useEffect(() => {
        message(errorMessage)
    }, [message, errorMessage])

    const isCommentsHandler = () => {
        setIsComments(true)
        setIsCommentsActive('button-active')
        setIsHistoryActive('')
    }

    const isHistoryHandler = () => {
        setIsComments(false)
        setIsCommentsActive('')
        setIsHistoryActive('button-active')
    }

    const taskInfoWrapper = useRef()
    const taskDelRef = useRef()
    const {setIsTaskInfo} = useContext(TaskContext)
    const taskInfoCloseHandler = () => {
        setIsTaskInfo(false)
    }

    const closeTaskInfoHandler = (event) => {
        if (event.target === taskInfoWrapper.current) {
            setIsTaskInfo(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => closeTaskInfoHandler(event))
        return window.removeEventListener("click", event => closeTaskInfoHandler(event))
    }, [])

    const deleteTaskWindowHandler = event => {
        if (event.target === taskDelRef.current) {
            setIsDeleteTask(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => deleteTaskWindowHandler(event))
        return window.removeEventListener("click", event => deleteTaskWindowHandler(event))
    }, [])

    const [form] = useForm()
    const [formTaskName] = useForm()

    const textAreaDescriptionFocus = useRef(null)
    const [isTextAreaFocus, setIsTextAreaFocus] = useState(false)

    const onReset = () => {
        form.resetFields()
        setIsTextAreaFocus(false)
    }

    useEffect(() => {
        props.getMarksScrum(currentTaskScrum.id, headers)
        textAreaDescriptionFocus.current.resizableTextArea.textArea.onfocus = function () {
            setIsTextAreaFocus(true)
        }
    }, [textAreaDescriptionFocus, onReset])

    const currentTaskScrum = !!props.currentTask.scrum_task_id
        ? props.currentTask.scrum_task_id
        : props.currentTask.task_scrum


    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const handleSubmit = values => {
        props.updateTaskDescription(currentTaskScrum.id, {task_description: values.description}, headers)
        setIsTextAreaFocus(false)
    }

    const getCurrentTaskFromServer = (value) => {
        const id = !!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        props.getCurrentTaskFromServer(id, headers)
    }

    const changeTaskNameHandler = values => {
        props.updateTaskName(currentTaskScrum.id, {task_name: values.task_name}, props.currentProject.scrum_project.id, headers)
    }

    const getBacklogForProjectHandler = () => {
        props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
    }

    const confirmDeleteTask = () => {

        const currentTask = props.currentTask.task_scrum
            ? props.currentTask.task_scrum : props.currentTask.scrum_task_id

        if (props.currentUser.username === currentTask.creator_id.username
            || props.currentProject.user_role.id === 1) {
            props.deleteTask(currentTaskScrum.id, props.currentUser.id, props.currentProject.scrum_project.id, headers)
            setIsTaskInfo(false)
            props.updateTaskSprints()
        } else {
            setIsTaskInfo(false)
            props.updateTaskSprints()
            setErrorMessage(`${text("taskInfo.errorDelTask")}`)
            message(`${text("taskInfo.errorDelTask")}`)
        }

    }

    return (
        <>
            <TaskInfoComponent isCommentsHandler={isCommentsHandler} taskInfoCloseHandler={taskInfoCloseHandler}
                               isHistoryHandler={isHistoryHandler} handleSubmit={handleSubmit} onReset={onReset}
                               form={form} taskInfoWrapper={taskInfoWrapper} isTextAreaFocus={isTextAreaFocus}
                               textAreaDescriptionFocus={textAreaDescriptionFocus} isComments={isComments}
                               isCommentsActive={isCommentsActive} isHistoryActive={isHistoryActive} text={text}
                               currentTaskFromServer={props.currentTaskFromServer}
                               getCurrentTaskFromServer={getCurrentTaskFromServer} currentTask={props.currentTask}
                               isTaskNameEditable={isTaskNameEditable} setIsTaskNameEditable={setIsTaskNameEditable}
                               changeTaskNameHandler={changeTaskNameHandler} formTaskName={formTaskName}
                               getBacklogForProjectHandler={getBacklogForProjectHandler} taskDelRef={taskDelRef}
                               setIsDeleteTask={setIsDeleteTask} isDeleteTask={isDeleteTask}
                               confirmDeleteTask={confirmDeleteTask} currentProject={props.currentProject}
                               setIsTextAreaFocus={setIsTextAreaFocus}
            />
        </>
    )
}

const mapStateToProps = state => ({
    currentTask: state.tasksReducer.currentTask,
    currentProject: state.projectsReducer.currentProject,
    currentTaskFromServer: state.tasksReducer.currentTaskFromServer,
    backlogForProject: state.backlogReducer.backlogForProject,
    currentUser: state.userReducer.currentUser,
    isTaskDeleted: state.backlogReducer.isTaskDeleted
})

export default compose(
    connect(mapStateToProps, {
        getSprints, updateTaskDescription, updateTaskName, getCurrentTaskFromServer,
        getBacklogForProject, deleteTask, getMarksScrum
    })
)(TaskInfoContainer)

