import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import * as classshared from './ClassConst';
import Authform from './authform';
import { ButtonText, ButtonType, ReactGoogleAnalytics,GTM_ID } from '../../shared/utility';
import GoogleButton from 'react-google-button'
import { withStyles } from '@material-ui/styles';
import { flex } from '../../components/commoncss/classconst';
import GoogleTagManager from '../../shared/GoogleTagManager'

const styles = {
    loginContentMain: {
        display: 'flex',
        '@media (max-width: 768px)': {
            flexFlow: 'column-reverse',
        }
    },
    loginContentRight: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 768px)': {
            flexFlow: 'column-reverse',
        }
    },

    seperator: {
        border: '1px dotted #eeeeee',
        width: '1px',
    },

    loginContentLeft: {
        marginRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'center',
        '@media (max-width: 768px)': {
            borderRight: 'none',
            marginTop: '20px',
            marginRight: '0px',
        }
    }
}

class Auth extends Component {
    state = {
        islogin: true,
        errormessage: '',
        signuptext: "Login",
        signupsubtext: "New to Xporium?",
        is_social_login: false
    }
    componentDidMount() {
        ReactGoogleAnalytics()
        document.body.classList.add('privacypolicy');
    }
    submit = (values) => {
        const authData = {
            email: values.email,
            password: values.password,
            first_name: values.firstname,
            last_name: values.lastname
        };
        this.props.onAuth(authData, this.state.islogin);
    }
    handlesavesocialdata(res, type) {
        let postData;           
        if (type === 'facebook') {
            if (res.name !== undefined) {
                var resname = res.name.split(" ");
                postData = {
                    email: res.email,
                    first_name: resname[0],
                    last_name: resname[1],
                    provider: type,
                    provider_id: res.id,
                    token: res.accessToken,
                };
            }

        }
        else if (type === 'google') {            
            if (res.profileObj !== undefined) {
                var resname = res.profileObj.name.split(" ");
                postData = {
                    email: res.profileObj.email,
                    first_name: resname[0],
                    last_name: resname[1],
                    provider: type,
                    provider_id: res.profileObj.googleId,
                    token: res.tokenObj.access_token,
                    profile_pic_url:res.profileObj.imageUrl
                };
            }
        }
        this.setState({ is_social_login: true })
        this.props.onauth_social_login(postData);
    }
    isloginhandler = () => {
        this.setState({ islogin: true, signuptext: "Login", signupsubtext: "New to Xporium?" })
    }
    issignuphandler = () => {
        this.setState({ islogin: false, signuptext: "Sign Up", signupsubtext: "Already have an account?" })
    }
    render() {

        console.log(process.env.NODE_ENV.REACT_APP_GTM_ID); 
        console.log(process.env.NODE_ENV.REACT_APP_OWN_URL);
        
        const { classes } = this.props;
        const responseFacebook = (response) => {
            if (response.error === "" || response.error === null || response.error === undefined) {
                this.handlesavesocialdata(response, 'facebook');
            }
        }
        const responseGoogle = (response) => {
            if (response.error === "" || response.error === null || response.error === undefined) {
                this.handlesavesocialdata(response, 'google');
            }
        }
        if (this.props.loginsuccess) {
            if (!this.state.is_social_login) {
                if (this.state.islogin) {
                    if (this.props.current_step.toString() === "3") {
                        return <Redirect to="/expohome" />
                    }
                    else {
                        return <Redirect to="/profilesetup" />
                    }
                }
                else {
                    return <Redirect to="/verifyemail" />
                }
            }
            else {
                if (this.props.current_step.toString() === "3") {
                    return <Redirect to="/expohome" />
                }
                else {
                    return <Redirect to="/profilesetup" />
                }
            }
        }
        let is_remember_me = localStorage.getItem('is_remember_me')
        if (JSON.parse(is_remember_me) === true) {
            if (this.props.current_step.toString() === "3") {
                return <Redirect to="/expohome" />
            }
            else {
                return <Redirect to="/profilesetup" />
            }
        }
        let errordiv = null;
        if (this.props.error !== null) {
            errordiv = <span className={classshared.formlabelerror}>{this.props.error}</span>
        }
        let form = null
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <React.Fragment>
                <GoogleTagManager gtmId={GTM_ID} />
                <div className={classshared.h_container.join(' ')}>
                    <div className={classshared.navbar}>
                        <div className={classshared.w_container}>
                            <a href="https://xporium.com" className={classshared.brand}><img src={logoimage} height="40" alt=""></img></a>
                        </div>
                    </div>
                    <div className={classshared.login_content_login}>
                        <div className={classshared.center}>
                            <h1 className={classshared.font1_bold_dark.join(' ')}>{this.state.signuptext}</h1>
                            <div className={classshared.text_dark}>{this.state.signupsubtext}
                                {
                                    this.state.islogin
                                        ?
                                        <Button btntype={ButtonType.signuploginlink}
                                            clicked={this.issignuphandler}>{ButtonText.signup}
                                        </Button>
                                        :
                                        <Button btntype={ButtonType.signuploginlink}
                                            clicked={this.isloginhandler}>{ButtonText.login}
                                        </Button>
                                }
                            </div>
                        </div>
                        <div className={classshared.form_group_width90per.join(' ')}>
                            {errordiv}
                        </div>
                        <div className={classes.loginContentMain}>
                            <div className={classes.loginContentLeft}>
                                <Authform onSubmit={this.submit} islogin={this.state.islogin}></Authform>
                                {form}
                                <div>
                                    <div>* By signing up, you agree to our <a href="https://app.xporium.com/termsofservice" target="_blank" rel="noopener noreferrer">Terms of Use</a> and to receive Xporium emails &amp; updates and acknowledge that you read our <a href="https://app.xporium.com/privacypolicy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</div>
                                </div>
                            </div>
                            <div className={classes.seperator}></div>
                            <div className={classes.loginContentRight}>
                                <div>or</div>
                                <div className={classshared.social_buttons}>
                                    <FacebookLogin
                                        //appId="490528244723594"    for live
                                        appId="893847197695992" //for local
                                        autoLoad={false}
                                        cssClass={classshared.loginbuttonfacebook.join(' ')}
                                        textButton="Continue with Facebook"
                                        fields="name,email,picture.type(large)"
                                        callback={responseFacebook} />
                                </div>
                                <div className={classshared.social_buttons}>
                                    <GoogleLogin
                                        clientId="793109626271-8i74gercmb9bslv6jpf0pncvsrkkuhig.apps.googleusercontent.com"
                                        autoLoad={false}
                                        render={renderProps => (
                                            <GoogleButton
                                                onClick={renderProps.onClick}
                                                type="light"
                                            />
                                        )}
                                        buttonText="Sign in with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="compliance" className={classshared.compliancediv}>
                        <a className={classshared.complienceanchor} href="https://app.xporium.com/privacypolicy" target="_blank" rel="noopener noreferrer">Privacy Policy &bull; </a>
                        <a className={classshared.complienceanchor} href="https://app.xporium.com/termsofservice" rel="noopener noreferrer" target="_blank">Terms of Service &bull; </a>
                        <a className={classshared.complienceanchor} href="https://app.xporium.com/cookies" rel="noopener noreferrer" target="_blank">Cookies</a><br></br>
                        <span>&copy; Xporium Technologies Pte Ltd</span>
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
        onAuth: (authData, islogin) => dispatch(actions.auth(authData, islogin)),
        onauth_social_login: (authData) => dispatch(actions.auth_social_login(authData)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));