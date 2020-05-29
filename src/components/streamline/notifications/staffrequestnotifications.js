import React from 'react';
import * as classshared from '../classconst';
import Profilepic from '../../UI/profilepic/profilepic';
import Userprofilenavlink from '../../commonnavlinks/userprofilenavlink';
import { ProfilepicType, ButtonText, ButtonType } from '../../../shared/utility';
import Button from '../../UI/Button/Button';


const staffrequestnotifications = (props) => {    
    let postedusername = null
    if (props.exhibitor_id !== null && props.exhibitor_id !== undefined) {
        postedusername = <Userprofilenavlink is_exhibitorprofile={true} username={props.username} userid={props.userid}></Userprofilenavlink>
    }
    return (
        <React.Fragment>
            <li className={classshared.notification_item}>
                <div className={classshared.streamline__card_left.join(' ')}>
                    <div class={classshared.user_nav__icon_box}>
                        <Profilepic profilepic_url={props.profilepic_url} type={ProfilepicType.user_nav__user_photo_small} altname=""></Profilepic>
                    </div>
                    <div className={classshared.margin_l_m}>
                        <div className={classshared.streamline__card_header_name.join(' ')}>
                            <span>{postedusername}</span>
                        </div>
                    </div>
                </div>
                <div className={classshared.stream_card_flex}>
                    <span ><Button btntype={ButtonType.btn_purple_font_1_bold}
                        buttontype="button"
                        clicked={props.acceptstaffrequest}
                    >{ButtonText.accept}
                    </Button></span>
                    <span className={classshared.margin_l_m}><Button btntype={ButtonType.btn_btn_outline_grey}
                        buttontype="button" clicked={props.rejectstaffrequest}>{ButtonText.reject}</Button></span>
                </div>
            </li>
        </React.Fragment>
    )
}
export default React.memo(staffrequestnotifications);