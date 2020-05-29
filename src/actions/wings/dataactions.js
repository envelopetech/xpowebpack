import axios from '../../store/axios-orders';
import { setheaderforfirstrequest } from '../../shared/utility'
//import axios from 'axios';

export function getmoderatorapplicationdata() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/moderator/getmoderator', config);
}

export function getwingsbyuser() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/user/wings/get_user_wings', config);
}

// export function get_trending_wings()
// {   
//     let config= setheaderforfirstrequest();
//     return axios.get('xporium/wings/get_trending_wings', config);  
// }
export function get_trending_wings() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/wings/get_trending_wings', config);
}
export function get_all_wings() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/wings/get_all_wings', config);
}
export function exitfromwings(data) {
    let config = setheaderforfirstrequest();
    let url = 'xporium/user/wings/exit_from_wings';
    return axios.post(url, data, config)
}
export function get_wings_by_id(wing_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/user/wings/get_wings_by_id?wing_id=' + wing_id, config);
}
export function get_flat_user_wing_feeds(wing_id, post_type) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/wing/get_flat_user_wing_feeds?wing_id=' + wing_id + '&post_type=' + post_type, config);
}
export function get_wings_users(wing_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/wing/get_wings_users?wing_id=' + wing_id, config);
}
export function get_wings_users_for_lead(wing_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/wing/get_wings_users_for_lead?wing_id=' + wing_id, config);
}
export function get_user_wing_feed_by_id(id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/wing/get_user_wing_feed_by_id?id=' + id, config)
}
export function get_user_wings_feeds_comments(user_post_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/wing/get_user_wings_feeds_comments?user_post_id=' + user_post_id, config)
}
export const save_user_wings_feed_comments_likes = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/save_user_wings_feed_comments_likes';
    return axios.post(url, data, config)
}
export const delete_user_wings_feed_comments_likes = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/delete_user_wings_feed_comments_likes';
    return axios.post(url, data, config)
}
export function get_user_wing_feeds_comments_by_id(id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/streamline/wing/get_user_wing_feeds_comments_by_id?id=' + id, config)
}
export const save_user_wing_feeds_comments = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/save_user_wing_feeds_comments';
    return axios.post(url, data, config)
}
export const delete_user_wing_feeds_comments = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/delete_user_wing_feeds_comments';
    return axios.post(url, data, config)
};
export const upldate_deal_by_mentioned_users = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/upldate_deal_by_mentioned_users';
    return axios.post(url, data, config)
};
export const upldate_deal_by_lose_mentioned_users = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/upldate_deal_by_lose_mentioned_users';
    return axios.post(url, data, config)
};
export const refused_lead_by_mentioned_users = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/refused_lead_by_mentioned_users';
    return axios.post(url, data, config)
};
export const join_user_wings_save = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/user/wings/join_user_wings_save';
    return axios.post(url, data, config)
}

// export const save_user_wing_feeds_comments = (data) => {   
//    let config= setheaderforfirstrequest();
//    let url = 'xporium/streamline/wing/save_user_wing_feeds_comments';            
//    return axios.post( url, data , config )
// }

export const save_user_wings_feed_likes = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/save_user_wings_feed_likes';
    return axios.post(url, data, config)
}
export const delete_user_wing_feed_likes = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/delete_user_wing_feed_likes';
    return axios.post(url, data, config)
}
export const wingnameupdatebycurator = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/wing/wingnameupdatebycurator';
    return axios.post(url, data, config)
}
export const userwingpostsave = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/wing/wing_user_feed_save'
    return axios.post(url, data, config)
};

