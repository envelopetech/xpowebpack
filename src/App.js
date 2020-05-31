import React, { Suspense } from 'react';
import { Router } from 'react-router';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { createBrowserHistory } from 'history';

import AuthenticatedRoute from './containers/Auth/AuthenticatedRoute'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import Testvideocalling from './containers/test/videocallingtest'
import Eventtest from './containers/Auth/eventtest'
import Forgetpassword from './containers/Auth/forgetpassword'
import Changepassword from './containers/Auth/changepassword'
import Verifyemail from './containers/Auth/emailverifyinstructions'
import Privacypolicy from './containers/Auth/privacypolicy'
import TermsofService from './containers/Auth/termsofservice'
import Emailverification from './containers/Auth/emailverification'
import Userpersonalprofile from './containers/userprofile/userprofile'
import Userpersonalsetup from './containers/userprofilesetup/userprofilesetup'
import Usermanage from './containers/usermanage/usermanage'
import Exhibitionprofile from './containers/exhibitionprofile/exhibitionprofile'
import Exhibitorprofile from './containers/exhibitorprofile/exhibitorprofile'
import Productdetail from './containers/exhibitorprofile/productdetail'
import Userwings from './containers/wings/userwings/userwings'
import Explorewings from './containers/wings/explorewings/explorewing'
import Explorepeople from './containers/explorepeople/explorepeople'
import Exploreexpo from './containers/exploreexpo/exploreexpo'
import Exploreexpohome from './containers/exploreexpo/expohome'
import Curator from './containers/curator/curator'
import Settings from './containers/settings/settings'
import Subscription from './containers/subscription/subscriptionplan'
import Allnotifications from './containers/notifications/notifications'
import Comingsoon from './containers/comingsoon/comingsoon'
import Mobilesearch from './containers/mobilesearch/mobilesearch'
import Events from './containers/events/events'
import EventProfile from './containers/exhibitionprofile/eventprofile'


const history = createBrowserHistory();

class App extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     client: socket()
  //   }
  // }

  componentDidMount() {
    // this.state.client.test();
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <Suspense fallback={<p>...</p>}>
      <Router history={history}>
        <Switch>         
          <Route exact path="/" component={Auth}></Route>
          <Route exact path="/login/:id?" component={Auth}></Route>
          <AuthenticatedRoute path="/home/:id?" component={Userpersonalprofile} />
          <AuthenticatedRoute path="/profilesetup" component={Userpersonalsetup} />
          <AuthenticatedRoute path="/usermanage/:id?" component={Usermanage} />
          <AuthenticatedRoute path="/curate" component={Curator} />
          <AuthenticatedRoute path="/events" component={Events} />
          <AuthenticatedRoute path="/settings" component={Settings} />
          <AuthenticatedRoute path="/exhibitionprofile/:id?" component={Exhibitionprofile} />
          <AuthenticatedRoute path="/exhibitorprofile/:id?" component={Exhibitorprofile} />
          <AuthenticatedRoute path="/exhibitorproductdetail/:id?/:userid?" component={Productdetail} />
          <AuthenticatedRoute path="/userwings/:id?" component={Userwings} />
          <AuthenticatedRoute path="/explorewings" component={Explorewings} />
          <AuthenticatedRoute path="/explorepeople" component={Explorepeople} />
          <AuthenticatedRoute path='/exploreexpo' component={Exploreexpo} />
          <AuthenticatedRoute path='/expohome' component={Exploreexpohome} />
          <AuthenticatedRoute path='/subscription' component={Subscription} />
          <AuthenticatedRoute path='/notifications' component={Allnotifications} />
          <AuthenticatedRoute path='/comingsoon' component={Comingsoon} />
          <AuthenticatedRoute path="/mobilesearch" component={Mobilesearch} />
          <AuthenticatedRoute path="/logout" component={Logout} />
          <Route path="/eventprofile" component={EventProfile} />
          <Route path="/testvideocalling" component={Testvideocalling} />
          <Route path="/forgetpassword" component={Forgetpassword} />
          <Route path="/changepassword" component={Changepassword} />
          <Route path="/verifyemail" component={Verifyemail} />
          <Route path="/privacypolicy" component={Privacypolicy} />
          <Route path="/termsofservice" component={TermsofService} />
          <Route path="/emailverification/:id?" component={Emailverification} />
          <Route path="/eventtest" component={Eventtest} />
          {/* <Route path='/comingsoon' render ={props => <Comingsoon {...props} />}/> */}
        </Switch>
      </Router>
    </Suspense>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
