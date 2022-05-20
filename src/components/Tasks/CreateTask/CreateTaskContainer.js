import React, {useContext, useEffect, useRef} from 'react'
import CreateTaskComponent from "./CreateTaskComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrentProject, getProjects} from "../../../redux/projects-reducer"
import {createBacklogElement} from "../../../redux/backlog-reducer"
import {getUsersOnProject} from "../../../redux/tasks-reducer"
import {LanguageContext} from "../../../context/LanguageContext"

const CreateTaskContainer = props => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const {text} = useContext(LanguageContext)

    const executorRef = useRef(null)

    const onReset = () => {
        form.resetFields()
    }

    const getExecutorsHandler = (id) => {
        props.getUsersOnProject(id, headers)
    }

    const handleSubmit = values => {
        props.createBacklogElement({
            create_date: values.create_date,
            creator_id: null,
            priority : 'normal',
            executor_id: null,
            task_description: values.task_description,
            task_name: values.task_name
        }, values.project, props.currentUser.id, values.executor_id, headers)
        onReset()
    }

    useEffect(() => {
        props.getProjects(props.currentUser.id, headers)
    }, [])

    return (
        <>
            <CreateTaskComponent handleSubmit={handleSubmit} onReset={onReset} form={form} projects={props.projects}
                                 sprints={props.sprints} currentUser={props.currentUser} executorRef={executorRef}
                                 usersOnProject={props.usersOnProject} getExecutorsHandler={getExecutorsHandler}
                                 text={text}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    sprints: state.sprintsReducer.sprints,
    currentUser: state.userReducer.currentUser,
    usersOnProject: state.tasksReducer.usersOnProject
})

export default compose(
    connect(mapStateToProps, {getProjects, createBacklogElement, getUsersOnProject, getCurrentProject})
)(CreateTaskContainer)




