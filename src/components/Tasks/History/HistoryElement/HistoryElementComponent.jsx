import React from 'react'
import './HistoryElement.scss'

const HistoryElementComponent = () => {


    return (
        <>
            <div className="history-element-container">
                <div className="history-user-logo"></div>
                <div className="author-name">
                    <h3>OIE zhA</h3>
                    <p className="history_text">Create</p>
                    <p className="history_object" style={{fontWeight: "500"}}>Task</p>
                    <h5>29.03.2022 / 12:07:34</h5>
                </div>
            </div>
        </>
    )
}

export default HistoryElementComponent
