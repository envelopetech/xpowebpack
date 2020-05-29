import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import {PageType, ButtonText,usermanagetabindex, decodedstring} from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import Sidebar from '../../components/usermanage/sidebar/sidebar';
import { Redirect } from 'react-router-dom';
//import BackHistory from '../../components/UI/Backhistory/backhistory';
import Tabitems from '../../components/usermanage/leftbar/tabitems';
import Withoutback from '../../components/UI/Backhistory/withoutback';

const initialState = {              
    name:null ,
    tabindex:usermanagetabindex.wings,   
}
class usermanage extends Component {
    constructor(props)
    {
        super(props)
        this.state = initialState
        
    }    
    reset() {
        this.setState(initialState);
    }     
    onChange = (activeKey) => {        
        this.setState({
            tabindex:activeKey
        });
    }
    geturlparams() { 
        let tabindex;      
        if (this.props.match.params.id !== undefined) {            
            tabindex = decodedstring(this.props.match.params.id)
            this.setState({ tabindex: tabindex })
        }        
    }
    componentDidMount() {        
        this.geturlparams()       
    }
    render()
    {  
        let authRedirect =null;
        if (!this.props.isAuthenticated) {         
            authRedirect = <Redirect to="/" />                  
        }        
        let sidebar=null;   
        let sidebarleftfix =null;    
        sidebarleftfix =<Withoutback buttontext={ButtonText.back} isicon={true}></Withoutback>   
        sidebar= 
            <React.Fragment>                    
                <Sidebar name={this.props.first_name}></Sidebar>                   
            </React.Fragment>    
        let content = null;
        content=<React.Fragment>
                        <Tabitems
                        tabindex = {this.state.tabindex} 
                        onChange={this.onChange}
                        page_type={PageType.userwings}
                        usertypename={this.props.usertypename}
                        loggedin_user_id={this.props.loggedin_user_id}
                        first_name={this.props.first_name}
                        last_name={this.props.last_name}                        
                        loggedin_user_profilepic_url={this.props.profilepic_url}></Tabitems>
                </React.Fragment>
        
        return(   
            <React.Fragment>
                {authRedirect}        
                <Layout 
                    sidebarchildrens={sidebar}   
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
        first_name:state.auth.first_name == null ? "" :state.auth.first_name,       
        last_name:state.auth.last_name== null ? "" :state.auth.last_name,       
        authRedirectPath: state.auth.authRedirectPath,   
        profilepic_url:state.auth.profilepic_url,        
        loggedin_user_id: state.auth.userId,
        is_exhibitor:state.auth.is_exhibitor,
        usertypename:state.auth.usertypename,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};


export default connect(mapStateToProps, null)(withErrorHandler( usermanage, axios ));