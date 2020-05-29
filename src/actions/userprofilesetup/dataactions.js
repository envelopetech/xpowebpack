import axios from '../../store/axios-orders';
import {setheaderforfirstrequest,TwoFactorAPIKey} from '../../shared/utility'


export function getindustry(user_industry) {
    const data = {
        user_industry: user_industry
    };   
    if(user_industry !== "" && user_industry !== null && user_industry !== undefined)
    {
        return axios.post('xporium/userindustry',data);
    }
    else
    {
        return axios.get('xporium/industry');
    }    
}
// function getentitype() {
//     return axios.get('xporium/entitytype');
// }

// export function getprofile1dropdowndata(user_industry)
// {
//    return Promise.all([getentitype(), getindustry(user_industry)])  
// }
export function getuserprofile1data(otheruserid)
{  
   
    let config= setheaderforfirstrequest();
    if(otheruserid !== null)
    {       
        return axios.get('xporium/visitorprofile?otheruserid=' + otheruserid,              
            config); 
    }
    else
    {        
        return axios.get('xporium/visitorprofile',              
            config); 
    }
}
export const profilesetup_third_step_update = ( profile1data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/profilesetup/profilesetup_third_step_update';    
    return axios.post( url, profile1data ,config)
};
export function get_recommend_wings_exhibition_peoples() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/visitor/get_recommend_wings_exhibition_peoples', config);
}
export function get_random_recommend_wings() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/visitor/get_random_recommend_wings', config);
}

export function get_industry_name_value() {
    let config = setheaderforfirstrequest();
    return axios.get('xporium/master/get_industry_name_value', config);
}
// export const saveverificationcode = () => {  
//     let config= setheaderforfirstrequest();   
//     let url = 'xporium/profilesetup2/saveverificationcode';    
//     return axios.post( url, config)
// };
// export const verifyotpcode = (data) => {  
//     let config= setheaderforfirstrequest();   
//     let url = 'xporium/profilesetup2/verifytoken';    
//     return axios.post( url,data,config)
// };
// export const savephonenumber = (data) => {  
//     let config= setheaderforfirstrequest();   
//     let url = 'xporium/profilesetup2/savephonenumber';    
//     return axios.post( url,data,config)
// };
// export const saveprofileimage = (data) => {     
//     let config= setheaderforfirstrequest();   
//     let url = 'xporium/profilesetup3/saveimage';    
//     return axios.post( url,data,config)
// };

// export function gervisitorprofiledata()
// {
//     var data= getuserprofile1data()        
//     data.then(res=>
//     {                    
//         if(res !== undefined)
//         {                     
//             localStorage.setItem("visitorphonenumber",res.data["phone_number"]); 
//             localStorage.setItem("isverifyphonenumber",res.data["is_verify"]); 
//             localStorage.setItem("profilepic",res.data["profile_pic_url"]);       
//         }                                
        
//     }).catch(error => 
//     {            
//         this.setState({                    
//             loading:false,
//             error:error
//         }) 
//     });   
// }

export const user_personal_settings_save = ( profile1data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/usersettings/user_personal_settings_save';    
    return axios.post( url, profile1data ,config)
};
export const user_business_settings_save = ( profile1data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/usersettings/user_business_settings_save';    
    return axios.post( url, profile1data ,config)
};

export const update_user_payment_card_detail = ( profile1data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/usersettings/update_user_payment_card_detail';    
    return axios.post( url, profile1data ,config)
};

export const user_change_password = ( profile1data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/users/change_password';    
    return axios.post( url, profile1data ,config)
};
export const check_old_password = ( profile1data ) => {  
    let config= setheaderforfirstrequest();   
    let url = 'xporium/users/check_old_password';    
    return axios.post( url, profile1data ,config)
};
export const userfollowsave = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/follow_user';
    return axios.post(url, data, config)
}
export const userunfollowsave = (data) => {
    let config = setheaderforfirstrequest();
    let url = 'xporium/streamline/user/unfollow_user';
    return axios.post(url, data, config)
}

export function verifyotpdetail(sessionid, value) {    
    //return axios.get(`https://2factor.in/API/V1/${twofactorapikey}/SMS/VERIFY/${sessionid}/${value}`);
    return axios.get(`https://2factor.in/API/V1/${TwoFactorAPIKey}/SMS/VERIFY/${sessionid}/${value}`);
}