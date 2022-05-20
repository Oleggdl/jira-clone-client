import React from 'react'
import './Comments.scss'
import TextArea from "antd/es/input/TextArea"
import {Button, Form} from "antd"
import CommentElementContainer from "./CommentElement/CommentElementContainer"


const CommentsComponent = ({
                               form, handleSubmit, onReset, textAreaAddComment, isTextAreaAddCommentFocus,
                               commentsScrum, currentUser, text, currentProject
                           }) => {

    return (
        <>
            <div className="comments-container">
                <div className="form-add-comments">
                    <div className="comments-user-logo">{currentUser.name[0]}{currentUser.surname[0]}</div>
                    <Form name="create_comment"
                          form={form}
                          initialValues={
                              {
                                  create_date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                              }}
                          onFinish={values => handleSubmit(values)}
                          autoComplete="off">
                        <Form.Item
                            name="content"
                            rules={[{required: false}]}>
                            <TextArea ref={textAreaAddComment} row={4}
                                      placeholder={`${text("commentComponent.placeholder")}`}/>
                        </Form.Item>
                        <Form.Item name="create_date" style={{height: 0, margin: 0}}> </Form.Item>
                        {isTextAreaAddCommentFocus && currentProject.user_role.id !== 2 ? <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                                {text("commentComponent.submitBtn")}
                            </Button>
                            <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>
                                {text("commentComponent.cancelBtn")}</Button>
                        </Form.Item> : false}
                    </Form>
                </div>
                {(commentsScrum.sort((a, b) => b.id - a.id)).map(comment =>
                    <CommentElementContainer key={comment.id} comment={comment}/>)}
            </div>
        </>
    )
}

export default CommentsComponent
