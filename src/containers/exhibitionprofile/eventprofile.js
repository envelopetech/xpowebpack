import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ProfilepicType, ButtonText, ReactGoogleAnalytics, GTM_ID} from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import AboutMe from '../../components/exhibitionprofile/aboutme/aboutme';
import { get_events_without_loggedin } from '../../actions/events/dataactions';
import Sidebar from '../../components/exhibitionprofile/sidebar';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import Spinner from '../../components/UI/Spinner/Spinner';
import GoogleTagManager from '../../shared/GoogleTagManager'

const initialState = {
    eventdata: null,
    loading: false
}
class eventprofile extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    componentDidMount() {
        ReactGoogleAnalytics()
        window.scrollTo(0, 0);
        this.setState({ loading: true })
        var data = get_events_without_loggedin()
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
        let sidebar = null;
        let content = null;
        let sidebarleftfix = null;
        if (this.state.eventdata !== null) {
            sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
            sidebar = <Sidebar
                profile_pic_url={this.state.eventdata[0].event_pic_url}
                imagetype={ProfilepicType.user_nav__user_photo_large}
                eventname={this.state.eventdata[0].event_title}
                eventstatus={this.state.eventdata[0].live_status}
                registrationstatus={this.state.eventdata[0].registrationstatus}
                totalvisitorsexhibitors={this.state.eventdata[0].totalvisitorsexhibitors}>

            </Sidebar>
            content = <React.Fragment>
                <AboutMe
                    eventdata={this.state.eventdata}
                    name={this.props.name}
                    withoutloggedin={true}>
                </AboutMe>
            </React.Fragment>
        }
        return (
            <React.Fragment>
                 <GoogleTagManager gtmId={GTM_ID} />
                {spinner}
                <Layout
                    ishiderightheader={true}
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

export default withErrorHandler(eventprofile, axios);