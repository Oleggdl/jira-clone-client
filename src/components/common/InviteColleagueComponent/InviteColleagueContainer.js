import React, {useContext} from 'react'
import InviteColleagueComponent from "./InviteColleagueComponent"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {addColleague} from "../../../redux/email-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getUsersOnProject} from "../../../redux/tasks-reducer"
import {LanguageContext} from "../../../context/LanguageContext";

const InviteColleagueContainer = props => {

    const [form] = useForm()
    const {text} = useContext(LanguageContext)
    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const handleSubmit = values => {
        props.addColleague({
            emailTo: values.email,
            projectId: JSON.parse(values.project).id,
            projectName: JSON.parse(values.project).project_name,
            userName: props.currentUser.username
        }, props.currentUser.email, values.userType, headers)
        form.resetFields()
        props.setIsInviteColleague(false)
    }

    const onReset = () => {
        form.resetFields()
        props.setIsInviteColleague(false)
    }

    return (
        <>
            <InviteColleagueComponent form={form} handleSubmit={handleSubmit} onReset={onReset} text={text}
                                      projects={props.projects}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    currentUser: state.userReducer.currentUser,
    projects: state.projectsReducer.projects,
})

export default compose(
    connect(mapStateToProps, {addColleague, getUsersOnProject})
)(InviteColleagueContainer)
