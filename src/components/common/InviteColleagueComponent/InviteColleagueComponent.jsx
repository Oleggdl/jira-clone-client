import React from 'react'
import './InviteColleague.scss'
import {Button, Form, Input, Select} from "antd"

const {Option} = Select

const InviteColleagueComponent = ({form, handleSubmit, onReset, projects, text}) => {

    const colleagueTypes = [
        {id: 'product_owner', name: `${text("inviteCUsers.type.owner")}`},
        {id: 'developer', name: `${text("inviteCUsers.type.developer")}`}]

    return (
        <>
            <div className="invite-colleague-container">
                <h2>{text("inviteCUsers.title")}</h2>
                <Form name="invite_colleague"
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">
                    <Form.Item label={`${text("inviteCUsers.project")}`} name="project"
                               rules={[{required: true, message: `${text("inviteCUsers.errors.project.required")}`}]}>
                        <Select placeholder={`${text("inviteCUsers.placeholders.project")}`} className="project-select">
                            {projects.map(project => {
                                if (project.user_role.id === 1) {
                                    return <Option key={project.scrum_project.id}
                                                   value={JSON.stringify(project.scrum_project)}>
                                        {project.scrum_project.project_name}</Option>
                                }
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`${text("inviteCUsers.userType")}`} name="userType"
                               rules={[{required: true, message: `${text("inviteCUsers.errors.userType.required")}`}]}>
                        <Select placeholder={`${text("inviteCUsers.placeholders.userType")}`}
                                className="project-select">
                            {colleagueTypes.map((type, index) => <Option key={index}
                                                                         value={type.id}>{type.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={`${text("inviteCUsers.email")}`} name="email"
                        style={{margin: '20px 0'}}
                        rules={[{required: true, message: `${text("inviteCUsers.errors.email.required")}`},
                            {pattern: new RegExp(/@/gi), message: `${text("inviteCUsers.errors.email.pattern")}`}]}>
                        <Input placeholder={`${text("inviteCUsers.placeholders.email")}`}/>
                    </Form.Item>
                    <Form.Item className="invite-buttons">
                        <Button className="invite-btn" type="primary" htmlType="submit">
                            {text("inviteCUsers.addBtn")}
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}}
                                onClick={onReset}>{text("inviteCUsers.cancelBtn")}</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default InviteColleagueComponent
