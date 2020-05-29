import React from 'react';
import * as classshared from '../commoncss/classconst';
import Button from '../UI/Button/Button';
import { ButtonType, ICONS } from '../../shared/utility';
import Profilepic from '../UI/profilepic/profilepic';
import Videocallcomponent from './videocallcomponent'
import dateFns from "date-fns";
import moment from 'moment'

class usercallpopupsender extends React.Component {
    render() {
        let headertext = null;
        let name = null;
        let image = null;
        let designation = null;
        let divbutton = null;
        let callerreciverdetail = null;
        let divvideocall = null
        if (this.props.iscaller) {
            name = this.props.receivername;
            image = this.props.receiverprofilepic;
            designation = this.props.receiverdesignation
            headertext = "Outgoing Call";
            callerreciverdetail = <React.Fragment>
                <div className={classshared.user_nav__icon_box}>
                    <Profilepic profilepic_url={image} type={this.props.imagetype}></Profilepic></div>
                <div className={classshared.margin_l_m}> <div className={classshared.flex__column.join(' ')}>
                    <div className={classshared.margin_l_m}><div className={classshared.font_2_bold_text_dark.join(' ')}>{name}</div>
                        <div className={classshared.font_2_regular_text_12_text_dark.join(' ')}>{designation}</div></div>
                </div></div></React.Fragment>
        }
        let divstarttime = null
        let divendtime = null
        let divminute=null
        if (this.props.endtime !== null && this.props.endtime !== undefined) {
            divendtime = <div><span>EndTime:{this.props.endtime}</span></div>
        }
        if (this.props.starttime !== undefined && this.props.starttime !== null) {
            divstarttime = <div><span>StartTime:{this.props.starttime}</span></div>
        }
        if (this.props.starttime !== undefined && this.props.starttime !== null && this.props.endtime !== null && this.props.endtime !== undefined) {
            let start = dateFns.format(moment(this.props.starttime, 'HH:mm'))
            let end = dateFns.format(moment(this.props.endtime, 'HH:mm'))

            let minute = dateFns.differenceInMinutes(end,start)
            divminute = minute + " Minutes"
        }
        if (this.props.isreciver) {
            name = this.props.callername;
            image = this.props.callerprofilepic;
            designation = this.props.callerdesignation
            headertext = "Incoming Call";
            callerreciverdetail = <React.Fragment>
                <div className={classshared.user_nav__icon_box}>
                    <Profilepic profilepic_url={image} type={this.props.imagetype}></Profilepic></div>
                <div className={classshared.margin_l_sm}> <div className={classshared.flex__column.join(' ')}>
                    <div className={classshared.margin_l_m}><div className={classshared.font_2_bold_text_dark.join(' ')}>{name}</div>
                        <div className={classshared.font_2_regular_text_12_text_dark.join(' ')}>{designation}</div></div>
                </div> </div></React.Fragment>
            if (!this.props.buttonresponse) {
                divbutton = <React.Fragment>
                    <div className={classshared.margin_r_m}>
                        <Button btntype={ButtonType.round_button_green} clicked={this.props.acceptcall} svgclass={classshared.icon_20_white_margin_r_10.join(' ')} videoicon={true}></Button></div>
                    <div className={classshared.margin_r_m}>
                        <Button btntype={ButtonType.round_button_red} clicked={this.props.rejectcall} svgclass={classshared.icon_20_white_margin_r_10.join(' ')} videoicon={true}></Button>
                    </div>
                </React.Fragment>
            }
        }
        if (this.props.opentok_token !== undefined && this.props.opentok_token !== null && this.props.showvideocallstream === true) {
            divvideocall = <Videocallcomponent
                opentok_token={this.props.opentok_token}
                opentok_sessionid={this.props.opentok_sessionid}
                isreciver={this.props.isreciver}
                iscaller={this.props.iscaller}
            >
            </Videocallcomponent>
        }
        return (
            <React.Fragment>
               
                        <div className={classshared.popup__content_header}>
                            <div className={classshared.sidebar__user_stats.join(' ')}>
                                <div className={classshared.sidebar__user_details_left.join(' ')}>
                                    <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{headertext}</h2>
                                </div>
                                <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.popup__content_bottom}>
                            <div className={classshared.sidebar__user_details_left_without_flex_flex_flex_justify_sb.join(' ')}>
                                <div className={classshared.flex_padding_all_sm.join(' ')}>
                                    {callerreciverdetail}
                                </div>
                                <div className={classshared.flex}>
                                    {divbutton}
                                </div>
                            </div>
                            <div className={classshared.margin_t_m}>                                
                                {divstarttime}
                                {divendtime}
                                {divminute}
                                <div className={classshared.margin_t_m}>{divvideocall}</div>

                            </div>
                        </div>
                 
            </React.Fragment>
        );
    }
};
export default usercallpopupsender;