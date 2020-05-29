import React, { Component } from 'react';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../store/axios-orders';
import { PageType, ProfilepicType, ButtonText, titleheading, decodedstring, FilestackType, Userwingstabindex } from '../../../shared/utility';
import Layout from '../../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import AboutMe from '../../../components/wings/userwings/aboutme/aboutme';
import { get_wings_by_id } from '../../../actions/wings/dataactions';
import { Redirect } from 'react-router-dom';
import SidebarPic from '../../../components/UI/Layout/sidebarimage/sidebar';
import BackHistory from '../../../components/UI/Backhistory/withoutback';
import UserBusinessStatus from '../../../components/Userpersonalprofile/userbusinessstatus/userbusinessstatus';
import Sidebarwingsterlist from '../../../components/wings/userwings/sidebarwingsterlist';
import defaultprofileimage from '../../../assets/images/default_avatar.png';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Tabitems from '../../../components/wings/userwings/tabitems/tabitems';
import MediaQuery from 'react-responsive';

const initialState = {
    wing_id: null,
    wingdata: null,
    fromparent: false,
    totalwingsmembers: null,
    totalbusiness: null,
    totalleads: null,
    largestdealsize: null,
    userjoiningstatus: false,
    is_editmode: false,
    profile_pic_url: defaultprofileimage,
    loading: false,
    is_curator: false,
    wing_member_wing_id: null,
    is_member: false,
    tabindex: Userwingstabindex.streamline,
}
class userwings extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.baseState = this.state
    }
    tabindexChange = (activeKey) => {
        this.setState({
            tabindex: activeKey
        });
    }
    geturlparams() {
        let wingid = null;
        if (this.props.match.params.id !== undefined) {
            // let encoded = this.props.match.params.id;
            // let bytes = base64.decode(encoded);
            //wingid = utf8.decode(bytes);
            wingid = decodedstring(this.props.match.params.id)
        }
        //alert(wingid)
        return wingid;
    }
    onSuccessImageupload = (result) => {
        let wingid = this.geturlparams()
        const data = {
            profile_pic_url: result.filesUploaded[0]["url"],
            wingid: wingid
        };
        localStorage.setItem('profile_pic', result.filesUploaded[0]["url"])
        this.props.onwingprofilepicsave(data);
        this.setState({ profile_pic_url: result.filesUploaded[0]["url"] })
    };
    editprofileclickhandler = () => {
        this.setState({ is_editmode: true });
    }
    reseteditprofileclickhandler = () => {
        this.setState({ is_editmode: false });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState(this.baseState)
            //const id = nextProps.match.params.id  
            let id = decodedstring(nextProps.match.params.id)
            this.setState({ wing_id: id, loading: true })
            var data = get_wings_by_id(parseInt(id, 10))
            data.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({
                            wingdata: res.data
                            , totalbusiness: res.data["totalbusiness"]
                            , totalleads: res.data["totalleads"]
                            , largestdealsize: res.data["largestdealsize"]
                            , totalwingsmembers: res.data["totalwingsmembers"]
                            , userjoiningstatus: res.data["userjoiningstatus"]
                            , profile_pic_url: res.data["wing_pic_url"]
                            , loading: false
                            , is_curator: res.data["is_curator"]
                            , wing_member_wing_id: res.data["wing_member_wing_id"]
                            , is_member: res.data["is_member"]
                        });
                    }
                }
            });
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        window.scrollTo(0, 0);
        let wing_id = this.geturlparams()
        this.setState({ wing_id: wing_id })
        var data = get_wings_by_id(parseInt(wing_id, 10))
        data.then(res => {
            if (res !== undefined) {
                this.setState({
                    wingdata: res.data
                    , totalbusiness: res.data["totalbusiness"]
                    , totalleads: res.data["totalleads"]
                    , largestdealsize: res.data["largestdealsize"]
                    , totalwingsmembers: res.data["totalwingsmembers"]
                    , userjoiningstatus: res.data["userjoiningstatus"]
                    , profile_pic_url: res.data["wing_pic_url"]
                    , loading: false
                    , is_curator: res.data["is_curator"]
                    , wing_member_wing_id: res.data["wing_member_wing_id"]
                    , is_member: res.data["is_member"]
                });
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
        let content = null;
        let sidebar = null;
        let sidebarleftfix = null;

        
        // content = <div>Content Test</div>
        // sidebar = <div>sidebar Test</div>
        if (this.state.wingdata !== null) {
            sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
            sidebar =
                <React.Fragment>
                    <MediaQuery query="(max-width: 1224px)">
                        <AboutMe
                            headerheading={this.state.wingdata.title}
                            joindatetime={this.state.wingdata.joiningdate}
                            onSuccessImageupload={this.onSuccessImageupload}
                            imagetype={ProfilepicType.user_nav__user_photo_large}
                            filestacktype={FilestackType.userprofilepic}
                            wing_member_wing_id={this.state.wing_member_wing_id}
                            is_curator={this.state.is_curator}
                            oneditprofileclick={this.editprofileclickhandler}
                            reseteditprofileclick={this.reseteditprofileclickhandler}
                            is_editmode={this.state.is_editmode}
                            wing_id={this.state.wing_id}
                            usertypename={this.props.usertypename}
                            userjoiningstatus={this.state.userjoiningstatus}
                            totaltieupes={this.state.totalwingsmembers}
                            wingdata={this.state.wingdata}                            
                            loggedin_user_id={this.props.loggedin_user_id}
                            currency_name={this.props.currency_name}
                            loggedin_user_pic_url={this.props.profilepic_url}
                            profile_pic_url={this.state.profile_pic_url}>
                        </AboutMe>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <SidebarPic
                            is_editmode={this.state.is_editmode}
                            profile_pic_url={this.state.profile_pic_url}
                            headerheading={this.state.wingdata.title}
                            joindatetime={this.state.wingdata.joiningdate}
                            onSuccessImageupload={this.onSuccessImageupload}
                            imagetype={ProfilepicType.user_nav__user_photo_large}
                            usertypename={this.props.usertypename}
                            filestacktype={FilestackType.userprofilepic}>
                        </SidebarPic>
                        <UserBusinessStatus
                            is_editmode={this.state.is_editmode}
                            totalbusinessgiven={this.state.totalbusiness}
                            totalbusinessreceived={this.state.totalleads}
                            largestdealsize={this.state.largestdealsize}
                            totaltieupes={this.state.totalwingsmembers}
                            businessgiven={titleheading.totalbusiness}
                            tieups={titleheading.totalmembers}
                            businessrecive={titleheading.totalleads}
                            largestdeal={titleheading.largestdeal}>
                        </UserBusinessStatus>
                        <Sidebarwingsterlist is_member={this.state.is_member}                            
                            loggedin_user_id={this.props.loggedin_user_id}
                            usertypename={this.props.usertypename}
                            wings_users={this.state.wingdata.wings_users[0]}
                            chatheader="Chat with Wingster">
                        </Sidebarwingsterlist>
                    </MediaQuery>
                </React.Fragment>
            content =
                <React.Fragment>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <AboutMe
                            headerheading={this.state.wingdata.title}
                            joindatetime={this.state.wingdata.joiningdate}
                            onSuccessImageupload={this.onSuccessImageupload}
                            imagetype={ProfilepicType.user_nav__user_photo_large}
                            filestacktype={FilestackType.userprofilepic}
                            wing_member_wing_id={this.state.wing_member_wing_id}
                            is_curator={this.state.is_curator}
                            oneditprofileclick={this.editprofileclickhandler}
                            reseteditprofileclick={this.reseteditprofileclickhandler}
                            is_editmode={this.state.is_editmode}
                            wing_id={this.state.wing_id}
                            usertypename={this.props.usertypename}
                            userjoiningstatus={this.state.userjoiningstatus}
                            totaltieupes={this.state.totalwingsmembers}
                            wingdata={this.state.wingdata}                            
                            loggedin_user_id={this.props.loggedin_user_id}
                            currency_name={this.props.currency_name}
                            loggedin_user_pic_url={this.props.profilepic_url}>
                        </AboutMe></MediaQuery>                    
                        <Tabitems
                            wings_users={this.state.wingdata.wings_users[0]}
                            currency_name={this.props.currency_name}
                            loggedin_user_pic_url={this.props.profilepic_url}
                            loggedin_user_id={this.props.loggedin_user_id}                            
                            tabindex={this.state.tabindex}
                            onChange={this.tabindexChange}
                            wing_id={this.state.wing_id}
                            is_member={this.state.wingdata.is_member}
                            usertypename={this.props.usertypename}
                        >
                        </Tabitems>
                    
                </React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
                {spinner}
                <Layout
                    sidebarleftfixchildrens={sidebarleftfix}
                    sidebarchildrens={sidebar}
                    contentchildrens={content}
                    pageType={PageType.userwings}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
                    bottomdivid="bottomsidebarwing"
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
        currency_name: state.auth.currency_name,
        usertypename: state.auth.usertypename,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onwingprofilepicsave: (data) => dispatch(actions.wingprofileimagesaveupdate(data)),
    };
};
//export default userwings;
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userwings, axios));
//Add new post when user join wing and curator accept him/her as a wingster
//Add new post when wingster exit from wing