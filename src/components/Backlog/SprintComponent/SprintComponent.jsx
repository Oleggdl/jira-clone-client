import React from 'react'
import './Sprint.scss'
import {Button, DatePicker, Form, Input} from "antd"
import SprintStartWindowContainer from "./SprintStartWindow/SprintStartWindowContainer"
import {EllipsisOutlined} from "@ant-design/icons"
import SprintList from "./SprintListComponents"
import moment from "moment"

const SprintComponent = ({
                             sprint, index, taskSprints, isCreateTask, onSetIsCreateTask, onCancel, form, text,
                             onKeyDown, taskInputRef, isInputVisible, setIsSprintStartingMod, handleSubmit,
                             isSprintStartingMod, completeSprint, isSettingsSprint, isChangeSprint, setIsChangeSprint,
                             isSettingsSprintHandler, isDeleteSprint, setIsDeleteSprint, sprintDelRef,
                             setIsSettingsSprint, deleteSprintHandler, tasks, title, sprintSettingsRef, settingsBtnRef,
                             currentProject, isCompleteWindow, setCompleteWindow
                         }) => {

    return (
        <>
            {isSprintStartingMod && <SprintStartWindowContainer setIsSprintStartingMod={setIsSprintStartingMod}
                                                                sprint={sprint} index={index} title={title}
                                                                text={text} taskCount={tasks ? tasks.length : null}/>}
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{sprint?.sprint_name || `BoardSprint ${index + 1}`}</h4>
                    {sprint?.start_date && <>
                        <div className="sprint-header-text">{sprint?.start_date}</div>
                        <div className="sprint-header-text"> –</div>
                        <div className="sprint-header-text">{sprint?.end_date}</div>
                    </>}
                    <div
                        className="sprint-header-text">({text("sprintComponent.taskCount")}: <span>{tasks
                        ? tasks.length : null}</span>)
                    </div>
                    {currentProject.user_role.id === 1 ? <>
                        {sprint?.is_started
                            ? false
                            : (index !== 0 || tasks?.length === 0
                                ? <Button disabled={true}>{text("sprintComponent.start")}</Button>
                                : <Button className="start-sprint-button" type="primary"
                                          onClick={() => setIsSprintStartingMod(true)}>
                                    {text("sprintComponent.start")}</Button>)}
                        <div className="sprint-settings" style={{marginLeft: `${sprint?.is_started ? 'auto' : ''}`}}
                             onClick={isSettingsSprintHandler} ref={settingsBtnRef}>
                            <EllipsisOutlined/></div>
                    </> : false}
                    {isSettingsSprint && <div className="sprint-settings-window" ref={sprintSettingsRef}>
                        <div onClick={() => {
                            setIsChangeSprint(true)
                            setIsSettingsSprint()
                        }}><h4>{text("sprintComponent.changeSprintBtn")}</h4></div>
                        <div onClick={() => {
                            setIsDeleteSprint(true)
                            setIsSettingsSprint()
                        }}><h4>{text("sprintComponent.deleteSprintBtn")}</h4></div>
                    </div>}
                    {isDeleteSprint && <>
                        <div className="delete-sprint-container">
                            <h3>{text("sprintComponent.del.title")}</h3>
                            <p>{text("sprintComponent.del.text")}<span>{sprint?.sprint_name}</span>?</p>
                            <Button danger={true} onClick={() => {
                                deleteSprintHandler()
                                setIsDeleteSprint(false)
                            }}
                                    className="confirm-delete-sprint">{text("sprintComponent.del.deleteBtn")}</Button>
                            <Button onClick={() => setIsDeleteSprint(false)}>
                                {text("sprintComponent.del.cancel")}
                            </Button>
                        </div>
                        <div className="delete-task-wrapper" ref={sprintDelRef}></div>
                    </>}
                    {isChangeSprint && <>
                        <div className="change-sprint-container">
                            <h2>{text("sprintComponent.change.title")}: <span>{sprint?.sprint_name}</span></h2>

                            <Form form={form}
                                  onFinish={values => handleSubmit(values)}
                                  autoComplete="off"
                                  initialValues={
                                      {
                                          sprint_name: sprint.sprint_name,
                                          start_date: sprint.start_date
                                              && moment(sprint.start_date, 'YYYY/MM/DD'),
                                          end_date: sprint.end_date && moment(sprint.end_date, 'YYYY/MM/DD')
                                      }}>
                                <h4>{text("sprintComponent.change.name")}</h4>
                                <Form.Item
                                    name="sprint_name"
                                    rules={[{
                                        required: true,
                                        message: `${text("sprintComponent.change.errors.required")}`
                                    },
                                        {max: 50, message: `${text("sprintComponent.change.errors.max")}`},
                                        {min: 3, message: `${text("sprintComponent.change.errors.min")}`},
                                        {
                                            pattern: new RegExp(/[а-яa-zўі]/gi),
                                            message: `${text("sprintComponent.change.errors.pattern")}`
                                        }]}>
                                    <Input placeholder={`${text("sprintComponent.change.placeholders.name")}`}/>
                                </Form.Item>
                                <h4>{text("sprintComponent.change.startDate")}</h4>
                                <Form.Item name="start_date" rules={[{required: false}]}>
                                    <DatePicker/>
                                </Form.Item>
                                <h4>{text("sprintComponent.change.endDate")}</h4>
                                <Form.Item name="end_date" rules={[{required: false}]}>
                                    <DatePicker/>
                                </Form.Item>
                                <Form.Item className="start-sprint-buttons">
                                    <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                            className="primary-button-submit">
                                        {text("sprintComponent.change.updateBtn")}
                                    </Button>
                                    <Button style={{marginLeft: "15px", width: "100px"}}
                                            onClick={onCancel}>{text("sprintComponent.change.cancelBtn")}</Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="delete-task-wrapper" ref={sprintDelRef}></div>
                    </>}
                </div>
                <SprintList
                    listId={title}
                    listType="SPRINT"
                    tasks={tasks}
                    sprint={sprint}
                />
                {currentProject.user_role.id === 1 && !sprint?.is_started ? <>
                    <input className={`task-creations-input ${isInputVisible}`} ref={taskInputRef}
                           onKeyDown={e => onKeyDown(e)} placeholder={`${text("sprintComponent.createTaskInput")}`}/>
                    {!isCreateTask &&
                        <button style={{display: "block"}} className="create-task-button"
                                onMouseUp={onSetIsCreateTask}>{text("sprintComponent.createTaskBtn")}
                        </button>}
                </> : false}
            </div>
        </>
    )
}

export default SprintComponent


