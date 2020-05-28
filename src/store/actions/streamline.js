import * as actionTypes from './actionTypes';
import axios from '../axios-orders';
import {PageType} from '../../shared/utility';


//#region USER POSTS
export const userfeedpostSuccess = (id) => {
    return {
        type: actionTypes.USER_POST_SUCCESS,
        data: id
    };
};

export const userfeedpostFail = (error) => {
    return {
        type: actionTypes.USER_POST_FAIL,
        error: error
    };
}

export const userfeedpostStart = () => {
    return {
        type: actionTypes.USER_POST_START
    };
};
export const tempuserpostsavevideo= (data) => {    
    return dispatch => {
        let url = 'xporium/streamline/user/temp_save_user_videos';
        dispatch( userfeedpostStart() );
        axios.post( url, data )
            .then( response => {
                
                dispatch(userfeedpostSuccess(response.data));
            } )
            .catch( error => {
                
                dispatch(userfeedpostFail(error));
            } );
    };
}
export const userfeedpostdeleteSuccess = (id) => {
    return {
        type: actionTypes.USER_POSTDELETE_SUCCESS,
        id: id
    };
}
export const userfeedpostdeleteFail = (error) => {
    return {
        type: actionTypes.USER_POSTDELETE_FAIL,
        error: error
    };
}
export const userfeedpostdeleteStart = () => {
    return {
        type: actionTypes.USER_POSTDELETE_START
    };
}
export const userpostdelete= (data, pagetype=null) => {    
    return dispatch => {
        let url = 'xporium/streamline/user/userpostdelete'; 
        if(pagetype !== null)
        {       
            switch(pagetype)
            {
                case ( PageType.userwings ):  
                    url='xporium/streamline/wing/wing_user_feed_delete' 
                    break;  
                default:
                    url = 'xporium/streamline/user/userpostdelete';
                    break;
            } 
        }  

        dispatch( userfeedpostdeleteStart() );
        axios.post( url, data )
            .then( response => {
                dispatch(userfeedpostdeleteSuccess(response.data));
            } )
            .catch( error => {
                dispatch(userfeedpostdeleteFail(error));
            } );
    };
}
//#endregion

//#region COMMENTS USER FEEDS
export const usercommentsSuccess = (id) => {
    return {
        type: actionTypes.USER_COMMENTS_SUCCESS,
        id: id
    };
}

export const usercommentsFail = (error) => {
    return {
        type: actionTypes.USER_COMMENTS_FAIL,
        error: error
    };
}
export const usercommentsStart = () => {
    return {
        type: actionTypes.USER_COMMENTS_START
    };
}
export const usercommentssave= (data, pagetype=null) => {      
    return dispatch => {
        let url = 'xporium/streamline/user/comments_feeds';
        if(pagetype !== null)
        {
            switch(pagetype)
            {
                case ( PageType.userwings ):  
                    url='xporium/streamline/wing/save_user_wing_feeds_comments' 
                    break;  
                default:
                    url = 'xporium/streamline/user/comments_feeds';
                    break;
            } 
        }  

        dispatch( usercommentsStart() );
        axios.post( url, data )
            .then( response => {
                dispatch(usercommentsSuccess(response.data));
            } )
            .catch( error => {
                dispatch(usercommentsFail(error));
            } );
    };
}
//#endregion

//#region NOTIFICATION MARK AS READ
export const usernotificationmarkasreadSuccess = (id) => {
    return {
        type: actionTypes.USER_NOTIFICATIONMARKASSEEN_SUCCESS,
        id: id
    };
}

export const usernotificationmarkasreadFail = (error) => {
    return {
        type: actionTypes.USER_NOTIFICATIONMARKASSEEN_FAIL,
        error: error
    };
}
export const usernotificationmarkasreadStart = () => {
    return {
        type: actionTypes.USER_NOTIFICATIONMARKASSEEN_START
    };
}
export const user_notification_mark_asread= (data) => {
    return dispatch => {
        let url = 'xporium/streamline/user/mark_users_notifications_as_read';
        dispatch( usernotificationmarkasreadStart() );
        axios.post( url, data )
            .then( response => {
                dispatch(usernotificationmarkasreadSuccess(response.data));
            } )
            .catch( error => {
                dispatch(usernotificationmarkasreadFail(error));
            } );
    };
}
//#endregion


//#region USER FEED POST REPORT
export const userfeedpostreportSuccess = (id) => {
    return {
        type: actionTypes.USER_FEEDPOSTREPORT_SUCCESS,
        data: id
    };
}
export const userfeedpostreportFail = (error) => {
    return {
        type: actionTypes.USER_FEEDPOSTREPORT_FAIL,
        error: error
    };
}

export const userfeedpostreportStart = () => {
    return {
        type: actionTypes.USER_FEEDPOSTREPORT_START
    };
};
export const feed_post_report_save= (data) => {
    return dispatch => {
        let url = 'xporium/streamline/user/feeds_reports_save';
        dispatch( userfeedpostreportStart());
        axios.post( url, data )
            .then( response => {
                dispatch(userfeedpostreportSuccess(response.data));
            } )
            .catch( error => {
                dispatch(userfeedpostreportFail(error));
            } );
    };
}
//#endregion