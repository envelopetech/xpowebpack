import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType, ButtonText } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Expohome from '../../components/exploreexpo/expohome';
//import Sidebarsearch from '../../components/sidebarsearch/sidebarsearch'
import Sidebar from '../../components/usermanage/sidebar/sidebar';
import Withoutback from '../../components/UI/Backhistory/backhistory';
import Spinner from '../../components/UI/Spinner/Spinner';
import { get_upcoming_expo } from '../../actions/events/dataactions'
import Tour from "reactour";

const initialState = {
    name: null,
    upcomingeventdata: null,
    loading: false,
    isTourOpen: false,
}

class expohome extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    // closeTour = () => {
    //     this.setState({ isTourOpen: false });
    // };

    // openTour = () => {

    //     this.setState({ isTourOpen: true });
    // };
    componentDidMount() {
        //this.openTour();
        const name = this.props.loggedinuser_name;
        const email = this.props.loggedinuser_email;
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = this.props.loggedin_user_id;
        const script = document.createElement("script");
        //const t = document.createTextNode("window.intercomSettings = {app_id: 'awgmsv98', name:'"+`${name}`+"', email:'"+`${email}`+"', created_at:'"+`${createdAt}`+"', user_id:'"+`${userId}`+"'};");
        const t = document.createTextNode("window.Intercom('boot', {app_id: 'awgmsv98', name:'" + `${name}` + "', email:'" + `${email}` + "', created_at:'" + `${createdAt}` + "', user_id:'" + `${userId}` + "'});");
        script.appendChild(t);
        //window.eval(script);
        document.body.appendChild(script);

        // const script1 = document.createElement("script");
        // const x = document.createTextNode((function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/awgmsv98' ;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})());
        // script1.appendChild(x);
        // window.eval(script1);
        // document.body.appendChild(script1);

        //let script = document.createElement('script');
        //script.onload = window.intercomSettings = {
        //    app_id: "awgmsv98",
        //    name:name,
        //    email:email,
        //    user_id:userId    
        //};

        //document.body.appendChild(script);

        // const script1 = document.createElement("script");
        // script1.onload = (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/awgmsv98' ;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();

        // document.body.appendChild(script1);

        this.setState({ loading: true })
        var data = get_upcoming_expo()
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ upcomingeventdata: res.data, loading: false })
                }
            }
        });
    }

    render() {
        // const { isTourOpen } = this.state;
        // const accentColor = "#5cb7b7";
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let content = null;
        let sidebarleftfix = null;
        sidebarleftfix = <Withoutback buttontext={ButtonText.back} isicon={true}></Withoutback>
        let sidebar =
            <React.Fragment>
                <Sidebar name={this.props.first_name}></Sidebar>
            </React.Fragment>
        content =
            <React.Fragment>
                
                {/* <Tour
                    onRequestClose={this.closeTour}
                    steps={tourConfig}
                    isOpen={isTourOpen}
                    maskClassName="mask"
                    className="helper"
                    rounded={5}
                    accentColor={accentColor}
                    onAfterOpen={this.disableBody}
                    onBeforeClose={this.enableBody}
                /> */}
                <Expohome                    
                    usertypename={this.props.usertypename}
                    loggedin_user_id={this.props.loggedin_user_id}
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
                    loggedin_user_profilepic_url={this.props.profilepic_url}
                    loggedinuser_email={this.props.loggedinuser_email}
                    loggedinuser_phonenumber={this.props.loggedinuser_phonenumber}
                    loggedinuser_name={this.props.loggedinuser_name}
                    upcomingeventdata={this.state.upcomingeventdata}
                    liveeventdata={this.state.liveeventdata}
                >
                </Expohome>
            </React.Fragment>
        return (
            <React.Fragment>
                {/* {authRedirect} */}
                {spinner}
                <Layout
                    sidebarchildrens={sidebar}
                    sidebarleftfixchildrens={sidebarleftfix}
                    contentchildrens={content}
                    pageType={PageType.explorewings}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
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
        currency_name: state.auth.currency_name,
        usertypename: state.auth.usertypename,
        loggedinuser_email: state.auth.email,
        loggedinuser_phonenumber: state.auth.phone_number,
        loggedinuser_name: state.auth.name,
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};

const tourConfig = [
    {
      selector: '[data-tut="reactour__start"]',
      content: `Ok, let's start with the name of the Tour that is about to begin.`
    },
];
export default connect(mapStateToProps, null)(withErrorHandler(expohome, axios));
//Add new post when user join wing and curator accept him/her as a wingster
//Add new post when wingster exit from wing