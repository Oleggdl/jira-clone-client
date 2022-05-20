import React from 'react'
import './CreateTask.scss'
import {Button, Form, Input, Select, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import {NavLink} from "react-router-dom"

const {Option} = Select
const {Title} = Typography


const CreateTaskComponent = ({
                                 form, handleSubmit, onReset, projects, currentUser, usersOnProject,
                                 getExecutorsHandler, text
                             }) => {

    const executor = !!parseInt(currentUser.id) ? null : currentUser.id

    return (
        <>
            <div className="create-task-container">
                <h2>{text("createTaskComponent.title")}</h2>
                <Form name="create_task"
                      initialValues={
                          {
                              create_date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                              task_description: null,
                              executor_id: executor
                          }}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">

                    <Form.Item label={`${text("createTaskComponent.project")}`} name="project"
                               rules={[{
                                   required: true,
                                   message: `${text("createTaskComponent.errors.project.required")}`
                               }]}>
                        <Select placeholder={`${text("createTaskComponent.placeholders.project")}`}
                                className="project-select"
                                onChange={(e) => getExecutorsHandler(e)}>
                            {projects.map(project => {
                                if (project.user_role.id === 1) {
                                    return <Option key={project.scrum_project.id} value={project.scrum_project.id}>
                                        {project.scrum_project.project_name}</Option>
                                }
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={`${text("createTaskComponent.taskName")}`}
                        name="task_name"
                        rules={[{required: true, message: `${text("createTaskComponent.errors.task.required")}`},
                            {max: 50, message: `${text("createTaskComponent.errors.task.max")}`},
                            {min: 3, message: `${text("createTaskComponent.errors.task.min")}`},
                            {
                                pattern: new RegExp(/[а-яa-zўі]/gi),
                                message: `${text("createTaskComponent.errors.task.pattern")}`
                            }]}>
                        <Input placeholder={`${text("createTaskComponent.placeholders.name")}`}/>
                    </Form.Item>
                    <Form.Item
                        label={`${text("createTaskComponent.description")}`}
                        name="task_description"
                        rules={[{required: false},
                            {max: 1000, message: `${text("createTaskComponent.errors.description.max")}`}]}>
                        <TextArea row={4} placeholder={`${text("createTaskComponent.placeholders.description")}`}/>
                    </Form.Item>
                    <Form.Item label={`${text("createTaskComponent.executor")}`} name="executor_id"
                               rules={[{required: false}]}>
                        <Select placeholder={`${text("createTaskComponent.placeholders.executor")}`}
                                className="project-select">
                            {usersOnProject.map((executor, index) => {
                                if (executor.user_role.id === 3) {
                                    return <Option key={index}
                                                   value={executor.users.id}>{executor.users.username}</Option>
                                }
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`${text("createTaskComponent.author")}`} name="creator_id"
                               rules={[{required: false}]}
                               value={currentUser.username}>
                        <Title level={4}>{currentUser.username}</Title>
                    </Form.Item>
                    <Form.Item name="create_date" style={{height: 0, margin: 0}}> </Form.Item>
                    <Form.Item wrapperCol={{offset: 5}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            {text("createTaskComponent.submitBtn")}
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>
                            <NavLink to="/">{text("createTaskComponent.cancelBtn")}</NavLink>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CreateTaskComponent
