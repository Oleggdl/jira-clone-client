import {Button, Checkbox, Form, Input, Typography} from "antd"
import TextArea from "antd/es/input/TextArea"
import React from "react"
import DeleteProjectContainer from "../../../common/DeleteProject/DeleteProjectContainer"

const ProjectInfoComponent = ({
                                  projectData, handleSubmit, form, onCancel, onDeleteHandler, isDeleteModal,
                                  onConfirmDelete, setIsDeleteModal, projectWrapper, projectDataAll, setIsActions,
                                  userScrumProject, text
                              }) => {

    return (
        <>
            <div className="settings-project">
                <Form name="create_task"
                      initialValues={
                          {
                              project_name: projectData.project_name,
                              project_key: projectData.project_key,
                              project_description: projectData.project_description,
                              is_favorite: projectData.is_favorite,

                          }}
                      form={form}
                      onFinish={values => handleSubmit(values)}
                      autoComplete="off">
                    <Typography.Title level={2}
                                      style={{marginBottom: "20px"}}>{text("projectInfo.title")}</Typography.Title>
                    <Form.Item
                        label={`${text("projectInfo.name")}`}
                        name="project_name"
                        rules={[{required: true, message: `${text("projectInfo.errors.name.required")}`},
                            {max: 50, message: `${text("projectInfo.errors.name.max")}`},
                            {min: 3, message: `${text("projectInfo.errors.name.min")}`},
                            {pattern: new RegExp(/[а-яa-zўі]/gim), message: `${text("projectInfo.errors.name.pattern")}`}]}>
                        <Input placeholder={`${text("projectInfo.placeholders.name")}`}/>
                    </Form.Item>
                    <Form.Item label={`${text("projectInfo.key")}`} name="project_key" className="project-key"
                               rules={[{required: true, message: `${text("projectInfo.errors.key.required")}`}]}>
                        <Input placeholder={`${text("projectInfo.placeholders.key")}`}/>
                    </Form.Item>
                    <Form.Item
                        label={`${text("projectInfo.description")}`}
                        name="project_description"
                        rules={[{required: false},
                            {max: 600, message: `${text("projectInfo.errors.description.max")}`}]}>
                        <TextArea row={4} placeholder={`${text("projectInfo.placeholders.description")}`}/>
                    </Form.Item>
                    <Form.Item
                        label={`${text("projectInfo.supervisor")}:`}
                        name="supervisor"
                        rules={[{required: false}]}>
                        <Typography.Paragraph level={5} style={{margin: 0}}>
                            <span className="supervisor-name">
                            {projectDataAll.scrum_project.supervisor.username}</span>
                        </Typography.Paragraph>
                    </Form.Item>

                    <Form.Item
                        label={`${text("projectInfo.iaFavorite")}`}
                        name="is_favorite"
                        valuePropName="checked"
                        rules={[{required: false}]}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 7}} style={{marginBottom: "40px"}}>
                        <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                            {text("projectInfo.createBtn")}
                        </Button>
                        <Button style={{marginLeft: "15px", width: "100px"}}
                                onClick={onCancel}> {text("projectInfo.cancelBtn")}</Button>
                    </Form.Item>
                    <div className="delete-project" onClick={onDeleteHandler}>{text("projectInfo.deleteBtn")}</div>
                    {isDeleteModal && <DeleteProjectContainer setIsDeleteModal={setIsDeleteModal}
                                                              projectData={projectData} setIsActions={setIsActions}
                                                              userScrumProject={userScrumProject}/>}
                </Form>
                <div className="project-settings-wrapper" ref={projectWrapper}></div>
            </div>
        </>
    )
}

export default ProjectInfoComponent
