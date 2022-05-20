import React, {useContext, useState} from 'react'
import CommentElementComponent from "./CommentElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteCommentScrum, updateCommentScrum} from "../../../../redux/commentsScrum-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {useForm} from "antd/es/form/Form"
import {LanguageContext} from "../../../../context/LanguageContext"


const CommentElementContainer = (props) => {

    const [form] = useForm()
    const {text} = useContext(LanguageContext)

    const [isConfirmWindow, setIsConfirmWindow] = useState(false)
    const [isChangeComment, setIsChangeComment] = useState(false)

    const deleteHandler = () => {
        setIsConfirmWindow(true)
    }

    const onReset = () => {
        form.resetFields()
        setIsChangeComment(false)
    }

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const confirmHandler = (id) => {
        if (props.comment.user_id.users.id === props.currentUser.id || props.currentProject.user_role.id === 1) {
            props.deleteCommentScrum(id, props.currentTask?.task_scrum ? props.currentTask?.task_scrum?.id
                : props.currentTask?.scrum_task_id?.id, headers)
            setIsConfirmWindow(false)
        } else {
            console.log("You can't delete comment")
        }

    }

    const cancelHandler = () => {
        setIsConfirmWindow(false)
    }

    const changeCommentHandler = () => {
        !!isChangeComment ? setIsChangeComment(false) : setIsChangeComment(true)
    }

    const onChangeComment = (id, values) => {
        if (props.comment.user_id.users.id === props.currentUser.id || props.currentProject.user_role.id === 1) {
            props.updateCommentScrum(id, {
                content: values.content,
                is_changed: true
            }, props.currentTask?.task_scrum ? props.currentTask?.task_scrum?.id
                : props.currentTask?.scrum_task_id?.id, headers)
        } else {
            console.log("You can't change comment")
        }
        onReset()
    }

    return (
        <>
            <CommentElementComponent comment={props.comment} isConfirmWindow={isConfirmWindow} text={text}
                                     deleteHandler={deleteHandler} cancelHandler={cancelHandler}
                                     confirmHandler={confirmHandler} changeCommentHandler={changeCommentHandler}
                                     isChangeComment={isChangeComment} setIsChangeComment={setIsChangeComment}
                                     form={form} onReset={onReset} onChangeComment={onChangeComment}
                                     currentUser={props.currentUser} currentProject={props.currentProject}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    commentsScrum: state.commentsScrumReducer.commentsScrum,
    currentTask: state.tasksReducer.currentTask,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {deleteCommentScrum, updateCommentScrum})
)(CommentElementContainer)
