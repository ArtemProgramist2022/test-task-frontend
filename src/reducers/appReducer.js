const GET_LOGIN = 'GET_LOGIN';

let initialState = {
    isLogin: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN: {
            return {...state, isLogin: action.isLogin}
        }
        default: return state;
    }
}

export const getLogin = (isLogin) => ({
    type: GET_LOGIN,
    isLogin
})

export default appReducer