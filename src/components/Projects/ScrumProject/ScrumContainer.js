import React from 'react'
import ScrumComponent from "./ScrumComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {getBacklogForProject} from "../../../redux/backlog-reducer"
import {getTaskSprints, getTaskSprintsForSprint, unsetTaskSprints} from "../../../redux/taskSprint-reducer"
import {getStartedSprint} from "../../../redux/sprints-reducer"
import {getUsersOnProject} from "../../../redux/tasks-reducer"

class ScrumContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
            tasks: [],
            sprintsMap: [],
            columnTasks: [],
            columnsMap: [],
            backlog: []
        }
        this.updateTaskSprints = this.updateTaskSprints.bind(this)
        this.updateSprintsHandler = this.updateSprintsHandler.bind(this)
    }

    getBySprint = (sprintName, items) => {
        return items.filter(task => task.sprint_task_sprint?.sprint_name === sprintName)
    }
    getByBacklog = items => {
        return items.filter(task => task.scrum_task_id)
    }
    getByColumn = (columnName, items) => {
        return items.filter(task => task.sprint_column?.column_name === columnName)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        // this.setState({
        //     tasks: this.props.taskSprints.concat(this.props.backlogForProject)
        // })
        //
        // this.setState({
        //     sprintsMap: this.props.sprints.reduce(
        //         (previous, sprint) => ({
        //             ...previous,
        //             [sprint.sprint_name]: this.getBySprint(sprint.sprint_name, this.state.tasks)
        //         }),
        //         {['Backlog']: this.getByBacklog(this.state.tasks)})
        // })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.taskSprints !== prevProps.taskSprints) {
            // console.log('test14')
            this.setState({
                tasks: this.props.taskSprints.concat(this.props.backlogForProject)
            })
        }

        if (this.props.backlogForProject !== prevProps.backlogForProject) {
            this.setState({
                tasks: this.props.taskSprints.concat(this.props.backlogForProject)
            })
        }

        if (this.props.sprints !== prevProps.sprints || this.props.currentProject !== prevProps.currentProject) {
            this.setState({
                tasks: this.props.taskSprints.concat(this.props.backlogForProject)
            })
        }

        if (this.props.columns !== prevProps.columns || this.props.currentProject !== prevProps.currentProject) {
            this.setState({
                columnTasks: this.props.taskSprintsForSprint
            })
        }

        if (this.state.tasks !== prevState.tasks || this.props.currentProject !== prevProps.currentProject) {
            this.setState({
                sprintsMap: this.props.sprints.reduce(
                    (previous, sprint) => ({
                        ...previous,
                        [`${sprint.sprint_name},${sprint.id}`]: this.getBySprint(sprint.sprint_name, this.state.tasks)
                    }),
                    {['Backlog']: this.getByBacklog(this.state.tasks)})
            })
        }
        if (this.state.headers !== prevState.headers || this.props.currentProject !== prevProps.currentProject) {
            this.props.getBacklogForProject(this.props.currentProject.scrum_project.id, this.state.headers)
            this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
            this.props.getUsersOnProject(this.props.currentProject.scrum_project.id, this.state.headers)
        }
        if (this.props.currentSprint !== prevProps.currentSprint) {
            if (!!this.props.currentSprint) {
                this.props.getTaskSprintsForSprint(this.props.currentSprint.id, this.state.headers)
            }
        }
        if (this.props.taskSprintsForSprint !== prevProps.taskSprintsForSprint) {
            this.setState({
                columnTasks: this.props.taskSprintsForSprint
            })
        }
        if (this.state.columnTasks !== prevState.columnTasks
            || this.props.currentProject !== prevProps.currentProject) {
            this.setState({
                columnMap: this.props.columns.reduce(
                    (previous, column) => ({
                        ...previous,
                        [`${column.column_name},${column.id}`]: this.getByColumn(column.column_name, this.state.columnTasks)
                    }), {})
            })
        }
    }

    updateSprintsHandler() {
        // console.log('test13')
        this.setState({
            tasks: this.props.taskSprints.concat(this.props.backlogForProject)
        })
    }

    updateTaskSprints() {
        this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
    }

    render() {
        return (
            <>
                <ScrumComponent sprints={this.props.sprints} sprintsMap={this.state.sprintsMap}
                                columns={this.props.columns} columnMap={this.state.columnMap}
                                updateTaskSprints={this.updateTaskSprints}
                                updateSprintsHandler={this.updateSprintsHandler}
                />
            </>
        )

    }
}

const mapStateToProps = (state) => ({
    backlogForProject: state.backlogReducer.backlogForProject,
    currentProject: state.projectsReducer.currentProject,
    sprints: state.sprintsReducer.sprints,
    taskSprints: state.taskSprintReducer.taskSprints,
    columns: state.columnsReducer.columns,
    taskSprintsForSprint: state.taskSprintReducer.taskSprintsForSprint,
    currentSprint: state.sprintsReducer.currentSprint
})


export default compose(
    connect(mapStateToProps, {
        getBacklogForProject, getTaskSprints, unsetTaskSprints, getTaskSprintsForSprint, getStartedSprint,
        getUsersOnProject
    })
)(ScrumContainer)
