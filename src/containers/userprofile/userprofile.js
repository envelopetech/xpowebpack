import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ProfilepicType, titleheading, FilestackType, ButtonText, filestackoptionimage, decodedstring, profiletabindex } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import AboutMe from '../../components/Userpersonalprofile/aboutme/aboutme';
import SidebarPic from '../../components/UI/Layout/sidebarimage/sidebar';
import * as actions from '../../store/actions/index';
import defaultprofileimage from '../../assets/images/default_avatar.png';
import defaultimage from '../../assets/images/universe-has-your-back-Levnow-wallpaper.png';
import { getuserprofile1data, userfollowsave, userunfollowsave } from '../../actions/userprofilesetup/dataactions';
import Workhistory from '../../components/Userpersonalprofile/workeducationhistory/workhistory';
import EducationDetail from '../../components/Userpersonalprofile/workeducationhistory/educationdetail';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import Tabitems from '../../components/Userpersonalprofile/userprofiletabs/tabitems';
import UserBusinessStatus from '../../components/Userpersonalprofile/userbusinessstatus/userbusinessstatus';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import socket from '../../actions/socket';

import MediaQuery from 'react-responsive'

const initialState = {
    is_editmode: false,
    cover_image_url: defaultimage,
    profile_pic_url: defaultprofileimage,
    name: null,
    designation: null,
    location: "",
    about_me: "",
    companyname: "",
    alonedesignation: "",
    is_currentuser: true,
    otheruserid: null,
    //tabindex: null,
    fromparent: false,
    btnfollow_text: null,
    tieupsdata: null,
    totaltieupes: null,
    totalbusinessreceived: null,
    totalbusinessgiven: null,
    largestdealsize: null,
    loading: true,
    is_tieups: true,
    tabindex: profiletabindex.streamline,
    joining_date: null,
    client: socket()
}
class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    reset() {
        this.setState(initialState);
    }
    editprofileclickhandler = () => {
        this.setState({ is_editmode: true });
    }
    reseteditprofileclickhandler = () => {
        this.setState({ is_editmode: false });

    }
    onChange = (activeKey) => {
        this.setState({
            tabindex: activeKey
        });
    }
    onSuccessImageupload = (result) => {
        const data = {
            profile_pic_url: result.filesUploaded[0]["url"]
        };
        localStorage.setItem('profile_pic', result.filesUploaded[0]["url"])
        this.props.onuserprofileimagesaveupdate(data);
        this.setState({ profile_pic_url: result.filesUploaded[0]["url"] })
    };
    geturlparams() {
        let userid = null;
        if (this.props.match.params.id !== undefined) {
            // let encoded = this.props.match.params.id;
            // let bytes = base64.decode(encoded);
            // userid = utf8.decode(bytes);   
            userid = decodedstring(this.props.match.params.id)
            this.setState({ is_currentuser: false })
        }
        return userid;
    }
    componentWillReceiveProps(nextProps) {
        var data = null
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.reset();
            const id = nextProps.match.params.id
            if (id !== undefined) {
                this.setState({ loading: true })
                // let bytes = base64.decode(id);
                // let userid = utf8.decode(bytes);  
                let userid = decodedstring(id)
                this.setState({ otheruserid: userid })
                data = getuserprofile1data(userid)
            }
            else {
                data = getuserprofile1data(null)
            }
            data.then(res => {
                if (res !== undefined) {
                    this.filldata(res.data)
                }
            });
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        let otheruserid = this.geturlparams()
        this.setState({ otheruserid: otheruserid })
        var data = getuserprofile1data(otheruserid)
        data.then(res => {
            if (res !== undefined) {
                this.filldata(res.data)
            }
        });
    }
    filldata(data) {
        let usertieups = null
        let totaltieups = 0
        if (data["user_tieups"] !== undefined) {
            usertieups = data["user_tieups"][0]
            totaltieups = data["user_tieups"][1]
        }
        this.setState({
            cover_image_url: data["cover_pic_url"] === null ? defaultimage : data["cover_pic_url"]
            , profile_pic_url: data["profile_pic_url"] === null ? defaultprofileimage : data["profile_pic_url"]
            , name: data["name"]
            , designation: data["work_as"]
            , location: data["location"]
            , about_me: data["about_me"]
            , companyname: data["business_name"]
            , alonedesignation: data["designation"]
            , main_loading: false
            , btnfollow_text: data["is_follow_user"]
            , tieupsdata: usertieups
            , totaltieupes: totaltieups
            , totalbusinessreceived: data["totalbusinessreceived"]
            , totalbusinessgiven: data["totalbusinessgiven"]
            , largestdealsize: data["largestdealsize"]
            , loading: false
            , is_tieups: data["is_tieups"]
            , joining_date: data["joining_date"]
        })
    }
    followuserhandler = () => {        
        const data = {
            follower_user_id: this.state.otheruserid
        };
        var listdata = userfollowsave(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {                    
                    this.setState({ btnfollow_text: true }, () => {
                        this.state.client.user_follow(res.data);                         
                    });
                }
            }
        });
    }
    unfollowuserhandler = () => {
        const data = {
            follower_user_id: this.state.otheruserid
        };
        var listdata = userunfollowsave(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ btnfollow_text: false }, () => {                        
                    });
                }
            }
        });
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        let otherusername = null;
        if (this.state.otheruserid !== null) {
            otherusername = this.state.name;
        }
        let sidebar = null;
        let content = null;
        let sidebarleftfix = null;
        if (this.state.name !== null) {
            sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
            sidebar =
                <React.Fragment>
                    <MediaQuery query="(max-width: 1224px)">
                        <AboutMe
                            headerheading={this.state.name}
                            joindatetime={this.state.joining_date}
                            tieupsdata={this.state.tieupsdata}
                            totaltieupes={this.state.totaltieupes}
                            oneditprofileclick={this.editprofileclickhandler}
                            otheruserid={this.state.otheruserid}
                            reseteditprofileclick={this.reseteditprofileclickhandler}
                            is_editmode={this.state.is_editmode}
                            cover_image_url={this.state.cover_image_url}
                            profile_pic_url={this.state.profile_pic_url}
                            name={this.state.name}
                            designation={this.state.designation}
                            location={this.state.location}
                            about_me={this.state.about_me}
                            companyname={this.state.companyname}
                            alonedesignation={this.state.alonedesignation}
                            is_currentuser={this.state.is_currentuser}
                            btnfollow_text={this.state.btnfollow_text}
                            followuserhandler={this.followuserhandler}
                            unfollowuserhandler={this.unfollowuserhandler}
                            otherusername={otherusername}
                            currentuserprofilepicforotheruser={this.props.profilepic_url}                            
                            loggedin_user_id={this.props.loggedin_user_id}
                            joining_date={this.state.joining_date}                            
                        >
                        </AboutMe>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <SidebarPic is_editmode={this.state.is_editmode}
                            otheruserid={this.state.otheruserid}
                            profile_pic_url={this.state.profile_pic_url}
                            first_name={this.state.name}
                            filestackoptionimage={filestackoptionimage}
                            onSuccessImageupload={this.onSuccessImageupload}
                            imagetype={ProfilepicType.user_nav__user_photo_large}
                            headerheading={this.state.name}
                            filestacktype={FilestackType.userprofilepic}
                            joindatetime={this.state.joining_date}
                            usertypename={this.props.usertypename}>
                        </SidebarPic>
                    </MediaQuery>
                    <UserBusinessStatus
                        is_editmode={this.state.is_editmode}
                        otheruserid={this.state.otheruserid}
                        businessgiven={titleheading.businessgiven}
                        tieups={titleheading.tieups}
                        businessrecive={titleheading.businessreceived}
                        largestdeal={titleheading.largestdeal}
                        totaltieupes={this.state.totaltieupes}
                        totalbusinessreceived={this.state.totalbusinessreceived}
                        totalbusinessgiven={this.state.totalbusinessgiven}
                        largestdealsize={this.state.largestdealsize}
                    ></UserBusinessStatus>
                    <Workhistory otheruserid={this.state.otheruserid}
                        is_editmode={this.state.is_editmode}>
                    </Workhistory>
                    <EducationDetail otheruserid={this.state.otheruserid}
                        is_editmode={this.state.is_editmode}>
                    </EducationDetail>
                </React.Fragment>

            content = <React.Fragment>
                <MediaQuery query="(min-device-width: 1224px)">
                    <AboutMe
                        tieupsdata={this.state.tieupsdata}
                        totaltieupes={this.state.totaltieupes}
                        oneditprofileclick={this.editprofileclickhandler}
                        otheruserid={this.state.otheruserid}
                        reseteditprofileclick={this.reseteditprofileclickhandler}
                        is_editmode={this.state.is_editmode}
                        cover_image_url={this.state.cover_image_url}
                        profile_pic_url={this.state.profile_pic_url}
                        name={this.state.name}
                        designation={this.state.designation}
                        location={this.state.location}
                        about_me={this.state.about_me}
                        companyname={this.state.companyname}
                        alonedesignation={this.state.alonedesignation}
                        is_currentuser={this.state.is_currentuser}
                        btnfollow_text={this.state.btnfollow_text}
                        followuserhandler={this.followuserhandler}
                        unfollowuserhandler={this.unfollowuserhandler}
                        otherusername={otherusername}
                        currentuserprofilepicforotheruser={this.props.profilepic_url}                        
                        loggedin_user_id={this.props.loggedin_user_id}
                        joining_date={this.state.joining_date}>
                    </AboutMe>
                </MediaQuery>
                <Tabitems
                    is_tieups={this.state.is_tieups}
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    current_loggedin_user_profile_pic={this.props.profilepic_url}
                    otherusername={otherusername}
                    otheruserid={this.state.otheruserid}
                    tabindex={this.state.tabindex}
                    onChange={this.onChange}>
                </Tabitems>
            </React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
                {spinner}
                <Layout
                    sidebarchildrens={sidebar}
                    sidebarleftfixchildrens={sidebarleftfix}
                    contentchildrens={content}
                    pageType={PageType.userprofile}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    is_exhibitor={this.props.is_exhibitor}
                    wing_id={this.props.wing_id}
                    user_wing_id={this.props.user_wing_id}>
                </Layout>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        first_name: state.auth.first_name == null ? "" : state.auth.first_name,
        last_name: state.auth.last_name == null ? "" : state.auth.last_name,
        authRedirectPath: state.auth.authRedirectPath,
        profilepic_url: state.auth.profilepic_url,        
        loggedin_user_id: state.auth.userId,
        is_exhibitor: state.auth.is_exhibitor,
        wingdata: state.auth.wingdata,
        exhibitordata: state.auth.exhibitordata,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id,
        usertypename:state.auth.usertypename

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onuserprofileimagesaveupdate: (data) => dispatch(actions.userprofileimagesaveupdate(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserProfile, axios));