import axios from 'axios';
import base64 from 'base-64';
import utf8 from 'utf8';

let userid = "";
if (localStorage.getItem('userId') != null) {
    var bytes = utf8.encode(localStorage.getItem('userId'));
    userid = base64.encode(bytes);
}
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: localStorage.getItem('token') == null ? null : localStorage.getItem('token') + "##" + userid,
        //'Access-Control-Allow-Origin': '*',
        //'Content-Type':'application/x-www-form-urlencoded'
    },
    //withCredentials: true,
    //credentials: 'same-origin',  
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    // },     
});
//instance.defaults.headers.common['Authorization'] = localStorage.getItem('token') == null ? null : localStorage.getItem('token') +"##"+ userid;
export default instance;