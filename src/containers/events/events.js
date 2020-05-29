import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ButtonText} from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import Events from '../../components/events/events';

class events extends Component {
    render() {
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        let sidebarleftfix = null;
        sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
        let content = null;
        content =
            <React.Fragment>
                <Events                    
                    loggedin_user_profilepic_url={this.props.profilepic_url}
                    usertypename={this.props.usertypename}                    
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}>
                </Events>
            </React.Fragment>
        return (
            <React.Fragment>
                {authRedirect}                
                <Layout 
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
        usertypename: state.auth.usertypename,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};


export default connect(mapStateToProps, null)(withErrorHandler(events, axios));