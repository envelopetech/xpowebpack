import React, { Component } from 'react';
import * as classshared from '../classconst';
import {
    ProfilepicType, ICONS, commonplaceholder, ButtonType, PageType, ButtonText, lead_status, titleheading
    , Wingposttype, encodedstring
    , Userwingstabindex, users_type,
    label_text
    , confirmdelete
} from '../../../shared/utility';
import CuratorSection from './curatorsection';
import FilterSection from './filtersection';
import Feedpost from './feedpost';
import shortid from "shortid";
import Userwingstreamlineitem from './userwingstreamlineitem';
import { get_flat_user_wing_feeds, userwingpostsave } from '../../../actions/wings/dataactions'
import reactStringReplace from 'react-string-replace';
import { NavLink } from 'react-router-dom';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import DeleteConfirmation from '../../UI/Deleteconfirmation/deleteconfirmation'
import MediaQuery from 'react-responsive';
import socket from '../../../actions/socket';

class userwingstreamline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttondisabled: true,
            list_wings_feeds: null,
            filterpostvalue: null,
            filtertypevalue: null,
            filterpostedonvalue: null,
            filterconversionstatusvalue: null,
            clearfields_after_submit: false,
            error_message: null,
            delete_item_id: null,
            deleteindexindex: null,
            client: socket()
        }
    }
    FilterhandlePostChange = (e, { value }) => this.setState({ filterpostvalue: value })
    FilterhandleTypeChange = (e, { value }) => this.setState({ filtertypevalue: value })
    FilterhandlePostedonChange = (e, { value }) => this.setState({ filterpostedonvalue: value })
    FilterhandleConversionStatusChange = (e, { value }) => this.setState({ filterconversionstatusvalue: value })
    filldata() {
        var data = get_flat_user_wing_feeds(this.props.wing_id, this.props.post_type)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ list_wings_feeds: res.data });
                }
            }
        });
    }
    deleteitemconfirmhandler = (event, id, index) => {
        event.preventDefault();
        this.setState({ delete_item_id: id, deleteindexindex: index }, () => {
            confirmdelete(this.deleteposthandler);
        });
    }
    deleteposthandler = (event, id, index) => {
        if (id === null || id === undefined) {
            id = this.state.delete_item_id
            index = this.state.deleteindexindex
        }
        const data = {
            id: id,
            wing_id: this.props.wing_id
        };
        this.props.onuserfeedpostdelete(data, PageType.userwings);
        const list_wings_feeds = Object.assign([], this.state.list_wings_feeds);
        list_wings_feeds.splice(index, 1);
        this.setState({ list_wings_feeds: list_wings_feeds });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.filldata();
    }
    submit = (values) => {
        let posttype = values.posttype
        let leadstatus = null
        if (values.text_message !== undefined) {
            let userid = null;
            let mentioned_user = null
            if (values.user_id !== undefined) {
                mentioned_user = values.user_id
            }
            if (values.selectedwingsterid !== undefined) {
                userid = values.selectedwingsterid
            }
            if (values.posttype === undefined) {
                posttype = Wingposttype.general.toLowerCase()
            }
            if (posttype === Wingposttype.lead.toLowerCase()) {
                leadstatus = lead_status.open;
            }
            if (posttype === Wingposttype.lead.toLowerCase() && values.selectedwingsterid === undefined) {
                this.setState({ error_message: "Please select wingster" })
                return;
            }
            const data = {
                id: this.props.id,
                post_type: posttype,
                feed_message: values.text_message,
                lead_type: values.leadtype,
                lead_status: leadstatus,
                mention_user_id: mentioned_user,
                wingster_user_id: userid,
                wing_id: this.props.wing_id,
                contact_number: values.phonenumber,
                contact_name: values.firstname
            };
            var listdata = userwingpostsave(data)
            listdata.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({ clearfields_after_submit: true }, () => {

                            if (this.state.list_wings_feeds === null) {
                                this.setState({ clearfields_after_submit: false, list_wings_feeds: res.data[0] })
                            }
                            else {
                                this.setState({ clearfields_after_submit: false, list_wings_feeds: [res.data[0], ...this.state.list_wings_feeds] })
                            }
                        });
                        this.state.client.wing_feed_post_save(res.data[1]);
                    }
                }
            });
        }
    }
    render() {
        //#region Check tabindex based on that right section would be displayed
        let rightsectiondiv = null;
        if (this.props.tabitems.toString() === Userwingstabindex.streamline.toString()) {
            rightsectiondiv = <CuratorSection></CuratorSection>
        }
        else {
            rightsectiondiv = <FilterSection tabitems={this.props.tabitems}
                wings_users={this.props.wings_users}
                wing_id={this.props.wing_id}
                filterpostvalue={this.state.filterpostvalue}
                filtertypevalue={this.state.filtertypevalue}
                filterpostedonvalue={this.state.filterpostedonvalue}
                FilterhandlePostChange={this.FilterhandlePostChange}
                FilterhandleTypeChange={this.FilterhandleTypeChange}
                FilterhandleConversionStatusChange={this.FilterhandleConversionStatusChange}></FilterSection>
        }
        //#endregion
        let list = [];
        let postdata = [];
        list = this.state.list_wings_feeds;
        if (list !== null) {
            if (list.length > 0) {
                list.map((item, i) => {
                    let detail = null;
                    let divid = "winggeneral"
                    let displayleadcontent = false
                    let closeleadbuttonvisible = false;
                    let deletebuttonvisible = false;
                    let wallheader = item.wall_post_type_header
                    let leadstatusisopen = false;
                    let directmessagedivdisplay = true;
                    let divborderconversion = "";
                    let leadstatusmessage = "";
                    let leadstatusmessagetext = "";
                    let leaddealamounttext = "";
                    if (item.post_type === Wingposttype.lead.toLowerCase()) {
                        divid = "winglead";
                        displayleadcontent = true;
                    }
                    else if (item.post_type === Wingposttype.recommend.toLowerCase()) {
                        divid = "wingrecommend";
                    }
                    if (item.posting_user_id === this.props.loggedin_user_id) {
                        deletebuttonvisible = true;
                    }
                    if (item.wingster_user_id !== null) {
                        if (item.wingster_user_id === this.props.loggedin_user_id) {
                            closeleadbuttonvisible = true;
                            wallheader = wallheader + " to you"
                        }
                        else {
                            wallheader = wallheader + " to " + item.selectedwingstername
                            let userid = encodedstring(item.wingster_user_id)
                            wallheader = reactStringReplace(wallheader, item.selectedwingstername, (match, i) => (
                                <NavLink
                                    key={shortid.generate()}
                                    id="bluelink"
                                    className={classshared.anchorremoveline.join(' ')}
                                    to={`/home/${userid}`}>{match}</NavLink>
                            ));
                        }
                    }
                    if (item.lead_status !== null) {
                        if (item.lead_status.toLowerCase() !== lead_status.open.toLowerCase()) {
                            directmessagedivdisplay = false;
                        }
                    }
                    if (this.props.tabitems.toString() === Userwingstabindex.conversion.toString()) {
                        divborderconversion = "divborderconversion"
                        closeleadbuttonvisible = false;
                        if (item.lead_status.toLowerCase() === lead_status.close.toLowerCase()) {
                            divid = "leadsuccess";
                            leadstatusmessage = label_text.congratulations;
                            leadstatusmessagetext = label_text.congratsleadmessage;
                            leaddealamounttext = label_text.leaddealamounttext;
                        }
                        else if (item.lead_status.toLowerCase() === lead_status.lose.toLowerCase()) {
                            divid = "leadfail";
                            leadstatusmessage = label_text.oops;
                            leadstatusmessagetext = label_text.leadlosemessage;
                        }
                    }
                    detail = <Userwingstreamlineitem
                        usertypename={this.props.usertypename}
                        leaddealamounttext={leaddealamounttext}
                        leadamount={item.lead_amount}
                        leadstatusmessage={leadstatusmessage}
                        leadstatusmessagetext={leadstatusmessagetext}
                        divborderconversion={divborderconversion}
                        directmessagedivdisplay={directmessagedivdisplay}
                        lead_status={item.lead_status}
                        leadstatusname={item.leadstatusname}
                        curatorname={item.curatorname}
                        key={item.id}
                        id={item.id}
                        currency_name={this.props.currency_name}
                        wing_id={this.props.wing_id}
                        leadstatus={item.lead_status}
                        statuschangeddatetime={item.statuschangeddatetime}
                        leadstatusisopen={leadstatusisopen}
                        userpostcomment={commonplaceholder.userpostcomment}
                        deletebuttontext={ButtonText.delete}
                        deletebuttonvisible={deletebuttonvisible}
                        PageType={PageType.userwings}
                        closeleadbuttonvisible={closeleadbuttonvisible}
                        displayleadcontent={displayleadcontent}
                        divid={divid}
                        profile_pic_url={item.visitor[0]["profile_pic_url"]}
                        ProfilepicType={ProfilepicType.user_nav__user_photo_small}
                        wall_post_type_header={wallheader}
                        userpostername={item.visitor[0]["name"]}
                        lead_type={item.lead_type}
                        posttime={item.postdatetime}
                        postmessage={item.feed_message}
                        loggedin_user_id={this.props.loggedin_user_id}
                        currentuserlike={item.currentuserlike}
                        loggedin_user_pic_url={this.props.loggedin_user_pic_url}
                        currentuserprofileforcomment={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m}
                        totallikescount={item.likes}
                        totalcommentscount={item.comments[1]}
                        totalcommentsdata={item.comments[0]}
                        btnuserpostmore={ButtonType.btnuserpostmore}
                        doticons={ICONS.MORE_VERTICAL}
                        thumbsups={ICONS.THUMBSUPS}
                        postcomments={ICONS.POSTCOMMENTS}
                        postshare={ICONS.POSTSHARE}
                        btnsharecommentlikepost={ButtonType.btnsharecommentlikepost}
                        showMenuLeadhandler={this.showMenuLead}
                        showMenuLead={this.state.showMenuLead}
                        btnlistdeleteedit={ButtonType.btnlistdeleteedit}
                        dealclosetext={ButtonText.closelead}
                        reporttext={ButtonText.report}
                        deleteposthandler={(event) => this.deleteitemconfirmhandler(event, item.id, i)}
                        refusedlead={ButtonText.refusedlead}
                        tabitems={this.props.tabitems}
                        lead_reject_comment={item.lead_reject_comment}
                    >
                    </Userwingstreamlineitem>
                    return (
                        postdata.push(
                            <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                        )
                    )
                });
            }
        }
        let placeholder = commonplaceholder.userfeedpost;
        return (
            <React.Fragment>                
                <div className={classshared.margin_t_b_25}>
                <MediaQuery query="(min-device-width: 1224px)">
                    <React.Fragment>{rightsectiondiv} </React.Fragment></MediaQuery>
                    <div className={classshared.flex_column.join(' ')}>
                        <div id="feed">
                            {
                                this.props.usertypename !== users_type.visitor && this.props.is_member ?
                                    (
                                        this.props.tabitems.toString() === Userwingstabindex.streamline.toString() ?
                                            (
                                                <Feedpost placeholder={placeholder}
                                                    usertypename={this.props.usertypename}
                                                    clearfields_after_submit={this.state.clearfields_after_submit}
                                                    PostProfilepicType={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m}
                                                    onSubmit={this.submit}
                                                    loggedin_user_pic_url={this.props.loggedin_user_pic_url}
                                                    feedmessagedchanged={this.feedmessagedchanged}
                                                    btntype={ButtonType.btnuserfeedpost}
                                                    userfeedposthandler={this.userfeedposthandler}
                                                    buttondisabled={this.state.buttondisabled}
                                                    buttontext={ButtonText.post}
                                                    is_cancel_button_show={false}
                                                    is_photo_button_show={false}
                                                    pagetype={PageType.userprofilestreamline}
                                                    wing_id={this.props.wing_id}
                                                    error_message={this.state.error_message}>
                                                </Feedpost>
                                            ) :
                                            null
                                    ) : null
                            }
                            <div className={classshared.margin_t_b_25}><div className={classshared.font_1_medium_text_14.join(' ')}>{titleheading.latestposts}</div></div>
                            {postdata}
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
export default userwingstreamline;