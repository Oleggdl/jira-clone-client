import {backlogAPI, tasksAPI, taskSprintAPI} from "../api/api"
import {getTaskSprintsActionCreator} from "./taskSprint-reducer"

const GET_BACKLOG_ELEMENTS = 'GET_BACKLOG_ELEMENTS'
const GET_BACKLOG_FOR_PROJECT = 'GET_BACKLOG_FOR_PROJECT'
const GET_DELETED_MESSAGE = 'GET_DELETED_MESSAGE'

let initialState = {
    backlogElements: [],
    backlogForProject: [],
    isTaskDeleted: null
}

const backlogReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_BACKLOG_ELEMENTS: {
            return {
                ...state,
                backlogElements: action.backlogElements
            }
        }

        case GET_BACKLOG_FOR_PROJECT: {
            return {
                ...state,
                backlogForProject: action.backlogForProject
            }
        }

        case GET_DELETED_MESSAGE: {
            return {
                ...state,
                isTaskDeleted: action.isTaskDeleted
            }
        }

        default:
            return state
    }
}


export const getBacklogElementsActionCreator = backlogElements => ({type: GET_BACKLOG_ELEMENTS, backlogElements})
export const isTaskDeletedActionCreator = isTaskDeleted => ({type: GET_DELETED_MESSAGE, isTaskDeleted})
export const getBacklogForProjectActionCreator = backlogForProject => ({
    type: GET_BACKLOG_FOR_PROJECT,
    backlogForProject
})

// export const getBacklogElement = (authorization) => {
//
//     return async dispatch => {
//         const response = await backlogAPI.getBacklogElements(authorization)
//         dispatch(getBacklogElementsActionCreator(response.data))
//     }
// }

export const createBacklogElement = (data, projectId, creatorId, executorId, authorization) => {

    return async dispatch => {
        const responseCreateTask = await tasksAPI.createTask(data, authorization)

        if (executorId) {
            const responseTaskPut =
                await tasksAPI.putTask(responseCreateTask.data.id, creatorId, executorId, authorization)
        } else {
            const responseNotExecutor =
                await tasksAPI.putTaskNotExecutor(responseCreateTask.data.id, creatorId, authorization)
        }

        const responsePost = await backlogAPI.createBacklogElement({}, authorization)

        const responsePut = await backlogAPI.uniteBacklogProjectTask(responsePost.data.id,
            responseCreateTask.data.id, projectId, authorization)

        const response = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(response.data))
    }
}

export const createBacklogElementFromSprint = (taskSprintId, taskId, projectId, authorization) => {

    return async dispatch => {
        const responseDel = await taskSprintAPI.deleteTaskSprints(taskSprintId, authorization)
        const responsePost = await backlogAPI.createBacklogElement({}, authorization)
        const responsePut =
            await backlogAPI.uniteBacklogProjectTask(responsePost.data.id, taskId, projectId, authorization)
        const response = await backlogAPI.getBacklogElements(authorization)
        dispatch(getBacklogElementsActionCreator(response.data))
        const responseGetTask = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGetTask.data))
        const responseGetBacklog = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(responseGetBacklog.data))
    }
}

export const getBacklogForProject = (projectId, authorization) => {

    return async dispatch => {
        const response = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(response.data))
    }
}

export const deleteTask = (taskId, userId, projectId, authorization) => {

    return async dispatch => {
        console.log('test del')
        const responseDel = await tasksAPI.deleteTask(taskId, userId, projectId, authorization)
        dispatch(isTaskDeletedActionCreator(responseDel.data['deleted']))
        const response = await backlogAPI.getBacklogElements(authorization)
        dispatch(getBacklogElementsActionCreator(response.data))
        const responseSprint = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseSprint.data))
        const responseGetBacklog = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(responseGetBacklog.data))
    }
}

export const searchTasks = (query, projectId, authorization) => {

    return async dispatch => {
        const response = await backlogAPI.searchTask(query, projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(response.data))
    }
}


export default backlogReducer
