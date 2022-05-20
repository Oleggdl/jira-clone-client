import React from 'react'
import './Column.scss'
import ColumnList from "./ColumnListComponents"

const ColumnComponent = ({column, title, tasks, text}) => {
    return (
        <>
            <div className="column-container">
                <div className="column-title">
                    <h4>{column.column_name}</h4>
                    <h5>{text("columnComponent.count")}: {tasks?.length}</h5>
                </div>
                <div className="column-task-container">
                    <ColumnList listId={title}
                                listType="SPRINT"
                                tasks={tasks}
                                column={column}/>
                </div>
            </div>
        </>
    )
}

export default ColumnComponent

