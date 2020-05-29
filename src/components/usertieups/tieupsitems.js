import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import Mutualtieups from './mutualtieups';
import TieupsRequest from './tieupsrequest';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; 
import { PageType, encodedstring } from '../../shared/utility';

const tieupsitems = (props) => {   
   
    let namelink =null;       
    if(props.userid !== null && props.userid !== undefined)
    {      
        let encoded = encodedstring(props.userid)        
        namelink=<React.Fragment>
                <NavLink     
                className={classshared.anchorremoveline.join(' ')}                  
                to={`/home/${encoded}`}>{props.name}</NavLink>
                </React.Fragment>
    }     
    let tieupbuttondiv=null;     
    if(props.pagetype === PageType.userprofile)      
    {
        if(props.otheruserid !== null && props.otheruserid !== undefined)
        {
            tieupbuttondiv = <TieupsRequest user_friend_status={props.user_friend_status} loggedin_userstatus={props.loggedin_userstatus} tieups_requested={props.tieups_requested} tieupsclickhandler={props.tieupsclickhandler} ></TieupsRequest>
        }
    }
    else if(props.pagetype === PageType.explorepeople)
    {
        tieupbuttondiv = <TieupsRequest user_friend_status={props.user_friend_status} loggedin_userstatus={props.loggedin_userstatus} tieups_requested={props.tieups_requested} tieupsclickhandler={props.tieupsclickhandler} ></TieupsRequest>
    }    
    return(           
        <div className={classshared.tieup_profile_card}> 
            <div className={classshared.tieup_profile_details}>                
                <Profilepic profilepic_url={props.profile_pic_url} type={props.ProfilepicType} altname={props.name}></Profilepic>                
            <div className={classshared.margin_l_m}> 
                <div>{namelink || <Skeleton/>}</div>
                <div className={classshared.headertextsmall.join(' ')}>{props.designation || <Skeleton/>}</div>
                <div className={classshared.headertextsmall.join(' ')}>{props.location || <Skeleton/>}</div>
                <div className={classshared.tieup_connections}> 
                    <Mutualtieups mutualtieupsdata={props.mutualtieupsdata}  imagetype={props.mutualsmallimage} totalmutualtieupes={props.totalmutualtieupes}></Mutualtieups>                     
                </div>
            </div>
            </div>
            {tieupbuttondiv}
        </div>
    )   
}
export default React.memo(tieupsitems);