import React from 'react';
import * as classes from '../UI/Layout/sidebarimage/classconst';
import Pic from '../UI/profilepic/profilepic';

const sidebar = (props) => {
    let profilepicurl = null
    let totalvisitors = null
    let totalexhibitors = null
    let toalattendees = null
    if (props.profile_pic_url !== undefined && props.profile_pic_url !== null) {
        profilepicurl = props.profile_pic_url;
    }
    if (props.totalvisitorsexhibitors !== null) {
        if (props.totalvisitorsexhibitors.length > 0) {
            totalvisitors = props.totalvisitorsexhibitors[1];
            totalexhibitors = props.totalvisitorsexhibitors[2];
            toalattendees = parseInt(totalvisitors, 10) + parseInt(totalexhibitors, 10)
        }
    }
    return (
        <div className={classes.sidebar.join(' ')}>
            <div className={classes.sidebar__user}>
                <div className={classes.sidebar__user_photo}>
                    <Pic type={props.imagetype} profilepic_url={profilepicurl}></Pic>
                </div>
                <div className={classes.margin_t_b_10}>
                    <div id="game-level" className={classes.card_label_orange.join(' ')}>
                        <span className={classes.verticalalignsuper}> Exhibition</span>
                    </div>
                </div>
                <div className={classes.font_1_medium_text_14_text_dark.join(' ')}>{props.eventname}</div>
                <div className={classes.margin_b_sm}>
                    <div className={classes.font_1_medium_text_12_text_light.join(' ')}>
                        <span className={classes.font_1_bold_text_12_text_dark.join(' ')}>Status:</span>
                        <span className={classes.margin_l_sm}>{props.registrationstatus}</span>
                    </div>
                </div>
                <div className={classes.margin_t_m}>
                    <div className={classes.margin_b_sm}>
                        <div className={classes.font_1_medium_text_12_text_light.join(' ')}>
                            <span className={classes.font_1_bold_text_12_text_dark.join(' ')}>Total Attendees:</span>
                            <span className={classes.margin_l_sm}>{toalattendees}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="compliance" className={classes.compliancediv}>
                <a className={classes.complienceanchor} href="https://app.xporium.com/privacypolicy" target="_blank" rel="noopener noreferrer">Privacy Policy &bull; </a>
                <a className={classes.complienceanchor} href="https://app.xporium.com/termsofservice" rel="noopener noreferrer" target="_blank">Terms of Service &bull; </a>
                <a className={classes.complienceanchor} href="https://app.xporium.com/cookies" rel="noopener noreferrer" target="_blank">Cookies</a>
                <span>&copy; Xporium Technologies Pte Ltd</span>

            </div>
        </div>
    )
}
export default React.memo(sidebar);