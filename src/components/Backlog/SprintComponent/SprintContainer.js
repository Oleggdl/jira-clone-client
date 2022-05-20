import React from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import {createNewTaskSprint, createTaskSprintFromSprint, unsetTaskSprints} from "../../../redux/taskSprint-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {deleteSprint, updateSprint} from "../../../redux/sprints-reducer"
import {createBacklogElementFromSprint} from "../../../redux/backlog-reducer"
import './Sprint.scss'
import SprintComponent from "./SprintComponent"
import {useForm} from "antd/es/form/Form"

const SprintWithFrom = props => {
    const form = useForm()
    return <SprintContainer {...props} {...form}/>
}

class SprintContainer extends React.Component {

    static contextType = AuthContext


    constructor(props) {
        super(props)
        this.state = {
            isCreateTask: false,
            isInputVisible: 'input-visible',
            isSprintStartingMod: false,
            isSettingsSprint: false,
            isDeleteSprint: false,
            isChangeSprint: false,
            headers: {},
            sprint: {},
            errorMessage: ''
        }
        this.taskInputRef = React.createRef()
        this.sprintDelRef = React.createRef()
        this.sprintSettingsRef = React.createRef()
        this.settingsBtnRef = React.createRef()
        this.onSetIsCreateTask = this.onSetIsCreateTask.bind(this)
        this.isSettingsSprintHandler = this.isSettingsSprintHandler.bind(this)
        this.setIsSprintStartingMod = this.setIsSprintStartingMod.bind(this)
        this.setIsChangeSprint = this.setIsChangeSprint.bind(this)
    }

    addTaskToSprintHandler = event => {
        if (event.target !== this.taskInputRef.current) {
            if (!this.taskInputRef) {
                this.taskInputRef.current.value = null
            }
            this.setState({isInputVisible: 'input-visible'})
            this.setState({isCreateTask: false})
        }
    }

    closeDeleteSprintHandler = event => {
        if (event.target === this.sprintDelRef.current) {
            this.setState({isDeleteSprint: false})
            this.setState({isChangeSprint: false})
        }
    }

    closeSettingsSprintHandler = event => {
        if (this.sprintSettingsRef && this.sprintSettingsRef.current) {
            if (!this.sprintSettingsRef.current.contains(event.target)
                && !this.settingsBtnRef.current.contains(event.target)) {
                this.setState({isSettingsSprint: false})
            }
        }
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        window.addEventListener("mousedown", this.addTaskToSprintHandler)
        window.addEventListener("mousedown", this.closeDeleteSprintHandler)
        window.addEventListener("mousedown", this.closeSettingsSprintHandler)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.errorMessage !== prevState.errorMessage) {
            window.M.toast({html: this.state.errorMessage})
        }
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.addTaskToSprintHandler)
        window.removeEventListener("mousedown", this.closeDeleteSprintHandler)
        window.removeEventListener("mousedown", this.closeSettingsSprintHandler)
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const create_date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            this.props.createNewTaskSprint({
                create_date: create_date,
                creator_id: null,
                executor_id: null,
                priority: 'normal',
                task_description: null,
                task_name: this.taskInputRef.current.value
            }, this.props.sprint.id, this.props.currentUser.id, this.props.currentProject.scrum_project.id, this.state.headers)
            this.setState({setIsCreateTask: false})
            this.setState({setIsInputVisible: 'input-visible'})
            this.taskInputRef.current.value = null
            // this.props.unsetTaskSprints()
            // this.props.updateTaskSprints()
        }
    }

    deleteSprintHandler = () => {
        if (this.props.currentProject.user_role.id === 1) {
            this.props.taskSprints.map(taskSprint => {
                if (taskSprint.sprint_task_sprint.sprint_name === this.props.title) {
                    this.props.createBacklogElementFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                        this.props.currentProject.scrum_project.id, this.state.headers)
                }
            })
            this.props.deleteSprint(this.props.sprint.id, this.props.currentProject.scrum_project.id, this.state.headers)
        } else {
            this.setState({errorMessage: `${this.props.text("sprintComponent.errorDeleteM")}`})
        }
    }

    isSettingsSprintHandler() {
        !!this.state.isSettingsSprint
            ? this.setState({isSettingsSprint: false})
            : this.setState({isSettingsSprint: true})
    }

    onSetIsCreateTask() {
        !!this.state.isCreateTask ? this.setState({isCreateTask: false}) : this.setState({isCreateTask: true})
        this.setState({isInputVisible: ''})
        this.taskInputRef.current.focus()
    }

    setIsSprintStartingMod(value) {
        this.setState({isSprintStartingMod: value})
    }

    setIsSettingsSprint = () => {
        this.setState({isSettingsSprint: false})
    }

    setIsDeleteSprint = (value) => {
        this.setState({isDeleteSprint: value})
    }

    onCancel = () => {
        this.setIsChangeSprint(false)
    }

    handleSubmit = (data) => {
        const startDate = data.start_date && data.start_date._d.toString().match(/(.+)\s\d{2}\s\d{4}/)
        const endDate = data.end_date && data.end_date._d.toString().match(/(.+)\s\d{2}\s\d{4}/)

        const monthSelector = {
            'Jan': '01',
            'Feb': '02',
            'Mar': '03',
            'Apr': '04',
            'May': '05',
            'Jun': '06',
            'Jul': '07',
            'Aug': '08',
            'Sep': '09',
            'Oct': '10',
            'Nov': '11',
            'Dec': '12'
        }

        const newEndDate = endDate && `${endDate[0].split(' ')[3]}-`
            + `${monthSelector[endDate[0].split(' ')[1]]}-${endDate[0].split(' ')[2]}`

        const newStartDate = startDate && `${startDate[0].split(' ')[3]}-`
            + `${monthSelector[startDate[0].split(' ')[1]]}-${startDate[0].split(' ')[2]}`

        this.props.updateSprint({
            sprint_name: data.sprint_name,
            start_date: newStartDate,
            end_date: newEndDate,
            is_started: false
        }, this.props.sprint.id, this.props.currentProject.scrum_project.id, this.state.headers)
        this.onCancel()
    }

    setIsChangeSprint(value) {
        this.setState({
            isChangeSprint: value
        })
    }

    render() {

        const {
            sprint, taskSprints, index, text, title, tasks, form,
            currentProject
        } = this.props

        const {
            isCreateTask, isInputVisible, isChangeSprint, isSprintStartingMod, isSettingsSprint,
            isDeleteSprint, isCompleteWindow
        } = this.state

        return (
            <>
                <SprintComponent sprint={sprint} taskSprints={taskSprints} setCompleteWindow={this.setCompleteWindow}
                                 index={index} sprintSettingsRef={this.sprintSettingsRef}
                                 onSetIsCreateTask={this.onSetIsCreateTask} taskInputRef={this.taskInputRef}
                                 isCreateTask={isCreateTask} onKeyDown={this.onKeyDown}
                                 isInputVisible={isInputVisible} isChangeSprint={isChangeSprint}
                                 setIsSprintStartingMod={this.setIsSprintStartingMod} text={text}
                                 isSprintStartingMod={isSprintStartingMod}
                                 completeSprint={this.completeSprint} settingsBtnRef={this.settingsBtnRef}
                                 isSettingsSprint={isSettingsSprint}
                                 setIsSettingsSprint={this.setIsSettingsSprint}
                                 isSettingsSprintHandler={this.isSettingsSprintHandler}
                                 isDeleteSprint={isDeleteSprint} handleSubmit={this.handleSubmit}
                                 setIsDeleteSprint={this.setIsDeleteSprint} sprintDelRef={this.sprintDelRef}
                                 deleteSprintHandler={this.deleteSprintHandler}
                                 setIsChangeSprint={this.setIsChangeSprint} currentProject={currentProject}
                                 title={title} form={form} isCompleteWindow={isCompleteWindow}
                                 tasks={tasks} onCancel={this.onCancel}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    taskSprints: state.taskSprintReducer.taskSprints,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject,
    sprints: state.sprintsReducer.sprints,
    backlogElements: state.backlogReducer.backlogElements
})

export default compose(
    connect(mapStateToProps, {
        createNewTaskSprint, unsetTaskSprints, updateSprint, deleteSprint, createBacklogElementFromSprint,
        createTaskSprintFromSprint
    })
)(SprintWithFrom)
