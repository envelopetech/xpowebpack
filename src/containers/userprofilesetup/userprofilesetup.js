import React, { Component } from 'react';
import Firstprofilestep from '../../components/Userprofilesetup/firststep';
import Secondprofilestep from '../../components/Userprofilesetup/secondstep';
import Tirdprofilestep from '../../components/Userprofilesetup/thirdstep';
//import Fourthstep from '../../components/Userprofilesetup/fourthstep';
//import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { profilesetup_third_step_update, getuserprofile1data, getindustry } from '../../actions/userprofilesetup/dataactions'
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

class userprofilesetup extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            loading: false,
            industrydata: null,
            page: 1,
            visitorid: null,
            first_name: null,
            last_name: null,
            location: null,
            profile_pic_url: null,
            profile_pic_url_preview: null,
            business_name: null,//company name
            designation: null,
            industry: null,
            industrylist: null,
            company_website: null,
            company_logo_url: null,
            company_logo_url_preview: null,
            address1: null,
            address2: null,
            phone_number: null,
            company_email: null,
            redirecttoexpohome: false
        }

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
            , industrylist: data["industrylist"]
            , company_website: data["company_website"]
            , company_logo_url: data["company_logo_url"]
            , company_logo_url_preview: data["company_logo_url_preview"]
            , address1: data["address1"]
            , address2: data["address2"]
            , phone_number: data["phone_number"]
            , company_email: data["company_email"]
            , loading: false
        })
    }
    nextPage(values) {
        let location = null;
        if (values.location !== undefined) {
            location = values.location
        }
        if (this.state.page === 1) {
            this.setState({
                first_name: values.firstname
                , last_name: values.lastname
                , location: location
                , profile_pic_url: values.profileimageurl
                , profile_pic_url_preview: values.profileimageurlpreview
                , page: this.state.page + 1
            })
        }
        else if (this.state.page === 2) {
            this.setState({
                business_name: values.companyname
                , designation: values.designation
                , industry: values.industry_id
                , company_website: values.website
                , company_logo_url: values.companyimageurl
                , company_logo_url_preview: values.companyimageurlpreview
                , page: this.state.page + 1
            })
        }
        else {
            //save data in visitor table
            this.setState({
                first_name: values.firstname
                , last_name: values.lastname
                , location: location
                , profile_pic_url: values.profileimageurl
                , profile_pic_url_preview: values.profileimageurlpreview
                , business_name: values.companyname
                , designation: values.designation
                , industry: values.industry_id
                , company_website: values.website
                , company_logo_url: values.companyimageurl
                , company_logo_url_preview: values.companyimageurlpreview
                , address1: values.address1
                , address2: values.address2
                , phone_number: values.phonenumber
            })
            const dataval3 = {
                first_name: values.firstname
                , last_name: values.lastname
                , location: location
                , profile_pic_url: values.profileimageurl
                , profile_pic_url_preview: values.profileimageurlpreview
                , business_name: values.companyname
                , designation: values.designation
                , industry: values.industry_id
                , company_website: values.website
                , company_logo_url: values.companyimageurl
                , company_logo_url_preview: values.companyimageurlpreview
                , address1: values.address1
                , address2: values.address2
                , phone_number: values.phonenumber
                , visitor_id: this.state.visitorid
            };
            var data3 = profilesetup_third_step_update(dataval3)
            data3.then(res => {
                if (res.data["error"] === undefined) {
                    this.props.get_user_data_by_id();
                    // setTimeout(
                    //     function () {
                    //         return <Redirect to="/expohome" />
                    //     }
                    //         .bind(this),
                    //     1000
                    // );
                    this.setState({ redirecttoexpohome: true })
                }
            })
        }
    }
    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }
    skipPage = () => {
        this.setState({ page: this.state.page + 1 })
    }
    nextrecommendpage = () => {
        this.setState({ page: this.state.page + 1 })
    }
    render() {
        let spinnerform = null
        if (this.state.loading) {
            spinnerform = <Spinner />
        }
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        if (this.state.redirecttoexpohome) {
            return <Redirect to="/expohome" />
        }
        const { page } = this.state
        let renderdiv = null;
        if (page === 1) {
            if (this.state.visitorid !== null) {
                renderdiv = <Firstprofilestep onSubmit={this.nextPage}
                    visitorid={this.state.visitorid}
                    skipPage={this.skipPage}
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    location={this.state.location}
                    profile_pic_url={this.state.profile_pic_url}
                    profile_pic_url_preview={this.state.profile_pic_url_preview}>
                </Firstprofilestep>
            }
        }
        else if (page === 2) {
            if (this.state.visitorid !== null) {
                renderdiv = <Secondprofilestep
                    previousPage={this.previousPage}
                    skipPage={this.skipPage}
                    onSubmit={this.nextPage}
                    business_name={this.state.business_name}
                    designation={this.state.designation}
                    industry={this.state.industry}
                    industrylist={this.state.industrylist}
                    company_website={this.state.company_website}
                    company_logo_url={this.state.company_logo_url}
                    company_logo_url_preview={this.state.company_logo_url_preview}
                    visitorid={this.state.visitorid}
                    industrydata={this.state.industrydata}
                />
            }
        }
        else if (page === 3) {
            if (this.state.visitorid !== null) {
                renderdiv = <Tirdprofilestep
                    skipPage={this.skipPage}
                    profile_pic_url={this.state.profile_pic_url}
                    business_name={this.state.business_name}
                    designation={this.state.designation}
                    company_website={this.state.company_website}
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    address1={this.state.address1}
                    address2={this.state.address2}
                    phone_number={this.state.phone_number}
                    company_email={this.state.company_email}
                    visitorid={this.state.visitorid}
                    company_logo_url={this.state.company_logo_url}
                    nextrecommendpage={this.nextrecommendpage} />
            }
        }
        // else if (page === 4) {
        //     if (this.state.visitorid !== null) 
        //     {
        //         renderdiv = <Fourthstep
        //                         skipPage={this.skipPage}
        //                         onSubmit={this.nextPage}
        //                         previousPage={this.previousPage}
        //                     />
        //     }
        // }
        return (
            <React.Fragment>
                {/* {authRedirect} */}
                {spinnerform}
                {renderdiv}
            </React.Fragment>
        )
    }
}
userprofilesetup.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        email_confirmed: state.auth.email_confirmed,
        authsuccessbool: state.auth.authsuccessbool,
        loginsuccess: state.auth.loginsuccess,
        current_step: state.auth.current_step
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_user_data_by_id: () => dispatch(actions.get_user_data_by_id()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(userprofilesetup);