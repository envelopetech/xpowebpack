import React from 'react';
import * as classshared from '../commoncss/classconst';
import { ICONS, ButtonType } from '../../shared/utility';
import Button from '../UI/Button/Button';
import dateFns from "date-fns";
import moment from 'moment'
import MediaQuery from 'react-responsive';
import { resizescreenpopup } from '../../shared/resizescreen.js'
import ReactDOM from "react-dom";
import isMobile from '../../shared/isMobile';

class visitoreventticketsummary extends React.Component {
    constructor(props) {
        super(props)
        this.handleResize = this.handleResize.bind(this);
    }
    handleResize() {
        if (isMobile.any() !== null) {
            let ele = ReactDOM.findDOMNode(this.refs.popupdiv)
            resizescreenpopup(ele);
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        if (isMobile.any() !== null) {
            let ele = ReactDOM.findDOMNode(this.refs.popupdiv)
            resizescreenpopup(ele);
        }

    }
    render() {
        let test = dateFns.getTime(dateFns.format(moment(this.props.start_time, 'h:mm')))
        let displaydate = dateFns.format(test, 'hh:mm a')
        let stalllnumberdiv = null;
        if (this.props.stallname !== undefined && this.props.stallname !== null) {
            stalllnumberdiv = <div className={classshared.seat_font_1_medium.join(' ')}>
                <div className={classshared.text_14_text_normal.join(' ')}>{this.props.stallname}</div>
                <span className={classshared.text_12_text_color_dark_grey.join(' ')}>Stall Number</span>
            </div>
        }
        return (
            <React.Fragment>
                <div className={classshared.closepopup}>
                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                </div>
                <div className={classshared.padding_content_flex_align_center_flex_justify_center.join(' ')} ref="popupdiv">

                    <div className={classshared.center}>
                        <div className={classshared.card_summary_header_font_1_medium_text_22_text_color_green.join(' ')}>Thank you!</div>
                        <div className={classshared.text_12_text_dark.join(' ')}>Your ticket has been booked for {this.props.eventtitle}</div>
                        <div className={classshared.margin_t_b_m.join(' ')}>
                            <span className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>Please
                            find your booking pass below. You can also find this pass under "My Bookings"
                                    section of your profile.</span>
                        </div>
                    </div>
                    <div className={classshared.booking_pass.join(' ')}>
                        <div className={classshared.cardWrap_flex.join(' ')}>
                            <div className={classshared.booking_card_cardLeft.join(' ')}>
                                <div className={classshared.margin_top__lv75}>
                                    <span className={classshared.font_1_medium_uppercase.join(' ')}>
                                        <div className={classshared.text_14_text_normal.join(' ')}>{this.props.eventtitle}</div>
                                        <span className={classshared.text_12_text_color_dark_grey.join(' ')}>Expo</span>
                                    </span>
                                </div>
                                <div className={classshared.name_font_1_medium.join(' ')}>
                                    <div className={classshared.text_14_text_normal.join(' ')}>{this.props.loggedinuser_name}</div>
                                    <span className={classshared.text_12_text_color_dark_grey.join(' ')}>Name</span>
                                </div>
                                {stalllnumberdiv}

                                <MediaQuery query="(min-device-width: 1224px)">
                                    <div className={classshared.time_font_1_medium.join(' ')}>
                                        <div className={classshared.text_14_text_normal.join(' ')}>{this.props.event_booking_number}</div>
                                        <span className={classshared.text_12_text_color_dark_grey.join(' ')}>Booking Reference</span>
                                    </div>
                                </MediaQuery>



                                <div className={classshared.time_font_1_medium.join(' ')}>
                                    <div className={classshared.text_14_text_normal.join(' ')}>{displaydate}</div>
                                    <span className={classshared.text_12_text_color_dark_grey.join(' ')}>Time</span>
                                </div>
                            </div>
                            <div className={classshared.booking_card_cardRight.join(' ')}>
                                <div className={classshared.margin_top__lv75}>
                                    <div className={classshared.text_dark}>
                                        <h3>{this.props.event_booking_number}</h3>
                                        <span className={classshared.text_12_text_color_dark_grey.join(' ')}>Booking Reference</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.ischeckuserexhibition ?
                            (
                                <div className={classshared.margin_t_m}>
                                    <Button btntype={ButtonType.btn_blue_font_1_bold_text_14_width100per} clicked={this.props.checkuserexhibition}>
                                        Check
                                    </Button>
                                </div>
                            ) :
                            (
                                <div className={classshared.margin_t_m}>
                                    <Button btntype={ButtonType.btn_blue_font_1_bold_text_14_width100per} clicked={this.props.closemodal}>
                                        Close
                                    </Button>
                                </div>
                            )
                    }


                </div>

            </React.Fragment>
        )
    }

}
export default React.memo(visitoreventticketsummary);