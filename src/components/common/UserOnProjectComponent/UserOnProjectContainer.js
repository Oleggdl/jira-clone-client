import React, {Component} from 'react'
import UserOnProjectComponent from "./UserOnProjectComponent"
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteFromMyProjects} from "../../../redux/projects-reducer"
import {AuthContext} from "../../../context/AuthContext"

class UserOnProjectContainer extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            isDeleteUser: false,
            headers: {}
        }
        this.setIsDeleteUser = this.setIsDeleteUser.bind(this)
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
    }

    setIsDeleteUser(value) {
        this.setState({isDeleteUser: value})
    }

    confirmDeleteUser() {
        this.props.deleteFromMyProjects(this.props.currentUser.id,
            this.props.currentProject.users.id, this.state.headers)
    }

    render() {

        const {userInfoWrapper, text, currentUser, roleType, setIsUserInfo, currentProject} = this.props

        return (
            <>
                <UserOnProjectComponent text={text} currentUser={currentUser} roleType={roleType}
                                        setIsUserInfo={setIsUserInfo} userInfoWrapper={userInfoWrapper}
                                        isDeleteUser={this.state.isDeleteUser} setIsDeleteUser={this.setIsDeleteUser}
                                        currentProject={currentProject} confirmDeleteUser={this.confirmDeleteUser}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject

})

export default compose(
    connect(mapStateToProps, {deleteFromMyProjects})
)(UserOnProjectContainer)

