import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import AboutMe from '../../components/exhibitorprofile/aboutme/aboutme';
import { get_exhibitor_profile_data } from '../../actions/exhibitor/dataactions';
import { get_exhibitor_staff_data_sidebar_list } from '../../actions/exhibitor/dataactions';
import { Redirect } from 'react-router-dom';
import { decodedstring, ButtonText, ProfilepicType, FilestackType } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import MediaQuery from 'react-responsive';
import SidebarPic from '../../components/UI/Layout/sidebarimage/sidebar';
import Sidebarwingsterlist from '../../components/wings/userwings/sidebarwingsterlist';

const initialState = {
    exhibitordata: null,
    is_currentuser: true,
    otheruserid: null,
    tabindex: null,
    fromparent: false,
    loading: false,
    is_member: false,
    exhibitorstaffdata: null
}

class exhibitorprofile extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
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
    componentDidMount() {
        this.setState({ loading: true })
        window.scrollTo(0, 0);
        let otheruserid = this.geturlparams()
        this.setState({ otheruserid: otheruserid })
        var data = get_exhibitor_profile_data(otheruserid)
        data.then(res => {
            if (res !== undefined) {
                this.setState({ exhibitordata: res.data, loading: false }, () => {
                    alert(JSON.stringify(this.state.exhibitordata.id))
                    var data1 = get_exhibitor_staff_data_sidebar_list(this.state.exhibitordata.id, true)
                    data1.then(res => {
                        if (res !== undefined) {                            
                            if (res.data.length > 0) {
                                if (res.data["error"] === undefined) {
                                    if (res.data !== null) {
                                        this.setState({ exhibitorstaffdata: res.data});
                                    }
                                }
                            }
                        }
                    });
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
        let otherusername = null;
        if (this.state.otheruserid !== null) {
            otherusername = this.state.name;
        }
        let sidebar = null;
        let sidebarleftfix = null;

        let content = null;
        if (this.state.exhibitordata !== null) {
            sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
            sidebar =
                <React.Fragment>
                    <SidebarPic
                        is_editmode={this.state.is_editmode}
                        profile_pic_url={this.state.exhibitordata.company_logo_url}
                        headerheading={this.state.exhibitordata.name}
                        joindatetime={this.state.exhibitordata.joiningdate}
                        onSuccessImageupload={this.onSuccessImageupload}
                        imagetype={ProfilepicType.user_nav__user_photo_large}
                        usertypename="Exhibitor"
                        filestacktype={FilestackType.userprofilepic}>
                    </SidebarPic>
                    <Sidebarwingsterlist is_member={this.state.is_member}
                        loggedin_user_id={this.props.loggedin_user_id}
                        usertypename={this.props.usertypename}
                        wings_users={this.state.exhibitorstaffdata}
                        chatheader="Live chat with the team">
                    </Sidebarwingsterlist>
                </React.Fragment>
            content =
                <React.Fragment>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <AboutMe
                            exhibitordata={this.state.exhibitordata}
                            otheruserid={this.state.otheruserid}
                            is_currentuser={this.state.is_currentuser}
                            otherusername={otherusername}
                            currentuserprofilepicforotheruser={this.props.profilepic_url}
                            loggedin_user_id={this.props.loggedin_user_id}
                            currency_name={this.props.currency_name}
                        >
                        </AboutMe>
                    </MediaQuery>
                </React.Fragment>
        }
        return (
            <React.Fragment>
                {spinner}
                {authRedirect}
                <Layout
                    sidebarleftfixchildrens={sidebarleftfix}
                    sidebarchildrens={sidebar}
                    contentchildrens={content}
                    pageType={PageType.exhibitorprofile}
                    first_name={this.props.first_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
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
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(exhibitorprofile, axios));