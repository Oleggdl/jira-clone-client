import {projectsAPI, userScrumProjectAPI} from "../api/api"

const GET_PROJECTS = 'GET_PROJECTS'
const GET_CURRENT_PROJECT = 'GET_CURRENT_PROJECT'
const GET_PROJECT_DATA = 'GET_PROJECT_DATA'
const GET_FAVORITE_PROJECT = 'GET_FAVORITE_PROJECT'

let initialState = {
    projects: [],
    currentProject: {},
    projectData: {},
    favoriteProjects: []
}

const projectsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_PROJECTS: {
            return {
                ...state,
                projects: action.projects
            }
        }

        case GET_CURRENT_PROJECT: {
            return {
                ...state,
                currentProject: action.project
            }
        }

        case GET_PROJECT_DATA: {
            return {
                ...state,
                projectData: action.projectData
            }
        }

        case GET_FAVORITE_PROJECT: {
            return {
                ...state,
                favoriteProjects: action.favoriteProjects
            }
        }

        default:
            return state
    }
}


export const getProjectsActionCreator = projects => ({type: GET_PROJECTS, projects})
export const getCurrentProjectActionCreator = project => ({type: GET_CURRENT_PROJECT, project})
export const getProjectDataActionCreator = projectData => ({type: GET_PROJECT_DATA, projectData})
export const getFavoriteProjectDataActionCreator = favoriteProjects => ({type: GET_FAVORITE_PROJECT, favoriteProjects})

export const getProjects = (userId, authorization) => {

    return async dispatch => {
        const response = await userScrumProjectAPI.getUserScrumProject(userId, authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}

export const getFavoriteProjects = (userId, authorization) => {

    return async dispatch => {
        const response = await userScrumProjectAPI.getUserScrumProjectFavorite(userId, authorization)
        dispatch(getFavoriteProjectDataActionCreator(response.data))
    }
}

export const searchProject = (query, userId, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.searchProjects(query, userId, authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}

export const createProject = (data, userId, userRoleId, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.createProject(data, authorization)
        const responseSupervisor = await projectsAPI.addSupervisor(response.data.id, userId, authorization)
        const responsePost = await userScrumProjectAPI.createUserScrumProject({}, authorization)
        const responsePut = await userScrumProjectAPI.putUserScrumProject(
            responsePost.data.id, userId, response.data.id, userRoleId, authorization)
    }
}

export const joinTheProject = (projectId, userId, userRoleId, authorization) => {

    return async dispatch => {
        const responseGet = await userScrumProjectAPI.isUserProjectExist(userId, projectId, authorization)
        if (!responseGet.data) {
            const responsePost = await userScrumProjectAPI.createUserScrumProject({}, authorization)
            const responsePut = await userScrumProjectAPI.putUserScrumProject(
                responsePost.data.id, userId, projectId, userRoleId, authorization)
        }
    }
}

export const getCurrentProject = project => {

    return async dispatch => {
        dispatch(getCurrentProjectActionCreator(project))
    }
}

export const getProjectById = (id, authorization) => {

    return async dispatch => {
        const response = await projectsAPI.getProjectById(id, authorization)
        dispatch(getProjectDataActionCreator(response.data))
    }
}

export const updateProject = (id, userScrumId, data, authorization) => {

    return async dispatch => {
        const responsePut = await projectsAPI.updateProject(id, data, authorization)
        const response = await projectsAPI.getProjectById(userScrumId, authorization)
        dispatch(getProjectDataActionCreator(response.data))
    }
}

export const deleteProject = (id, userId, authorization) => {

    return async dispatch => {
        const responsePut = await projectsAPI.deleteProject(id, userId, authorization)
        const response = await userScrumProjectAPI.getUserScrumProject(userId, authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}

export const deleteFromMyProjects = (id, userId, authorization) => {

    return async dispatch => {
        const responsePut = await userScrumProjectAPI.deleteUserScrumProject(id, authorization)
        const response = await userScrumProjectAPI.getUserScrumProject(userId, authorization)
        dispatch(getProjectsActionCreator(response.data))
    }
}


export default projectsReducer
