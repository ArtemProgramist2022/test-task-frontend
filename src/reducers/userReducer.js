import { userAPI } from "../api/api";

const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const DELETE_USER = 'DELETE_USER'
const GET_PAGE = 'GET_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const GET_EVENT = 'GET_EVENT'

let initialState = {
    items: [],
    total: null,
    limit: null,
    page: null,
    isFetching: false,
    eventWebSocket: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS: {
            return { ...state, items: action.items }
        }
        case DELETE_USER: {
            return { ...state, items: state.items.filter(item => item.id !== action.userId) }
        }
        case GET_PAGE: {
            return { ...state, total: action.total, limit: action.limit, page: action.page }
        }
        case GET_EVENT: {
            return {
                ...state, eventWebSocket: state.eventWebSocket.length < 10 ? 
                    [...state.eventWebSocket, action.data]
                    : [action.data]
        }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default: return state;
    }
}

const getUsersSuccess = (items) => ({
    type: GET_USERS_SUCCESS,
    items
})

const getPageSuccess = (total, limit, page) => ({
    type: GET_PAGE,
    total, limit, page
})

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

export const getUsers = (page) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const res = await userAPI.getUsers(page);
    dispatch(getUsersSuccess(res.data.items))
    await dispatch(getPageSuccess(res.data.total, res.data.limit, res.data.page))
    dispatch(toggleIsFetching(false))
}

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
})

export const getEventWebSocket = (data) => ({
    type: GET_EVENT,
    data
})


export default userReducer
