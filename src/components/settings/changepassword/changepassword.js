import React, { Component } from 'react';
import Changepasswordform from './changepasswordform'
import * as classshared from '../../commoncss/classconst';
import { user_change_password } from '../../../actions/userprofilesetup/dataactions'
import { Redirect } from 'react-router-dom';


class changepassword extends Component {
    state = {
        message: null,
        hidden: true,
        logoutredirect:null
    }
    Submit = (values) => { 
        this.setState({logoutredirect:true})        
        const dataval = {
            password: values.newpassword,
        }
        var returndata = user_change_password(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {                    
                    this.setState({logoutredirect:false})                    
                }
            }
        })
    }
    render() {          
        if (this.state.logoutredirect === false) {
            return <Redirect to="/logout" />
        }
        return (
            <React.Fragment>
                <div className={classshared.main__hero_content.join(' ')}>
                    <div className={classshared.centered}>
                        <h1 className={classshared.font_1_regular_text_dark.join(' ')}>Change Password</h1>
                        <div className={classshared.font_weight_thin_text_dark.join(' ')}></div>
                        <div className={classshared.padding_t_l}><div className={classshared.flex}></div>
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
export default changepassword