import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import shortid from "shortid";

const data = [{
    "invoicenumber": "123456789abcd",
    "plandate": "June 20, 2019",
    "plan": "$14.99",
    "status": "Pending",
    "invoiceurl": "https://cdn.filestackcontent.com/gqzJUeAdTfu88xaIu60E"
},
{
    "invoicenumber": "123456789abcd",
    "plandate": "June 20, 2019",
    "plan": "$14.99",
    "status": "Paid",
    "invoiceurl": "https://cdn.filestackcontent.com/gqzJUeAdTfu88xaIu60E"
}]
class billinghistory extends Component {

    constructor(props) {
        super(props);
        //uniqueId.enableUniqueIds(this);
        this.state = {
            billingdata: null
        }
    }
    render() {

        let listdiv = null
        let list = [];
        list = data//this.state.technicalspecdata;
        if (list !== null && list.length > 0) 
        {
            let detail = null;
            let intro_detail = [];
            list.map((item, i) => {
                detail = <tr key={item.id}>
                    <td><a target="_blank" rel="noopener noreferrer" href={item.invoiceurl}>{item.invoicenumber}</a></td>
                    <td>{item.plandate}</td>
                    <td>{item.plan}</td>
                    <td>{item.status}</td>
                </tr>
                return (
                    intro_detail.push(
                        <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                    )
                )
            })
            listdiv =
            <table className={classshared.bucket} id="attributes">
                <thead>
                    <th>Invoice No.</th>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Status</th>
                </thead>
                {intro_detail}
            </table>
        }
        return (
            <React.Fragment>
                <div className={classshared.w_container}>
                    <div className={classshared.margin_t_b_50}>
                        <h3 className={classshared.font_1_bold_text_dark.join(' ')}>Billing History</h3>
                        <div className={classshared.text_dark_dim_high_thin_margin_b_m.join(' ')}>You can view your payment history below.</div>
                        <div className={classshared.flex_border_top_padding_t_l.join(' ')}>
                            {listdiv}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default billinghistory