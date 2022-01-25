const IS_LOADING = 'IS_LOADING';

let initialState = {
    isLoading: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        default: return state;
    }
}

export const getLoading = (isLoading) => ({
    type: IS_LOADING,
    isLoading
})

export default authReducer