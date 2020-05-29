import axios from '../../store/axios-orders';
import { setheaderforfirstrequest } from '../../shared/utility'


export function get_user_schedule(fromdate, todate, wingsterexhibitoruser) {    
    // let config= setheaderforfirstrequest();
    // return axios.get('xporium/user/schedule/get_user_schedule?fromdate=' + fromdate +"&todate="+todate,config); 
    let config = setheaderforfirstrequest();
    if (wingsterexhibitoruser !== null && wingsterexhibitoruser !== undefined) {
        return axios.get('xporium/user/schedule/get_user_schedule?wingsterexhibitoruser=' + wingsterexhibitoruser + "&fromdate=" + fromdate + "&todate=" + todate, config)
    }
    else {
        return axios.get('xporium/user/schedule/get_user_schedule?fromdate=' + fromdate + "&todate=" + todate, config);
    }
}

export const save_user_schedule = ( data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/user/schedule/save_user_schedule';    
    return axios.post( url, data ,config)
};

export const delete_call_schedule = ( data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/user/schedule/delete_call_schedule';    
    return axios.post( url, data ,config)
};