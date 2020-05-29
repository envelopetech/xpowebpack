import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ButtonText, curatortabindex, users_type } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import Sidebar from '../../components/usermanage/sidebar/sidebar';
import { Redirect } from 'react-router-dom';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import Tabitems from '../../components/curator/tabitems';
import Curatorintro from '../../components/curator/curatorintro';
import { curator_get_personal_profile_data } from '../../actions/curator/dataactions'
import Spinner from '../../components/UI/Spinner/Spinner';


const initialState = {
    name: null,
    tabindex: curatortabindex.profile,
    companyname: null,
    designation: null,
    companyemail: null,
    phonenumber: null,
    loading: true

}

class curator extends Component {
    constructor(props) {
        super(props)
        this.state = initialState

    }
    reset() {
        this.setState(initialState);
    }

    onChange = (activeKey) => {
        this.setState({
            tabindex: activeKey
        });
    }
    componentDidMount() {
        if (this.props.usertypename !== users_type.curator) {
            var data = curator_get_personal_profile_data()
            data.then(res => {
                if (res !== undefined) {
                    this.setState({
                        companyname: res.data[0],
                        designation: res.data[1],
                        companyemail: res.data[2],
                        phonenumber: res.data[3],
                        loading: false
                    })
                }
            });
        }
    }
    render() {
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        let sidebar = null;
        let sidebarleftfix = null;
        sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
        sidebar =
            <React.Fragment>
                <Sidebar name={this.props.first_name}></Sidebar>
            </React.Fragment>
        let content = null;
        let spinner = null
        if (this.props.usertypename !== users_type.curator) {
            if (this.state.companyname !== null && this.state.companyname !== undefined) {
                if (this.state.loading) {
                    spinner = <Spinner />
                }
                content =
                    <React.Fragment>
                        <Curatorintro
                            page_type={PageType.userwings}
                            loggedin_user_profilepic_url={this.props.profilepic_url}
                            usertypename={this.props.usertypename}
                            wing_id={this.props.wing_id}
                            first_name={this.props.first_name}
                            last_name={this.props.last_name}
                            companyname={this.state.companyname}
                            designation={this.state.designation}
                            companyemail={this.state.companyemail}
                            phonenumber={this.state.phonenumber}
                            tabindex={this.state.tabindex}
                            onChange={this.onChange}>
                        </Curatorintro>
                    </React.Fragment>
            }
        }
        else {
            content =
                <React.Fragment>
                    <Tabitems
                        tabindex={this.state.tabindex}
                        onChange={this.onChange}
                        page_type={PageType.curator}
                        loggedin_user_profilepic_url={this.props.profilepic_url}
                        usertypename={this.props.usertypename}
                        wing_id={this.props.wing_id}>
                    </Tabitems>
                </React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
                {spinner}
                <Layout sidebarchildrens={sidebar}
                    sidebarleftfixchildrens={sidebarleftfix}
                    contentchildrens={content}
                    pageType={PageType.userprofile}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    is_exhibitor={this.props.is_exhibitor}
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
        usertypename: state.auth.usertypename,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};


export default connect(mapStateToProps, null)(withErrorHandler(curator, axios));