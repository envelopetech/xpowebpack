import React, { Component } from 'react';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../store/axios-orders';
import { PageType, ButtonText, tablename } from '../../../shared/utility';
import Layout from '../../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import { get_all_wings } from '../../../actions/wings/dataactions';
import { Redirect } from 'react-router-dom';
//import Nodatamessage from '../../../components/nodatamessage/nodatamessage'
//import nodataimage from '../../../assets/images/nodatafound.svg';
import Sidebar from '../../../components/wings/explorewings/sidebar';
import Explorewings from '../../../components/wings/explorewings/explorewings';
import Sidebarsearch from '../../../components/sidebarsearch/sidebarsearch'
import Spinner from '../../../components/UI/Spinner/Spinner';

const initialState = {
    wingsdata: null,
    totalwings: null,
    totalmembers: null,
    loading: false
}
class explorewing extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    componentDidMount() {
        this.setState({ loading: true })
        var data = get_all_wings()
        data.then(res => {
            if (res !== undefined) {
                if (res.data[0].length > 0) {
                    if (res.data[0]["error"] === undefined) {                          
                        this.setState({ wingsdata: res.data[0], loading: false }, () => {
                            this.setState({ totalwings: res.data[1] });
                            this.setState({ totalmembers: res.data[2] });
                        });
                    }
                }
            }
        });
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        let content = null;
        let sidebar = null;
        let sidebarleftfix = null;
        if (this.state.wingsdata !== null) {
            sidebarleftfix = <Sidebarsearch table_name={tablename.wings} exploretext={ButtonText.wings}></Sidebarsearch>
            sidebar =
                <React.Fragment>
                    <Sidebar
                        totalwings={this.state.totalwings}
                        totalwingsters={this.state.totalmembers}
                    ></Sidebar>
                </React.Fragment>
            content =
                <React.Fragment>
                    <Explorewings
                        loggedin_user_id={this.props.loggedin_user_id}                        
                        is_exhibitor={this.props.is_exhibitor}
                        currency_name={this.props.currency_name}
                        wingsdata={this.state.wingsdata}
                        loggedin_user_profilepic_url={this.props.profilepic_url}
                        usertypename={this.props.usertypename}
                    >
                    </Explorewings>
                </React.Fragment>
        }
        // else
        // {
        //     content =
        //     <Nodatamessage imagesource={nodataimage}
        //         type={nodatatext_image_configuration.sidebarworkhistory}
        //         nodata_message={nodatatext_message.nowings}
        //        >
        //     </Nodatamessage>
        // }
        return (
            <React.Fragment>
                {spinner}
                {authRedirect}
                <Layout
                    sidebarleftfixchildrens={sidebarleftfix}
                    sidebarchildrens={sidebar}
                    contentchildrens={content}
                    pageType={PageType.explorewings}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    profilepic_url={this.props.profilepic_url}
                    loggedin_user_id={this.props.loggedin_user_id}                    
                    is_exhibitor={this.props.is_exhibitor}
                    currency_name={this.props.currency_name}
                    bottomdivid="bottomsidebarwing"
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
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(explorewing, axios));
//Add new post when user join wing and curator accept him/her as a wingster
//Add new post when wingster exit from wing