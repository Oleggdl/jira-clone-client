import {backlogAPI, sprintsAPI, tasksAPI, taskSprintAPI} from "../api/api"
import {getTaskSprintsActionCreator} from "./taskSprint-reducer"
import {getBacklogForProjectActionCreator} from "./backlog-reducer";
import {getSprintsActionCreator, setCurrentSprintActionCreator} from "./sprints-reducer";

const GET_TASKS = 'GET_TASKS'
const SET_CREATED_TASK_ID = 'SET_CREATED_TASK_ID'
const SET_CURRENT_TASK = 'SET_CURRENT_TASK'
const GET_USERS_ON_PROJECT = 'GET_USERS_ON_PROJECT'
const SET_CURRENT_TASK_ID = 'SET_CURRENT_TASK_ID'
const GET_CURRENT_TASK_FROM_SERVER = 'GET_CURRENT_TASK_FROM_SERVER'

let initialState = {
    tasks: [],
    createdTaskId: null,
    currentTask: {},
    usersOnProject: [],
    currentTaskId: null,
    currentTaskFromServer: {}
}

const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }

        case SET_CREATED_TASK_ID: {
            return {
                ...state,
                createdTaskId: action.createdTaskId
            }
        }

        case SET_CURRENT_TASK: {
            return {
                ...state,
                currentTask: action.currentTask
            }
        }

        case GET_USERS_ON_PROJECT: {
            return {
                ...state,
                usersOnProject: action.usersOnProject
            }
        }

        case SET_CURRENT_TASK_ID: {
            return {
                ...state,
                currentTaskId: action.currentTaskId
            }
        }

        case GET_CURRENT_TASK_FROM_SERVER: {
            return {
                ...state,
                currentTaskFromServer: action.currentTaskFromServer
            }
        }

        default:
            return state
    }
}

export const setCurrentTaskActionCreator = currentTask => ({type: SET_CURRENT_TASK, currentTask})
export const getUsersOnProjectActionCreator = usersOnProject => ({type: GET_USERS_ON_PROJECT, usersOnProject})
export const setCurrentTaskIdActionCreator = currentTaskId => ({type: SET_CURRENT_TASK_ID, currentTaskId})
export const getCurrentTaskFromServerActionCreator = currentTaskFromServer =>
    ({type: GET_CURRENT_TASK_FROM_SERVER, currentTaskFromServer})

export const getUsersOnProject = (projectId, authorization) => {
    return async dispatch => {
        const response = await tasksAPI.getUsersOnProject(projectId, authorization)
        dispatch(getUsersOnProjectActionCreator(response.data))
    }
}

export const updateTaskDescription = (taskId, data, authorization) => {
    return async dispatch => {
        const response = await tasksAPI.updateTaskDescription(taskId, data, authorization)
        const responseGet = await tasksAPI.getTaskById(taskId, authorization)
        dispatch(getCurrentTaskFromServerActionCreator(responseGet.data))
    }
}

export const updateTaskName = (taskId, data, projectId, authorization) => {
    return async dispatch => {
        const response = await tasksAPI.updateTaskName(taskId, data, authorization)
        // dispatch(getUsersOnProjectActionCreator(response.data))
        const responseProject = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(responseProject.data))
        const responseGet = await tasksAPI.getTaskById(taskId, authorization)
        dispatch(getCurrentTaskFromServerActionCreator(responseGet.data))
        const responseTaskSprint = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseTaskSprint.data))
    }
}

export const updateTaskPriority = (taskId, data, projectId, authorization) => {
    return async dispatch => {
        const response = await tasksAPI.changeTaskPriority(taskId, data, authorization)
        const responseGet = await tasksAPI.getTaskById(taskId, authorization)
        dispatch(getCurrentTaskFromServerActionCreator(responseGet.data))
        const responseTaskSprint = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseTaskSprint.data))
        const responseProject = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(responseProject.data))
        const responseTasks = await sprintsAPI.getStartedSprint(projectId, authorization)
        dispatch(setCurrentSprintActionCreator(responseTasks.data[0]))
    }
}

export const changeTaskExecutor = (taskId, data, projectId, authorization) => {
    return async dispatch => {
        const response = await tasksAPI.changeTaskExecutor(taskId, data, authorization)
        const responseGet = await tasksAPI.getTaskById(taskId, authorization)
        dispatch(getCurrentTaskFromServerActionCreator(responseGet.data))
        const responseProject = await backlogAPI.getBacklogForProject(projectId, authorization)
        dispatch(getBacklogForProjectActionCreator(responseProject.data))
        const responseTaskSprint = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseTaskSprint.data))
        const responseTasks = await sprintsAPI.getStartedSprint(projectId, authorization)
        dispatch(setCurrentSprintActionCreator(responseTasks.data[0]))
    }
}

export const getCurrentTaskFromServer = (taskId, authorization) => {

    return async dispatch => {
        const response = await tasksAPI.getTaskById(taskId, authorization)
        dispatch(getCurrentTaskFromServerActionCreator(response.data))
    }
}

export const setCurrentTask = (task) => {

    return async dispatch => {
        dispatch(setCurrentTaskActionCreator(task))
    }
}

export default tasksReducer
