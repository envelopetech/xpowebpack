import React from 'react';
import * as classshared from '../commoncss/classconst';
import { ProfilepicType, ICONS, ButtonType } from '../../shared/utility';
import shortid from "shortid";
import Button from '../UI/Button/Button';
import ProfilePic from '../UI/profilepic/profilepic';
import defaultimage from '../../assets/images/default_avatar.png';

const visitorbookeventsummary = (props) => {
    let tieupsdata = [];
    if (props.totalvisitorsexhibitors !== undefined && props.totalvisitorsexhibitors !== null && props.totalexhibitors.length > 0) {
        props.totalvisitorsexhibitors.map((item, i) => {
            let detail = <React.Fragment key={shortid.generate()}>
                <ProfilePic profilepic_url={item} type={ProfilepicType.avatar} altname=""></ProfilePic>
            </React.Fragment>
            return (
                tieupsdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
            )
        })
    }
    else {
        tieupsdata = <React.Fragment key={shortid.generate()}>
            <ProfilePic profilepic_url={defaultimage} type={ProfilepicType.avatar} altname=""></ProfilePic>
        </React.Fragment>

    }
    let tieupsdiv = null
    if (tieupsdata !== null) {
        tieupsdiv = <React.Fragment>
            <div className={classshared.avatars_flex_row_withoutmargin}>
                {tieupsdata}
            </div>
        </React.Fragment>
    }
    let coverpic = null
    let styleback = null;
    if (props.eventimage !== undefined) {
        coverpic = props.eventimage
        styleback = `linear-gradient(-0deg, rgba(250,250,251,1) 1%, rgba(255,255,255,.9) 45%, rgba(93,80,198,.6) 100%), url(${coverpic})`
    }
    return (
        <React.Fragment>

            <div className={classshared.closepopup}>
                <Button btntype={ButtonType.btn_close_popup} clicked={props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
            </div>
            <div className={classshared.popup__content_header__fixed_height} style={{ backgroundImage: styleback }}>
                <div className={classshared.work__card_top_avatars.join(' ')}>
                    <div>
                        <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')}>{props.eventtitle}</div>
                        <div className={classshared.text_12_text_dark.join(' ')}>{props.eventlocation}</div>
                        <div className={classshared.tieup__connections_margin_b_sm_margin_t_sm.join(' ')}>
                            <div className={classshared.avatars_flex_row_withoutmargin}>
                                {tieupsdiv}
                            </div><div className={classshared.margin_r_sm}></div>
                            <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>
                                {props.totalvisitors} Visitors
                                        </div>
                            <div className={classshared.seperator_dot.join(' ')}></div>
                            <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{props.totalexhibitors} Exhibitors</div>

                        </div>
                        <div className={classshared.margin_b_m}><div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{props.eventdescription}</div></div>
                    </div>
                </div>
            </div>
            <div className={classshared.popup__content_bottom_flex_padding_all_m.join(' ')}>
                <div className={classshared.size2of3_margin_r_m_border_all_padding_content.join(' ')}>
                    <div className={classshared.margin_b_m}>
                        <div className={classshared.text_14}>
                            <span className={classshared.font_1_medium}>That's great!</span> You are
                                almost done with the booking. Regarding our virtual expo, we request you to read through
                                the following notes to ensure maximum benefits:
                            </div></div>
                    <li className={classshared.text_12_font_weight__thin_margin_b_sm.join(' ')}>
                        This is 100% virtual expo. This means this
                        expo will be hosted by Xporium on this platform only.
                            </li>
                    <li className={classshared.text_12_font_weight__thin_margin_b_sm.join(' ')}>
                        You can start scheduling the calls two
                        days before the expo begins.
                            </li>
                    <li className={classshared.text_12_font_weight__thin_margin_b_sm.join(' ')}>
                        You can place your enquiries once the expo goes live.
                            </li>

                </div>
                <div className={classshared.size1of3_padding_content_booking_summary_border_all.join(' ')}>
                    <div className={classshared.font_1_bold_text_18_text_color_strong_blue.join(' ')}>Booking Summary</div>
                    <div className={classshared.text_12}>
                        <i className={classshared.fontawesome_calendar.join(' ')}></i><span className={classshared.margin_l_sm}>{props.display_date}</span>
                    </div>
                    <div className={classshared.margin_bottom__lv4}>
                        <span className={classshared.text_12}>
                            <i className={classshared.fontawesome_clock.join(' ')}></i><span className={classshared.margin_l_sm}>{props.event_time_duration} IST</span>
                        </span>
                    </div>
                    <div className={classshared.margin_top__lv4}>
                        <span className={classshared.text_12}>Total Amount: Rs.0.00</span>
                    </div>
                    <div className={classshared.margin_t_m}><Button btntype={ButtonType.btn_blue_font_1_bold_text_14_width100per} clicked={props.nextPage}>Proceed</Button></div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default React.memo(visitorbookeventsummary);