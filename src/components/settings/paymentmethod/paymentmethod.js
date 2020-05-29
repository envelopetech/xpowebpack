import React, { Component } from 'react';
import Paymentmethodform from './paymentmethodform'
import { update_user_payment_card_detail } from '../../../actions/userprofilesetup/dataactions'

class paymentmethod extends Component {
    constructor(props) {
        super(props)
        this.state ={
            openpopup_after_save:false
        }        
    }
    Submit = (values) => {
        const dataval = {
            card_number: values.cardnumber,
            cvv_number: values.cvvnumber,
            expiration_date: values.expirationcode,
            postal_code: values.postalcode,
        }
        var returndata = update_user_payment_card_detail(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({
                        openpopup_after_save:true
                    });
                }
            }
        })
    }

    

    render() {
        return (
            <React.Fragment>
                <Paymentmethodform
                    onSubmit={this.Submit}
                    page_type={this.props.page_type}
                    usertypename={this.props.usertypename}
                >
                </Paymentmethodform>
            </React.Fragment>
        )
    }
}
export default paymentmethod