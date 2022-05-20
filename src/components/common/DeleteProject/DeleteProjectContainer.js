import React, {useContext, useEffect, useRef, useState} from 'react'
import DeleteProjectComponent from "./DeleteProjectComponent"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteFromMyProjects, deleteProject} from "../../../redux/projects-reducer"
import {LanguageContext} from "../../../context/LanguageContext";

const DeleteProjectContainer = props => {

    const deleteProjectWrapper = useRef()
    const [isDisabled, setIsDisabled] = useState(true)
    const [value, setValue] = useState('')

    const {token} = useContext(AuthContext)
    const {text} = useContext(LanguageContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target === deleteProjectWrapper.current) {
                props.setIsDeleteModal(false)
            }
        })
        return window.removeEventListener("click", function (event) {
            if (event.target === deleteProjectWrapper.current) {
                props.setIsDeleteModal(false)
            }
        })
    }, [])

    useEffect(() => {
        if (value === props.projectData.project_name) {
            setIsDisabled(false)
        } else setIsDisabled(true)
    }, [value])

    const deleteProjectHandler = event => {
        if (props.projectData.supervisor.username === props.currentUser.username) {
            event.preventDefault()
            props.deleteProject(props.projectData.id, props.currentUser.id, headers)
            props.setIsDeleteModal(false)
            props.setIsActions(false)
        } else {
            event.preventDefault()
            props.deleteFromMyProjects(props.userScrumProject.id, props.currentUser.id, headers)
            props.setIsDeleteModal(false)
            props.setIsActions(false)
        }
    }

    return (
        <>
            <DeleteProjectComponent deleteProjectWrapper={deleteProjectWrapper} isDisabled={isDisabled}
                                    projectData={props.projectData} value={value} setValue={setValue}
                                    deleteProjectHandler={deleteProjectHandler} text={text}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {deleteProject, deleteFromMyProjects})
)(DeleteProjectContainer)
