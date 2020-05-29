import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { ButtonType, ButtonText, Exhibitionprofiletabindex, label_text, ProfilepicType, users_type, customPopUp, usermanagetabindex, encodedstring, Registration_status } from '../../../shared/utility';
import Button from '../../UI/Button/Button';
import 'react-responsive-modal/styles.css';
import Tabitems from '../exhibitionprofiletab/tabitems';
import ProfilePic from '../../UI/profilepic/profilepic';
import shortid from "shortid";
import Eventbookingwizard from '../../exploreexpo/eventbookingwizard';
import Modal from "react-responsive-modal";
import { save_visitor_event_payment, save_exhibitor_event_payment } from '../../../actions/subscription/dataactions';
import { get_stall_for_event_selection, delete_user_events } from '../../../actions/events/dataactions';
import Visitoreventticketsummary from '../../exploreexpo/visitoreventticketsummary'
import Eventbookingcancel from '../eventbookingcancel';
import { Redirect } from 'react-router-dom';

class aboutme extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            tabindex: Exhibitionprofiletabindex.whyexhibit,
            openeventbookingwizard: false,
            isvisitor: false,
            page: 1,
            event_booking_number: props.eventdata[0]["user_event_booking_number"],
            is_exhibitor: props.eventdata[0]["is_exhibitor"],
            user_already_join_this_event: props.eventdata[0].user_already_join_this_event,
            event_stall_data: null,
            openviewbooking: false,
            cancelbooking: false,
            redirecttousermanage: false,
            totalattendees: 0,
            totalvisitors: 0,
            totalexhibitors: 0,
            profilepicdata: null,
            stallname: props.eventdata[0]["stallname"],
            isauthenticateduser: true
        }
    }
    componentDidMount() {
        if (this.props.eventdata[0].totalvisitorsexhibitors !== null && this.props.eventdata[0].totalvisitorsexhibitors.length > 0) {
            this.setState({
                totalvisitors: this.props.eventdata[0].totalvisitorsexhibitors[1],
                totalexhibitors: this.props.eventdata[0].totalvisitorsexhibitors[2],
                profilepicdata: this.props.eventdata[0].totalvisitorsexhibitors[0]
            }, () => {
                this.setState({ totalattendees: parseInt(this.state.totalexhibitors, 10) + parseInt(this.state.totalvisitors, 10) })

            })
        }
    }
    onChange = (activeKey) => {
        this.setState({
            tabindex: activeKey
        });
    }
    openmodalforvisitorhandler = (event, isvisitor) => {
        event.preventDefault();
        if (this.props.loggedin_user_id !== undefined && this.props.loggedin_user_id !== null) {
            this.setState({
                openeventbookingwizard: true,
                isvisitor: isvisitor,
                page: 1
            })
        }
        else {
            this.setState({ isauthenticateduser: false })
        }
    }
    closemodalforvisitorhandler = () => {
        this.setState({
            openeventbookingwizard: false
        })
    }
    openviewbooking = () => {
        this.setState({
            openviewbooking: true
        })
    }
    closeviewbooking = () => {
        this.setState({
            openviewbooking: false
        })
    }
    opencancelbooking = () => {
        this.setState({
            cancelbooking: true
        })
    }
    closecancelbooking = () => {
        this.setState({
            cancelbooking: false
        })
    }
    cancelbookinghandler = () => {
        const dataval = {
            event_id: this.props.eventdata[0]["id"]
        }
        var returndata = delete_user_events(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({
                        user_already_join_this_event: false,
                        cancelbooking: false,
                        is_exhibitor: null,
                        totalattendees: this.state.totalattendees > 0 ? parseInt(this.state.totalattendees, 10) - 1 : 0
                    })
                }
            }
        })
    }
    nextPage(values) {
        if (this.state.page === 1) {
            if (this.state.isvisitor) {
                const dataval = {
                    event_id: this.props.eventdata[0]["id"]
                }
                var returndata = save_visitor_event_payment(dataval)
                returndata.then(res => {
                    if (res !== undefined) {
                        if (res.data["error"] === undefined) {
                            this.setState({
                                event_booking_number: res.data["event_booking_number"],
                                page: this.state.page + 1,
                                user_already_join_this_event: true,
                                is_exhibitor: false,
                                totalattendees: parseInt(this.state.totalattendees, 10) + 1
                            })
                        }
                    }
                })
            }
            else {
                var data = get_stall_for_event_selection(this.props.eventdata[0]["id"])
                data.then(res => {
                    if (res.data["error"] === undefined) {
                        this.setState({
                            event_stall_data: res.data,
                            page: this.state.page + 1

                        })
                    }
                });
            }
        }
        else if (this.state.page === 2) {
            const dataval = {
                event_id: this.props.eventdata[0]["id"],
                stall_id: values.stall_id
            }
            var returndata1 = save_exhibitor_event_payment(dataval)
            returndata1.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({
                            event_booking_number: res.data["event_booking_number"],
                            stallname: res.data["stall_name"],
                            page: this.state.page + 1,
                            user_already_join_this_event: true,
                            is_exhibitor: true,
                            totalattendees: parseInt(this.state.totalattendees, 10) + 1
                        })
                    }
                }
            })
        }
    }
    checkuserexhibition = () => {
        this.setState({ redirecttousermanage: true })
    }
    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }
    skipPage = () => {
        this.setState({ page: this.state.page + 1 })
    }
    render() {
        let redirecttologinpage = null
        if (!this.state.isauthenticateduser) {
            redirecttologinpage = <Redirect to={`/`} />
        }
        let redirecttouser_manage = null
        if (this.state.redirecttousermanage) {
            let encoded = encodedstring(usermanagetabindex.exhibitions)
            redirecttouser_manage = <Redirect to={`/usermanage/${encoded}`} />
        }
        let exhibitorvisitor = null
        if (this.state.is_exhibitor !== undefined && this.state.is_exhibitor !== null) {
            if (this.state.is_exhibitor) {
                exhibitorvisitor = users_type.exhibitor
            }
            else {
                exhibitorvisitor = users_type.visitor
            }
        }
        let joinbuttonvisibleornot = null
        let tieupsdata = [];
        let livediv = null;

        if (this.state.profilepicdata !== null) {
            this.state.profilepicdata.map((item, i) => {
                if (item !== null) {
                    let detail = <React.Fragment key={shortid.generate()}>
                        <ProfilePic profilepic_url={item} type={ProfilepicType.avatar_40px} altname=""></ProfilePic>
                    </React.Fragment>
                    return (
                        tieupsdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
                    )
                }
            })
        }
        if (this.props.eventdata[0]["live_status"] === false) {
            if (this.props.eventdata[0]["registrationstatus"] === Registration_status.registrationopen) {
                if (!this.state.user_already_join_this_event) {
                    joinbuttonvisibleornot = <React.Fragment><div className={classshared.margin_r_m}>
                        <Button btntype={ButtonType.btn_blue_font_1_bold_text_14}
                            clicked={(event) => this.openmodalforvisitorhandler(event, true)}>
                            {ButtonText.booktickets}
                        </Button>
                    </div><div className={classshared.margin_r_m}>
                            <Button btntype={ButtonType.btn_btn_outline_blue}
                                clicked={(event) => this.openmodalforvisitorhandler(event, false)}>{ButtonText.bookastall}</Button></div>
                    </React.Fragment >
                }
                else {
                    if (exhibitorvisitor === users_type.visitor) {
                        joinbuttonvisibleornot = <React.Fragment><div className={classshared.margin_r_m}>
                            <Button btntype={ButtonType.btn_btn_outline_blue}
                                clicked={(event) => this.openmodalforvisitorhandler(event, false)}>{ButtonText.bookastall}</Button></div>
                        </React.Fragment >
                    }
                }
            }
            else {
                joinbuttonvisibleornot = <React.Fragment><div className={classshared.margin_r_m}>
                    <Button btntype={ButtonType.btn_blue_font_1_bold_text_14_disabled}>
                        {ButtonText.booktickets}
                    </Button>
                </div><div className={classshared.margin_r_m}>
                        <Button id="isdisabledtrue" btntype={ButtonType.btn_btn_outline_blue}>{ButtonText.bookastall}</Button></div>
                </React.Fragment >

            }
        }
        else {
            livediv =
                <div className={classshared.live_event_label}>
                    <i className={classshared.fontawesome_live_event.join(' ')}></i> {label_text.live}
                </div>
        }
        let location = this.props.eventdata[0]["country"] + ", " + this.props.eventdata[0]["city"]
        return (
            <React.Fragment>
                {redirecttouser_manage}
                {redirecttologinpage}
                <Modal open={this.state.cancelbooking} styles={customPopUp}
                    onClose={this.closecancelbooking} center showCloseIcon={false}>
                    <Eventbookingcancel
                        cancelbookinghandler={this.cancelbookinghandler}
                        event_id={this.props.eventdata[0]["id"]}
                        closemodal={this.closecancelbooking}>
                    </Eventbookingcancel>
                </Modal>
                <Modal open={this.state.openeventbookingwizard}
                    onClose={this.closemodalforvisitorhandler} center showCloseIcon={false} styles={customPopUp}>
                    <Eventbookingwizard
                        closemodal={this.closemodalforvisitorhandler}
                        previousPage={this.previousPage}
                        skipPage={this.skipPage}
                        nextPage={this.nextPage}
                        page={this.state.page}
                        isvisitor={this.state.isvisitor}
                        eventtitle={this.props.eventdata[0]["event_title"]}
                        event_id={this.props.eventdata[0]["id"]}
                        eventlocation={location}
                        totalexhibitors={this.state.totalexhibitors}
                        totalvisitors={this.state.totalvisitors}
                        eventdescription={this.props.eventdata[0]["event_description"]}
                        totalvisitorsexhibitors={this.state.profilepicdata}
                        eventimage={this.props.eventdata[0]["event_pic_url"]}
                        display_date={this.props.eventdata[0]["display_date"]}
                        event_time_duration={this.props.eventdata[0]["event_time_duration"]}
                        event_booking_number={this.state.event_booking_number}
                        event_stall_data={this.state.event_stall_data}
                        loggedinuser_name={this.props.name}
                        start_time={this.props.eventdata[0]["start_time"]}
                        stallname={this.state.stallname}>
                    </Eventbookingwizard>
                </Modal>

                <Modal open={this.state.openviewbooking}
                    onClose={this.closeviewbooking} center showCloseIcon={false} styles={customPopUp}>
                    <Visitoreventticketsummary
                        stallname={this.state.stallname}
                        checkuserexhibition={this.checkuserexhibition}
                        ischeckuserexhibition={true}
                        closemodal={this.closeviewbooking}
                        eventtitle={this.props.eventdata[0]["event_title"]}
                        event_id={this.props.eventdata[0]["id"]}
                        eventlocation={location}
                        totalexhibitors={this.state.totalexhibitors}
                        totalvisitors={this.state.totalvisitors}
                        eventdescription={this.props.eventdata[0]["event_description"]}
                        totalvisitorsexhibitors={this.state.profilepicdata}
                        eventimage={this.props.eventdata[0]["event_pic_url"]}
                        display_date={this.props.eventdata[0]["display_date"]}
                        event_time_duration={this.props.eventdata[0]["event_time_duration"]}
                        event_booking_number={this.state.event_booking_number}
                        loggedinuser_name={this.props.name}
                        start_time={this.props.eventdata[0]["start_time"]}
                    >
                    </Visitoreventticketsummary>
                </Modal>

                <div className={classshared.main__hero} id="top" style={{ backgroundImage: `url(${this.props.eventdata[0]["cover_pic_url"]})` }}>
                    <div className={classshared.main__hero_content.join(' ')}>
                        <div className={classshared.flex}>
                            <h1 className={classshared.rightheadertext.join(' ')}>{this.props.eventdata[0]["event_title"]}</h1>
                            {livediv}</div>
                        <div className={classshared.main__subtitles}>
                            <div className={classshared.dot_after_text_14.join(' ')}>
                                <i className={classshared.fontawesome_calendar_alt.join(' ')}></i>
                                <span> {this.props.eventdata[0]["display_date"]}</span>
                            </div>
                            <div className={classshared.dot_after_text_14.join(' ')}>
                                <i className={classshared.fontawesome_globe.join(' ')}></i>
                                <span> {this.props.eventdata[0]["edition"]} Edition</span></div>

                            <div className={classshared.text_14_text_dark.join(' ')}>
                                <i className={classshared.fontawesome_desktop.join(' ')}></i>
                                <span> Online Expo</span></div>
                        </div>
                        <div className={classshared.main__subtitles}>
                            <div className={classshared.descriptiontext.join(' ')}>
                                {this.props.eventdata[0]["event_description"]}
                            </div>
                        </div>

                        <div className={classshared.main__hero_tieups}>
                            <div className={classshared.main__hero_tieups_left}>
                                {tieupsdata}
                            </div>
                            <div className={classshared.main__hero_tieups_right}>
                                <span className={classshared.font_1_bold_text_14_text_dark.join(' ')}>{this.state.totalattendees}</span>
                                <div className={classshared.font_1_medium_text_12_text_normal.join(' ')}>Attendees</div>
                            </div>
                        </div>
                        <div className={classshared.main__buttons}>{joinbuttonvisibleornot}
                            {
                                exhibitorvisitor !== null ?
                                    (

                                        <div className={classshared.dropdown}>
                                            <Button btntype={ButtonType.btn_green_flex}>Joined as {exhibitorvisitor} <i className={classshared.fontawesome_angle_down.join(' ')}></i></Button>
                                            <div className={classshared.dropdown_content}>
                                                <a href="#" onClick={this.openviewbooking}>View Booking</a>
                                                <a href="#" onClick={this.opencancelbooking}>Cancel Booking</a>
                                            </div>
                                        </div>
                                    ) :
                                    null
                            }
                        </div>
                        {

                            this.props.eventdata[0]["registrationstatus"] === Registration_status.registrationclosed ?
                                (<div className={classshared.margin_top_m}>
                                    <span>Registration closed for this event.</span>
                                </div>) : null
                        }
                    </div>
                </div>
                <Tabitems loggedin_user_id={this.props.loggedin_user_id}
                    tabindex={this.state.tabindex}
                    onChange={this.onChange}
                    event_introduction={this.props.eventdata[0]["event_introduction"]}
                    event_visitor_profile={this.props.eventdata[0]["event_visitor_profile"]}
                    event_exhibitor_profile={this.props.eventdata[0]["event_exhibitor_profile"]}
                    eventlivestatus={this.props.eventdata[0]["live_status"]}
                    event_id={this.props.eventdata[0]["id"]}
                    withoutloggedin={this.props.withoutloggedin}></Tabitems>
            </React.Fragment>
        )
    }
}
export default aboutme;