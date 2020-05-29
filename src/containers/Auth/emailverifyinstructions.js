import React, { Component } from 'react';
import * as classshared from './ClassConst';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import { ButtonType } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import { verify_email_send } from '../../actions/userprofile/dataactions'
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { GTM_ID } from '../../shared/utility';
import GoogleTagManager from '../../shared/GoogleTagManager'

class emailverifyinstructions extends Component {
    state = {
        loading: false
    }
    componentDidMount() {
        
        this.sendemailverificationemail();
    }
    resendemailverificationmail = () => {
        this.setState({ loading: true })
        this.sendemailverificationemail();
    }
    sendemailverificationemail() {
        if (this.props.userId !== null) {
            const dataval = {
                user_id: this.props.userId
            };
            var data = verify_email_send(dataval)
            data.then(res => {
                if (res !== undefined) {
                    this.setState({ loading: false })
                }
            });
        }
    }
    render() {
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
                            <h1 className={classshared.font1_bold_dark.join(' ')}>Please confirm your email address</h1>
                            <div className={classshared.margin_top__lv4}>
                                <p className={classshared.paragraphletter}>Yay! Thank you for joining Xporium. There's one quick step you need to complete before setting up your Xporium account. For security reasons, we need to verify your email address. Please check your inbox for an email confirmation link. Be sure to check your spam too.</p>
                            </div>
                            <div className={classshared.margin_top__lv4}>
                                <p className={classshared.paragraphletter}>In case, you do not receive any verification email within 5 minutes, please click on the button below to resend the mail.</p>
                            </div>

                            <div className={classshared.login_content__main.join(' ')}>
                                <div className={classshared.login_form}>

                                <Button btntype={ButtonType.signuploginlink} buttontype="button" clicked={this.resendemailverificationmail}>Didn't receive any mail? Click to resend</Button></div>
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
        userId: state.auth.userId,
    };
};
export default connect(mapStateToProps, null)(emailverifyinstructions);