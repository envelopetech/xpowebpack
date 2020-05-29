
import axios from '../../store/axios-orders';
import {setheaderforfirstrequest} from '../../shared/utility'


function getindustry(user_industry) {
    const data = {
        user_industry: user_industry
    }   
    if(user_industry !== "")
    {
        return axios.post('xporium/userindustry',data);
    }
    else
    {
        return axios.get('xporium/industry');
    }    
}

function get_nature_all() {
    return axios.get('xporium/masters/get_nature_all');
}

function get_turnover_all() {
    return axios.get('xporium/masters/get_turnover_all');
}

function get_workforce_all() {
    return axios.get('xporium/masters/get_workforce_all');
}


export function getexhibitorprofiledropdowndata(user_industry)
{
   return Promise.all([getindustry(user_industry), get_nature_all(), get_turnover_all(), get_workforce_all()])  
}

export function get_exhibitor_profile_data(otheruserid)
{   
    let config= setheaderforfirstrequest();
    if(otheruserid !== null)
    {       
        return axios.get('xporium/exhibitor/get_exhibitor_profile_data?otheruserid=' + otheruserid,config);            
    }
    else
    {        
        return axios.get('xporium/exhibitor/get_exhibitor_profile_data', config);
    }
     
}
export function get_exhibitor_introduction_detail_by_exhibitorid(exhibitor_id)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/exhibitor/get_exhibitor_introduction_detail_by_exhibitorid?exhibitor_id=' + exhibitor_id,config);      
}
export function get_exhibitor_staff_data_sidebar_list(exhibitor_id)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/exhibitor/get_exhibitor_staff_data_sidebar_list?exhibitor_id=' + exhibitor_id,config);      
}


export const update_exhibitor_about_me= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/update_exhibitor_about_me';            
    return axios.post( url, data , config )     
}

export const update_exhibitor_intro_detail= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/update_exhibitor_intro_detail';            
    return axios.post( url, data , config )    
}

export const update_exhibitor_additional_info= ( data) => {     
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/update_exhibitor_additional_info';            
    return axios.post( url, data , config )               
}

export const update_exhibitor_cover_pic= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/update_exhibitor_cover_pic';            
    return axios.post( url, data , config )               
}
export function get_exhibitor_staff_data(exhibitor_id, is_staff_for_sidebar)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/exhibitor/get_exhibitor_staff_data?exhibitor_id=' + exhibitor_id + "&is_staff_for_sidebar=" + is_staff_for_sidebar, config);     
}

export function get_tag_by_type(type)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/masters/get_tag_by_type?type=' + type,config);     
}

export function get_product_by_exhibitor_id(exhibitor_id)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/exhibitor/product/get_product_by_exhibitor_id?exhibitor_id=' + exhibitor_id ,config);      
}

export function get_exhibitor_product_by_id(product_id)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/exhibitor/product/get_exhibitor_product_by_id?id=' + product_id,config);      
}

export const exhibitor_product_save= ( data) => {    
    //console.log("dfdgfdgfgfdgfdgfdgfdg", data)  
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/product/exhibitor_product_save';            
    return axios.post( url, data , config )
}

export const update_exhibitor_product_primary_image = ( data) => {        
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/product/update_exhibitor_product_primary_image';            
    return axios.post( url, data , config )   
}

export const exhibitor_product_delete= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/product/delete_exhibitor_product';            
    return axios.post( url, data , config )   
}

export const exhibitor_product_update= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/product/exhibitor_product_update';            
    return axios.post( url, data , config )   
}

export const exhibitor_staff_request_send= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/exhibitor_staff_request_send';            
    return axios.post( url, data , config )   
}

export const save_existing_member_staff_invitation= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/save_existing_member_staff_invitation';            
    return axios.post( url, data , config )   
}

export function get_exhibitr_staff_invitation_from_existing_members(exhibitor_id)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/exhibitor/get_exhibitr_staff_invitation_from_existing_members?exhibitor_id=' + exhibitor_id,config);     
}
export const delete_staff_member_request_from_exhibitor= ( data) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/delete_staff_member_request_from_exhibitor';            
    return axios.post( url, data , config )  

}
export const exhibitor_product_threed_detail_save= ( data) => {     
    let config= setheaderforfirstrequest();
    let url = 'xporium/exhibitor/productthreed/exhibitor_product_threed_detail_save';            
    return axios.post( url, data , config )               
}


