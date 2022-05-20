import React from 'react'
import {Button, Select} from "antd"
import './CompeteSprint.scss'

const {Option} = Select

const CompleteSprintComponent = ({
                                     completeSprintWrapper, text, setCompleteWindow, columnsMap, setMoveType,
                                     moveType, completeSprint, sprints, currentSprint
                                 }) => {

    let doneCount = null
    let notDoneCount = null

    Object.keys(columnsMap).map(item => {
        if (item.split(',')[0] === 'DONE') {
            doneCount = columnsMap[item].length
        } else {
            notDoneCount += columnsMap[item].length
        }
    })

    return (
        <>
            <div className="complete-sprint-container">
                <h2>{text("completeSprintComponent.title")}: <span>{currentSprint?.sprint_name}</span></h2>
                <p className="completed-tasks-count">
                    {text("completeSprintComponent.numberComplete")}: <span>{doneCount}</span>
                </p>
                <p className="not-completed-tasks-count">
                    {text("completeSprintComponent.numberNotComplete")}: <span>{notDoneCount}</span>
                </p>
                {notDoneCount !== 0
                    ? <>
                        <p className="not-completed-tasks-move">{text("completeSprintComponent.text")}</p>
                        <h4>{text("completeSprintComponent.move")}:</h4>
                        <Select style={{minWidth: '200px'}} value={moveType} onChange={e => setMoveType(e)}>
                            <Option value={`backlog`}>{text("completeSprintComponent.backlog")}</Option>
                            {sprints.length !== 1 ? <Option
                                value={`sprint_name`}>{sprints?.sort((a, b) => a.id - b.id)[1].sprint_name}</Option> : false}
                        </Select>
                    </> : false}
                <div className="complete-sprint-buttons">
                    <Button className="complete-sprint-button" onClick={completeSprint}
                            type="primary">{text("completeSprintComponent.btnComplete")}</Button>
                    <Button
                        onClick={() => setCompleteWindow(false)}>{text("completeSprintComponent.btnCancel")}</Button>
                </div>
            </div>
            <div className="sprint-wrapper" ref={completeSprintWrapper}></div>
        </>
    )
}

export default CompleteSprintComponent
