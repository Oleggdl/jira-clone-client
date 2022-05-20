import React from 'react'
import './SprintStartWindow.scss'
import {Button, DatePicker, Form} from "antd"
import moment from "moment";

const SprintStartWindowComponent = ({
                                        form, handleSubmit, onCancel, startSprintWrapper, index, sprint, taskCount,
                                        text
                                    }) => {

    const currentDate = new Date().toLocaleDateString()
    const currentDateArray = currentDate.split('.')

    const longMonth = [1, 3, 5, 7, 8, 10, 12]
    const shortMonth = [4, 6, 9, 11]

    if (longMonth.includes(parseInt(currentDateArray[1]))) {
        if (parseInt(currentDateArray[0]) + 14 > 31) {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14 - 31
            currentDateArray[1]++
        } else {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14
        }
    } else if (shortMonth.includes(parseInt(currentDateArray[1]))) {
        if (parseInt(currentDateArray[0]) + 14 > 30) {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14 - 30
            currentDateArray[1]++
        } else {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14
        }
    } else {
        if (parseInt(currentDateArray[0]) + 14 > 28) {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14 - 28
            currentDateArray[1]++
        } else {
            currentDateArray[0] = parseInt(currentDateArray[0]) + 14
        }
    }

    return (
        <>
            <div className="sprint-wrapper" ref={startSprintWrapper}>
                <div className="sprint-launch-container">
                    <h2>{text("startSprintWindow.title")}</h2>
                    <p><span style={{fontWeight: "bold"}}>{taskCount}</span>{text("startSprintWindow.text")}</p>
                    <Form form={form}
                          onFinish={values => handleSubmit(values)}
                          autoComplete="off"
                          initialValues={
                              {
                                  start_date: sprint.start_date ?  moment(sprint.start_date, 'YYYY/MM/DD') :
                                       moment(currentDate, 'DD/MM/YYYY'),
                                  end_date: sprint.end_date ?  moment(sprint.end_date, 'YYYY/MM/DD') :
                                       moment(currentDateArray.join('.'), 'DD/MM/YYYY')
                              }}>
                        <h4>{text("startSprintWindow.name")}</h4>
                        <h3>{sprint.sprint_name || `BoardSprint ${index + 1}`}</h3>
                        <h4>{text("startSprintWindow.startDate")}</h4>
                        <Form.Item name="start_date"
                                   rules={[{required: true, message: `${text("startSprintWindow.errors.start")}`}]}>
                            <DatePicker/>
                        </Form.Item>
                        <h4>{text("startSprintWindow.endDate")}</h4>
                        <Form.Item name="end_date"
                                   rules={[{required: true, message: `${text("startSprintWindow.errors.end")}`}]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item className="start-sprint-buttons">
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                    className="primary-button-submit">
                                {text("startSprintWindow.submitBtn")}
                            </Button>
                            <Button style={{marginLeft: "15px", width: "100px"}} onClick={onCancel}>
                                {text("startSprintWindow.cancelBtn")}</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default SprintStartWindowComponent
