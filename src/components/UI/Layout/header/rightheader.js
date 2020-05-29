import React, { Component } from 'react';
import * as classshared from './classconst';
import Profilepic from '../../profilepic/profilepic';
import {
    ProfilepicType, searchplaceholder, searchpagetype, ButtonText
    , encodedstring
    , callacceptrejectstatus, socketendpoint, customPopUp, ReactGoogleAnalytics, GTM_ID
} from '../../../../shared/utility';
import Search from '../../search/search';
import { NavLink } from 'react-router-dom';
import Notification from '../../../streamline/notifications';
import Notificationmessages from '../../../streamline/notificationsmessages';
import Modal from "react-responsive-modal";
import Usercallpopupsender from '../../../usercallpopup/usercallpopupsender';
import shortid from "shortid";
import socketIOClient from "socket.io-client";
import socket from '../../../../actions/socket';
import dateFns from "date-fns";
import moment from 'moment'
import defaultimage from '../../../../assets/images/default_avatar.png';
import { withStyles } from '@material-ui/styles';
import { size1of1 } from '../../../commoncss/classconst';
import GoogleTagManager from '../../../../shared/GoogleTagManager' 

const styles = {
    homeMobile: {
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'flex',
            fontSize: '24px',
        }
    },
}


class rightheader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            opencallpopup: false,
            calleruseredetail: null,
            client: socket(),
            notified_user_id: null,
            callerprofilepic: null,
            callername: null,
            calleruserid: null,
            receiverprofilepic: null,
            receivername: null,
            receiverdesignation: null,
            showvideocallstream: false,
            buttonresponse: false,
            starttime: null,
            end_time: null
        }
        this.onUnload = this.onUnload.bind(this);
    }
    showMenu = (event) => {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenu = (event) => {
        event.preventDefault();
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }
    closepopup = () => {
        this.setState({ opencallpopup: false });
        this.state.client.end_call_by_publisher_subscriber();

    }
    acceptrejectcall = (event) => {
        event.preventDefault();
        var CurrentDate = moment();
        let start_time = dateFns.getTime(dateFns.format(CurrentDate));
        let displaytime = dateFns.format(start_time, 'H:mm')//24 Hours display   
        //alert(displaytime)
        this.setState({ showvideocallstream: true, buttonresponse: true, starttime: displaytime })
        this.state.client.call_response_from_subscriber(displaytime)
    }
    onUnload(event) {
        //event.returnValue = `Are you sure you want to leave?`;
        event.preventDefault();
        let is_remember_me = localStorage.getItem('is_remember_me')
        if (JSON.parse(is_remember_me) === false) {
            const confirmationMessage = '';
            //event.returnValue = confirmationMessage;
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userId');
            localStorage.removeItem('email_confirmed');
            localStorage.removeItem('visitorphonenumber');
            localStorage.removeItem('isverifyphonenumber');
            localStorage.removeItem('profile_pic');
            localStorage.removeItem('iseditmode_profile');
            localStorage.removeItem('first_name');
            localStorage.removeItem('last_name');
            localStorage.removeItem('current_step');
            localStorage.removeItem('is_exhibitor');
            localStorage.removeItem('wingname');
            localStorage.removeItem('currency_name');
            localStorage.removeItem('usertypename');
            localStorage.removeItem('exhibitordata');
            localStorage.removeItem('wing_id');
            localStorage.removeItem('email');
            localStorage.removeItem('phone_number');
            localStorage.removeItem('name');
            localStorage.removeItem('wing_pic_url');
            localStorage.removeItem('user_wing_id')
            //return confirmationMessage;
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.closeMenu);
        window.removeEventListener("beforeunload", this.onUnload)
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.off("show_call_request_from_publisher");
        socket.off("show_end_call_by_publisher");
        socket.off("show_end_call_by_publisher_subscriber");
    }
    componentDidMount() {
        ReactGoogleAnalytics()
        window.addEventListener('beforeunload', this.onUnload);
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.on('show_call_request_from_publisher', (data) => {
            if (data.receiveruserid === this.props.loggedin_user_id) {
                this.setState({
                    notified_user_id: data.notified_user_id,
                    callerprofilepic: data.callerprofilepic,
                    callername: data.callername,
                    calleruserid: data.calleruserid,
                    callerdesignation: data.callerdesignation,
                    receiverprofilepic: data.receiverprofilepic,
                    receivername: data.receivername,
                    receiverdesignation: data.receiverdesignation,
                    opentok_token: data.opentok_token,
                    opentok_sessionid: data.opentok_sessionid,
                    opencallpopup: true
                })
            }
        })
        socket.on('show_end_call_by_publisher', (end_time) => {
            this.setState({
                showvideocallstream: false,
                end_time: end_time,
                opencallpopup: false
            })
        })
        socket.on('show_end_call_by_publisher_subscriber', () => {
            this.setState({
                opencallpopup: false
            })
        })
    }
    render() {        
        const { classes } = this.props;
        let default_image = defaultimage
        if (this.props.profilepic_url !== null && this.props.profilepic_url !== undefined) {
            default_image = this.props.profilepic_url;
        }
        let detail_wing = null
        if (this.props.user_wing_id !== undefined && this.props.user_wing_id !== null && this.props.user_wing_id !== "") {
            let wingtitle = localStorage.getItem('wingname')
            let wing_id = this.props.user_wing_id
            let wing_pic_url = localStorage.getItem('wing_pic_url')
            let encoded = encodedstring(wing_id)
            detail_wing =
                <div className={classshared.subMenuItem_flex.join(' ')}>
                    <Profilepic profilepic_url={wing_pic_url} type={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m} altname=""></Profilepic>
                    <NavLink className={classshared.text_transform_c.join(' ')} to={`/userwings/${encoded}`}>{wingtitle}</NavLink>
                    
                </div>
        }
        let exhibitordiv = [];
        let data1 = [];
        data1 = JSON.parse(localStorage.getItem('exhibitordata'))
        if (data1 !== null) {
            if (data1.length > 0) {
                data1.map((item, i) => {
                    let detail =
                        <div className={classshared.subMenuItem_flex.join(' ')}>
                            <Profilepic profilepic_url={item.company_logo_url} type={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m} altname=""></Profilepic>
                            <NavLink to={`/exhibitorprofile`}>{item.name}</NavLink>
                            
                        </div>
                    return (
                        exhibitordiv.push(
                            <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                        )
                    )
                })
            }
        }
        return (
            <React.Fragment>
           
                <Modal open={this.state.opencallpopup} styles={customPopUp}
                    onClose={this.closepopup} center showCloseIcon={false}>
                    <Usercallpopupsender
                        isreciver={true}
                        callerprofilepic={this.state.callerprofilepic}
                        callername={this.state.callername}
                        calleruserid={this.state.calleruserid}
                        callerdesignation={this.state.callerdesignation}
                        closemodal={this.closepopup}
                        imagetype={ProfilepicType.user_nav__user_photo_small}
                        acceptcall={(event) => { this.acceptrejectcall(event, callacceptrejectstatus.accept) }}
                        rejectcall={(event) => { this.acceptrejectcall(event, callacceptrejectstatus.reject) }}
                        opentok_token={this.state.opentok_token}
                        opentok_sessionid={this.state.opentok_sessionid}
                        showvideocallstream={this.state.showvideocallstream}
                        buttonresponse={this.state.buttonresponse}
                        starttime={this.state.starttime}
                        endtime={this.state.end_time}>
                    </Usercallpopupsender>
                </Modal>
                <div className={classshared.right_header_col_1}>
                    <Search placeholder={searchplaceholder.headersearch} pagetype={searchpagetype.header}></Search>
                    <div className={classshared.user_tabs.join(' ')}>
                        <div className={classshared.user_nav}>
                            <div className={classshared.user_nav__icon_box}>
                                <i className={classshared.fontawesome_home.join(' ')}></i>
                                <div className={classshared.margin_r_sm}></div>
                                {/* <NavLink
                                    className={classshared.font_1_medium_text_dark_text_12.join(' ')}
                                    to={`/home`}>{ButtonText.home}</NavLink> */}
                                <NavLink className={classshared.font_1_medium_text_14_text_dark.join(' ')} to='/expohome'>{ButtonText.home}</NavLink>
                            </div>
                        </div>
                        <div className={classshared.user_nav}>
                            <div className={classshared.user_nav__icon_box}>
                                <i className={classshared.fontawesome_manage.join(' ')}></i>
                                <div className={classshared.margin_r_sm}></div>
                                <NavLink
                                    className={classshared.font_1_medium_text_14_text_dark.join(' ')}
                                    to={`/usermanage`}>{ButtonText.manage}</NavLink>                                
                            </div>
                        </div>
                        <div className={classshared.user_nav}>
                            <div className={classshared.user_nav__icon_box}>
                                <i className={classshared.fontawesome_task.join(' ')}></i>
                                <div className={classshared.margin_r_sm}></div>
                                {/* <NavLink
                                    className={classshared.font_1_medium_text_dark_text_12.join(' ')}
                                    to={`/curate`}>{ButtonText.curate}</NavLink> */}
                                <NavLink className={classshared.font_1_medium_text_14_text_dark.join(' ')} to='/comingsoon'>{ButtonText.curate}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classshared.user_nav}>
                    {/* <Notificationmessages
                        loggedin_user_id={this.props.loggedin_user_id}
                    >
                    </Notificationmessages> */}
                    {/* <div className={classshared.user_nav__icon_box}>
                        <i className={classshared.fontawesome_envelope.join(' ')}></i>
                       
                    </div> */}
                    {/* <div className={classshared.user_nav__icon_box}>
                        <i className={classshared.fontawesome_bell.join(' ')}></i>
                        
                    </div> */}
                    <div className={classes.homeMobile}>
                        <NavLink to='/expohome'><i className={classshared.fontawesome_home.join(' ')}></i></NavLink>
                    </div>
                    <div className={classes.homeMobile}>
                        <NavLink to='/mobilesearch'><i className={classshared.fontawesome_search.join(' ')}></i></NavLink>
                    </div>
                    <Notification
                        loggedin_user_id={this.props.loggedin_user_id}
                    >
                    </Notification>
                    <div className={classshared.dropdown} >
                        <div className={classshared.user_nav__dropdown} onClick={this.showMenu.bind(this)}>
                            <div className={classshared.user_nav__user} >
                                <Profilepic profilepic_url={default_image} type={ProfilepicType.user_nav__user_photo_xsmall} altname={this.props.first_name} ></Profilepic>
                                <span className={classshared.user_nav__user_name.join(' ')}>{this.props.first_name}</span>
                                <div className={classshared.margin_l_sm}></div><i className={classshared.fontawesome_angledown.join(' ')}></i>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    this.state.showMenu
                        ? (
                            <div className={classshared.list_dropdown_contentheader.join(' ')} id="myDropdown__profile">
                                {/* {/* <NavLink
                                            className={classshared.subMenuItem.join(' ')}
                                            to={`/home`}>{ButtonText.myprofile}</NavLink> */}                               
                                {/* {
                                            detail_wing !== null ?
                                                (
                                                    <React.Fragment>
                                                        <div className={classshared.line_seperator}></div>
                                                        <div className={classshared.menuItem.join(' ')}>Your Wings:</div>
                                                        {detail_wing}</React.Fragment>
                                                ) : null
                                        }
                                        {
                                            this.props.is_exhibitor && exhibitordiv.length > 0
                                                ?
                                                (
                                                    <React.Fragment>
                                                        <div className={classshared.line_seperator}></div>
                                                        <div className={classshared.menuItem.join(' ')}>Exhibitor Page:</div>
                                                        {exhibitordiv}
                                                    </React.Fragment>
                                                )
                                                :
                                                null
                                        }
                                        <div className={classshared.line_seperator}></div> */}                               
                                <NavLink
                                    className={classshared.subMenuItem.join(' ')}
                                    to={`/usermanage`}>{ButtonText.manage}</NavLink>
                                
                                <NavLink
                                    className={classshared.subMenuItem.join(' ')}
                                    to={`/settings`}>{ButtonText.settings}</NavLink>
                               

                                <div className={classshared.line_seperator}></div>
                                <NavLink
                                    className={classshared.subMenuItem.join(' ')}
                                    to={`/logout`}>{ButtonText.logout}</NavLink>
                            </div>
                        )
                        :
                        (
                            null
                        )
                }
                 <GoogleTagManager gtmId={GTM_ID} />
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(rightheader);