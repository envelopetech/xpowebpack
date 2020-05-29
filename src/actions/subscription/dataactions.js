import axios from '../../store/axios-orders';
import {setheaderforfirstrequest} from '../../shared/utility'

export function get_subscription_plan()
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/subscription/get_subscription_plan', config);  
}
export const save_user_subscription_plan= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/subscription/save_user_subscription_plan';            
    return axios.post( url, data , config )   
}
export const create_customer_subscription_razor_pay= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/subscription/create_customer_subscription_razor_pay';            
    return axios.post( url, data , config )   
}
export const save_exhibitor_event_payment= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/subscription/save_exhibitor_event_payment';            
    return axios.post( url, data , config )   
}
export const save_wingster_event_payment= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/subscription/save_wingster_event_payment';            
    return axios.post( url, data , config )   
}
export const save_visitor_event_payment= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/subscription/save_visitor_event_payment';            
    return axios.post( url, data , config )   
}