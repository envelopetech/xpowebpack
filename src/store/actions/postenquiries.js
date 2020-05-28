import * as actionTypes from './actionTypes';
import axios from '../axios-orders';


//#region EXHIBITION ENQUIRIES POST
export const exhibitionenquiriesSuccess = () => {
    return {
        type: actionTypes.EXHIBITION_ENQUIRIES_SUCCESS,        
    };
};

export const exhibitionenquiriesFail = (error) => {
    return {
        type: actionTypes.EXHIBITION_ENQUIRIES_FAIL,
        error: error
    };
}

export const exhibitionenquiriesStart = () => {
    return {
        type: actionTypes.EXHIBITION_ENQUIRIES_START
    };
};
export const post_exhibition_enquiries_by_visitor= (data) => {
    return dispatch => {
        let url = 'xporium/events/post_exhibition_enquiries_by_visitor';
        dispatch( exhibitionenquiriesStart() );
        axios.post( url, data )
            .then( response => {
                dispatch(exhibitionenquiriesSuccess());
            } )
            .catch( error => {
                dispatch(exhibitionenquiriesFail(error));
            } );
    };
};
//#endregion