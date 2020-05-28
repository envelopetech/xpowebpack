import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {      
    loading: false,  
    error: null, 
    data:null
       
};

const aboutmestart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const aboutmeSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};

const aboutmeFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};


const coverimagestart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const coverimageSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};

const profileimageFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const profileimagestart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const profileimageSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};

const coverimageFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const designationlocationstart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const designationlocationSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};

const designationlocationFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const saveeducationstart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const saveeducationSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};

const saveeducationFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};


const updateeducationstart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const updateeducationSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};

const updateeducationFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const deleteeducationFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const deleteeducationstart = ( state, action ) => {
    return updateObject( state, { error: null,} );
};

const deleteeducationSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};



//#region
const saveworkexpstart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};

const saveworkexpSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false, 
        data:action.data       
    } );
};

const saveworkexpFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const deleteworkexpFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};

const deleteworkexpstart = ( state, action ) => {
    return updateObject( state, { error: null,} );
};

const deleteworkexpSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
//#endregion


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {        
        case actionTypes.ABOUTME_START: return aboutmestart( state, action );
        case actionTypes.ABOUTME_SUCCESS: return aboutmeSuccess( state, action )
        case actionTypes.ABOUTME_FAIL: return aboutmeFail( state, action ); 

        case actionTypes.COVERIMAGE_START: return coverimagestart( state, action );
        case actionTypes.COVERIMAGE_SUCCESS: return coverimageSuccess( state, action )
        case actionTypes.COVERIMAGE_FAIL: return coverimageFail( state, action ); 

        case actionTypes.PROFILEIMAGE_START: return profileimagestart( state, action );
        case actionTypes.PROFILEIMAGE_SUCCESS: return profileimageSuccess( state, action )
        case actionTypes.PROFILEIMAGE_FAIL: return profileimageFail( state, action ); 

        case actionTypes.DESIGNATIONLOCATION_START: return designationlocationstart( state, action );
        case actionTypes.DESIGNATIONLOCATION_SUCCESS: return designationlocationSuccess( state, action )
        case actionTypes.DESIGNATIONLOCATION_FAIL: return designationlocationFail( state, action ); 
        
        case actionTypes.SAVE_EDUCATION_START: return saveeducationstart( state, action );
        case actionTypes.SAVE_EDUCATION_SUCCESS: return saveeducationSuccess( state, action )
        case actionTypes.SAVE_EDUCATION_FAIL: return saveeducationFail( state, action ); 

        case actionTypes.UPDATE_EDUCATION_START: return updateeducationstart( state, action );
        case actionTypes.UPDATE_EDUCATION_SUCCESS: return updateeducationSuccess( state, action )
        case actionTypes.UPDATE_EDUCATION_FAIL: return updateeducationFail( state, action ); 

        case actionTypes.DELETE_EDUCATION_START: return deleteeducationstart( state, action );
        case actionTypes.DELETE_EDUCATION_SUCCESS: return deleteeducationSuccess( state, action )
        case actionTypes.DELETE_EDUCATION_FAIL: return deleteeducationFail( state, action ); 

        case actionTypes.SAVE_WORKEXP_START: return saveworkexpstart( state, action );
        case actionTypes.SAVE_WORKEXP_SUCCESS: return saveworkexpSuccess( state, action )
        case actionTypes.SAVE_WORKEXP_FAIL: return saveworkexpFail( state, action ); 
        
        case actionTypes.DELETE_WORKEXP_START: return deleteworkexpstart( state, action );
        case actionTypes.DELETE_WORKEXP_SUCCESS: return deleteworkexpSuccess( state, action )
        case actionTypes.DELETE_WORKEXP_FAIL: return deleteworkexpFail( state, action ); 

        default: return state;
    }
};
export default reducer;