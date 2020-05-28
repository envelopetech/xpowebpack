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




export const designationlocationSuccess = ( id ) => {
    return {
        type: actionTypes.DESIGNATIONLOCATION_SUCCESS,
        id: id
    };
};

export const designationlocationFail = ( error ) => {
    return {
        type: actionTypes.DESIGNATIONLOCATION_FAIL,
        error: error
    };
}

export const designationlocationstart = () => {
    return {
        type: actionTypes.DESIGNATIONLOCATION_START
    };
};



export const saveeducationSuccess = ( id ) => {
    return {
        type: actionTypes.SAVE_EDUCATION_SUCCESS,
        id: id
    };
};

export const saveeducationFail = ( error ) => {
    return {
        type: actionTypes.SAVE_EDUCATION_FAIL,
        error: error
    };
}

export const saveeducationstart = () => {
    return {
        type: actionTypes.SAVE_EDUCATION_START
    };
};


export const updateeducationSuccess = ( id ) => {
    return {
        type: actionTypes.UPDATE_EDUCATION_SUCCESS,
        id: id
    };
};

export const updateeducationFail = ( error ) => {
    return {
        type: actionTypes.UPDATE_EDUCATION_FAIL,
        error: error
    };
}

export const updateeducationstart = () => {
    return {
        type: actionTypes.UPDATE_EDUCATION_START
    };
};




export const deleteeducationSuccess = ( id ) => {
    return {
        type: actionTypes.DELETE_EDUCATION_SUCCESS,
        id: id
    };
};

export const deleteeducationFail = ( error ) => {
    return {
        type: actionTypes.DELETE_EDUCATION_FAIL,
        error: error
    };
}

export const deleteeducationstart = () => {
    return {
        type: actionTypes.DELETE_EDUCATION_START
    };
};



export const saveworkexpSuccess = ( data ) => {    
    return {
        type: actionTypes.SAVE_WORKEXP_SUCCESS,
        data: data
    };
};

export const saveworkexpFail = ( error ) => {
    return {
        type: actionTypes.SAVE_WORKEXP_FAIL,
        error: error
    };
}

export const saveworkexpstart = () => {
    return {
        type: actionTypes.SAVE_WORKEXP_START
    };
};






export const deleteworkexpSuccess = ( id ) => {
    return {
        type: actionTypes.DELETE_WORKEXP_SUCCESS,
        id: id
    };
};

export const deleteworkexpFail = ( error ) => {
    return {
        type: actionTypes.DELETE_WORKEXP_FAIL,
        error: error
    };
}

export const deleteworkexpstart = () => {
    return {
        type: actionTypes.DELETE_WORKEXP_START
    };
};


export const designationlocationsaveupdate= ( data ) => {
    return dispatch => {
        let url = 'xporium/visitorprofile/designationlocationsaveupdate';
        dispatch( designationlocationstart() );
        axios.post( url, data )
            .then( response => {
                dispatch( designationlocationSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( designationlocationFail( error ) );
            } );
    };
};

export const usercoverimagesaveupdate= ( data ) => {
    return dispatch => {
        let url = 'xporium/user/savecoverimage';
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
export const userprofileimagesaveupdate= ( data ) => {    
    return dispatch => {
        let url = 'xporium/user/saveimage';
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
export const aboutmesaveupdate = ( data ) => {
    return dispatch => {
        let url = 'xporium/visitorprofile/aboutme';
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

export const educationsave = ( data ) => {
    return dispatch => {
        let url = 'xporium/user/usereducationsave';
        dispatch( saveeducationstart() );
        axios.post( url, data )
            .then( response => {
                dispatch( saveeducationSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( saveeducationFail( error ) );
            } );
    };
};

export const educationupdate = ( data ) => {
    return dispatch => {
        let url = 'xporium/user/usereducationupdate';
        dispatch( updateeducationstart() );
        axios.post( url, data )
            .then( response => {
                dispatch( updateeducationSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( updateeducationFail( error ) );
            } );
    };
};

export const deleteeducationdetail = ( data ) => {
    return dispatch => {
        let url = 'xporium/user/educationdetaildelete';
        dispatch( deleteeducationstart() );
        axios.post( url, data )
            .then( response => {
                dispatch( deleteeducationSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( deleteeducationFail( error ) );
            } );
    };
};



export const userwokexpsaveedit= ( data ,id) => { 
    return dispatch => {       
        let url = 'xporium/user/userworkexpsave';        
        if(id !== null)
        {
            url = 'xporium/user/userworkexpupdate';
        }
        axios.post( url, data )
        .then( response => {            
            dispatch( saveworkexpSuccess( response.data ) );
        } )
        .catch( error => {
            dispatch( saveworkexpFail( error ) );
        } );   
    }       
    
};

export const deleteworkexpdetail = ( data ) => {
    return dispatch => {
        let url = 'xporium/user/workexpdelete';
        dispatch( deleteworkexpstart() );
        axios.post( url, data )
            .then( response => {
                dispatch( deleteworkexpSuccess( response.data.id ) );
            } )
            .catch( error => {
                dispatch( deleteworkexpFail( error ) );
            } );
    };
};
