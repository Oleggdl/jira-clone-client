import React from 'react'
import './History.scss'
import HistoryElementContainer from "./HistoryElement/HistoryElementContainer"

const HistoryComponent = () => {


    return (
        <>
            <div className="history-container">
                <HistoryElementContainer/>
                <HistoryElementContainer/>
                <HistoryElementContainer/>
            </div>
        </>
    )
}

export default HistoryComponent
