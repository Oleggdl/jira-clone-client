import React from 'react'
import './DeleteProject.scss'
import {Input} from "antd"

const DeleteProjectComponent = ({
                                    deleteProjectWrapper, isDisabled, projectData, setValue, value,
                                    deleteProjectHandler, text
                                }) => {

    return (
        <>
            <div className="delete-project-container">
                <h2>{text("deleteProject.title")}</h2>
                <p style={{fontWeight: "600"}}>{text("deleteProject.text1")}</p>
                <p>{text("deleteProject.text2.1")}<span>
                    {projectData.project_name}</span>{text("deleteProject.text2.2")}</p>
                <p>{text("deleteProject.typeText1")}<span>
                    {projectData.project_name}</span>{text("deleteProject.typeText2")}
                </p>
                <Input value={value} onChange={e => setValue(e.target.value)}/>
                <button disabled={isDisabled} className="confirm-delete" onClick={(e) => deleteProjectHandler(e)}>
                    {text("deleteProject.button")}
                </button>
            </div>
            <div className="project-settings-wrapper" ref={deleteProjectWrapper}></div>
        </>
    )
}

export default DeleteProjectComponent
