import React from 'react'
import SprintStartWindowComponent from "./SprintStartWindowComponent"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {setCurrentSprint, startSprint} from "../../../../redux/sprints-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {startSprintColumns} from "../../../../redux/columns-reducer"
import {changeIndexBoardTaskSprint, setTaskSprintColumn} from "../../../../redux/taskSprint-reducer"


const SprintStartWithFrom = props => {
    const form = useForm()
    return <SprintStartWindowContainer {...props} {...form}/>
}

class SprintStartWindowContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
        }
        this.startSprintWrapper = React.createRef()
    }

    startSprintWindowHandler = event => {
        if (event.target === this.startSprintWrapper.current) {
            this.props.setIsSprintStartingMod()
        }
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        window.addEventListener("mouseup", event => this.startSprintWindowHandler(event))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.sprintColumns !== prevProps.sprintColumns) {
            let columnId = null
            this.props.columns.map(col => col.column_name === 'TO DO' ? columnId = col.id : null)

            columnId && this.props.taskSprints.filter(item =>
                item.sprint_task_sprint.sprint_name === this.props.title).map((taskSprint, index) => {
                this.props.setTaskSprintColumn(taskSprint.id, columnId, this.props.sprint.id, index, this.state.headers)
            })

            this.onCancel()
        }
    }

    componentWillUnmount() {
        window.removeEventListener("mouseup", event => this.startSprintWindowHandler(event))
    }

    handleSubmit = data => {
        const startDate = data.start_date._d.toString().match(/(.+)\s\d{2}\s\d{4}/)
        const endDate = data.end_date._d.toString().match(/(.+)\s\d{2}\s\d{4}/)

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

        const newStartDate = `${startDate[0].split(' ')[3]}-`
            + `${monthSelector[startDate[0].split(' ')[1]]}-${startDate[0].split(' ')[2]}`

        const newEndDate = `${endDate[0].split(' ')[3]}-`
            + `${monthSelector[endDate[0].split(' ')[1]]}-${endDate[0].split(' ')[2]}`

        this.props.startSprint({
            sprint_name: this.props.sprint.sprint_name || `BoardSprint ${this.props.index + 1}`,
            start_date: newStartDate,
            end_date: newEndDate,
            is_started: true
        }, this.props.sprint.id, this.props.currentProject.scrum_project.id, this.state.headers)
        this.props.startSprintColumns({column_name: 'TO DO'}, this.props.sprint.id, this.state.headers)
        this.props.startSprintColumns({column_name: 'IN WORK'}, this.props.sprint.id, this.state.headers)
        this.props.startSprintColumns({column_name: 'DONE'}, this.props.sprint.id, this.state.headers)
    }

    onCancel = () => {
        this.props.setIsSprintStartingMod(false)
    }

    render() {

        return (
            <>
                <SprintStartWindowComponent form={this.props.form} handleSubmit={this.handleSubmit}
                                            onCancel={this.onCancel} text={this.props.text}
                                            startSprintWrapper={this.startSprintWrapper} index={this.props.index}
                                            sprint={this.props.sprint} taskCount={this.props.taskCount}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    taskSprints: state.taskSprintReducer.taskSprints,
    columns: state.columnsReducer.columns,
    sprintColumns: state.columnsReducer.sprintColumns
})

export default compose(
    connect(mapStateToProps, {
        startSprint, startSprintColumns, setTaskSprintColumn, setCurrentSprint, changeIndexBoardTaskSprint
    })
)(SprintStartWithFrom)

