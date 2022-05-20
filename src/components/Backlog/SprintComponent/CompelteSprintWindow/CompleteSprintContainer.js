import React, {Component, createRef} from 'react'
import CompleteSprintComponent from "./CompleteSprintComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createTaskSprintFromSprint} from "../../../../redux/taskSprint-reducer"
import {createBacklogElementFromSprint, deleteTask} from "../../../../redux/backlog-reducer"
import {completeDeleteSprint, unsetCurrentSprint} from "../../../../redux/sprints-reducer"
import {AuthContext} from "../../../../context/AuthContext"

class CompleteSprintContainer extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            moveType: '',
            headers: {}
        }
        this.completeSprintWrapper = createRef()
        this.setMoveType = this.setMoveType.bind(this)
        this.completeSprint = this.completeSprint.bind(this)
    }

    closeCompleteWindow(e) {
        if (e.target === this.completeSprintWrapper.current) {
            this.props.setCompleteWindow(false)
        }
    }

    setMoveType(value) {
        this.setState({moveType: value})
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        window.addEventListener('click', e => this.closeCompleteWindow(e))
        this.setState({moveType: 'backlog'})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentWillUnmount() {
        window.removeEventListener('click', e => this.closeCompleteWindow(e))
    }

    completeSprint = () => {
        // console.log(this.props.sprints)
        if (this.state.moveType === 'sprint_name') {
            Object.keys(this.props.columnsMap).map(item => {
                if (item.split(',')[0] !== 'DONE') {
                    this.props.columnsMap[item].map(task => {
                        this.props.createTaskSprintFromSprint(task.id, task.task_scrum.id,
                            this.props.sprints[1].id, this.props.currentProject.scrum_project.id, this.state.headers)
                    })
                } else if (item.split(',')[0] === 'DONE') {
                    this.props.columnsMap[item].map(task => {
                        this.props.deleteTask(task.task_scrum.id, this.props.currentUser.id,
                            this.props.currentProject.scrum_project.id, this.state.headers)
                    })
                }
            })
        } else {
            Object.keys(this.props.columnsMap).map(item => {
                if (item.split(',')[0] !== 'DONE') {
                    this.props.columnsMap[item].map(task => {
                        this.props.createBacklogElementFromSprint(task.id, task.task_scrum.id,
                            this.props.currentProject.scrum_project.id, this.state.headers)
                    })
                } else if (item.split(',')[0] === 'DONE') {
                    this.props.columnsMap[item].map(task => {
                        this.props.deleteTask(task.task_scrum.id, this.props.currentUser.id,
                            this.props.currentProject.scrum_project.id, this.state.headers)
                    })
                }
            })
        }


        this.props.setCompleteWindow(false)
        this.props.completeDeleteSprint(this.props.currentSprint.id, this.props.currentProject.scrum_project.id,
            this.state.headers)
        this.props.unsetCurrentSprint()

    }

    render() {
        const {text, setCompleteWindow, columnsMap, sprints, currentSprint} = this.props

        return (
            <>
                <CompleteSprintComponent completeSprintWrapper={this.completeSprintWrapper} text={text}
                                         setCompleteWindow={setCompleteWindow} columnsMap={columnsMap}
                                         setMoveType={this.setMoveType} moveType={this.state.moveType}
                                         completeSprint={this.completeSprint} sprints={sprints}
                                         currentSprint={currentSprint}/>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    columns: state.columnsReducer.columns,
    currentSprint: state.sprintsReducer.currentSprint,
    currentProject: state.projectsReducer.currentProject,
    currentUser: state.userReducer.currentUser,
    sprints: state.sprintsReducer.sprints
})

export default compose(
    connect(mapStateToProps, {
        createBacklogElementFromSprint, createTaskSprintFromSprint, deleteTask, completeDeleteSprint,
        unsetCurrentSprint
    })
)(CompleteSprintContainer)
