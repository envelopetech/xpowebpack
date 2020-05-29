import React from 'react';
import * as classshared from '../commoncss/classconst';
import ProfilePic from '../UI/profilepic/profilepic';
import { ProfilepicType, users_type, encodedstring } from '../../shared/utility';
import shortid from "shortid";
import { save_exhibitor_event_payment, save_wingster_event_payment } from '../../actions/subscription/dataactions';
import { Redirect } from 'react-router-dom';
import defaultimage from '../../assets/images/default_avatar.png'

class eventlistitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirecttohome: false,
        }
    }
    paynowhandler = () => {
        if (this.props.usertypename === users_type.wingster) {
            const dataval = {
                stall_id: this.props.stall_id,
                event_id: this.props.id
            }
            var returndata = save_wingster_event_payment(dataval)
            returndata.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        //open popup like ticket generated
                    }
                }
            })
        }
        else {
            const dataval = {
                event_id: this.props.id,
                stall_id: this.props.stall_id
            }
            var return_data = save_exhibitor_event_payment(dataval)
            return_data.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        //open popup like ticket generated
                    }
                }
            })
            // let amount = parseInt(this.props.event_fees, 10)
            // let final_amount = parseFloat(amount * (GST_value / 100))
            // final_amount = parseFloat(final_amount) + parseFloat(amount)

            // let options = {
            //     "key": process.env.REACT_APP_RAZOR_API_KEY,
            //     "amount": parseInt((final_amount * 100), 10),//this.props.price, // 2000 paise = INR 20, amount in paisa
            //     "name": this.props.loggedinuser_name,
            //     "description": "Test",
            //     "image": this.props.loggedin_user_profilepic_url,
            //     "handler": function (response) {
            //         const dataval = {
            //             payment_id: response.razorpay_payment_id,
            //             payment_amount: final_amount,
            //             event_id: this.props.id,
            //             stall_id: this.props.stall_id
            //         }
            //         var returndata = save_exhibitor_event_payment(dataval)
            //         returndata.then(res => {
            //             if (res !== undefined) {
            //                 if (res.data["error"] === undefined) {
            //                     //open popup like ticket generated
            //                 }
            //             }
            //         })
            //     },
            //     "prefill": {
            //         "name": this.props.loggedinuser_name,
            //         "email": this.props.loggedinuser_email,
            //         "contact": this.props.loggedinuser_phonenumber
            //     },
            // };
            //let rzp = new window.Razorpay(options);
            //rzp.open();
        }
    }
    redirecthandler = () => {
        this.setState({
            redirecttohome: true
        })
    }
    render() {
        let visitorexhibitortext = null
        if (this.props.is_exhibitor) {
            visitorexhibitortext = "Joined as Exhibitor"
        }
        else {
            visitorexhibitortext = "Joined as Visitor"
        }
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
            // else{
            //     let detail = <React.Fragment key={shortid.generate()}>
            //     <ProfilePic profilepic_url={defaultimage} type={ProfilepicType.avatar} altname=""></ProfilePic>
            // </React.Fragment>
            // return (
            //     tieupsdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
            // ) 
            // }

        }
        let tieupsdiv = null
        if (tieupsdata !== null && tieupsdata.length > 0) {
            tieupsdiv = <React.Fragment>
                <div className={classshared.avatars}>
                    {tieupsdata}
                </div>
                <div className={classshared.margin_l_sm}></div></React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
                <div id="expo_card" className={classshared.card_without_follow.join(' ')} onClick={this.redirecthandler}>
                    <div className={classshared.card_follow_header} style={{ backgroundImage: `url(${this.props.eventimage})` }}> </div>
                    <div id="card_align" className={classshared.padding_all_m}>
                        <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')} >{this.props.title}
                            {/* <div className={classshared.seperator_dot.join(' ')}></div>{this.props.display_date} */}
                        </div>
                        <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.location}</div>
                        <div className={classshared.margin_t_sm}>
                            <div className={classshared.tieup__connections_margin_b_sm.join(' ')}>
                                {tieupsdiv}
                                <div className={classshared.margin_l_sm}> </div>
                                <span className={classshared.font_1_medium_text_12.join(' ')}>
                                    Total Attendees:
                                    </span>
                                <div className={classshared.text_12}><div className={classshared.margin_l_sm}>{this.props.toalattendees}</div></div>
                            </div></div>
                        <div className={classshared.margin_t_b_m.join(' ')}><div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.descriptionsubstring}</div></div>
                        <div className={classshared.inquiry_box_upper.join(' ')}>
                            <div>
                                <div className={classshared.font_1_medium_text_12.join(' ')}>{visitorexhibitortext}</div>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
export default eventlistitems;