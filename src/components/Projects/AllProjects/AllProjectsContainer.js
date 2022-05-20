import React, {useContext, useEffect, useRef, useState} from 'react'
import AllProjectsComponent from "./AllProjectsComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrentProject, getProjectById, getProjects, searchProject} from "../../../redux/projects-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {LanguageContext} from "../../../context/LanguageContext"

const AllProjectsContainer = props => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const {text} = useContext(LanguageContext)

    const projectWrapper = useRef(null)

    const onSearch = (query) => {
        const q = query.replace(/[\\\}\{\/\]\[\+\-\.\,\#\@\!\%\^\&\*(\)\`\~\$\;\:]/g, '')
        props.searchProject(q, props.currentUser.id, headers)
    }

    const [isActions, setIsActions] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)

    const showActionsHandler = () => {
        !!isActions ? setIsActions(false) : setIsActions(true)
    }

    const getProjectById = (record) => {
        props.getProjectById(record.key, headers)
    }

    useEffect(() => {
        props.getProjects(props.currentUser.id, headers)
    }, [])

    const currentProjectHandler = project => {
        props.getCurrentProject(project)
    }

    const closeProjectInfo = (event) => {
        if (event.target === projectWrapper.current) {
            setIsDeleteModal(false)
            setIsActions(false)
            props.getProjects(props.currentUser.id, headers)
        }
    }

    useEffect(() => {
        window.addEventListener("click", (event) => closeProjectInfo(event))
        return window.removeEventListener("click", (event) => closeProjectInfo(event))
    })

    return (
        <>
            <AllProjectsComponent projects={props.projects} onSearch={onSearch} isActions={isActions}
                                  showActionsHandler={showActionsHandler} projectWrapper={projectWrapper}
                                  isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}
                                  setIsActions={setIsActions} getProjectById={getProjectById}
                                  currentProjectHandler={currentProjectHandler} text={text}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {getProjects, searchProject, getProjectById, getCurrentProject})
)(AllProjectsContainer)

