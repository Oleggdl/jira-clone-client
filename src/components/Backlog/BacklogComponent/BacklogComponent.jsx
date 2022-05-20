import React from 'react'
import './Backlog.scss'
import TaskInfoContainer from "../../Tasks/TaskInfo/TaskInfoContainer"
import {DragDropContext} from "react-beautiful-dnd"
import {NavLink} from "react-router-dom"
import SprintContainer from "../SprintComponent/SprintContainer"
import BacklogElementContainer from "../BacklogElement/BacklogElementContainer"
import UserOnProjectContainer from "../../common/UserOnProjectComponent/UserOnProjectContainer"

const BacklogComponent = ({
                              isTaskInfo, setBacklogForProject, onDragEnd, text, usersOnProject, userInfoWrapper,
                              setBacklogForProjectSprint, backlogForProjectSprint, currentProject, currentUser,
                              columns, sprints, updateTaskSprints, backlogForProject, isUserInfo, setIsUserInfo,
                              setCurrentUser
                          }) => {
    const board = (
        <div>
            {sprints && sprints.sort((a, b) => a.id - b.id).map((sprint, index) => (
                <SprintContainer
                    key={sprint.sprint_name}
                    index={index}
                    text={text}
                    title={sprint.sprint_name}
                    tasks={columns[`${sprint.sprint_name},${sprint.id}`]}
                    sprint={sprint}
                    updateTaskSprints={updateTaskSprints}
                    backlogForProjectSprint={backlogForProjectSprint}
                    setBacklogForProjectSprint={setBacklogForProjectSprint}
                />
            ))}
            <BacklogElementContainer
                backlogForProject={backlogForProject}
                setBacklogForProject={setBacklogForProject}
                title={'Backlog'}
                text={text}
                tasks={columns['Backlog']}
                updateTaskSprints={updateTaskSprints}
                backlogForProjectSprint={backlogForProjectSprint}
                setBacklogForProjectSprint={setBacklogForProjectSprint}
            />
        </div>
    )

    const roleType = role => {
        switch (role) {
            case 'DEVELOPER':
                return `${text("backlogComponent.roles.developer")}`
            case 'SCRUM_MASTER':
                return `${text("backlogComponent.roles.scrum")}`
            case 'PRODUCT_OWNER':
                return `${text("backlogComponent.roles.owner")}`
        }
    }

    return (
        <>
            <div className="backlog-container">
                <div className="project-path">
                    <span className="project-text"><NavLink
                        to="/all_projects">{text("backlogComponent.projects")}</NavLink></span>
                    <span> / </span>
                    <span>{currentProject?.scrum_project.project_name}</span>
                </div>
                <h2>{text("backlogComponent.title")}</h2>
                <div className="users-on-project">
                    {usersOnProject.map(user =>
                        <div className="user-logo" key={user.id}
                             onClick={() => {
                                 setIsUserInfo(true)
                                 setCurrentUser(user)
                             }}>{user.users.name[0]}{user.users.surname[0]}</div>
                    )}
                </div>
                <div className="search-tasks-container" style={{width: "320px"}}>
                </div>
                <React.Fragment>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div>{board}</div>
                    </DragDropContext>
                </React.Fragment>
            </div>
            {isUserInfo && <UserOnProjectContainer currentUser={currentUser} text={text} roleType={roleType}
                                                   userInfoWrapper={userInfoWrapper} setIsUserInfo={setIsUserInfo}
                                                   isUserInfo={isUserInfo}/>}
            {isTaskInfo && <TaskInfoContainer setBacklogForProject={setBacklogForProject}
                                              updateTaskSprints={updateTaskSprints}/>}
        </>
    )
}

export default BacklogComponent
