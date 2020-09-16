import { combineReducers } from 'redux';

import UserReducer from './user_reducer'
import RecipentReducer from './addrecipent_reducer'

export default combineReducers({
    UserReducer,
    RecipentReducer

});