import React, { Component } from 'react';
import * as classshared from './ClassConst';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import { ButtonType } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { update_email_confirmed } from '../../actions/userprofile/dataactions'
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { GTM_ID } from '../../shared/utility';
import GoogleTagManager from '../../shared/GoogleTagManager'

class emailverification extends Component {
    state = {
        loading: false,
        redirecttoprofilesetup:false
    }
    geturlparams() {
        let userid = null;
        if (this.props.match.params.id !== undefined) {
            userid = this.props.match.params.id
        }
        return userid;
    }
    loginafteremailverification = () => {        
        this.setState({ loading: true })
        let otheruserid = this.geturlparams()
        if (otheruserid !== null) {
            const dataval = {
                otheruserid: otheruserid
            };
            var data = update_email_confirmed(dataval)
            data.then(res => {
                if (res !== undefined) {                    
                    if (res.data["error"] === undefined) {                       
                        this.props.get_user_data_by_id(otheruserid);
                        setTimeout(
                            function () {                                
                                this.setState({redirecttoprofilesetup:true, loading: false})                            
                            }
                                .bind(this),
                            1000
                        );
                    }
                }
            });
        }
    }
    render() {
        if (this.state.redirecttoprofilesetup) {
            return <Redirect to="/expohome" />
        }  
        let spinnerform = null
        if (this.state.loading) {
            spinnerform = <Spinner />
        }
        return (
            <React.Fragment>
                 <GoogleTagManager gtmId={GTM_ID} />
                {spinnerform}
                <div className={classshared.h_container.join(' ')}>
                    <div className={classshared.navbar}>
                        <div className={classshared.w_container}>
                            <a href="https://xporium.com" className={classshared.brand}><img src={logoimage} height="40" alt=""></img></a>
                        </div>
                    </div>
                    <div className={classshared.login_content}>
                        <div className={classshared.center}>
                            <h1 className={classshared.font1_bold_dark.join(' ')}>Verification Succesful!</h1>
                            <div className={classshared.margin_top__lv4}>
                                <p className={classshared.paragraphletter}>Thank you for verifying your email address. We are super excited to welcome you to Xporium.</p>
                            </div>
                            <div className={classshared.margin_top__lv4}>
                                <p className={classshared.paragraphletter}>Now let's get started! Let's begin first by setting up your profile.</p>
                            </div>
                            <div className={classshared.login_content__main.join(' ')}>
                                <div className={classshared.login_form}>

                                    <div className={classshared.centerdiv}>
                                        <Button btntype={ButtonType.signuplogin} buttontype="button" clicked={this.loginafteremailverification}>Get Started</Button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
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
        get_user_data_by_id: (otheruserid) => dispatch(actions.get_user_data_by_id(otheruserid)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(emailverification);