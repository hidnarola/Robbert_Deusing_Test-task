import { USER_ERROR, USER_SUCCESS } from "../action/user-action";





const initialState = {
    UserData: null,
    UserError: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SUCCESS:
            return {
                ...state,
                UserData: action.payload
            }
        case USER_ERROR:
            return {
                ...state,
                UserError: action.payload
            }
        default:
            return state;
    }

}
export default UserReducer;