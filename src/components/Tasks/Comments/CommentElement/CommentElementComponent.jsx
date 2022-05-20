import React from 'react'
import './CommentElement.scss'
import {Button, Form} from "antd"
import TextArea from "antd/es/input/TextArea"


const CommentElementComponent = ({
                                     comment, isConfirmWindow, deleteHandler, cancelHandler, confirmHandler,
                                     changeCommentHandler, isChangeComment, form, onReset, onChangeComment,
                                     currentUser, text, currentProject
                                 }) => {

    return (
        <>
            <div className="comment-container">
                <div className="comments-user-logo">
                    {comment.user_id.users.name[0]}{comment.user_id.users.surname[0]}</div>
                <div style={{width: "100%"}}>
                    <div className="author-name">
                        <h3>{comment.user_id.users.username}</h3>
                        <h5>{comment.create_date}</h5>
                        <p>{!!comment.is_changed ? `${text("commentElement.changed")}` : null}</p>
                    </div>
                    {!isChangeComment
                        ? <p className="comment">{comment.content}</p>
                        : <Form form={form} onFinish={values => onChangeComment(comment.id, values)} initialValues={
                            {content: comment.content}}>
                            <Form.Item>
                                <Form.Item
                                    name="content"
                                    rules={[{required: false}]}>
                                    <TextArea row={4} placeholder={`${text("commentElement.change.placeholder")}`}/>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                                    {text("commentElement.change.submitBtn")}
                                </Button>
                                <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>
                                    {text("commentElement.change.cancelBtn")}
                                </Button>
                            </Form.Item>
                        </Form>}
                    {currentProject.user_role.id !== 2 ? <div className="comments-buttons">
                        <button onClick={changeCommentHandler}>{text("commentElement.changeBtn")}</button>
                        <button onClick={deleteHandler}>{text("commentElement.delBtn")}</button>
                    </div> : false}
                    {isConfirmWindow && <div className="confirm-window">
                        <h5>{text("commentElement.del.title")}</h5>
                        <Button className="primary-button" type="primary"
                                onClick={() => confirmHandler(comment.id)}>{text("commentElement.del.confirm")}</Button>
                        <Button onClick={cancelHandler}>{text("commentElement.del.cancel")}</Button>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default CommentElementComponent
