import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd"
import TaskBoardContainer from "../../Tasks/TaskBoardComponent/TaskBoardContainer"

class InnerColumnList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.tasks !== this.props.tasks
    }

    render() {
        return this.props.tasks ? this.props.tasks.sort((a, b) => a.index - b.index).map((task, index) => (
            <Draggable
                key={task?.id}
                draggableId={task?.id.toString()}
                index={task?.index}
                shouldRespectForceTouch={false}
            >
                {dragProvided => (
                    <TaskBoardContainer
                        key={task?.id}
                        taskSprint={task}
                        provided={dragProvided}
                    />
                )}
            </Draggable>
        )) : <></>
    }
}

class InnerList extends React.Component {
    render() {
        const {tasks, dropProvided} = this.props

        return (
            <div>
                <div className="drop-zone" ref={dropProvided.innerRef}>
                    <InnerColumnList tasks={tasks}/>
                    {dropProvided.placeholder}
                </div>
            </div>
        )
    }
}


export default class ColumnList extends React.Component {

    render() {
        const {
            listId,
            listType,
            tasks,
            column
        } = this.props

        return (

            <Droppable
                droppableId={`${listId},${column.id}`}
                type={listType}
            >
                {dropProvided => (
                    <div{...dropProvided.droppableProps}>
                        <InnerList
                            tasks={tasks}
                            dropProvided={dropProvided}
                        />
                    </div>
                )}
            </Droppable>
        )
    }
}
