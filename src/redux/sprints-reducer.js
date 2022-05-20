import {sprintsAPI, taskSprintAPI} from "../api/api"
import {getTaskSprintsActionCreator} from "./taskSprint-reducer";

const GET_SPRINTS = 'GET_SPRINTS'
const SET_CURRENT_SPRINT = 'SET_CURRENT_SPRINT'
const UNSET_CURRENT_SPRINT = 'UNSET_CURRENT_SPRINT'

let initialState = {
    sprints: [],
    currentSprint: null
}

const sprintsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPRINTS: {
            return {
                ...state,
                sprints: action.sprints
            }
        }

        case SET_CURRENT_SPRINT: {
            return {
                ...state,
                currentSprint: action.currentSprint
            }
        }

        case UNSET_CURRENT_SPRINT: {
            return {
                ...state,
                currentSprint: action.currentSprint
            }
        }

        default:
            return state
    }
}

export const getSprintsActionCreator = sprints => ({type: GET_SPRINTS, sprints})
export const setCurrentSprintActionCreator = currentSprint => ({type: SET_CURRENT_SPRINT, currentSprint})
export const unsetCurrentSprintActionCreator = () => ({type: UNSET_CURRENT_SPRINT})

export const getSprints = (projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(response.data))
    }
}

export const createSprint = (data, projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.createSprint(data, authorization)
        const responsePut = await sprintsAPI.createSprintWithProject(response.data.id, projectId, authorization)
        const responseGet = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(responseGet.data))
    }
}

export const startSprint = (data, id, projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.startSprint(data, id, authorization)
        const responseGet = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(responseGet.data))
        const responseGetTask = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGetTask.data))
    }
}

export const updateSprint = (data, id, projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.updateSprint(data, id, authorization)
        const responseGet = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(responseGet.data))
        const responseGetTask = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGetTask.data))
    }
}

export const setCurrentSprint = (currentSprint) => {

    return async dispatch => {
        dispatch(setCurrentSprintActionCreator(currentSprint))
    }
}

export const getStartedSprint = (projectId, authorization) => {
    return async dispatch => {
        const response = await sprintsAPI.getStartedSprint(projectId, authorization)
        dispatch(setCurrentSprintActionCreator(response.data[0]))
    }
}

export const unsetCurrentSprint = () => {
    return async dispatch => {
        dispatch(unsetCurrentSprintActionCreator())
    }
}

export const deleteSprint = (id, projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.deleteSprint(id, authorization)
        const responseGet = await sprintsAPI.getSprints(projectId, authorization)
        dispatch(getSprintsActionCreator(responseGet.data))
        const responseGetTask = await taskSprintAPI.getTaskSprintForProject(projectId, authorization)
        dispatch(getTaskSprintsActionCreator(responseGetTask.data))
    }
}

export const completeDeleteSprint = (id, projectId, authorization) => {

    return async dispatch => {
        const response = await sprintsAPI.deleteSprint(id, authorization)
    }
}

export default sprintsReducer
