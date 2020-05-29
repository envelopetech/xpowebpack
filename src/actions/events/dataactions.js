import axios from '../../store/axios-orders';
import { setheaderforfirstrequest } from '../../shared/utility'


export function geteventlist() {
    let config = setheaderforfirstrequest();
    let retunur = null;
    // switch (eventtype) {
    //     case (EventType.liveevent):
    retunur = axios.get('xporium/events/get_event_list_explore_expo', config);
    //         break;
    //     case (EventType.upcomingevent):
    //         retunur = axios.get('xporium/events/getupcommingevents', config);
    //         break;
    //     default:
    //         break;
    // }
    return retunur;

}
export function get_upcoming_expo() {
    let config = setheaderforfirstrequest();
    let retunur = null;    
    retunur = axios.get('xporium/events/get_upcoming_expo', config);   
    return retunur;

}
export function getfeatureevent() {
    let config = setheaderforfirstrequest();
    let retunur = axios.get('xporium/events/getfeatureevent', config);
    return retunur;

}
export function getalleventlists() {
    let config = setheaderforfirstrequest();
    let retunur = axios.get('xporium/events/getalleventlists', config);
    return retunur;

}

export function getusereventlist() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/user/events/get_user_events', config);

}

export const savedeleteuserfavourites = (data, isdeletefav) => {
    let config = setheaderforfirstrequest();
    let retunur = null;
    let url = null;
    if (isdeletefav) {
        url = 'xporium/user/favouritesdelete';
    }
    else {
        url = 'xporium/user/favouritessave';
    }
    retunur = axios.post(url, data, config)
    return retunur;


}
export function get_events_by_id(event_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/events/get_events_by_id?event_id=' + event_id, config);

}
export function get_events_without_loggedin() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/events/get_events_without_loggedin', config);

}
export function get_exhibitor_by_event_id(all_records, event_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/events/get_exhibitor_by_event_id?all_records=' + all_records + "&event_id=" + event_id, config);

}
export function get_exhibitor_name_value_by_event_id(event_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/events/get_exhibitor_name_value_by_event_id?event_id=' + event_id, config);


}
export function get_stall_for_event_selection(event_id) {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/events/get_stall_for_event_selection?event_id=' + event_id, config);

}

export const delete_user_events = (data) => {
    let config = setheaderforfirstrequest();    
    let url = 'xporium/events/delete_user_events';    
    return axios.post(url, data, config)
    
}

export const save_event = (data) => {
    let config = setheaderforfirstrequest();    
    let url = 'xporium/events/event_save';    
    return axios.post(url, data, config)
    
}