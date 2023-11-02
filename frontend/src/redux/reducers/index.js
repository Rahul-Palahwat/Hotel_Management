import { combineReducers } from "redux"
const appReducer = combineReducers({
    // login: LoginReducer,
    // items: ItemsReducer,
    // cartItem: addToCartReducer,
})
export const reducer = (state, action) => {
    return appReducer(state, action)
}