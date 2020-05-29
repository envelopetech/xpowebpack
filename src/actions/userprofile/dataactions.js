import axios from '../../store/axios-orders';
import {setheaderforfirstrequest} from '../../shared/utility'


export function getalleducationdetail(all_records,otheruserid)
{   
   let config= setheaderforfirstrequest();
    if(otheruserid !== null)
    {       
        return axios.get('xporium/user/educationdetailget?all_records=' + all_records +"&otheruserid="+otheruserid, 
        // {
        //     params: {
        //         otheruserid: otheruserid,
        //         all_records: all_records
        // }}, 
        config); 
    }
    else
    {        
        return axios.get('xporium/user/educationdetailget?all_records=' + all_records, 
            // {
            //     params: {
            //         all_records: all_records
            // }}, 
            config);   
    }
}
export function getalleducationdetailpopup()
{   
    let config= setheaderforfirstrequest();    
    return axios.get('xporium/user/educationdetailgetpopup',  config); 
}
export function geteducationdetailbyid(id)
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/user/educationdetailgebyid/'+ id, config);  
}
export function getallworkexpdetail(all_records,otheruserid)
{   
    let config= setheaderforfirstrequest();    
    if(otheruserid !== null)
    {       
        return axios.get('xporium/user/workexpget?all_records=' + all_records +"&otheruserid="+otheruserid, 
            // {
            //     params: {
            //         otheruserid: otheruserid,
            //         all_records: all_records
            // }}, 
            config); 
    }
    else
    {        
        return axios.get('xporium/user/workexpget?all_records=' + all_records, 
            // {
            // params: {
            //     all_records: all_records
            // }}, 
            config); 
    }
}
export function getallworkexpdetailpopup()
{   
    let config= setheaderforfirstrequest();    
    return axios.get('xporium/user/workexpgetpopup',  config); 
}
export function getworkexpbyid(id)
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/user/workexpgetbyid/'+ id, config);  
}
export const userwokexpsaveedit= ( data ,id) => {       
    let config= setheaderforfirstrequest();
    let url = 'xporium/user/userworkexpsave';        
    if(id !== null)
    {
        url = 'xporium/user/userworkexpupdate';
    }
   return axios.post( url, data , config )           
    
};
export const usereducationdetailsaveedit= ( data ,id) => {      
    let config= setheaderforfirstrequest();
    let url = 'xporium/user/usereducationsave';        
    if(id !== null)
    {
        url = 'xporium/user/usereducationupdate';
    }
   return axios.post( url, data , config )           
    
};

export function get_newly_joined_users()
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/user/get_newly_joined_users', config); 
    
}

export function get_country_by_table(table_name)
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/masters/get_country_by_table?table_name=' + table_name, config); 
    
}


export function get_state_by_country()
{         
    let config= setheaderforfirstrequest();
    return axios.get('xporium/masters/get_state_by_country', config); 
    
}
export const update_email_confirmed = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/update_email_confirmed';
    return axios.post(url, data, config)
}
export const verify_email_send = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/user/verify_email_send';
    return axios.post(url, data, config)
}
export const forget_password_email_send = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/user/forget_password_email_send';
    return axios.post(url, data, config)
}

export const delete_user_account = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/user/delete_user_account';
    return axios.post(url, data, config)
}


