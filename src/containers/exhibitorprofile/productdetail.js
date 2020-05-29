import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../store/axios-orders';
import { PageType } from '../../shared/utility';
import Layout from '../../components/UI/Layout/layout';
import { connect } from 'react-redux';
import { get_exhibitor_product_by_id } from '../../actions/exhibitor/dataactions';
import { Redirect } from 'react-router-dom';
import { decodedstring } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';
import Productdetail from '../../components/exhibitorprofile/exhibitorproduct/productdetail'


const initialState = {
    product_data: null,
    loading: false,
    productid: null,
    otheruserid: null
}

class productdetail extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    geturlparams() {
        let productid = null;   
        if (this.props.match.params.id !== undefined) {
            productid = decodedstring(this.props.match.params.id)
        }
        return productid;
    }
    componentDidMount() {
        this.setState({ loading: true })
        window.scrollTo(0, 0);
        let productid = null;
        let otheruserid = null;        
        if (this.props.match.params.id !== undefined) {
            productid = decodedstring(this.props.match.params.id)
        }
        if (this.props.match.params.userid !== undefined) {
            otheruserid = decodedstring(this.props.match.params.userid)
        }
        this.setState({ productid: productid, otheruserid: otheruserid })
        var data = get_exhibitor_product_by_id(productid)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ product_data: res.data, loading: false })
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
        if (this.state.product_data !== null) {
            content =
                <React.Fragment>
                    <Productdetail
                        product_id={this.state.productid}
                        product_data={this.state.product_data}
                        currency_name={this.props.currency_name}
                        otheruserid={this.state.otheruserid}>
                    </Productdetail>
                </React.Fragment>
        }
        return (
            <React.Fragment>
                {spinner}
                {authRedirect}
                <Layout
                    contentchildrens={content}
                    pageType={PageType.exhibitorproductdetail}
                    first_name={this.props.first_name}
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
        wing_id: state.auth.wing_id,
        user_wing_id: state.auth.user_wing_id
    };
};
export default connect(mapStateToProps, null)(withErrorHandler(productdetail, axios));