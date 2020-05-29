import axios from '../../store/axios-orders';
import {setheaderforfirstrequest} from '../../shared/utility'



export function get_leads_for_curator(wing_id)
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/wings/get_leads_for_curator?wing_id=' + wing_id, config);  
}


export const closed_deal_by_curator= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/wing/curator/closed_deal_by_curator';          
    return axios.post( url, data , config )   
};

export const refused_lead_by_curator_users= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/curator/wing/refused_lead_by_curator_users';          
    return axios.post( url, data , config )   
};

export function get_wingsters_for_curator(wing_id)
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/curator/wing/get_wingsters_for_curator?wing_id=' + wing_id, config);  
}

export const wingster_request_update_by_curator= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/curator/wing/wingster_request_update_by_curator';          
    return axios.post( url, data , config )   
};
export const wingster_request_reject_by_curator= (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/wing/curator/wingster_request_reject_by_curator';          
    return axios.post( url, data , config )   
};

export const curator_wing_save = (data) => {            
    let config= setheaderforfirstrequest();
    let url = 'xporium/curator/wing/curator_wing_save';          
    return axios.post( url, data , config )   
};
export function curator_get_personal_profile_data()
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/curator/wing/curator_get_personal_profile_data', config);  
}
export function check_wing_exists(title)
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/wing/curator/check_wing_exists?wing_name=' + title, config);  
}
