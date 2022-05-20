import {marksAPI} from "../api/api";

const GET_MARKS_SCRUM = 'GET_MARKS_SCRUM'
const GET_MARKS_SCRUM_ALL = 'GET_MARKS_SCRUM_ALL'


let initialState = {
    marksScrum: [],
    marksScrumAll: {}
}

const marksScrumReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_MARKS_SCRUM: {
            return {
                ...state,
                marksScrum: action.marksScrum
            }
        }

        case GET_MARKS_SCRUM_ALL: {
            return {
                ...state,
                marksScrumAll: {...state.marksScrumAll, [action.id]: action.marksScrum}
            }
        }

        default:
            return state
    }
}


export const getMarksScrumActionCreator = marksScrum => ({type: GET_MARKS_SCRUM, marksScrum})
export const getMarksScrumAllActionCreator = (id, marksScrum) => ({type: GET_MARKS_SCRUM_ALL, id, marksScrum})

export const createMarksScrum = (data, taskId, authorization) => {

    return async dispatch => {
        const responsePost = await marksAPI.createMark(data, authorization)
        const responsePut = await marksAPI.uniteMarkTask(responsePost.data.id, taskId, authorization)
        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumActionCreator(response.data))
        dispatch(getMarksScrumAllActionCreator(taskId, response.data))
    }
}

export const getMarksScrum = (taskId, authorization) => {

    return async dispatch => {
        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumActionCreator(response.data))
    }
}

export const getMarksScrumAll = (taskId, authorization) => {

    return async dispatch => {
        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumAllActionCreator(taskId, response.data))
    }
}

export const deleteMarksScrum = (id, taskId, authorization) => {

    return async dispatch => {
        const responseDel = await marksAPI.deleteMarkScrum(id, authorization)
        const response = await marksAPI.getMarkScrumForTask(taskId, authorization)
        dispatch(getMarksScrumActionCreator(response.data))
        dispatch(getMarksScrumAllActionCreator(taskId, response.data))

    }
}

export default marksScrumReducer
