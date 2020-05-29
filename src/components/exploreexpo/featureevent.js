import React from 'react';
import * as classshared from '../commoncss/classconst';
import ProfilePic from '../UI/profilepic/profilepic';
import { ProfilepicType, encodedstring, Registration_status } from '../../shared/utility';
import shortid from "shortid";
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import defaultimage from '../../assets/images/default_avatar.png';

const styles = {
    priceSection: {
        display: 'flex',
        flexDirection: 'column',
    },

    lineThrough: {
        textDecoration: 'line-through'
    },

    marginRight_sm: {
        marginRight: '5px',
    },

    textOrange: {
        color: '#f66f00'
    }
}

class featureevent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirecttohome: false,
        }
    }

    redirecthandler = () => {
        this.setState({
            redirecttohome: true
        })
    }

    render() {
        const { classes } = this.props;
        let authRedirect = null;
        if (this.state.redirecttohome) {
            let encoded = encodedstring(this.props.id)
            authRedirect = <Redirect to={`/exhibitionprofile/${encoded}`} />
        }
        let tieupsdata = [];
        if (this.props.totalvisitorsexhibitors !== null) {
            // if (this.props.totalvisitorsexhibitors.length === 0) {
            //     let detail = <ProfilePic profilepic_url={defaultimage} type={ProfilepicType.avatar_l} altname=""></ProfilePic>
            //     tieupsdata.push(<React.Fragment>{detail}</React.Fragment>)
            // }
            // else {
            this.props.totalvisitorsexhibitors.map((item, i) => {
                if (item !== null) {
                    let detail = <React.Fragment key={shortid.generate()}>
                        <ProfilePic profilepic_url={item} type={ProfilepicType.avatar_l} altname=""></ProfilePic>
                    </React.Fragment>
                    return (
                        tieupsdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
                    )
                }
            })
            //}
        }
        let divregistration_status = <React.Fragment><div className={classshared.margin_l_sm}></div> <div className={classshared.card_label_green.join(' ')}>{this.props.registrationstatus}</div></React.Fragment>
        if (this.props.registrationstatus === Registration_status.registrationclosed) {
            divregistration_status = <React.Fragment><div className={classshared.margin_l_sm}></div> <div className={classshared.card_label_red.join(' ')}>{this.props.registrationstatus}</div></React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
                <div className={classshared.event_card_wrapper.join(' ')} onClick={this.redirecthandler}>
                    <div className={classshared.img_square_sm_wrapper.join(' ')}>
                        <ProfilePic profilepic_url={this.props.eventimage} type={ProfilepicType.img_square_l} altname=""></ProfilePic>
                    </div>
                    <div className={classshared.sidebar_event_content.join(' ')}>
                        <div className={classshared.padding_all_m}>
                            <div className={classshared.flex_margin_b_sm.join(' ')}>
                                <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')}>{this.props.title} </div>
                                {divregistration_status}
                            </div>
                            <div className={classshared.flex_flex_align_center.join(' ')}>
                                <i className={classshared.fontawesome_calendar_alt.join(' ')}></i><div className={classshared.margin_r_sm}></div>
                                <div className={classshared.dot_after.join(' ')}>{this.props.display_date}</div>

                                <i className={classshared.fontawesome_globe.join(' ')}></i><div className={classshared.margin_r_sm}></div>
                                <div className={classshared.dot_after.join(' ')}>{this.props.edition} Edition</div>

                                <i className={classshared.fontawesome_desktop.join(' ')}></i><div className={classshared.margin_r_sm}></div>
                                <div className={classshared.text_12_text_dark.join(' ')}>Online Expo</div>
                            </div>
                            <div className={classshared.tieup__connections_margin_b_sm_margin_t_sm.join(' ')}>
                                <div className={classshared.avatars}>
                                    {tieupsdata}
                                </div>
                                <div className={classshared.margin_l_sm}> </div>
                                <span className={classshared.font_1_medium_text_12.join(' ')}>
                                    Total Attendees:
                                    </span>
                                <div className={classshared.text_12}><div className={classshared.margin_l_sm}>{this.props.toalattendees}</div></div>
                            </div>
                            <div className={classshared.margin_t_b_m.join(' ')}>
                                <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>
                                    {this.props.descriptionsubstring}
                                </div>
                            </div>
                            <div className={classshared.flex_margin_b_m.join(' ')}>
                                <span className={classshared.font_1_bold_text_12_text_dark.join(' ')}>
                                    Registration Status:
                                    </span>
                                <div className={classshared.text_12}><div className={classshared.margin_l_sm}>Open until <strong>{this.props.display_registration_date}</strong></div></div>
                            </div>
                            <div className={classes.priceSection}>
                                <div className={classshared.font_1_bold_text_12_text_dark.join(' ')}>
                                    <span className={classes.textOrange}>{this.props.offer_description}</span>
                                </div>
                                <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                    <div className={classshared.font_1_medium_text_12.join(' ')}>For Visitors</div>
                                    <span className={classshared.font_1_bold_text_dark_text_14_text_color_blue.join(' ')}>
                                        {
                                            this.props.is_offer_event ?
                                                (<span className={clsx(classes.lineThrough, classes.marginRight_sm, classes.textOrange)}>INR {this.props.visitor_price}</span>) : null
                                        }
                                        <span>{this.props.visitor_offer_price}</span>
                                    </span>
                                </div>
                                <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                    <div className={classshared.font_1_medium_text_12.join(' ')}>For Exhibitors</div>
                                    <span className={classshared.font_1_bold_text_dark_text_14_text_color_blue.join(' ')}>
                                        {
                                            this.props.is_offer_event ?
                                                (<span className={clsx(classes.lineThrough, classes.marginRight_sm, classes.textOrange)}>INR {this.props.exhibitor_price}</span>) : null
                                        }
                                        <span>{this.props.exhibitor_offer_price}    </span>
                                        {/* {this.props.event_fees} */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(featureevent);