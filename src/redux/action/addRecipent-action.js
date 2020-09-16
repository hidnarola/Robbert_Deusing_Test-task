


export const ADD_RECIPENT_SUCESS = 'ADD_RECIPENT_SUCESS';


export const AddRecipent = (data) => {


    return dispatch => {
        dispatch({
            type: ADD_RECIPENT_SUCESS,
            payload: data
        })
    }
}
