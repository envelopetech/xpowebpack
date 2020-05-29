import axios from '../../store/axios-orders';
import {setheaderforfirstrequest} from '../../shared/utility'

export function generate_opentokbox_token()
{   
    let config= setheaderforfirstrequest();
    return axios.get('xporium/uservideocall/generate_opentokbox_token', config);  
}