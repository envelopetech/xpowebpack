import React, { Component } from 'react';
import Changepasswordform from './changepasswordform'
import * as classshared from './ClassConst';
import { user_change_password } from '../../actions/userprofilesetup/dataactions'
import logoimage from '../../assets/images/574.043--x-100-px.png';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import * as actions from '../../store/actions/index';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GTM_ID } from '../../shared/utility';
import GoogleTagManager from '../../shared/GoogleTagManager'

class changepassword extends Component  {
    state = {
        message: null,
        hidden: true,
        otheruserid: null,
        loading: false,
        loginsuccess:false,
        logoutredirect:null

    }
    geturlparams() {
        let userid = null;
        if (this.props.match.params.id !== undefined) {
            userid = this.props.match.params.id
        }
        return userid;
    }    
    componentDidMount() {        
        let otheruserid = this.geturlparams()
        this.setState({ otheruserid: otheruserid })
    }       
    Submit = (values) => {
        this.setState({ loading: true })
        const dataval = {
            password: values.newpassword,
            otheruserid: this.state.otheruserid
        }
        var returndata = user_change_password(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) { 
                    this.setState({logoutredirect:false})                     
                    // const authData = {
                    //     email: res.data[0]["email"],
                    //     password: values.newpassword
                    // };
                    // this.props.onAuth(authData);
                    // this.setState({ loading: false })
                }
            }
        })
    }
    render() { 
        if (this.state.logoutredirect === false) {
            return <Redirect to="/logout" />
        }         
        // let spinnerform = null
        // if (this.state.loading) {
        //     spinnerform = <Spinner />
        // }        
        // if (this.props.loginsuccess) {
        //     if (this.props.current_step !== undefined) {
        //         if (this.props.current_step.toString() === "3") {
        //             return <Redirect to="/expohome"></Redirect> 
        //         }
        //         else {
        //             return <Redirect to="/profilesetup"></Redirect>
        //         }
        //     }
        // }

        return (
            <React.Fragment>
                 <GoogleTagManager gtmId={GTM_ID} />
                {/* {spinnerform} */}
                <div className={classshared.h_container.join(' ')}>
                    <div className={classshared.navbar}>
                        <div className={classshared.w_container}>
                            <a href="https://xporium.com" className={classshared.brand}><img src={logoimage} height="40" alt=""></img></a>
                        </div>
                    </div>
                    <div className={classshared.login_content}>

                        <div className={classshared.center}>
                            <h1 className={classshared.font1_bold_dark.join(' ')}>Change Password</h1>
                            <div className={classshared.text_dark}>Please enter new password</div>
                        </div>

                        <div className={classshared.login_content__main.join(' ')}>
                            <Changepasswordform
                                onSubmit={this.Submit}
                                usertypename={this.props.usertypename}
                                changedmessage={this.state.message}
                                logoutredirect= {this.state.logoutredirect}>
                            </Changepasswordform>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
// const mapStateToProps = state => {
//     return {       
//         loginsuccess: state.auth.loginsuccess,
//         current_step: state.auth.current_step
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (authData) => dispatch(actions.auth(authData, true)),
//     };
// };
//export default connect(mapStateToProps, mapDispatchToProps)(changepassword);
export default changepassword;

