import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = { 
    error:null,
    return:false     
};

//#region Exhibition Enquiries Post
const exhibitionenquiriesStart = ( state, action ) => {
    return updateObject( state, { error: null,} );
};

const exhibitionenquiriesSuccess = ( state, action ) => {
    return updateObject( state, {  error: null, return:true } );
    
};

const exhibitionenquiriesFail = ( state, action ) => {
    return updateObject( state, { error: action.error,return: false } );
};

//#endregion

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {   
        
        case actionTypes.EXHIBITION_ENQUIRIES_START: return exhibitionenquiriesStart( state, action );
        case actionTypes.EXHIBITION_ENQUIRIES_SUCCESS: return exhibitionenquiriesSuccess( state, action )
        case actionTypes.EXHIBITION_ENQUIRIES_FAIL: return exhibitionenquiriesFail( state, action );       
        default: return state;
    }
};
export default reducer;