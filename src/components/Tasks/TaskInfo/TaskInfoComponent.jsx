import React from 'react'
import './TaskInfo.scss'
import TextArea from "antd/es/input/TextArea"
import {Button, Form, Input} from "antd"
import {CloseOutlined} from "@ant-design/icons"
import CommentsContainer from "../Comments/CommentsContainer"
import HistoryContainer from "../History/HistoryContainer"
import TaskInformationContainer from "./TaskInformation/TaskInformationContainer"

const TaskInfoComponent = ({
                               onReset, handleSubmit, form, text, taskInfoCloseHandler, taskInfoWrapper, currentTask,
                               isTextAreaFocus, textAreaDescriptionFocus, isComments, currentTaskFromServer,
                               getCurrentTaskFromServer, isTaskNameEditable, setIsTaskNameEditable, isDeleteTask,
                               changeTaskNameHandler, formTaskName, getBacklogForProjectHandler, setIsDeleteTask,
                               taskDelRef, confirmDeleteTask, currentProject, setIsTextAreaFocus
                           }) => {

    return (
        <>
            <div className="task-info-wrapper" ref={taskInfoWrapper}>
                <div className="task-info-container">
                    <div className="task-info-left">
                        <button className="close-button" onClick={taskInfoCloseHandler}><CloseOutlined/></button>
                        <div style={{display: "flex"}}>
                            {!isTaskNameEditable || currentProject.user_role.id !== 1
                                ? <h2 onDoubleClick={() => setIsTaskNameEditable(true)}>
                                    {currentTaskFromServer?.task_name}</h2>
                                : <Form form={formTaskName} onFinish={values => {
                                    changeTaskNameHandler(values)
                                    setIsTaskNameEditable(false)
                                }}
                                        initialValues={{task_name: currentTaskFromServer?.task_name}}
                                        autoComplete="off">
                                    <Form.Item
                                        name="task_name"
                                        style={{marginRight: "15px"}}
                                        rules={[{
                                            required: true,
                                            message: `${text("taskInfo.taskName.errors.required")}`
                                        },
                                            {max: 50, message: `${text("taskInfo.taskName.errors.max")}`},
                                            {min: 3, message: `${text("taskInfo.taskName.errors.min")}`},
                                            {
                                                pattern: new RegExp(/[а-яa-zўі]/gi),
                                                message: `${text("taskInfo.taskName.errors.pattern")}`
                                            }]}>
                                        <Input placeholder={`${text("taskInfo.taskName.errors.placeholder")}`}
                                               style={{fontSize: "2.6rem"}}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className="submit-button" type="primary" htmlType="submit"
                                                style={{width: "100px"}} onMouseUp={getBacklogForProjectHandler}>
                                            {text("taskInfo.taskName.submitBtn")}
                                        </Button>
                                        <Button style={{marginLeft: "15px", width: "100px"}}
                                                onClick={() => setIsTaskNameEditable(false)}>
                                            {text("taskInfo.taskName.canselBtn")}</Button>
                                    </Form.Item>
                                </Form>}
                            {currentProject.user_role.id === 1 ?
                                <button className="delete-task-button" onClick={() => setIsDeleteTask(true)}>
                                    {text("taskInfo.deleteBtn")}
                                </button> : false}
                            {isDeleteTask && <>
                                <div className="delete-task-container">
                                    <h3>{text("taskInfo.deleteTask.title")}
                                        <span>{currentTaskFromServer?.task_name}</span>?
                                    </h3>
                                    <p>{text("taskInfo.deleteTask.text1")}</p>
                                    <p>{text("taskInfo.deleteTask.text2")}</p>
                                    <Button danger={true} onClick={() => confirmDeleteTask()}
                                            className="confirm-delete-task">
                                        {text("taskInfo.deleteTask.delBtn")}
                                    </Button>
                                    <Button onClick={() => setIsDeleteTask(false)}>
                                        {text("taskInfo.deleteTask.cancelBtn")}
                                    </Button>
                                </div>
                                <div className="delete-task-wrapper" ref={taskDelRef}></div>
                            </>}
                        </div>
                        <p className="task-info-left-description">{text("taskInfo.description.title")}</p>
                        <Form initialValues={
                            {
                                description: `${currentTaskFromServer
                                && currentTaskFromServer?.task_description === null
                                    ? '' : currentTaskFromServer?.task_description}`
                            }}
                              form={form}
                              onFinish={values => handleSubmit(values)}
                              autoComplete="off">
                            <Form.Item name="description">
                                <TextArea ref={textAreaDescriptionFocus} row={4}
                                          placeholder={`${text("taskInfo.description.placeholder")}`}/>
                            </Form.Item>
                            {isTextAreaFocus && currentProject.user_role.id === 1 ? <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                        className="primary-button-submit"
                                        onMouseUp={() => getCurrentTaskFromServer(currentTask)}>
                                    {text("taskInfo.description.submitBtn")}
                                </Button>
                                <Button style={{marginLeft: "15px", width: "100px"}}
                                        onClick={() => setIsTextAreaFocus(false)}>
                                    {text("taskInfo.description.cancelBtn")}
                                </Button>
                            </Form.Item> : false}
                        </Form>
                        <h3>{text("taskInfo.comments")}</h3>
                        <div>
                            {isComments ? <CommentsContainer currentTask={currentTask}/> : <HistoryContainer/>}
                        </div>
                    </div>
                    <TaskInformationContainer/>
                </div>
            </div>
        </>
    )
}

export default TaskInfoComponent
