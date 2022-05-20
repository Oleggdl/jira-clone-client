import {columnsAPI} from "../api/api"

const GET_COLUMNS = 'GET_COLUMNS'
const GET_COLUMNS_STARTED = 'GET_COLUMNS_TARTED'
const GET_SPRINT_COLUMNS = 'GET_SPRINT_COLUMNS'

let initialState = {
    columns: [],
    sprintColumns: []
}

const columnsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_COLUMNS: {
            return {
                ...state,
                columns: action.columns
            }
        }

        case GET_COLUMNS_STARTED: {
            return {
                ...state,
                columns: action.columns
            }
        }

        case GET_SPRINT_COLUMNS: {
            return {
                ...state,
                sprintColumns: action.sprintColumns
            }
        }

        default:
            return state
    }
}


export const getColumnsActionCreator = columns => ({type: GET_COLUMNS, columns})
export const getSprintColumnsActionCreator = sprintColumns => ({type: GET_SPRINT_COLUMNS, sprintColumns})
export const getColumnsStartedActionCreator = columns => ({type: GET_COLUMNS, columns})

export const getColumns = (sprintId, authorization) => {

    return async dispatch => {
        const response = await columnsAPI.getColumnsForSprint(sprintId, authorization)
        dispatch(getColumnsActionCreator(response.data))
    }
}

export const startSprintColumns = (data, sprintId, authorization) => {

    return async dispatch => {
        const response = await columnsAPI.createColumn(data, authorization)
        const responsePut = await columnsAPI.createColumnPut(response.data.id, sprintId, authorization)
        const responseGetColumns = await columnsAPI.getColumnsForSprint(sprintId, authorization)
        dispatch(getColumnsActionCreator(responseGetColumns.data))
        dispatch(getSprintColumnsActionCreator(responseGetColumns.data))
    }
}

export const deleteColumnScrum = (id, sprintId, authorization) => {

    return async dispatch => {
        const response = await columnsAPI.deleteColumnScrum(id, authorization)
        const responseGetColumns = await columnsAPI.getColumnsForSprint(sprintId, authorization)
        dispatch(getColumnsActionCreator(responseGetColumns.data))
    }
}

export default columnsReducer
