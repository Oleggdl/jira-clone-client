const GET_USER = 'GET_USER'

let initialState = {
    currentUser: {}
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                currentUser: action.currentUser
            }
        }

        default:
            return state
    }
}

export const getCurrentUserActionCreator = currentUser => ({type: GET_USER, currentUser})

export const getUser = (user) => {

    return async dispatch => {
        dispatch(getCurrentUserActionCreator(user))
    }
}

export default userReducer
