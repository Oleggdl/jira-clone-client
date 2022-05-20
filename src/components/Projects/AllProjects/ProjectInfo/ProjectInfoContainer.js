import React, {useContext} from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import {useForm} from "antd/es/form/Form"
import ProjectInfoComponent from "./ProjectInfoComponent"
import {AuthContext} from "../../../../context/AuthContext"
import {getProjectById, getProjects, updateProject} from "../../../../redux/projects-reducer"
import {LanguageContext} from "../../../../context/LanguageContext"

const ProjectInfoContainer = props => {

    const {token} = useContext(AuthContext)
    const {text} = useContext(LanguageContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [form] = useForm()

    const onReset = () => {
        form.resetFields()
    }

    const handleSubmit = values => {
        props.updateProject(props.projectData.scrum_project.id, props.projectData.id, values, headers)
        props.getProjects(props.currentUser.id, headers)
        props.setIsActions(false)
        onReset()
    }

    const onCancel = () => {
        onReset()
        props.setIsActions(false)
        props.setIsDeleteModal(false)
        props.getProjects(props.currentUser.id, headers)
    }

    const onDeleteHandler = () => {
        !!props.isDeleteModal ? props.setIsDeleteModal(false) : props.setIsDeleteModal(true)
    }

    return (
        <>
            <ProjectInfoComponent projects={props.projects} form={form} onCancel={onCancel} text={text}
                                  handleSubmit={handleSubmit} projectWrapper={props.projectWrapper}
                                  onDeleteHandler={onDeleteHandler} isDeleteModal={props.isDeleteModal}
                                  setIsDeleteModal={props.setIsDeleteModal} projectDataAll={props.projectData}
                                  projectData={props.projectData.scrum_project} setIsActions={props.setIsActions}
                                  userScrumProject={props.projectData}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    projectData: state.projectsReducer.projectData,
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {updateProject, getProjectById, getProjects})
)(ProjectInfoContainer)

