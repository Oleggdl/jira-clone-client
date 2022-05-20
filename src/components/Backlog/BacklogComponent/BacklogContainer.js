import React, {createRef, useContext} from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {TaskContext} from "../../../context/TaskContext"
import {
    createSprintFromBacklog,
    getTaskSprints,
    moveTaskSprintFromSprint,
    unsetTaskSprints
} from "../../../redux/taskSprint-reducer"
import {createBacklogElementFromSprint, searchTasks} from "../../../redux/backlog-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getSprints, getStartedSprint} from "../../../redux/sprints-reducer"
import {reorderSprintMap} from "../../../utils/reorderBacklog"
import {LanguageContext} from "../../../context/LanguageContext"

const BacklogContainerWithText = props => {
    const {text} = useContext(LanguageContext)
    return <BacklogContainer {...props} text={text}/>
}

class BacklogContainer extends React.Component {

    static contextType = AuthContext
    static defaultProps = {
        isCombineEnabled: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isTaskInfo: false,
            backlogForProject: this.props.backlogForProject,
            backlogForProjectSprint: [],
            headers: {},
            columns: this.props.initial,
            errorMessage: '',
            isUserInfo: false,
            currentUser: {}
        }
        this.userInfoWrapper = createRef()
        this.setIsTaskInfo = this.setIsTaskInfo.bind(this)
        this.setBacklogForProject = this.setBacklogForProject.bind(this)
        this.setBacklogForProjectSprint = this.setBacklogForProjectSprint.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
        this.setIsUserInfo = this.setIsUserInfo.bind(this)
        this.setCurrentUser = this.setCurrentUser.bind(this)
    }

    setIsUserInfo(value) {
        this.setState({isUserInfo: value})
    }

    setCurrentUser(value) {
        this.setState({currentUser: value})
    }

    onCloseUserInfo(e) {
        if (this.userInfoWrapper) {
            if (this.userInfoWrapper.current === e.target) {
                this.setIsUserInfo(false)
            }
        }
    }

    componentDidMount() {
        this.props.updateSprintsHandler()
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        if (!!this.props.taskSprints) {
            this.props.unsetTaskSprints()
        }
        window.addEventListener('click', e => this.onCloseUserInfo(e))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.initial !== prevProps.initial) {
            this.setState({columns: this.props.initial})
        }
        if (this.state.errorMessage !== prevState.errorMessage) {
            window.M.toast({html: this.state.errorMessage})
            this.setState({errorMessage: ''})
        }
        if (this.state.headers !== prevState.headers) {
            this.props.getStartedSprint(this.props.currentProject.scrum_project.id, this.state.headers)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', e => this.onCloseUserInfo(e))
    }

    setIsTaskInfo(value) {
        this.setState({isTaskInfo: value})
    }

    setBacklogForProject(value) {
        this.setState({backlogForProject: value})
    }

    setBacklogForProjectSprint(value) {
        this.setState({backlogForProjectSprint: value})
    }

    onDragEnd = result => {

        if (this.props.currentSprint) {
            if (result.source.droppableId?.split(',')[0] === this.props.currentSprint.sprint_name
                || result.destination.droppableId?.split(',')[0] === this.props.currentSprint.sprint_name) {
                this.setState({errorMessage: `${this.props.text("backlogComponent.startSprintError")}`})
                return
            }
        }

        if (this.props.currentProject.user_role.id !== 1) {
            this.setState({errorMessage: `${this.props.text("backlogComponent.errorDnd")}`})
            return
        }

        if (!result.destination) {
            return
        }

        const source = result.source
        const destination = result.destination

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        const data = reorderSprintMap({
            sprintMap: this.state.columns,
            source,
            destination
        })

        if (destination.droppableId === 'Backlog' && source.droppableId !== 'Backlog') {
            this.props.createBacklogElementFromSprint(result.draggableId.split(',')[0],
                result.draggableId.split(',')[1], this.props.currentProject.scrum_project.id, this.state.headers)
        }

        if (source.droppableId === 'Backlog' && destination.droppableId !== 'Backlog') {
            this.props.createSprintFromBacklog(result.draggableId.split(',')[0], result.draggableId.split(',')[1],
                destination.droppableId.split(',')[1], this.props.currentProject.scrum_project.id, this.state.headers)
        }

        if (destination.droppableId !== 'Backlog' && source.droppableId !== 'Backlog'
            && destination.droppableId !== source.droppableId) {
            this.props.moveTaskSprintFromSprint(result.draggableId.split(',')[0],
                destination.droppableId.split(',')[1], this.props.currentProject.scrum_project.id, this.state.headers)
        }

        this.setState({
            columns: data.sprintMap
        })
    }

    render() {

        const {text, updateTaskSprints, backlogForProject, currentProject, usersOnProject, sprints} = this.props

        const {isTaskInfo, columns, backlogForProjectSprint, isUserInfo, currentUser} = this.state

        return (
            <>
                <TaskContext.Provider value={{isTaskInfo: this.state.isTaskInfo, setIsTaskInfo: this.setIsTaskInfo}}>
                    <BacklogComponent isTaskInfo={isTaskInfo} text={text} isUserInfo={isUserInfo}
                                      onDragEnd={this.onDragEnd} updateTaskSprints={updateTaskSprints}
                                      columns={columns} sprints={sprints} backlogForProject={backlogForProject}
                                      currentProject={currentProject} usersOnProject={usersOnProject}
                                      setBacklogForProject={this.setBacklogForProject}
                                      setIsUserInfo={this.setIsUserInfo} userInfoWrapper={this.userInfoWrapper}
                                      backlogForProjectSprint={backlogForProjectSprint}
                                      setBacklogForProjectSprint={this.setBacklogForProjectSprint}
                                      currentUser={currentUser} setCurrentUser={this.setCurrentUser}
                    />
                </TaskContext.Provider>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    backlogForProject: state.backlogReducer.backlogForProject,
    taskSprints: state.taskSprintReducer.taskSprints,
    currentProject: state.projectsReducer.currentProject,
    currentSprint: state.sprintsReducer.currentSprint,
    usersOnProject: state.tasksReducer.usersOnProject
})

export default compose(
    connect(mapStateToProps, {
        unsetTaskSprints, getSprints, searchTasks, getTaskSprints, createBacklogElementFromSprint, getStartedSprint,
        createSprintFromBacklog, moveTaskSprintFromSprint
    })
)(BacklogContainerWithText)
