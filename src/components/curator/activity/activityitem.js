import React from 'react';
import * as classshared from '../../streamline/classconst';
import Profilepic from '../../UI/profilepic/profilepic';
import Userprofilenavlink from '../../commonnavlinks/userprofilenavlink';

const activityitem = (props) => {
    let divposttime = null
    divposttime = <div className={classshared.margin_b_m}><div className={classshared.flex_flex_align_center.join(' ')}>
        <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{props.posttime}</span>
    </div></div>
    let mentionusername = null
    if (props.mentionsuserid !== null && props.mentionsuserid !== undefined) {
        mentionusername = <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>
            {props.wallpostmessagetype} to <Userprofilenavlink username={props.mentionusername} userid={props.mentionsuserid}></Userprofilenavlink></span>
    }
    else {
        mentionusername = <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>
            {props.wallpostmessagetype}</span>
    }
    let postedusername = null
    if (props.userpostid !== null && props.userpostid !== undefined) {
        postedusername = <Userprofilenavlink username={props.userpostername} userid={props.userpostid}></Userprofilenavlink>
    }
    return (
        <React.Fragment>
            <div className={classshared.card__wrapper}>
                <div className={classshared.streamline__card}>
                    <div className={classshared.streamline__card_left.join(' ')}>
                        <Profilepic profilepic_url={props.profile_pic_url} type={props.ProfilepicType} altname=""></Profilepic>
                        <div className={classshared.streamline__card_header.join(' ')}>
                            <div className={classshared.streamline__card_header_name}>
                                {postedusername}
                                {mentionusername}
                            </div>
                            {divposttime}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default React.memo(activityitem);