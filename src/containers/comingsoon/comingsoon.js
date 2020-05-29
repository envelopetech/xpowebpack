import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ButtonText } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import Comingsoon from '../../components/comingsoon/comingsoon';
import Sidebar from '../../components/usermanage/sidebar/sidebar';
import BackHistory from '../../components/UI/Backhistory/withoutback';

class comingsoon extends Component {
    render() {
        let sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
        let sidebar =
            <React.Fragment>
                <Sidebar name={this.props.first_name}></Sidebar>
            </React.Fragment>
        let content =
            <React.Fragment>
                <Comingsoon>
                </Comingsoon>
            </React.Fragment>
        return (
            <React.Fragment>               
                <Layout
                    sidebarleftfixchildrens={sidebarleftfix}
                    sidebarchildrens={sidebar}
                    contentchildrens={content}
                    pageType={PageType.explorewings}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
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
        first_name: state.auth.first_name == null ? "" : state.auth.first_name,
        last_name: state.auth.last_name == null ? "" : state.auth.last_name,
        profilepic_url: state.auth.profilepic_url,
        loggedin_user_id: state.auth.userId,
        is_exhibitor: state.auth.is_exhibitor,
        currency_name: state.auth.currency_name,
        usertypename: state.auth.usertypename,
        loggedinuser_email: state.auth.email,
        loggedinuser_phonenumber: state.auth.phone_number,
        loggedinuser_name: state.auth.name,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(comingsoon, axios));