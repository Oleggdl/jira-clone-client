import React from 'react'
import './CreateProject.scss'
import {Button, Checkbox, Form, Input} from "antd"
import TextArea from "antd/es/input/TextArea"
import {NavLink} from "react-router-dom"

const CreateProjectComponent = ({form, handleSubmit, onReset, text}) => {

    return (
        <>
            <div className="create-project-container">
                <h2>{text("createProject.title")}</h2>
                <Form name="create_project"
                      initialValues={{remember: true}}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">
                    <Form.Item
                        label={`${text("createProject.name")}`}
                        name="project_name"
                        rules={[{required: true, message: `${text("createProject.errors.name.required")}`},
                            {max: 50, message: `${text("createProject.errors.name.max")}`},
                            {min: 3, message: `${text("createProject.errors.name.min")}`},
                            {pattern: new RegExp(/[а-яa-zўі]/gi), message: `${text("createProject.errors.name.pattern")}`}
                        ]}>
                        <Input placeholder={`${text("createProject.placeholders.name")}`}/>
                    </Form.Item>
                    <Form.Item label={`${text("createProject.key")}`} name="project_key" className="project-key"
                               rules={[{required: true, message: `${text("createProject.errors.key.required")}`},
                                   {max: 7, message: `${text("createProject.errors.key.max")}`},
                                   {
                                       pattern: new RegExp(/[а-яa-zўі]/gi),
                                       message: `${text("createProject.errors.key.pattern")}`
                                   }]}>
                        <Input placeholder={`${text("createProject.placeholders.key")}`}/>
                    </Form.Item>
                    <Form.Item
                        label={`${text("createProject.description")}`}
                        name="project_description"
                        rules={[{required: false},
                            {max: 600, message: `${text("createProject.errors.description.max")}`}]}>
                        <TextArea row={4} placeholder={`${text("createProject.placeholders.description")}`}/>
                    </Form.Item>
                    <Form.Item
                        label={`${text("createProject.iaFavorite")}`}
                        name="is_favorite"
                        valuePropName="checked"
                        rules={[{required: false}]}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 7}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            {text("createProject.createBtn")}
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>
                            <NavLink to="/">{text("createProject.cancelBtn")}</NavLink>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CreateProjectComponent
