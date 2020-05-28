import { Button } from 'semantic-ui-react';
import React from 'react';
import * as classes from './classconst';
import { ButtonType } from '../../../shared/utility';
import Icon from '../Icon/Icon';
import VideoIcon from '../Icon/videocamera';

const button = (props) => {

    let btntype = null;
    let buttonclass = null;

    switch (props.btntype) {
        case (ButtonType.editprofile):
            btntype = classes.btnediprofile
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.recentactivity):
            btntype = classes.btnrecentactivity
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.tagsbutton):
            btntype = classes.tagbtn
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_green_flex):
            btntype = classes.btn_green_flex
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_purple_font_1_bold):
            btntype = classes.btn_purple_font_1_bold
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_btn_outline_blue):
            btntype = classes.btn_btn_outline_blue
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.edit_mode_button_profile):
            btntype = classes.btnediprofilesmall
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.edit_work_edu_link):
            btntype = classes.edit_btn_work_edu
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.showmorelesslink):
            btntype = classes.textlink_showmoreless
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.tieup_btn):
            btntype = classes.tieup_btn
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_add_record):
            btntype = classes.btnaddnewpopup
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnsavecancel):
            btntype = classes.btn_list_select
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnuserfeedpost):
            btntype = classes.btn_user_post
            if (props.buttondisabled) {
                btntype = classes.btn_user_post_disabled
            }
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_close_popup):
            btntype = classes.btnclose_popup
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnlistselect):
            btntype = classes.btn_list_select
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnlistdeleteedit):
            btntype = classes.btn_action_delete_edit
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_action_delete_edit_disabled):
            btntype = classes.btn_action_delete_edit_disabled
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_blue_font_1_bold_text_14_disabled):
                btntype = classes.btn_blue_font_1_bold_text_14_disabled
                buttonclass = btntype.join(' ')
                break;
            case (ButtonType.btn_blue_font_1_bold_text_14_disabled_width100per):
                btntype = classes.btn_blue_font_1_bold_text_14_disabled_width100per
                buttonclass = btntype.join(' ')
                break;
        case (ButtonType.btnsharecommentlikepost):
            btntype = classes.btn_sharecomment_like_post
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btncancelpost):
            btntype = classes.btn_user_post_cancel
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnuserpostmore):
            btntype = classes.btnuserpostmore
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnshowallnotifications):
            btntype = classes.btnshowallnotifications
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_red_italic):
            btntype = classes.btn_red_italic
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btnuploadvideo):
            btntype = classes.user_profile_streamline_photo
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.signuplogin):
            btntype = classes.btn_signup_login
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.signuploginlink):
            btntype = classes.signuploginlink
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.profilesetupbutton):
            btntype = classes.profilesetupbutton
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.profilesetupbuttondisabled):
            btntype = classes.profilesetupbuttondisabled
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.round_button_green):
            btntype = classes.round_button_green
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.round_button_red):
            btntype = classes.round_button_red
            buttonclass = btntype.join(' ')
            break;       
        case (ButtonType.wingsaction):
            btntype = classes.wingsaction_button
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.exhibitionview3d):
            btntype = classes.exhibitionview3d
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.exhibition_enquries_submit):
            btntype = classes.btn_purple
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.exhibitor_edit_profile):
            btntype = classes.btn_outline__pink_margin_l_m
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_purple_font_1_bold_text_14):
            btntype = classes.btn_purple_font_1_bold_text_14
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_blue_font_1_bold_text_14):
            btntype = classes.btn_blue_font_1_bold_text_14
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_blue_font_1_bold_text_14_width100per):
            btntype = classes.btn_blue_font_1_bold_text_14_width100per
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_btn_outline_blue_width100per):
            btntype = classes.btn_btn_outline_blue_width100per
            buttonclass = btntype.join(' ')
            break;          
        case (ButtonType.btn_text_color_strongblue_font_1_medium):
            btntype = classes.btn_text_color_strongblue_font_1_medium
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_btn_outline_grey):
            btntype = classes.btn_btn_outline_grey
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_outline_green):
            btntype = classes.btn_outline_green
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_outline_purple):
            btntype = classes.btn_outline_purple
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_textlink_showmoreless_blue):
            btntype = classes.btn_textlink_showmoreless_blue
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_textlink_showmoreless_black):
            btntype = classes.btn_textlink_showmoreless_black
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_bluelink):
            btntype = classes.bluelink
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_textlink_showmoreless_pink):
            btntype = classes.btn_textlink_showmoreless_pink
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_wing_follow):
            btntype = classes.btn_wing_follow
            buttonclass = btntype.join(' ')
            break;
        case(ButtonType.btn_grey_font_1_bold_text_11):
            btntype = classes.btn_grey_font_1_bold_text_11
            buttonclass = btntype.join(' ')
            break;
        case(ButtonType.btn_blue_font_1_bold_text_11):
            btntype = classes.btn_blue_font_1_bold_text_11
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_green):
            btntype = classes.btn_green
            buttonclass = btntype.join(' ')
            break;

        case (ButtonType.btn_red):
            btntype = classes.btn_red
            buttonclass = btntype.join(' ')
            break;
        case (ButtonType.btn_grey):
            btntype = classes.btn_grey
            buttonclass = btntype.join(' ')
            break;
        default:
            buttonclass = null
    }
    let buttondata = null;


    let svgtag = null
    if (props.icon !== undefined) {
        svgtag = <Icon svgclass={props.svgclass} icon={props.icon}></Icon>
    }
    if(props.videoicon !== undefined && props.videoicon === true)
    {
        svgtag = <VideoIcon svgclass={props.svgclass}></VideoIcon>
    }

    if (props.buttontype === "submit") {
        buttondata = <Button type="submit" className={buttonclass} id={props.id}>
            {svgtag}{props.children}
        </Button>
    }
    else {

        if (props.islisting) {
            buttondata = <Button type="button" className={buttonclass} onClick={props.clicked} id={props.id}>
                {props.children}{svgtag}
            </Button>
        }
        else {
            buttondata = <Button type="button" className={buttonclass} onClick={props.clicked} id={props.id}>
                {svgtag}{props.children}
            </Button>
        }
    }
    return (
        <React.Fragment>{buttondata}</React.Fragment>
    )
};

export default button;