import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    email_confirmed:true,
    authRedirectPath: '/expohome',
    authsuccessbool:false,
    first_name:null,
    last_name:null,
    profilepic_url:null,
    loginsuccess:false,    
    current_step:null,
    is_exhibitor:null,
    wingname:null,
    currency_name:null,
    usertypename:null,
    exhibitordata:null,
    wing_id:null,
    email:null,
    phone_number:null,
    name:null,
    wing_pic_url:null,
    user_wing_id:null

};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};
const authemailconfirm = ( state ) => {
    return updateObject( state, { email_confirmed: true } );
};

const authSuccess = (state, action) => {     
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,                
        error: null,
        loading: false,
        email_confirmed:action.email_confirmed,       
        authsuccessbool:true,
        first_name: action.first_name,
        last_name: action.last_name,
        profilepic_url:action.profilepic_url,
        loginsuccess:action.loginsuccess,        
        current_step:action.current_step,
        is_exhibitor:action.is_exhibitor,
        wingname:action.wingname,
        currency_name:action.currency_name,
        usertypename:action.usertypename,
        exhibitordata:action.exhibitordata,
        wing_id:action.wing_id,
        email:action.email,
        phone_number:action.phone_number,
        name:action.name,
        wing_pic_url:action.wing_pic_url,
        user_wing_id:action.user_wing_id
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, loginsuccess:false });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_EMAILCONFIRMED: return authemailconfirm(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};
export default reducer;