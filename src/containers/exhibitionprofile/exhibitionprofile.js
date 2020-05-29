import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, decodedstring, ProfilepicType, ButtonText } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import AboutMe from '../../components/exhibitionprofile/aboutme/aboutme';
import { get_events_by_id } from '../../actions/events/dataactions';
import { Redirect } from 'react-router-dom';
import Sidebar from '../../components/exhibitionprofile/sidebar';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import Spinner from '../../components/UI/Spinner/Spinner';

const initialState = {
    eventdata: null,
    loading: false
}
class exhibitionprofile extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    geturlparams() {
        let eventid = null;
        if (this.props.match.params.id !== undefined) {
            eventid = decodedstring(this.props.match.params.id)
        }
        return eventid;
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.match.params.id !== this.props.match.params.id) {
    //         this.reset();            
    //         this.setState({ loading: true })
    //         let id = decodedstring(nextProps.match.params.id)
    //         var data = get_events_by_id(parseInt(id, 10))
    //         data.then(res => {
    //             if (res !== undefined) {
    //                 if (res.data["error"] === undefined) {
    //                     this.setState({ eventdata: res.data, loading: false });
    //                 }
    //             }
    //         });
    //     }
    // }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ loading: true })
        let eventid = this.geturlparams()
        var data = get_events_by_id(parseInt(eventid, 10))
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ eventdata: res.data, loading: false });
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
        let sidebar = null;
        let content = null;
        let sidebarleftfix = null;
        if (this.state.eventdata !== null) {
            sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
            sidebar = <Sidebar
                first_name={this.props.first_name}
                profile_pic_url={this.state.eventdata[0].event_pic_url}
                imagetype={ProfilepicType.user_nav__user_photo_large}
                eventname={this.state.eventdata[0].event_title}
                eventstatus={this.state.eventdata[0].live_status}
                registrationstatus={this.state.eventdata[0].registrationstatus}
                totalvisitorsexhibitors={this.state.eventdata[0].totalvisitorsexhibitors}>

            </Sidebar>
            content = <React.Fragment>
                <AboutMe
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}
                    eventdata={this.state.eventdata}
                    name={this.props.name}
                    withoutloggedin={false}>
                </AboutMe>
            </React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
                {spinner}
                <Layout
                    profilepic_url={this.props.profilepic_url}
                    sidebarchildrens={sidebar}
                    sidebarleftfixchildrens={sidebarleftfix}
                    contentchildrens={content}
                    pageType={PageType.exhibitionprofile}
                    first_name={this.props.first_name}
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
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id,
        name: state.auth.name
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(exhibitionprofile, axios));