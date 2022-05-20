import React, {useContext, useEffect, useRef, useState} from 'react'
import CommentsComponent from "./CommentsComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {createCommentScrum, getCommentsScrum} from "../../../redux/commentsScrum-reducer"
import {LanguageContext} from "../../../context/LanguageContext"

const CommentsContainer = (props) => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)
    const {text} = useContext(LanguageContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onReset = () => {
        form.resetFields()
        setIsTextAreaAddCommentFocus(false)
    }

    const handleSubmit = values => {
        props.createCommentScrum(props.currentProject.id, props.currentTask?.task_scrum
            ? props.currentTask?.task_scrum?.id
            : props.currentTask?.scrum_task_id?.id, values, headers)
        onReset()
    }

    const textAreaAddComment = useRef(null)
    const [isTextAreaAddCommentFocus, setIsTextAreaAddCommentFocus] = useState(false)

    useEffect(() => {
        textAreaAddComment.current.resizableTextArea.textArea.onfocus = function () {
            setIsTextAreaAddCommentFocus(true)
        }
    }, [textAreaAddComment, onReset])

    useEffect(() => {
        const taskId = props.currentTask?.task_scrum ? props.currentTask?.task_scrum?.id
            : props.currentTask?.scrum_task_id?.id
        props.getCommentsScrum(taskId, headers)
    }, [])

    return (
        <>
            <CommentsComponent form={form} handleSubmit={handleSubmit} onReset={onReset} text={text}
                               textAreaAddComment={textAreaAddComment} currentUser={props.currentUser}
                               isTextAreaAddCommentFocus={isTextAreaAddCommentFocus}
                               commentsScrum={props.commentsScrum} currentProject={props.currentProject}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    commentsScrum: state.commentsScrumReducer.commentsScrum,
    currentTask: state.tasksReducer.currentTask,
    currentProject: state.projectsReducer.currentProject,
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {getCommentsScrum, createCommentScrum})
)(CommentsContainer)

