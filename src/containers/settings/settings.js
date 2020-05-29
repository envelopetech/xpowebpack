import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ButtonText, settingstabindex } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import Sidebar from '../../components/usermanage/sidebar/sidebar';
import { Redirect } from 'react-router-dom';
import BackHistory from '../../components/UI/Backhistory/withoutback';
import Tabitems from '../../components/settings/tabitems';
import { getuserprofile1data, getindustry, user_personal_settings_save, user_business_settings_save } from '../../actions/userprofilesetup/dataactions'
import Spinner from '../../components/UI/Spinner/Spinner';
import ReactNotification from 'react-notifications-component'
//import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
//import 'animate.css';
import isMobile from '../../shared/isMobile'

const initialState = {
    name: null,
    tabindex: settingstabindex.personal,
    industrydata: null,
    visitorid: null,
    first_name: null,
    last_name: null,
    location: null,
    profile_pic_url: null,
    profile_pic_url_preview: null,
    business_name: null,//company name
    designation: null,
    industry: null,
    company_website: null,
    company_logo_url: null,
    company_logo_url_preview: null,
    address1: null,
    address2: null,
    phone_number: null,
    company_email: null,
    loading: false,
    industrylist: null
}
class settings extends Component {
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
    getmasterdata(user_industry) {
        var data = getindustry(user_industry)
        data.then(res =>
            this.setState({
                industrydata: res.data
            })
        )
    }
    componentDidMount() {
        this.setState({ loading: true })
        var data = getuserprofile1data(null)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.filldata(res.data)
                this.getmasterdata(res.data["industry"])
            }
            else {
                this.getmasterdata("")
            }
        });
    }
    filldata(data) {
        this.setState({
            visitorid: data["id"]
            , first_name: data["first_name"]
            , last_name: data["last_name"]
            , location: data["location"]
            , profile_pic_url: data["profile_pic_url"]
            , profile_pic_url_preview: data["profile_pic_url_preview"]
            , business_name: data["business_name"]
            , designation: data["designation"]
            , industry: data["industry"]
            , company_website: data["company_website"]
            , company_logo_url: data["company_logo_url"]
            , company_logo_url_preview: data["company_logo_url_preview"]
            , address1: data["address1"]
            , address2: data["address2"]
            , phone_number: data["phone_number"]
            , company_email: data["company_email"]
            , industrylist: data["industrylist"]
            , loading: false
        })
    }

    submitpersonaldetail = (values) => {
        let is_Mobile= false
        let container_position= "top-right"
        if(isMobile.any() !== null)
        {
            is_Mobile=true;
            container_position ="bottom-center"
        }
        this.setState({ loading: true })
        const dataval = {
            first_name: values.firstname,
            last_name: values.lastname,
            address1: values.address1,
            address2: values.address2,
            location: values.autolocation,
            email_address: values.email,
            phone_number: values.phonenumber,
            profile_pic_url: values.profileimageurl,
        }
        var returndata = user_personal_settings_save(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    // this.setState({
                    //     first_name: values.firstname,
                    //     last_name: values.lastname,
                    //     location: values.autolocation,
                    //     email_address: values.email,
                    //     phone_number: values.phonenumber,
                    //     profile_pic_url: values.profileimageurl,
                    //     address1: values.address1,
                    //     address2: values.address2,
                    //     loading: false
                    // });
                    this.setState({
                        first_name: values.firstname,
                        last_name: values.lastname,
                        location: values.autolocation,
                        email_address: values.email,
                        phone_number: values.phonenumber,
                        profile_pic_url: values.profileimageurl,
                        address1: values.address1,
                        address2: values.address2,
                        loading: false
                    }, () => {
                        store.addNotification({                           
                            isMobile:is_Mobile,                          
                            message: 'Personal settings has been saved.',                            
                            type: 'success',                         // 'default', 'success', 'info', 'warning'
                            container: container_position,                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 1500,
                                onScreen: false,
                                showIcon:true
                            }
                        })
                    });
                }
            }
        })
    }
    submitbusinessdetail = (values) => {
        let is_Mobile= false
        let container_position= "top-right"
        if(isMobile.any() !== null)
        {
            is_Mobile=true;
            container_position ="bottom-right"
        }
        this.setState({ loading: true })
        const dataval = {
            business_name: values.companyname,
            designation: values.designation,
            industry: values.industry_id,
            business_website: values.website,
            company_logo_url: values.companyimageurl,
        }
        var returndata = user_business_settings_save(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({
                        business_name: values.companyname,
                        designation: values.designation,
                        industry: values.industry_id,
                        business_website: values.website,
                        company_logo_url: values.companyimageurl,
                        loading: false
                    }, () => {
                        store.addNotification({                           
                            isMobile:is_Mobile,                          
                            message: 'Business settings has been saved.',                            
                            type: 'success',                         // 'default', 'success', 'info', 'warning'
                            container: container_position,                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 1500,
                                onScreen: false,
                                showIcon:true
                            }
                        })
                    });
                }
            }
        })
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
        let sidebarleftfix = null;
        sidebarleftfix = <BackHistory buttontext={ButtonText.back} isicon={true}></BackHistory>
        sidebar =
            <React.Fragment>
                <Sidebar name={this.props.first_name}></Sidebar>
            </React.Fragment>
        let content = null;
        if (this.state.visitorid !== null) {
            content =
                <React.Fragment>
                    {spinner}
                    <Tabitems
                        industrylist={this.state.industrylist}
                        loading={this.state.loading}
                        submitbusinessdetail={this.submitbusinessdetail}
                        submitpersonaldetail={this.submitpersonaldetail}
                        tabindex={this.state.tabindex}
                        onChange={this.onChange}
                        page_type={PageType.curator}
                        loggedin_user_profilepic_url={this.props.profilepic_url}
                        usertypename={this.props.usertypename}
                        visitorid={this.state.visitorid}
                        first_name={this.state.first_name}
                        last_name={this.state.last_name}
                        location={this.state.location}
                        profile_pic_url={this.state.profile_pic_url}
                        profile_pic_url_preview={this.state.profile_pic_url_preview}
                        business_name={this.state.business_name}
                        designation={this.state.designation}
                        company_website={this.state.company_website}
                        company_logo_url={this.state.company_logo_url}
                        company_logo_url_preview={this.state.company_logo_url_preview}
                        phone_number={this.state.phone_number}
                        company_email={this.state.company_email}
                        personal_email={this.props.personal_email}
                        industrydata={this.state.industrydata}
                        industry={this.state.industry}
                        address1={this.state.address1}
                        address2={this.state.address2}>
                    </Tabitems>
                </React.Fragment>
        }
        return (
            <React.Fragment>
                {authRedirect}
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
        personal_email: state.auth.email,
        user_wing_id: state.auth.user_wing_id
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(settings, axios));