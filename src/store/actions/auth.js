import * as actionTypes from './actionTypes';
import axios from '../axios-orders';
import { setheaderforfirstrequest } from '../../shared/utility'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authemailconfirm = () => {
    return {
        type: actionTypes.AUTH_EMAILCONFIRMED
    };
}
export const authSuccess = (token, userId, email_confirmed, first_name, last_name, profilepic_url
    , loginsuccess
    , current_step, is_exhibitor, wingname, currency_name
    , usertypename, exhibitordata, wing_id, email, phone_number, name, wing_pic_url, user_wing_id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        email_confirmed: email_confirmed,
        first_name: first_name,
        last_name: last_name,
        profilepic_url: profilepic_url,
        loginsuccess: loginsuccess,
        current_step: current_step,
        is_exhibitor: is_exhibitor,
        wingname: wingname,
        currency_name: currency_name,
        usertypename: usertypename,
        exhibitordata: exhibitordata,
        wing_id: wing_id,
        email: email,
        phone_number: phone_number,
        name: name,
        wing_pic_url: wing_pic_url,
        user_wing_id: user_wing_id
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email_confirmed');
    localStorage.removeItem('visitorphonenumber');
    localStorage.removeItem('isverifyphonenumber');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('iseditmode_profile');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('current_step');
    localStorage.removeItem('is_exhibitor');
    localStorage.removeItem('wingname');
    localStorage.removeItem('currency_name');
    localStorage.removeItem('usertypename');
    localStorage.removeItem('exhibitordata');
    localStorage.removeItem('wing_id');
    localStorage.removeItem('email');
    localStorage.removeItem('phone_number');
    localStorage.removeItem('name');
    localStorage.removeItem('wing_pic_url');
    localStorage.removeItem('user_wing_id')
    localStorage.removeItem('is_remember_me')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};
export const get_user_data_by_id = (otheruserid = null) => {
    let config = setheaderforfirstrequest();
    return dispatch => {
        dispatch(authStart());

        let url = 'xporium/get_user_login_detail_by_id';

        if (otheruserid !== null && otheruserid !== undefined) {
            url = 'xporium/get_user_login_detail_by_id?otheruserid=' + otheruserid
        }

        axios.get(url, config)
            .then(response => {
                if (response.data.error !== undefined) {
                    dispatch(authFail(response.data.error));
                }
                if (response.data.access_token !== undefined) {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('first_name', response.data.first_name);
                    localStorage.setItem('last_name', response.data.last_name);
                    localStorage.setItem('email_confirmed', response.data.email_confirmed)
                    localStorage.setItem('profile_pic', response.data.profile_pic_url)
                    localStorage.setItem('current_step', response.data.current_step)
                    localStorage.setItem('is_exhibitor', response.data.is_exhibitor)
                    localStorage.setItem('currency_name', response.data.currency_name)
                    localStorage.setItem('usertypename', response.data.usertypename)
                    localStorage.setItem('wingname', response.data.wingname)
                    localStorage.setItem('exhibitordata', JSON.stringify(response.data.exhibitordata))
                    localStorage.setItem('wing_id', response.data.wing_id)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('phone_number', response.data.phone_number)
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('wing_pic_url', response.data.wing_pic_url)
                    localStorage.setItem('user_wing_id', response.data.user_wing_id)
                    dispatch(authSuccess(response.data.access_token, response.data.id, response.data.email_confirmed
                        , response.data.first_name
                        , response.data.last_name
                        , response.data.profile_pic_url
                        , true
                        , response.data.current_step
                        , response.data.is_exhibitor
                        , response.data.wingname
                        , response.data.currency_name
                        , response.data.usertypename
                        , response.data.exhibitordata
                        , response.data.wing_id
                        , response.data.email
                        , response.data.phone_number
                        , response.data.name
                        , response.data.wing_pic_url
                        , response.data.user_wing_id));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            })
    };
};

export const auth_social_login = (authData) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'xporium/create_get_social_user'
        axios.post(url, authData)
            .then(response => {
                if (response.data.error !== undefined) {
                    dispatch(authFail(response.data.error));
                }
                if (response.data.access_token !== undefined) {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('first_name', response.data.first_name);
                    localStorage.setItem('last_name', response.data.last_name);
                    localStorage.setItem('email_confirmed', response.data.email_confirmed)
                    localStorage.setItem('profile_pic', response.data.profile_pic_url)
                    localStorage.setItem('current_step', response.data.current_step)
                    localStorage.setItem('is_exhibitor', response.data.is_exhibitor)
                    localStorage.setItem('currency_name', response.data.currency_name)
                    localStorage.setItem('usertypename', response.data.usertypename)
                    localStorage.setItem('wingname', response.data.wingname)
                    localStorage.setItem('exhibitordata', JSON.stringify(response.data.exhibitordata))
                    localStorage.setItem('wing_id', response.data.wing_id)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('phone_number', response.data.phone_number)
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('wing_pic_url', response.data.wing_pic_url)
                    localStorage.setItem('user_wing_id', response.data.user_wing_id)
                    dispatch(authSuccess(response.data.access_token
                        , response.data.id
                        , response.data.email_confirmed
                        , response.data.first_name
                        , response.data.last_name
                        , response.data.profile_pic_url
                        , true
                        , response.data.current_step
                        , response.data.is_exhibitor
                        , response.data.wingname
                        , response.data.currency_name
                        , response.data.usertypename
                        , response.data.exhibitordata
                        , response.data.wing_id
                        , response.data.email
                        , response.data.phone_number
                        , response.data.name
                        , response.data.wing_pic_url
                        , response.data.user_wing_id));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            })
    };
};

export const auth = (authData, islogin) => {
    debugger;
    return dispatch => {
        dispatch(authStart());
        let url = 'xporium/users';
        // if (issociallogin) {
        //     url = 'xporium/create_get_social_user'
        // }
        // else {
        if (islogin) {
            url = 'xporium/get_users_login'
        }
        else {
            url = 'xporium/users';
        }
        //}
        axios.post(url, authData)
            .then(response => {
                debugger;
                if (response.data.error !== undefined) {
                    dispatch(authFail(response.data.error));
                }
                if (response.data.access_token !== undefined) {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('first_name', response.data.first_name);
                    localStorage.setItem('last_name', response.data.last_name);
                    localStorage.setItem('email_confirmed', response.data.email_confirmed)
                    localStorage.setItem('profile_pic', response.data.profile_pic_url)
                    localStorage.setItem('current_step', response.data.current_step)
                    localStorage.setItem('is_exhibitor', response.data.is_exhibitor)
                    localStorage.setItem('currency_name', response.data.currency_name)
                    localStorage.setItem('usertypename', response.data.usertypename)
                    localStorage.setItem('wingname', response.data.wingname)
                    localStorage.setItem('exhibitordata', JSON.stringify(response.data.exhibitordata))
                    localStorage.setItem('wing_id', response.data.wing_id)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('phone_number', response.data.phone_number)
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('wing_pic_url', response.data.wing_pic_url)
                    localStorage.setItem('user_wing_id', response.data.user_wing_id)
                    dispatch(authSuccess(response.data.access_token
                        , response.data.id
                        , response.data.email_confirmed
                        , response.data.first_name
                        , response.data.last_name
                        , response.data.profile_pic_url
                        , true
                        , response.data.current_step
                        , response.data.is_exhibitor
                        , response.data.wingname
                        , response.data.currency_name
                        , response.data.usertypename
                        , response.data.exhibitordata
                        , response.data.wing_id
                        , response.data.email
                        , response.data.phone_number
                        , response.data.name
                        , response.data.wing_pic_url
                        , response.data.user_wing_id));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            })
    };
};
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                const email_confirmed = localStorage.getItem('email_confirmed')
                const first_name = localStorage.getItem('first_name')
                const last_name = localStorage.getItem('last_name')
                const profile_pic = localStorage.getItem('profile_pic')
                const current_step = localStorage.getItem('current_step')
                const is_exhibitor = localStorage.getItem('is_exhibitor')
                const currency_name = localStorage.getItem('currency_name')
                const usertypename = localStorage.getItem('usertypename')
                const wingname = localStorage.getItem('wingname')
                const exhibitordata = localStorage.getItem('exhibitordata')
                const wing_id = localStorage.getItem('wing_id')
                const email = localStorage.getItem('email')
                const phone_number = localStorage.getItem('phone_number')
                const name = localStorage.getItem('name')
                const wing_pic_url = localStorage.getItem('wing_pic_url')
                const user_wing_id = localStorage.getItem('user_wing_id')
                dispatch(authSuccess(token
                    , userId
                    , email_confirmed
                    , first_name
                    , last_name
                    , profile_pic
                    , false
                    , current_step
                    , is_exhibitor
                    , wingname
                    , currency_name
                    , usertypename
                    , exhibitordata
                    , wing_id
                    , email
                    , phone_number
                    , name
                    , wing_pic_url
                    , user_wing_id));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
