import React, { Component } from 'react';
import * as classshared from './classconst';
import { getusernotifications, response_tieups_request } from '../../actions/streamlines/dataactions';
import { titleheading, label_text, ButtonType, ProfilepicType, socketendpoint, Notification_Type, wingster_wing_status, encodedstring } from '../../shared/utility'
import Likesnotifications from './likesnotifications';
import Button from '../UI/Button/Button';
import socketIOClient from "socket.io-client";
import socket from '../../actions/socket';
import { userfollowsave } from '../../actions/userprofilesetup/dataactions';
import reactStringReplace from 'react-string-replace';
import { NavLink } from 'react-router-dom';
import shortid from "shortid";
import isMobile from '../../shared/isMobile';
import { Redirect } from 'react-router-dom';

class notifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalnotification_count: 0,
            notification_data: null,
            shownotificationmenu: false,
            mainclass: [classshared.user_nav__icon_box],
            client: socket(),
            redirecttoshowallnotifications:false
        }
        this.handleResize = this.handleResize.bind(this);
    }
    shownotificationmenu = (event) => {
        event.preventDefault();
        this.setState({ shownotificationmenu: true, mainclass: classshared.user_nav__icon_box_selected }, () => {
            document.addEventListener('click', this.closenotificationmenu);
            this.handleResize();
        });
        this.setState({ totalnotification_count: 0 })

    }
    closenotificationmenu = (event) => {
        event.preventDefault();
        this.setState({ shownotificationmenu: false, mainclass: classshared.user_nav__icon_box }, () => {
            document.removeEventListener('click', this.closenotificationmenu);
        });
    }
    filldata() {
        var data = getusernotifications()
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined && res.data !== "") {
                    this.setState({ notification_data: res.data, totalnotification_count: res.data.length });
                }
            }
        });
    }
    viewallnotificationshandler = () => {
        this.setState({
            redirecttoshowallnotifications: true
        })
    }
    handleResize() {               
        if (isMobile.any() !== null) {
            var screenwidth = window.innerWidth;
            let iconleft = document.getElementById("notificationicon").offsetLeft
            if (document.getElementById("notificationpopup")) {
                document.getElementById("notificationpopup").style.width = screenwidth + "px";
                document.getElementById("notificationpopup").style.left = "-" + iconleft + "px";
            }
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.filldata()
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.on('user_show_notification', (data) => {
            this.notificationdata(data)
        })
        socket.on('user_show_notification_follow', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_user_feeds_likes', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_user_feeds_comments', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_user_tieups_request_send', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_user_tieups_request_response', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_join_wing_request_send', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_join_wing_request_response', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_wing_feed_post_save', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_wing_lead_post_win_by_poster_id', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_wing_lead_post_lose_by_poster_id', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_wing_lead_post_refused_by_poster_id', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_wing_lead_post_accept_by_curator_id', (data) => {
            this.notificationdata(data)
        })
        socket.on('show_wing_lead_post_reject_by_curator_id', (data) => {
            this.notificationdata(data)
        })
    }
    componentWillUnmount() {
        //const socket = socketIOClient();
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.off("user_show_notification");
        socket.off("user_show_notification_follow")
        socket.off("show_user_feeds_likes")
        socket.off("show_user_feeds_comments")
        socket.off("show_user_tieups_request_send")
        socket.off("show_user_tieups_request_response")
        socket.off("show_join_wing_request_send")
        socket.off("show_join_wing_request_response")
        socket.off("show_wing_feed_post_save")
        socket.off("show_wing_lead_post_win_by_poster_id")
        socket.off("show_wing_lead_post_lose_by_poster_id")
        socket.off("show_wing_lead_post_refused_by_poster_id")
        socket.off("show_wing_lead_post_accept_by_curator_id")
        socket.off("show_wing_lead_post_reject_by_curator_id")
    }
    get_proper_list(data) {
        let finaldata = [];
        if (data.length !== undefined && data.length > 0) {
            finaldata = data
        }
        else {
            let listdata = [];
            listdata.push(data);
            finaldata = listdata
        }
        return finaldata;
    }
    notificationdata(data) {
        let final_data = [];
        if (data !== null && data !== undefined) {
            let finaldata = []
            finaldata = this.get_proper_list(data)
            let selecteddata = finaldata.find(i => i.notified_user_id === this.props.loggedin_user_id);
            let selected_data = []
            if (selecteddata !== undefined) {
                selected_data = this.get_proper_list(data)
                if (this.state.notification_data !== null) {
                    final_data = selected_data.concat(this.state.notification_data)
                }
                else {
                    //final_data.push(selecteddata);
                    final_data = selected_data
                }
                this.setState({ notification_data: final_data, totalnotification_count: parseInt(this.state.totalnotification_count, 10) + 1 })
            }
        }
    }
    acceptrejecttieupsrequest = (event, primaryid, status, itemid) => {
        event.preventDefault();
        const dataval = {
            id: primaryid,
            status: status,
            notificationid: itemid
        };
        var returndata = response_tieups_request(dataval)
        returndata.then(res => {
            if (res.data["error"] === undefined) {
                let filterdata = this.state.notification_data.filter((post) => {
                    return itemid !== post.id;
                });
                if (status === wingster_wing_status.accepted) {
                    this.state.client.user_tieups_request_response(res.data);
                }
                this.setState(state => {
                    state.notification_data = filterdata;
                    return state;
                });
            }
        })
    }
    followuserhandler = (event, notified_user_id, itemid) => {
        event.preventDefault()
        const data = {
            follower_user_id: notified_user_id
        };
        var listdata = userfollowsave(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.state.client.user_follow(res.data);
                    let filterdata = this.state.notification_data.filter((post) => {
                        return itemid !== post.id;
                    });
                    this.setState(state => {
                        state.notification_data = filterdata;
                        return state;
                    });
                }
            }
        });
    }
    render() {
        let renderallnotificationpage = null;
        if (this.state.redirecttoshowallnotifications) {            
            renderallnotificationpage = <Redirect to={`/notifications`} />
        }
        let shownotificationcoundiv = null;
        if (this.state.totalnotification_count > 0) {
            shownotificationcoundiv = <span className={classshared.user_nav__notification}>{this.state.totalnotification_count}</span>
        }
        let nonotification = <React.Fragment>
            <li className={classshared.notification_item.join(' ')}>
                <div className={classshared.flex}>
                    <div className={classshared.streamline__card_left.join(' ')}>
                    </div>
                    <div className={classshared.streamline__card_right.join(' ')}>
                        <div className={classshared.streamline__card_header.join(' ')}>
                            <div className={classshared.streamline__card_header_name}>
                                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>You have no new notifications</span>
                            </div>

                        </div>
                    </div>
                </div>
            </li>
        </React.Fragment>


        let listdata = [];
        listdata = this.state.notification_data;
        let finaldatalist = [];
        let notificationlist = [];
        if (listdata !== null && listdata !== undefined) {
            let detail = null;
            if (listdata.length > 0) {
                listdata.map((item, i) => {
                    let postheader = item.post_header
                    if (item.initiator_lead_wingster_user_id !== null && item.initiator_lead_wingster_user_id !== undefined) {
                        let userid = encodedstring(item.initiator_lead_wingster_user_id)
                        postheader = postheader.replace('your', item.initiatorwingstername + "'s")
                        postheader = reactStringReplace(postheader, item.initiatorwingstername + "'s", (match, i) => (
                            <NavLink
                                key={shortid.generate()}
                                id="bluelink"
                                className={classshared.anchorremoveline.join(' ')}
                                to={`/home/${userid}`}>{match}</NavLink>
                        ));
                    }
                    detail =
                        <Likesnotifications
                            poster_user_id={item.user_id}
                            key={item.id}
                            is_read_notification={item.is_notification_read}
                            activityverbid={item.id}
                            profile_pic_url={item.profile_pic_url}
                            ProfilepicType={ProfilepicType.user_nav__user_photo_small}
                            userpostername={item.first_name}
                            notification_messages={postheader}
                            posttime={item.postdatetime}
                            notification_type={item.notification_type}
                            is_request_or_response={item.is_request_or_response}
                            is_follow={item.is_follow}
                            deletetiupesrequest={(event) => this.acceptrejecttieupsrequest(event, item.table_primary_id, wingster_wing_status.rejected, item.id)}
                            accepttieupsrequest={(event) => this.acceptrejecttieupsrequest(event, item.table_primary_id, wingster_wing_status.accepted, item.id)}
                            followuserhandler={(event) => this.followuserhandler(event, item.user_id, item.id)}>
                        </Likesnotifications>
                    if (item.notification_type.toString().toLowerCase() === Notification_Type.Tieups.toString().toLowerCase() && item.is_request_or_response === true) {
                        return (
                            notificationlist.push(
                                <React.Fragment>{detail}</React.Fragment>
                            )
                        )
                    }
                    else {
                        return (
                            finaldatalist.push(
                                <React.Fragment>{detail}</React.Fragment>
                            )
                        )
                    }
                });
            }

        }
        else {
            finaldatalist.push(<React.Fragment>{nonotification}</React.Fragment>)
        }

        return (
            <React.Fragment>
                {renderallnotificationpage}
                <div className={this.state.mainclass} onClick={this.shownotificationmenu.bind(this)} id="notificationicon">
                    <i className={classshared.fontawesome_bell.join(' ')} ></i>
                    {shownotificationcoundiv}
                    {
                        this.state.shownotificationmenu
                            ? (
                                <div className={classshared.nav_item_notifications_dropdown.join(' ')} id="notificationpopup">
                                    <div className={classshared.dropdown_notification_title.join(' ')}>{titleheading.notification}</div>
                                    <ul className={classshared.notification_list}>
                                        {finaldatalist}
                                        {
                                            notificationlist.length > 0 ?
                                                (
                                                    <React.Fragment>
                                                        <div className={classshared.dropdown_notification_title_tieups.join(' ')}>Tieups Request:</div>
                                                        <div className={classshared.line_seperator}></div>
                                                        {notificationlist}</React.Fragment>
                                                ) :
                                                null
                                        }
                                    </ul>
                                    <Button btntype={ButtonType.btnshowallnotifications} clicked={this.viewallnotificationshandler}>{label_text.viewallnotificatin}</Button>
                                </div>
                            ) : (null)
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default notifications;