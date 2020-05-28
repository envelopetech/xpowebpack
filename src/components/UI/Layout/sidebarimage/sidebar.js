import React from 'react';
import * as classes from './classconst';
import Pic from '../../../UI/profilepic/profilepic';
import ImageUpload from '../../../FilestackUpload/FilestackUpload';
import usertypeimage from '../../../../assets/images/medal.svg'

// const options = {
//     accept: 'image/*',
//     };
const sidebar = (props) => {      
    let profilepicurl = null
    let joindate = null;
    let usertypename = null

    if (props.joindatetime !== undefined && props.joindatetime !== null) {
        joindate = props.joindatetime
    }
    if (props.usertypename !== undefined && props.usertypename !== null) {
        if(props.usertypename === "Exhibitor")
        {
            usertypename = <div id="game-level" className={classes.card_label_orange.join(' ')}>            
           <span className={classes.verticalalignsuper}> {props.usertypename}</span>
        </div>
        }
        else{
            usertypename = <div id="game-level" className={classes.card_label__blue.join(' ')}>
            <img className={classes.icon_20_icon_dark_grey_margin_r_10.join(' ')} src={usertypeimage} alt='' />
           <span className={classes.verticalalignsuper}> {props.usertypename}</span>
        </div>
        }       
    }
    if (props.profile_pic_url !== undefined && props.profile_pic_url !== null) {
        profilepicurl = props.profile_pic_url;
    }
    let showeditbutton = null;
    if (props.is_editmode) {
        showeditbutton = <ImageUpload buttontype={props.filestacktype} option={props.filestackoptionimage} onSuccessupload={props.onSuccessImageupload} />
    }
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar__user}>
                <div className={classes.sidebar__user_photo}>
                    <Pic type={props.imagetype} profilepic_url={profilepicurl}></Pic>
                    {showeditbutton}
                </div>
                <div className={classes.margin_t_b_m.join(' ')}>{usertypename}</div>                
                <div className={classes.sidebarimageheader.join(' ')}>{props.headerheading}</div>
              <div className={classes.margin_b_sm}><div className={classes.sidebar_label.join(' ')}><i className={classes.fontawesome_calendar_alt.join(' ')}></i>{joindate}</div></div>  
                
            </div>
        </div>
    )
}
export default React.memo(sidebar);