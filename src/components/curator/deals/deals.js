import React, { Component } from 'react';
import shortid from "shortid";
import * as classshared from '../../commoncss/classconst';
import {
    ProfilepicType, ButtonType, ButtonText,
    label_text
    , ICONS, lead_status, nodatatext_image_configuration, nodatatext_message, socketendpoint
} from '../../../shared/utility';
import axios from '../../../store/axios-orders';
import { connect } from 'react-redux';
import Dealsitems from './dealsitems';
import { closed_deal_by_curator, get_leads_for_curator } from '../../../actions/curator/dataactions'
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import Spinner from '../../UI/Spinner/Spinner';
import socket from '../../../actions/socket';
import socketIOClient from "socket.io-client";

class deals extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending_leads_data: null,
            completed_leads_data: null,
            current_feed_id: null,
            loading: false,
            client: socket()
        }
    }
    leadclosemenuhandler = (event, id, index) => {
        event.preventDefault();
        this.setState({ loading: true })
        const dataval = {
            id: id,
            lead_status: lead_status.close
        };
        var data = closed_deal_by_curator(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                const pending_leads_datadata = Object.assign([], this.state.pending_leads_data);
                pending_leads_datadata.splice(index, 1);
                this.setState({ pending_leads_data: pending_leads_datadata, loading: false });
                if (res.data[1] !== null && res.data[1].length > 0) {
                    this.state.client.wing_lead_post_accept_by_curator_id(res.data[1])
                }
                if (this.state.completed_leads_data == null) {
                    this.setState({ completed_leads_data: res.data[0] })
                }
                else {
                    this.setState({ completed_leads_data: [res.data[0], ...this.state.completed_leads_data] })
                }
            }
        });
    }
    filldata() {
        this.setState({ loading: true })
        var data = get_leads_for_curator(this.props.wing_id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ pending_leads_data: res.data[0], completed_leads_data: res.data[1], loading: false });
                }
            }
        });
    }
    componentDidMount() {
        this.filldata();
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.on('show_callback_after_reject_lead_by_curator', (data) => {
            //remove data from list when lead would be rejected by curator
            let filterdata = this.state.pending_leads_data.filter((post) => {
                return data !== post.id;
            });            
            this.setState(state => {
                state.pending_leads_data = filterdata;
                return state;
            });
        })
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let pending_leads_list = [];
        let postdata = [];
        pending_leads_list = this.state.pending_leads_data;
        if (pending_leads_list !== null) {
            if (pending_leads_list.length > 0) {
                pending_leads_list.map((item, i) => {
                    let detail = <Dealsitems
                        current_feed_id={item.id}
                        completeddeal={false}
                        lead_type={item.lead_type}
                        leadstatusname={item.leadstatusname}
                        leadstatus={item.lead_status}
                        posttime={item.postdatetime}
                        statuschangeddatetime={item.statuschangeddatetime}
                        leaddealamounttext={label_text.leaddealamounttext}
                        currency_name={this.props.currency_name}
                        leadamount={item.lead_amount}
                        mentionusername={item.selectedwingstername}
                        btnuserpostmore={ButtonType.btnuserpostmore}
                        accepttext={ButtonText.accept}
                        rejecttext={ButtonText.reject}
                        profile_pic_url={item.visitor[0]["profile_pic_url"]}
                        ProfilepicType={ProfilepicType.user_nav__user_photo_small}
                        userpostername={item.visitor[0]["name"]}
                        postmessage={item.feed_message}
                        downloadfile={item.invoice_url}
                        btnlistdeleteedit={ButtonType.btnlistdeleteedit}
                        doticons={ICONS.MORE_VERTICAL}
                        leadclosemenuhandler={(event) => this.leadclosemenuhandler(event, item.id, i)}
                        //openleadrejectmodalhandler={(event) => this.openleadrejectmodalhandler(event, item.id)}
                        userpostid={item.visitor[0]["user_id"]}
                        mentionsuserid={item.wingster_user_id}>
                    </Dealsitems>
                    return (
                        postdata.push(
                            <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                        )
                    )
                });
            }
            else {
                postdata = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.nopendingdealsfound}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        let completed_leads_list = [];
        let completepostdata = [];
        completed_leads_list = this.state.completed_leads_data;
        if (completed_leads_list !== null) {
            if (completed_leads_list.length > 0) {
                completed_leads_list.map((item, i) => {
                    let detail = <Dealsitems
                        current_feed_id={item.id}
                        completeddeal={true}
                        lead_type={item.lead_type}
                        leadstatusname={item.leadstatusname}
                        leadstatus={item.lead_status}
                        posttime={item.postdatetime}
                        statuschangeddatetime={item.statuschangeddatetime}
                        leaddealamounttext={label_text.leaddealamounttext}
                        currency_name={this.props.currency_name}
                        leadamount={item.lead_amount}
                        mentionusername={item.selectedwingstername}
                        btnuserpostmore={ButtonType.btnuserpostmore}
                        accepttext={ButtonText.accept}
                        rejecttext={ButtonText.reject}
                        profile_pic_url={item.visitor[0]["profile_pic_url"]}
                        ProfilepicType={ProfilepicType.user_nav__user_photo_small}
                        userpostername={item.visitor[0]["name"]}
                        postmessage={item.feed_message}
                        downloadfile={item.invoice_url}
                        btnlistdeleteedit={ButtonType.btnlistdeleteedit}
                        doticons={ICONS.MORE_VERTICAL}
                        userpostid={item.visitor[0]["user_id"]}
                        mentionsuserid={item.wingster_user_id}>
                    </Dealsitems>
                    return (
                        completepostdata.push(
                            <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                        )
                    )
                });
            }
            else 
            {
                completepostdata = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.nocompleteddealfound}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.w_container}>
                    <div className={classshared.margin_top__lv8}><h3 className={classshared.font_1_bold_text_dark.join(' ')}>Deals</h3></div>
                    <div className={classshared.text_dark_dim_high_thin_margin_b_m.join(' ')}>Approve or reject the closure of leads submitted by your Wingsters</div>
                    <div className={classshared.size2of3_padding_t_l_border_top.join(' ')}>
                        <div className={classshared.margin_b_m}><div className={classshared.font_1_medium_text_14.join(' ')}>Pending Deals</div></div>
                        {postdata}
                        <div className={classshared.margin_top__lv8}>
                            <div className={classshared.margin_b_m} ><div className={classshared.font_1_medium_text_14.join(' ')}>Completed Deals</div></div>
                            {completepostdata}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         loading: state.streamlinereducer.loading
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         onuserwingfeedpostsave: (data, pagetype) => dispatch(actions.userpostsave(data, pagetype)),
//         onuserfeedpostdelete: (data, pagetype) => dispatch(actions.userpostdelete(data, pagetype)),
//     };
// };
export default connect(null, null)(deals, axios);