import React from 'react'
import './UserOnProject.scss'
import {CloseOutlined} from "@ant-design/icons"
import {Button} from "antd"

const UserOnProjectComponent = ({
                                    currentUser, setIsUserInfo, roleType, text, userInfoWrapper, isDeleteUser,
                                    setIsDeleteUser, currentProject, confirmDeleteUser
                                }) => {

    return (
        <>
            <div className="user-on-project-role">
                {!isDeleteUser
                    ? <>
                        <button className="close-button" onClick={() => setIsUserInfo(false)}>
                            <CloseOutlined/>
                        </button>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                            <div className="user-logo">{currentUser.users.name[0]}{currentUser.users.surname[0]}</div>
                            <div className="user-info-role-type">{roleType(currentUser.user_role.name)}</div>
                        </div>
                        <h3>{text("authPage.signup.name")}: <span>{currentUser.users.name}</span></h3>
                        <h3>{text("authPage.signup.surname")}: <span>{currentUser.users.surname}</span></h3>
                        <h3>{text("authPage.signup.username")}: <span>{currentUser.users.username}</span></h3>
                        <h3>{text("authPage.signup.email")}: <span>{currentUser.users.email}</span></h3>
                        {currentProject.user_role.id === 1 ? <div className="delete-user-from-project">
                            <Button type="primary" danger ghost
                                    onClick={() => setIsDeleteUser(true)}>{text("userOnProject.deleteBtn")}</Button>
                        </div> : false}
                    </>
                    : <>
                        <div className="remove-user-window">
                            <h2>{text("userOnProject.title")}</h2>
                            <h3>{text("userOnProject.text1")}
                                <span> {currentUser.users.username}</span> {text("userOnProject.text2")} <span>
                                {currentProject?.scrum_project.project_name}</span>?</h3>
                            <p>{text("userOnProject.text3")}</p>
                            <Button className="delete-user-from-project" type="primary" danger ghost
                                    onClick={confirmDeleteUser}>{text("userOnProject.confirm")}</Button>
                            <Button style={{marginLeft: '10px'}}
                                    onClick={() => setIsDeleteUser(false)}>{text("userOnProject.cancel")}</Button>
                        </div>
                    </>}
            </div>
            <div className="user-info-wrapper" ref={userInfoWrapper}></div>
        </>
    )
}

export default UserOnProjectComponent
