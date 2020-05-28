import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = { 
    error:null, 
    loading:false,  
    data:null       
};
//#region USERPOSTS
const userfeedpostStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const userfeedpostSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const userfeedpostFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
const userfeedpostupdateStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const userfeedpostupdateSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const userfeedpostupdateFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
const userfeedpostdeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const userfeedpostdeleteSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const userfeedpostdeleteFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
//#endregion



//#region LIKES FEEDS
const userlikesStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const userlikesSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const userlikesFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
//#endregion

//#region UNLIKE FEEDS
const userunlikesStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const userunlikesSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const userunlikesFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
//#endregion


//#region COMMENTS FEEDS
const usercommentsStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const usercommentsSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const usercommentsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
//#endregion


//#region NOTIFICATION MARK AS READ
const usernotificationmarkasreadStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const usernotificationmarkasreadSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const usernotificationmarkasreadFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
//#endregion


//#region USER FEED POST REPORT
const userfeedpostreportStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null,} );
};
const userfeedpostreportSuccess = ( state, action ) => {
    return updateObject( state, {  error: null,      
        loading: false,        
    } );
};
const userfeedpostreportFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error, } );
};
//#endregion

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {           
        case actionTypes.USER_NOTIFICATIONMARKASSEEN_START: return usernotificationmarkasreadStart( state, action );
        case actionTypes.USER_NOTIFICATIONMARKASSEEN_SUCCESS: return usernotificationmarkasreadSuccess( state, action )
        case actionTypes.USER_NOTIFICATIONMARKASSEEN_FAIL: return usernotificationmarkasreadFail( state, action ); 

        case actionTypes.USER_POST_START: return userfeedpostStart( state, action );
        case actionTypes.USER_POST_SUCCESS: return userfeedpostSuccess( state, action )
        case actionTypes.USER_POST_FAIL: return userfeedpostFail( state, action ); 

        case actionTypes.USER_FEEDPOSTREPORT_START: return userfeedpostreportStart( state, action );
        case actionTypes.USER_FEEDPOSTREPORT_SUCCESS: return userfeedpostreportSuccess( state, action )
        case actionTypes.USER_FEEDPOSTREPORT_FAIL: return userfeedpostreportFail( state, action ); 

        case actionTypes.USER_POSTUPDATE_START: return userfeedpostupdateStart( state, action );
        case actionTypes.USER_POSTUPDATE_SUCCESS: return userfeedpostupdateSuccess( state, action )
        case actionTypes.USER_POSTUPDATE_FAIL: return userfeedpostupdateFail( state, action ); 

        case actionTypes.USER_POSTDELETE_START: return userfeedpostdeleteStart( state, action );
        case actionTypes.USER_POSTDELETE_SUCCESS: return userfeedpostdeleteSuccess( state, action )
        case actionTypes.USER_POSTDELETE_FAIL: return userfeedpostdeleteFail( state, action ); 

       
        case actionTypes.USER_LIKES_START: return userlikesStart( state, action );
        case actionTypes.USER_LIKES_SUCCESS: return userlikesSuccess( state, action )
        case actionTypes.USER_LIKES_FAIL: return userlikesFail( state, action ); 

        case actionTypes.USER_UNLIKES_START: return userunlikesStart( state, action );
        case actionTypes.USER_UNLIKES_SUCCESS: return userunlikesSuccess( state, action )
        case actionTypes.USER_UNLIKES_FAIL: return userunlikesFail( state, action );

        case actionTypes.USER_COMMENTS_START: return usercommentsStart( state, action );
        case actionTypes.USER_COMMENTS_SUCCESS: return usercommentsSuccess( state, action )
        case actionTypes.USER_COMMENTS_FAIL: return usercommentsFail( state, action );

        default: return state;
    }
};
export default reducer;