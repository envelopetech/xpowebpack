import axios from '../../store/axios-orders';
import { setheaderforfirstrequest, PageType } from '../../shared/utility'

export function getuserflatfeeds() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_feeds', config);
}

export function get_feeds_by_id(id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_feeds_by_id?id=' + id, config)
}

export function get_user_feeds_comments(user_post_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_user_feeds_comments?user_post_id=' + user_post_id, config)

}
export function get_user_personal_feeds(otheruserid, type_for) {    
    let config = setheaderforfirstrequest();
    if (otheruserid !== null && otheruserid !== undefined) {
        return axios.get('xporium/streamline/user/get_user_personal_feeds?otheruserid=' + otheruserid + "&type_for=" + type_for, config)
    }
    else {
        return axios.get('xporium/streamline/user/get_user_personal_feeds?type_for=' + type_for, config)
    }
}
export function getusernotifications() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_user_notifications', config);
}
export function getuserflatimagefeeds(type_for) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_feeds_images?type_for=' + type_for, config);
}
export function getuserflatvideosfeeds(type_for) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_feeds_videos?type_for=' + type_for, config);
}

export function get_user_mentions_list_by_user() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_user_mentions_list_by_user', config);
}

export const uservideosave = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/savepost';
    return axios.post(url, data, config)
};

export const usercommentslike = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/save_user_feed_comments_likes';
    return axios.post(url, data, config)
};
export const usercommentsunlike = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/delete_user_feed_comments_likes';
    return axios.post(url, data, config)
};

export function get_comments_by_id(id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_comments_by_id?id=' + id, config)
}
export const save_user_comments = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/comments_feeds';
    return axios.post(url, data, config)
};
export const delete_user_comments = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/delete_user_comments';
    return axios.post(url, data, config)
};
export const userpostupdate = (data, pagetype = null) => {
    let url = 'xporium/streamline/user/userpostupdate';
    let config = setheaderforfirstrequest();
    if (pagetype !== null) {
        switch (pagetype) {
            case (PageType.userwings):
                url = 'xporium/streamline/wing/wing_user_feed_update'
                break;
            default:
                url = 'xporium/streamline/user/userpostupdate';
                break;
        }
    }
    return axios.post(url, data, config)
};
// export const userpostsave = (data, pagetype = null) => {
//     let url = 'xporium/streamline/user/savepost';
//     let config = setheaderforfirstrequest();
//     if (pagetype !== null) {
//         switch(pagetype)
//         {
//             case ( PageType.userwings ):  
//                 url='xporium/streamline/wing/wing_user_feed_save' 
//                 break;  
//             default:
//                 url = 'xporium/streamline/user/savepost';
//                 break;
//         } 
//     }
//     return axios.post(url, data, config)
// };
export const staffrequestresponsesavebyvisitor = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/exhibitor/staff_request_response_by_existing_visitor'
    return axios.post(url, data, config)
};
export const response_tieups_request = ( data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/user/response_tieups_request';    
    return axios.post( url, data ,config)
};
export function get_users_all_notifications() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/user/get_users_all_notifications', config)
}
export const userpostsave= (data) => {    
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/savepost'
    return axios.post(url, data, config)    
};
export const usercommentssave= (data) => {  
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/comments_feeds'
    return axios.post(url, data, config)     
};


export const user_feeds_likes= (data) => {  
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/likes_feeds'
    return axios.post(url, data, config)     
};

export const user_feeds_unlike= (data) => {  
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/unlikes_feeds'
    return axios.post(url, data, config)     
};


//#endregion


