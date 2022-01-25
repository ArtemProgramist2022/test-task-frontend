import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import authReducer from "../reducers/authReducer";
import appReducer from "../reducers/appReducer";
import userReducer from "../reducers/userReducer";

const reducers = combineReducers({
    app: appReducer,
    users: userReducer,
    auth: authReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;