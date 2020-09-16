import axios from 'axios';
import { API_URL } from '../../components/Api-config/configuration'
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';




export const Getalluser = (data) => {

    return dispatch => {
        const promise = new Promise((resolves, reject) => {
            axios({
                method: 'GET',
                url: API_URL + data

            })
                .then(function (response) {

                    dispatch({
                        type: USER_SUCCESS,
                        payload: response.data
                    })
                    resolves(response);
                })
                .catch(function (error) {
                    dispatch({
                        type: USER_ERROR,
                        payload: error && error.response ? error.response.data : ['Something went wrong']
                    })
                    reject(error.response.data)
                })
        })
        return promise;
    }
}


