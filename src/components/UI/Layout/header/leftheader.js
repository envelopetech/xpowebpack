import React from 'react';
import * as classshared from './classconst';
import xporiumlogo from '../../../../assets/images/143.511--x-25-px.png';
import { Redirect } from 'react-router-dom'

class leftheader extends React.Component {
    state = {
        redirecttohome: false,
    }
    redirecthandler = () => {
        this.setState({
            redirecttohome: true
        })
    }
    render() {
        let authRedirect = null;
        if (this.state.redirecttohome) {
            authRedirect = <Redirect to={`/expohome`} />
        }
        return (
            <React.Fragment>
                {authRedirect}
                <div className={classshared.logo_box} onClick={this.redirecthandler}>
                    <img src={xporiumlogo} alt="" className={classshared.logo} />
                </div></React.Fragment>
        )
    }
}
export default leftheader;