import {commentsScrumAPI} from "../api/api"


const GET_COMMENTS_SCRUM = 'GET_COMMENTS_SCRUM'

let initialState = {
    commentsScrum: []
}

const commentsScrumReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_COMMENTS_SCRUM: {
            return {
                ...state,
                commentsScrum: action.commentsScrum
            }
        }

        default:
            return state
    }
}


export const getCommentsScrumActionCreator = commentsScrum => ({type: GET_COMMENTS_SCRUM, commentsScrum})

export const getCommentsScrum = (taskId, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.getCommentsScrum(taskId, authorization)
        dispatch(getCommentsScrumActionCreator(response.data))
    }
}

export const createCommentScrum = (userId, taskId, data, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.createCommentScrum(data, authorization)
        const responsePut =
            await commentsScrumAPI.createCommentScrumForTask(response.data.id, userId, taskId, authorization)
        const responseGetComments = await commentsScrumAPI.getCommentsScrum(taskId, authorization)
        dispatch(getCommentsScrumActionCreator(responseGetComments.data))
    }
}

export const deleteCommentScrum = (id, taskId, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.deleteCommentsScrum(id, authorization)
        const responseGetComments = await commentsScrumAPI.getCommentsScrum(taskId, authorization)
        dispatch(getCommentsScrumActionCreator(responseGetComments.data))

    }
}

export const updateCommentScrum = (id, data, taskId, authorization) => {

    return async dispatch => {
        const response = await commentsScrumAPI.updateCommentScrum(id, data, authorization)
        const responseGetComments = await commentsScrumAPI.getCommentsScrum(taskId, authorization)
        dispatch(getCommentsScrumActionCreator(responseGetComments.data))

    }
}


export default commentsScrumReducer
