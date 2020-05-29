import React, { Component } from 'react';
import * as classshared from './ClassConst';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import Forgetpasswordform from './forgetpasswordform'
import Spinner from '../../components/UI/Spinner/Spinner';
import { forget_password_email_send } from '../../actions/userprofile/dataactions';
import { GTM_ID } from '../../shared/utility';
import GoogleTagManager from '../../shared/GoogleTagManager'

class forgetpassword extends Component {
    state = {
        emailaddress: null,
        showinstructiondiv: false,
        showpassworddiv: true,
        errormessage_show: false,
        errormessage_text: null,
        loading: false
    }
    submit = (values) => {
        this.setState({ loading: true })
        const dataval = {
            email_address: values.workemail
        };
        var data = forget_password_email_send(dataval)
        data.then(res => {           
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ emailaddress: values.workemail, showinstructiondiv: true, showpassworddiv: false, loading: false })
                }
                else {
                    this.setState({ errormessage_show: true, errormessage_text: res.data["error"], loading: false })
                }
            }
        });
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
                        {
                            this.state.showpassworddiv ?
                                (
                                    <React.Fragment>
                                        <div className={classshared.center}>
                                            <h1 className={classshared.font1_bold_dark.join(' ')}>Forgot Password</h1>
                                            <div className={classshared.text_dark}>Please enter your email address which was used to create the account</div>
                                        </div>
                                        <div className={classshared.login_content__main.join(' ')}>
                                            <Forgetpasswordform
                                                onSubmit={this.submit}
                                                errormessage_show={this.state.errormessage_show}
                                                errormessage_text={this.state.errormessage_text}></Forgetpasswordform>                                            
                                        </div>
                                    </React.Fragment>) : null
                        }
                        {
                            this.state.showinstructiondiv ?
                                (<div className={classshared.center}>
                                    <h1 className={classshared.font1_bold_dark.join(' ')}>Instructions Sent!</h1>
                                    <div className={classshared.margin_top__lv4}>
                                        <div className={classshared.text_dark}>Instructions for resetting your password have been sent to
                                        <strong> {this.state.emailaddress}</strong>. Be sure to check your spam folder, too.</div></div>
                                </div>) : null
                        }

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default forgetpassword;
