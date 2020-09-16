import { ADD_RECIPENT_SUCESS } from "../action/addRecipent-action";


const initialState = {
    RecipentData: [],

}

const RecipentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPENT_SUCESS:
            return {
                ...state,
                RecipentData: action.payload
            }

        default:
            return state;
    }

}
export default RecipentReducer;