import React from 'react'
import './BacklogElement.scss'
import SprintList from "../SprintComponent/SprintListComponents"

const BacklogElementComponent = ({
                                     backlogForProject, createSprintHandler, isInputVisible, taskInputRef,
                                     onKeyDown, onSetIsCreateTask, isCreateTask, tasks, title, text, currentProject
                                 }) => {
    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{text("backlogElement.title")}</h4>
                    <div className="sprint-header-text">({text("backlogElement.text")}: <span>{tasks?.length}</span>)
                    </div>
                    {currentProject.user_role.id === 1
                        ? <button className="create-sprint-button"
                                  onClick={createSprintHandler}>{text("backlogElement.createSprintBtn")}</button>
                        : false}
                </div>
                <SprintList
                    listId={title}
                    listType="SPRINT"
                    tasks={tasks}
                    sprint={null}
                />
                {currentProject.user_role.id === 1 ? <>
                    <input className={`task-creations-input ${isInputVisible}`} ref={taskInputRef} onKeyDown={e => {
                        onKeyDown(e)
                    }} placeholder={`${text("backlogElement.placeholder")}`}/>
                    {!isCreateTask &&
                        <button style={{display: "block"}} className="create-task-button" onMouseUp={() => {
                            onSetIsCreateTask()
                        }}>{text("backlogElement.createTaskBtn")}</button>}
                </> : false}
            </div>
        </>
    )
}

export default BacklogElementComponent
