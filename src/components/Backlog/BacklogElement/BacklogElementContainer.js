import React, {useContext, useEffect, useRef, useState} from 'react'
import BacklogElementComponent from "./BacklogElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {createSprint} from "../../../redux/sprints-reducer"
import {createBacklogElement} from "../../../redux/backlog-reducer"
import {LanguageContext} from "../../../context/LanguageContext"


const BacklogElementContainer = (props) => {

    const [isInputVisible, setIsInputVisible] = useState('input-visible')
    const [isCreateTask, setIsCreateTask] = useState(false)
    const taskInputRef = useRef(null)

    const {token} = useContext(AuthContext)
    const {text} = useContext(LanguageContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onSetIsCreateTask = () => {
        !!isCreateTask ? setIsCreateTask(false) : setIsCreateTask(true)
        setIsInputVisible('')
        taskInputRef.current.focus()
    }

    const createSprintHandler = () => {
        props.createSprint({
            is_started: false,
            sprint_name: `BoardSprint ${props.sprints.length !== 0 ? props.sprints[props.sprints.length - 1].id + 1 : 1}`
        }, props.currentProject.scrum_project.id, headers)
    }

    useEffect(() => {
        if (!!taskInputRef) {
            window.addEventListener("mousedown", function (event) {
                if (event.target !== taskInputRef.current) {
                    if (taskInputRef.current !== null) {
                        taskInputRef.current.value = null
                    }
                    setIsCreateTask(false)
                    setIsInputVisible('input-visible')
                }
            })
            return window.removeEventListener("mousedown", function (event) {
                if (event.target !== taskInputRef.current) {
                    if (taskInputRef.current !== null) {
                        taskInputRef.current.value = null
                    }
                    setIsCreateTask(false)
                    setIsInputVisible('input-visible')
                }
            })
        }
    }, [])

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const create_date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            props.createBacklogElement({
                create_date: create_date,
                creator_id: null,
                executor_id: null,
                priority : 'normal',
                task_description: null,
                task_name: taskInputRef.current.value
            }, props.currentProject.scrum_project.id, props.currentUser.id, null, headers)
            taskInputRef.current.value = null
            setIsCreateTask(false)
            setIsInputVisible('input-visible')
        }
    }

    return (
        <>
            <BacklogElementComponent tasks={props.tasks} backlogForProject={props.backlogForProject}
                                     createSprintHandler={createSprintHandler} isInputVisible={isInputVisible}
                                     setBacklogForProject={props.setBacklogForProject} taskInputRef={taskInputRef}
                                     onKeyDown={onKeyDown} onSetIsCreateTask={onSetIsCreateTask}
                                     isCreateTask={isCreateTask} title={props.title} text={text}
                                     currentProject={props.currentProject}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    currentProject: state.projectsReducer.currentProject,
    currentUser: state.userReducer.currentUser,
})

export default compose(
    connect(mapStateToProps, {createSprint, createBacklogElement})
)(BacklogElementContainer)
