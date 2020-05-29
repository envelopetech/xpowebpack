import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Subscriptionplan from '../../components/subscription/subscriptionplan';


class subscriptionplan extends Component {


    render() {
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        let content = null;        
        content =
            <React.Fragment>
                <Subscriptionplan
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    loggedin_user_profilepic_url={this.props.profilepic_url}
                    loggedinuser_email ={this.props.loggedinuser_email}
                    loggedinuser_phonenumber= {this.props.loggedinuser_phonenumber}
                    loggedinuser_name={this.props.loggedinuser_name}>
                </Subscriptionplan>
            </React.Fragment>
        return (
            <React.Fragment>
                {authRedirect}
                <Layout                    
                    contentchildrens={content}
                    pageType={PageType.explorepeople}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
                    wing_id={this.props.wing_id}
                    user_wing_id={this.props.user_wing_id}
                    >
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
        loggedinuser_email: state.auth.email,
        loggedinuser_phonenumber : state.auth.phone_number,
        loggedinuser_name : state.auth.name,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(subscriptionplan, axios));

//Add new post when user join wing and curator accept him/her as a wingster
//Add new post when wingster exit from wing