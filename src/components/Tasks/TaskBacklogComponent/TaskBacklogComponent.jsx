import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBacklog.scss'
import SvgSelector from "../../common/Svg/SvgSelector"

const TaskBacklogComponent = ({
                                  currentProject, taskInfoHandler, task, getCurrentTaskFromServer,
                                  setIsTaskInfo, marksScrumAll, provided
                              }) => {

    const taskScrumId = task.task_scrum ? task.task_scrum.id.toString() : task.scrum_task_id.id.toString()

    const currentTask = task.scrum_task_id ? task.scrum_task_id : task.task_scrum

    return (
        <>
            <div ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}>
                <div className="task-backlog-component-container">
                    <div className="task-backlog-component-key">
                        <SolutionOutlined/>
                        <div>{currentProject.project_key}-{currentTask.id}</div>
                    </div>
                    <div className="task-title">{currentTask.task_name}</div>
                    <div className="task-backlog-component-labels">
                        {marksScrumAll[taskScrumId] && marksScrumAll[taskScrumId].map(mark =>
                            <div className="mark-element mark-element-backlog"
                                 style={{backgroundColor: mark.mark_color}}
                                 key={mark.id}>{mark.mark_text}
                            </div>)}
                    </div>
                    <div className="task-priority-backlog" style={{paddingTop: '2px'}}>
                        <div className="task-priority">
                            <div className="priority-icon">
                                <SvgSelector svgName={`${currentTask.priority}`}/>
                            </div>
                        </div>
                    </div>
                    {currentTask?.executor_id?.username
                        && <div className="supervisor-task-logo">
                            {currentTask?.executor_id?.name[0]}{currentTask?.executor_id?.surname[0]}</div>}
                    <div className="task-backlog-component-settings" onMouseUp={() => setIsTaskInfo(true)}
                         onMouseDown={() => {
                             taskInfoHandler(task)
                             getCurrentTaskFromServer(task)
                         }}><EllipsisOutlined/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskBacklogComponent
