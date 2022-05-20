import React, {createRef, useContext} from 'react'
import ColumnComponent from "./ColumnComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteColumnScrum} from "../../../redux/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getTaskSprintForColumn, unsetTaskSprintsForColumn} from "../../../redux/taskSprint-reducer"
import {LanguageContext} from "../../../context/LanguageContext"

const ColumnContainerWithText = props => {
    const {text} = useContext(LanguageContext)
    return <ColumnContainer {...props} text={text}/>
}

class ColumnContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
            isSettings: false,
            isSettingsActive: ''
        }
        this.settingsRef = createRef()
        this.settingWindowHandler = this.settingWindowHandler.bind(this)
    }

    settingWindowHandler(e) {
        if (e.target !== this.settingsRef.current) {
            this.setIsSettings(false)
            this.setIsSettingsActive('')
        }
    }

    setIsSettings(value) {
        this.setState({
            isSettings: value
        })
    }

    setIsSettingsActive(value) {
        this.setState({
            isSettingsActive: value
        })
    }

    settingsColumnHandler = () => {
        !!this.state.isSettings ? this.setIsSettings(false) : this.setIsSettings(true)
        !!this.state.isSettingsActive ? this.setIsSettingsActive('') : this.setIsSettingsActive('settings-active')
    }


    deleteColumnHandler = (id) => {
        this.props.deleteColumnScrum(id, this.props.currentSprint.id, this.state.headers)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        window.addEventListener("click", this.settingWindowHandler)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.headers !== prevState.headers) {
            this.props.getTaskSprintForColumn(this.props.currentSprint.id, this.props.column.id, this.state.headers)
        }
    }

    componentWillUnmount() {
        this.props.unsetTaskSprintsForColumn()
        window.removeEventListener("click", this.settingWindowHandler)
    }

    render() {

        const {column, title, tasks, taskSprintsForColumn, text} = this.props

        return (
            <>
                <ColumnComponent column={column} settingsColumnHandler={this.settingsColumnHandler}
                                 isSettings={this.state.isSettings} isSettingsActive={this.state.isSettingsActive}
                                 settingsRef={this.settingsRef} title={title} tasks={tasks} text={text}
                                 deleteColumnHandler={this.deleteColumnHandler}
                                 taskSprintsForColumn={taskSprintsForColumn}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentSprint: state.sprintsReducer.currentSprint,
    taskSprintsForColumn: state.taskSprintReducer.taskSprintsForColumn,
})

export default compose(
    connect(mapStateToProps, {deleteColumnScrum, getTaskSprintForColumn, unsetTaskSprintsForColumn})
)(ColumnContainerWithText)
