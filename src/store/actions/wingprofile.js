import * as actionTypes from './actionTypes';
import axios from '../axios-orders';
import * as actions from './index';

export const aboutmeSuccess = ( id ) => {
    return {
        type: actionTypes.ABOUTME_SUCCESS,
        id: id
    };
};

export const aboutmeFail = ( error ) => {
    return {
        type: actionTypes.ABOUTME_FAIL,
        error: error
    };
}

export const aboutmestart = () => {
    return {
        type: actionTypes.ABOUTME_START
    };
};


export const wingnameSuccess = ( id ) => {
    return {
        type: actionTypes.WINGNAME_SUCCESS,
        id: id
    };
};

export const wingnameFail = ( error ) => {
    return {
        type: actionTypes.WINGNAME_FAIL,
        error: error
    };
}

export const wingnamestart = () => {
    return {
        type: actionTypes.WINGNAME_START
    };
};

export const coverimageSuccess = ( id ) => {
    return {
        type: actionTypes.COVERIMAGE_SUCCESS,
        id: id
    };
};

export const coverimageFail = ( error ) => {
    return {
        type: actionTypes.COVERIMAGE_FAIL,
        error: error
    };
}

export const coverimagestart = () => {
    return {
        type: actionTypes.COVERIMAGE_START
    };
};


export const profileimageSuccess = ( id ) => {
    return {
        type: actionTypes.PROFILEIMAGE_SUCCESS,
        id: id
    };
};

export const profileimageFail = ( error ) => {
    return {
        type: actionTypes.PROFILEIMAGE_FAIL,
        error: error
    };
}

export const profileimagestart = () => {
    return {
        type: actionTypes.PROFILEIMAGE_START
    };
};


export const wingcoverimagesaveupdate= ( data ) => {
    
    return dispatch => {
        let url = 'xporium/wing/savewingcoverimage';
        dispatch( coverimagestart() );
        axios.post( url, data )
            .then( response => {
                dispatch( coverimageSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( coverimageFail( error ) );
            } );
    };
};
export const wingprofileimagesaveupdate= ( data ) => {  
    
    return dispatch => {
        let url = 'xporium/wing/savewingprofileimage';
        dispatch( profileimagestart() );
        axios.post( url, data )
            .then( response => {
                dispatch( profileimageSuccess( response.data.id ) );
                dispatch( actions.authCheckState());
            } )
            .catch( error => {
                dispatch( profileimageFail( error ) );
            } );
    };
};
export const wingaboutmesaveupdate = ( data ) => {
    return dispatch => {
        let url = 'xporium/wing/saveaboutme';
        dispatch( aboutmestart() );
        axios.post( url, data )
            .then( response => {
                dispatch( aboutmeSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( aboutmeFail( error ) );
            } );
    };
};