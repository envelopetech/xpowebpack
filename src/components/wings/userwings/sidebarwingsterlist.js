import React, { Component } from 'react';
//import LazyLoad from 'react-lazyload';
import * as classshared from '../../commoncss/classconst';
import Icon from '../../UI/Icon/Icon';
import { ICONS, ProfilepicType, schedule_call_type, users_type, customPopUp } from '../../../shared/utility';
import Profilepic from '../../UI/profilepic/profilepic';
import Modal from "react-responsive-modal";
import Schedulecallwizard from '../../usermanage/leftbar/userschedule/schedulecallwizard';
import dateFns from "date-fns";
import { save_user_schedule } from '../../../actions/userscheduler/dataactions'
import moment from 'moment'


class sidebarwingsterlist extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            is_open_schedule_call: false,
            call_type: null,
            wingstername: null,
            user_id: null,
            wingsterprofilepic: null,
            page: 1,
            finalcallschedulestring: null,
            call_start_time: null,
            scheduled_date: null
        }
    }
    openschedulecallhandler = (event, calltype, name, user_id, profile_pic_url) => {
        event.preventDefault();
        this.setState({ is_open_schedule_call: true, call_type: calltype, wingstername: name, user_id: user_id, wingsterprofilepic: profile_pic_url });
    }
    closeschedulecallhandler = () => {
        this.setState({ is_open_schedule_call: false });
    }
    dayclickhandler = (event) => {
        let children = event.target.childNodes;
        let data = children[0].id
        if (data.includes("##")) {
            let arrayobj = data.split('##')
            let timeslot = arrayobj[0]
            let date = arrayobj[1]
            let day = arrayobj[2]
            let datename = dateFns.format(date, 'DD')
            let monthyearname = dateFns.format(date, 'MMMM YYYY')
            let finalcallschedulestring = "On " + day + ", " + datename + "th " + monthyearname + " at " + timeslot + " (IST)";
            this.setState({ finalcallschedulestring: finalcallschedulestring, page: this.state.page + 1, call_start_time: timeslot, scheduled_date: date })
        }
    }
    nextPage(values) {
        if (this.state.page === 1) {
            this.setState({
                page: this.state.page + 1
            })
        }
        else if (this.state.page === 2) {
            this.setState({
                page: this.state.page + 1
            })
        }

        else {
            let time = this.state.call_start_time
            let start_time = dateFns.getTime(dateFns.format(moment(time, 'h:mm')));
            let endtime = dateFns.addMinutes(start_time, 15).getTime()
            let displaystarttime = dateFns.format(start_time, 'H:mm')
            let displayendtime = dateFns.format(endtime, 'H:mm')
            const dataval = {
                call_type: this.state.call_type,
                call_start_time: displaystarttime,
                call_end_time: displayendtime,
                scheduled_date: this.state.scheduled_date,
                is_call_confirm: true,
                schedule_user_id: this.state.user_id
            }
            var data = save_user_schedule(dataval)
            data.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({ is_open_schedule_call: false, page: 1 });
                    }
                }
            })
        }
    }
    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }
    skipPage = () => {
        this.setState({ page: this.state.page + 1 })
    }
    render() {        
        let wingsterdata = [];        
        if (this.props.wings_users !== null) {
            if (this.props.wings_users.length > 0) {
                this.props.wings_users.map((item, i) => {
                    let detail =                        
                        <div className={classshared.sidebar__user_chat_border_all.join(' ')}>
                            <div className={classshared.sidebar__user_details_left_without_flex}>
                                <div className={classshared.flex_padding_all_sm.join(' ')}>
                                    <div className={classshared.user_nav__icon_box}>
                                        <Profilepic type={ProfilepicType.user_nav__user_photo_small} profilepic_url={item.profile_pic_url}></Profilepic>
                                        <span className={classshared.user_nav__notification_2}></span>
                                    </div>
                                    <div className={classshared.margin_l_sm}>
                                        <div className={classshared.flex__column.join(' ')}>
                                            <div className={classshared.font_2_bold_text_dark.join(' ')}>{item.name}</div>
                                            <div className={classshared.font_2_regular_text_12_text_dark.join(' ')}>{item.work_as}</div>
                                            <div className={classshared.font_2_regular_text_12_text_dark.join(' ')}>{item.location}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* {
                                    this.props.usertypename === users_type.visitor ?
                                        ( */}
                                <div className={classshared.suggestion_card__unit_stats.join(' ')}>
                                    <div className={classshared.size1of3_unit_stats.join(' ')}
                                        onClick={(event) => { this.openschedulecallhandler(event, schedule_call_type.audio, item.name, item.user_id, item.profile_pic_url); }}>
                                        <i className={classshared.fontawesome_phone.join(' ')}></i>
                                    </div>
                                    <div className={classshared.size1of3_unit_stats.join(' ')}
                                        onClick={(event) => { this.openschedulecallhandler(event, schedule_call_type.video, item.name, item.user_id, item.profile_pic_url); }}>
                                         <i className={classshared.fontawesome_video.join(' ')}></i>
                                    </div>
                                    <div className={classshared.size1of3_unit_stats_without_border.join(' ')}
                                        onClick={(event) => { this.openschedulecallhandler(event, schedule_call_type.chat, item.name, item.user_id, item.profile_pic_url); }}>
                                        <i className={classshared.fontawesome_comments.join(' ')}></i>
                                    </div>
                                </div>
                                {/* ) :
                                        (
                                            <div className={classshared.suggestion_card__unit_stats.join(' ')}>
                                                <div className={classshared.size1of3_unit_stats.join(' ')}>
                                                    <Icon svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')} icon={ICONS.PHONE_HANDSET}></Icon>
                                                </div>
                                                <div className={classshared.size1of3_unit_stats.join(' ')}>
                                                    <Videocamera svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')}></Videocamera>
                                                </div>
                                                <div className={classshared.size1of3_unit_stats_without_border.join(' ')}>
                                                    <Icon svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')} icon={ICONS.BUBBLE}></Icon>
                                                </div>
                                            </div>
                                        )
                                } */}
                            </div>
                        </div>
                    // </LazyLoad>
                    return (
                        wingsterdata.push(
                            <React.Fragment key={item.id}>{detail}</React.Fragment>
                        )
                    )
                });
            }
        }
        let divblurclass = null
        if ((this.props.usertypename === users_type.visitor || this.props.usertypename === users_type.wingster) && !this.props.is_member) {
            divblurclass = classshared.blurdiv
        }
        return (
            <React.Fragment>
                <div className={divblurclass}>
                    <Modal open={this.state.is_open_schedule_call} styles={customPopUp}
                        onClose={this.closeschedulecallhandler} center showCloseIcon={false}>
                        <Schedulecallwizard
                            closemodal={this.closeschedulecallhandler}
                            name={this.state.wingstername}
                            user_id={this.state.user_id}
                            call_type={this.state.call_type}
                            wingsterprofilepic={this.state.wingsterprofilepic}
                            previousPage={this.previousPage}
                            skipPage={this.skipPage}
                            nextPage={this.nextPage}
                            page={this.state.page}
                            dayclickhandler={this.dayclickhandler}
                            loggedin_user_id={this.props.loggedin_user_id}
                            finalcallschedulestring={this.state.finalcallschedulestring}>
                        </Schedulecallwizard>
                    </Modal>
                    <div className={classshared.sidebar__user_stats_wrapper}>
                        <div className={classshared.title}>
                            <div className={classshared.icon_wrapper}>
                                <Icon svgclass={classshared.icon_20_icon_dark.join(' ')} icon={ICONS.CHAT}></Icon>
                            </div>
                            <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>{this.props.chatheader}</div>
                        </div>
                        <div id="wingfilters" className={classshared.line}></div>
                        <div className={classshared.sidebarlazyloadingscroll.join(' ')} id="wingsidebarchat">{wingsterdata}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default sidebarwingsterlist;