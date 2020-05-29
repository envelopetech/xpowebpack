import React from 'react';
import { ButtonType, ButtonText, GST_value } from '../../shared/utility';
import Button from '../UI/Button/Button';
import { save_user_subscription_plan, create_customer_subscription_razor_pay } from '../../actions/subscription/dataactions';

class subscriptionplanitems extends React.Component {
    paynowhandler = () => {
        const dataval = {
            plan_id: this.props.id,
        }
        var returndata = create_customer_subscription_razor_pay(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    ////if user has 2999 plan and he/she want to upgrade 5999 then difference would be pay by the users
                    let amount = parseInt(this.props.price, 10)
                    let final_amount = 0;
                    if (this.props.user_plan_id !== null) {
                        if (this.props.id !== this.props.user_plan_id && this.props.plan_order > this.props.user_plan_order) {
                            amount = parseInt(this.props.price, 10) - parseInt(this.props.user_plan_price, 10)
                        }
                    }
                    final_amount = parseFloat(amount * (GST_value / 100))
                    final_amount = parseFloat(final_amount) + parseFloat(amount)
                    let options = {
                        "key": process.env.REACT_APP_RAZOR_API_KEY,
                        "amount": parseInt((final_amount * 100), 10),//this.props.price, // 2000 paise = INR 20, amount in paisa
                        "name": this.props.loggedinuser_name,
                        "description": "Test",
                        "image": this.props.loggedin_user_profilepic_url,
                        "subscription_id": "sub_DPaX4AatOZYyDI", //res.data["razor_subscription_id"],
                        "handler": function (response) {
                            console.log(JSON.stringify(response));
                            //insert data in database               
                            const dataval = {
                                plan_id: this.props.id,
                                payment_id: response.razorpay_payment_id,
                                payment_amount: final_amount,
                            }
                            var returndata = save_user_subscription_plan(dataval)
                            returndata.then(res => {
                                if (res !== undefined) {
                                    if (res.data["error"] === undefined) {
                                        //this.setState({ isopenapplyform: false, redirecttocurator: true });
                                    }
                                }
                            })
                        },
                        "prefill": {
                            "name": this.props.loggedinuser_name,
                            "email": this.props.loggedinuser_email,
                            "contact": this.props.loggedinuser_phonenumber
                        },
                    };
                    let rzp = new window.Razorpay(options);
                    rzp.open();
                }
                else {
                    alert(res.data["error"])
                }
            }
        })
    }
    render() {
        //if user has already plan then set border of that plan
        //if user want to upgrade the plan then button disabled for lesser plans
        let featuredivrender = null;
        if (this.props.features_list !== null && this.props.features_list.length > 0) {
            featuredivrender = this.props.features_list.map((item, i) => {
                return (
                    <li>
                        {item.name}
                    </li>
                )
            });
        }
        return (
            <React.Fragment>
                <div>
                    <div >{this.props.name}</div>
                    <ui>
                        {featuredivrender}
                    </ui>
                    <Button btntype={ButtonType.btn_purple_font_1_bold_text_15} clicked={this.paynowhandler}>{ButtonText.paynow}</Button>
                </div>
            </React.Fragment>
        )
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
}
export default subscriptionplanitems;