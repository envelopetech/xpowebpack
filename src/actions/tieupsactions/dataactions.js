import axios from '../../store/axios-orders';
import {setheaderforfirstrequest} from '../../shared/utility'

export function getuserrecommendedtieups()
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/Recommendedtieups/get', config);  
}
export const sendtieupsrequest = ( data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/Recommendedtieups/sendtieupsrequest';    
    return axios.post( url, data ,config)
};

export function get_user_profile_tieups(all_records,otheruserid)
{     
    let config= setheaderforfirstrequest();
    if(otheruserid !== null && otheruserid !== undefined)
    {       
        return axios.get('xporium/tieups/userpersonalprofiletieups?all_records=' + all_records +"&otheruserid="+otheruserid,              
            config); 
    }
    else
    {        
        return axios.get('xporium/tieups/userpersonalprofiletieups?all_records=' + all_records,              
            config); 
    }
}
export function get_profile_random_tieups(otheruserid)
{       
    let config= setheaderforfirstrequest();
    if(otheruserid !== null)
    {       
        return axios.get('xporium/tieups/userprofiletieups?otheruserid=' + otheruserid, 
            // {
            // params: {
            //     otheruserid: otheruserid                
            // }}, 
            config); 
    }
    else
    {        
        return axios.get('xporium/tieups/userprofiletieups', config);  
    }    
}

