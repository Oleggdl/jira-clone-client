import React, {useContext} from 'react'
import CreateProjectComponent from "./CreateProjectComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createProject, getProjects} from "../../../redux/projects-reducer"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {LanguageContext} from "../../../context/LanguageContext"

const CreateProjectContainer = props => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)
    const {text} = useContext(LanguageContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onReset = () => {
        form.resetFields()
    }

    const handleSubmit = values => {
        props.createProject(values, props.currentUser.id, 1, headers)
        props.getProjects(props.currentUser.id, headers)
        onReset()
    }

    return (
        <>
            <CreateProjectComponent handleSubmit={handleSubmit} onReset={onReset} form={form} text={text}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser
})

export default compose(
    connect(mapStateToProps, {createProject, getProjects})
)(CreateProjectContainer)
