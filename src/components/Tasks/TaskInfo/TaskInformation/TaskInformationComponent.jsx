import React from 'react'
import './TaskInformation.scss'
import {Button, Form, Input, Select} from "antd"
import {CloseSquareOutlined} from "@ant-design/icons"
import SvgSelector from "../../../common/Svg/SvgSelector"

const {Option} = Select

const TaskInformationComponent = ({
                                      currentTaskScrum, setIsAddMarks, isAddMarks, marksAddRef, currentTaskFromServer,
                                      onCancel, setActiveColor, addMarksConfirm, marksScrum, currentTask, text,
                                      active, setActive, activeColorHandler, deleteMarkHandler, form, currentProject,
                                      currentPriority, setCurrentPriority, usersOnProject, currentExecutor,
                                      setCurrentExecutor
                                  }) => {

    const markColors = [
        {id: 'red', value: '#ff4e4e'},
        {id: 'yellow', value: '#f3ff49'},
        {id: 'green', value: '#53ff4f'},
        {id: 'blue', value: '#4656ff'},
        {id: 'purple', value: '#f94dff'},
        {id: 'orange', value: '#ffa44b'},
    ]

    const priorities = ['critical', 'high', 'normal', 'low', 'unimportant']
    return (
        <>
            <div className="task-info-right">
                <h3>{text("taskInformation.title")}</h3>
                <h4>{text("taskInformation.author")}</h4>
                <div className="supervisor-container">
                    <div className="supervisor-logo">
                        {currentTaskScrum?.creator_id?.name[0]}{currentTaskScrum?.creator_id?.surname[0]}</div>
                    <span>{currentTaskScrum?.creator_id?.username}</span>
                </div>
                <h4>{text("taskInformation.marks")}</h4>
                <div className="mark-element-container">
                    {marksScrum.map(mark =>
                        <div className="mark-element" style={{backgroundColor: mark.mark_color}}
                             key={mark.id}>{mark.mark_text} {currentProject.user_role.id !== 2 ?
                            <span onClick={() => deleteMarkHandler(mark)}>
                            <CloseSquareOutlined/></span> : false}
                        </div>)}
                </div>
                {currentProject.user_role.id !== 2 ?
                    <button className="add-mark-button" onClick={() => setIsAddMarks(true)}>
                        {text("taskInformation.addMark")}
                    </button> : false}
                <h4>{text("taskInformation.sprint")}</h4>
                <p>{currentTask.sprint_task_sprint?.sprint_name
                    ? currentTask.sprint_task_sprint?.sprint_name : 'None'}</p>
                <h4>{text("taskInformation.priority")}</h4>
                {currentProject.user_role.id !== 1
                    ? <div className="task-priority">
                        <div className="priority-icon">
                            <SvgSelector svgName={`${currentTaskScrum.priority}`}/>
                        </div>
                        <div className="priority-name">{currentTaskScrum.priority}</div>
                    </div>
                    : <div className="select-priority-container">
                        <Select placeholder={`${text("inviteCUsers.placeholders.userType")}`}
                                onChange={e => setCurrentPriority(e)}
                                className="project-select" style={{width: '100%'}} value={currentPriority}>
                            {priorities.map((item, index) =>
                                <Option key={index} value={item}>
                                    <div className="task-priority-select">
                                        <div className="priority-icon-select"><SvgSelector svgName={`${item}`}/>
                                        </div>
                                        <div className="priority-name-select">{item}</div>
                                    </div>
                                </Option>)}
                        </Select>
                    </div>}
                <h4>{text("taskInformation.executor")}</h4>
                {currentProject.user_role.id === 2 ? <div className="supervisor-container">
                        {currentTaskScrum?.executor_id?.username
                            && <div className="supervisor-logo">
                                {currentTaskScrum?.executor_id?.name[0]}{currentTaskScrum?.executor_id?.surname[0]}
                            </div>}
                        <span>{currentTaskScrum?.executor_id?.username
                            ? currentTaskScrum?.executor_id?.username : `${text("taskInformation.noAppointment")}`}</span>
                    </div>
                    : <Select className="project-select" style={{width: '100%'}}
                              onChange={e => setCurrentExecutor(e)} value={currentExecutor}>
                        <Option value={null}>None</Option>
                        {usersOnProject.map((executor, index) => {
                            if (executor.user_role.id === 3) {
                                return <Option key={index} value={executor.users.id}>{executor.users.username}</Option>
                            }
                        })}
                    </Select>}
                <h4>{text("taskInformation.createDate")}</h4>
                <p>{currentTaskScrum?.create_date}</p>
            </div>
            {isAddMarks && <>
                <div className="add-marks-container">
                    <h3>{text("taskInformation.marksWindow.title")}
                        <span>{currentTaskFromServer?.task_name}</span>?</h3>
                    <h4>{text("taskInformation.marksWindow.name")}</h4>
                    <Form form={form} onFinish={(values) => {
                        addMarksConfirm(values)
                        onCancel()
                    }}
                          autoComplete="off">
                        <Form.Item
                            name="mark_text"
                            style={{marginRight: "15px"}}
                            rules={[{required: false},
                                {max: 15, message: `${text("taskInformation.marksWindow.input.error")}`}]}>
                            <Input placeholder={`${text("taskInformation.marksWindow.input.placeholder")}`}/>
                        </Form.Item>
                        <h4>{text("taskInformation.marksWindow.color")}</h4>
                        <div className="color-picker">
                            {markColors.map((markColor, index) =>
                                <div key={index} onClick={() => {
                                    setActiveColor(markColor.value)
                                    activeColorHandler()
                                    setActive(index)
                                }}
                                     className={active === index ? `active-color` : ''}
                                     style={{backgroundColor: markColor.value}}>
                                </div>)}
                        </div>
                        <Button className="add-marks-confirm" type="primary" htmlType="submit">
                            {text("taskInformation.marksWindow.addBtn")}
                        </Button>
                        <Button onClick={onCancel}>
                            {text("taskInformation.marksWindow.cancel")}
                        </Button>
                    </Form>
                </div>
                <div className="delete-task-wrapper" ref={marksAddRef}></div>
            </>}
        </>
    )
}

export default TaskInformationComponent
