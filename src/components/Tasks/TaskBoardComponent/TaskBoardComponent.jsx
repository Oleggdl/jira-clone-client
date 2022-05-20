import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBoard.scss'
import SvgSelector from "../../common/Svg/SvgSelector"

const TaskBoardComponent = ({
                                taskInfoHandler, taskSprint, currentProject, getCurrentTaskFromServer,
                                setIsTaskInfo, marksScrumAll, provided
                            }) => {
    const currentTask = taskSprint?.task_scrum ? taskSprint?.task_scrum : taskSprint?.scrum_task_id

    return (
        <>
            <div ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}>
                <div className="task-component-container">
                    <div className="task-component-settings" onMouseUp={() => setIsTaskInfo(true)} onMouseDown={() => {
                        taskInfoHandler(taskSprint)
                        getCurrentTaskFromServer(taskSprint)
                    }}><EllipsisOutlined/></div>
                    <div className="task-title">{taskSprint?.task_scrum?.task_name}</div>
                    {/*<div className="task-title">{taskSprint?.id} / {taskSprint?.index}</div>*/}
                    <div className="task-board-marks">
                        {marksScrumAll[taskSprint?.task_scrum.id] && marksScrumAll[taskSprint?.task_scrum.id].map(mark =>
                            <div key={mark.id} className="task-component-labels"
                                 style={{backgroundColor: `${mark.mark_color}`}}>{mark.mark_text}</div>)}
                    </div>

                    <div className="task-component-key">
                        <SolutionOutlined style={{marginTop: '8px'}}/>
                        <div className="task-component-key-item">{currentProject.project_key}-{currentTask?.id}</div>
                        <div className="executor-logo">
                            {currentTask?.executor_id?.username
                                && <div className="supervisor-task-logo" style={{marginTop: 0}}>
                                    {currentTask?.executor_id?.name[0]}{currentTask?.executor_id?.surname[0]}</div>}
                        </div>
                        <div className="task-priority">
                            <div className="priority-icon">
                                <SvgSelector svgName={`${currentTask?.priority}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskBoardComponent
