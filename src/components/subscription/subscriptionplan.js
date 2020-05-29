import React, { Component } from 'react';
import { get_subscription_plan } from '../../actions/subscription/dataactions'
import Subscriptionplanitems from './subscriptionplanitems';
import * as classshared from '../commoncss/classconst';


class subscriptionplan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subscriptionplandata: null,
            usersubscriptiondata:null
        }
    }
    componentDidMount() {
        var data = get_subscription_plan()
        data.then(res => {           
            if (res !== undefined) {
                if (res.data[0]["error"] === undefined) {
                    
                    this.setState({ subscriptionplandata: res.data[0], usersubscriptiondata : res.data[1]});
                }
            }
        });
    }
    render() {
        let divrenderdata = null;
        if (this.state.subscriptionplandata !== null && this.state.subscriptionplandata.length > 0) {
            divrenderdata = this.state.subscriptionplandata.map((item, i) => {

                let user_plan_id=null;
                let user_plan_order=null;
                let user_plan_price= null

                if(this.state.usersubscriptiondata !== null && this.state.usersubscriptiondata.length > 0)
                {
                    user_plan_id = this.state.usersubscriptiondata[0]["id"]
                    user_plan_order = this.state.usersubscriptiondata[0]["plan_order"]
                    user_plan_price = this.state.usersubscriptiondata[0]["price"]
                }
                return (
                    <Subscriptionplanitems
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        is_user_plan={item.is_user_plan}
                        features_list={item.features_list}
                        plan_order ={item.plan_order}
                        loggedin_user_id={this.props.loggedin_user_id}                        
                        is_exhibitor={this.props.is_exhibitor}
                        currency_name={this.props.currency_name}
                        first_name={this.props.first_name}
                        last_name={this.props.last_name}
                        loggedin_user_profilepic_url={this.props.loggedin_user_profilepic_url}
                        loggedinuser_email = {this.props.loggedinuser_email}
                        loggedinuser_phonenumber= {this.props.loggedinuser_phonenumber}
                        loggedinuser_name={this.props.loggedinuser_name}
                        user_plan_id={user_plan_id}
                        user_plan_order={user_plan_order}
                        user_plan_price={user_plan_price}
                    >
                    </Subscriptionplanitems>
                )
            });
        }
        return (
            <React.Fragment>
                <div className={classshared.w_container_padding_all_l.join(' ')}>
                    {divrenderdata}
                </div>
            </React.Fragment>
        )
    }
}
export default subscriptionplan;