import React, { Component } from 'react';
import shortid from "shortid";
import * as classshared from '../../commoncss/classconst';
import {
    ProfilepicType, ButtonType,
    ICONS, nodatatext_image_configuration, nodatatext_message, ButtonText, wingster_wing_status, confirmdelete
} from '../../../shared/utility';
import Wingsterlistitem from './wingsterlistitem';
import { get_wingsters_for_curator, wingster_request_update_by_curator, wingster_request_reject_by_curator } from '../../../actions/curator/dataactions'
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import Spinner from '../../UI/Spinner/Spinner';
import socket from '../../../actions/socket';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import DeleteConfirmation from '../../UI/Deleteconfirmation/deleteconfirmation'



class wingsterlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newapplicationdata: null,
            newapplicationcount: 0,
            currentwingstercount: 0,
            currentwingsterdata: [],
            loading: false,
            delete_item_id: null,
            status:null, 
            index:null, 
            isremovefromcurrentwingster:null,
            client: socket()
        }
    }
    wingsterrejecthandler = (values) => {
        this.setState({ loading: true })
        const dataval = {
            id: values.id,
            reason: values.message
        };
        var data = wingster_request_reject_by_curator(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                let filterdata = this.state.newapplicationdata.filter((post) => {
                    return values.id !== post.id;
                });
                this.setState(state => {
                    state.newapplicationdata = filterdata;
                    state.loading = false
                    return state;
                });
            }
        });
    }
    filldata() {
        var data = get_wingsters_for_curator(this.props.wing_id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    if (res.data[0] !== null && res.data[0].length > 0) {
                        //this.setState({ newapplicationdata: res.data[0]});                       
                        this.setState({ newapplicationdata: res.data[0] }, () => {
                            this.setState({ newapplicationcount: this.state.newapplicationdata.length, loading: false })
                        });
                    }
                    else {
                        this.setState({ loading: false })
                    }
                    if (res.data[1] !== null && res.data[1].length > 0) {
                        //this.setState({ currentwingsterdata: res.data[1]});                        
                        this.setState({ currentwingsterdata: res.data[1] }, () => {
                            this.setState({ currentwingstercount: this.state.currentwingsterdata.length })
                        });
                    }
                }
            }
        });
    }
    componentDidMount() {
        this.setState({ loading: true })
        window.scrollTo(0, 0);
        this.filldata();
    }
    deleteitemconfirmhandler = (event, id, status, index, isremovefromcurrentwingster) => {
        event.preventDefault();
        this.setState({ delete_item_id: id, status:status, index:index, isremovefromcurrentwingster:isremovefromcurrentwingster }, () => {
            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={this.wingsterapproverejecthandler} />
            //         );
            //     },
            // });
            confirmdelete(this.wingsterapproverejecthandler);
        });
    }
    wingsterapproverejecthandler = (event, id, status, index, isremovefromcurrentwingster) => {        
        if(id === null || id=== undefined)
        {
            id= this.state.delete_item_id
            status=this.state.status
            index= this.state.index
            isremovefromcurrentwingster= this.state.isremovefromcurrentwingster
        }
        this.setState({ loading: true })          
        const dataval = {
            id: id,
            user_status: status
        };
        var data = wingster_request_update_by_curator(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {                
                if (status === wingster_wing_status.accepted) {
                    const newapplicationdata = Object.assign([], this.state.newapplicationdata);
                    newapplicationdata.splice(index, 1);

                    this.setState({ newapplicationdata: newapplicationdata }, () => {
                        this.setState({ newapplicationcount: this.state.newapplicationdata.length })
                    });
                    if (this.state.currentwingsterdata !== null) {
                        this.setState({ currentwingsterdata: [res.data[0], ...this.state.currentwingsterdata] }, () => {
                            this.setState({ currentwingstercount: this.state.currentwingsterdata.length })
                        });
                    }
                    else {
                        this.setState({ currentwingsterdata: res.data[0] }, () => {
                            this.setState({ currentwingstercount: this.state.currentwingsterdata.length })
                        });
                    }
                    this.state.client.join_wing_request_response(res.data[1]);
                }
                else {
                    if (isremovefromcurrentwingster) {
                        const currentwingsterdata = Object.assign([], this.state.currentwingsterdata);
                        currentwingsterdata.splice(index, 1);
                        this.setState({ currentwingsterdata: currentwingsterdata }, () => {
                            this.setState({ currentwingstercount: this.state.currentwingsterdata.length })
                        });
                    }
                    else {
                        const newapplicationdata = Object.assign([], this.state.newapplicationdata);
                        newapplicationdata.splice(index, 1);
                        this.setState({ newapplicationdata: newapplicationdata }, () => {
                            this.setState({ newapplicationcount: this.state.newapplicationdata.length })
                        });
                    }

                }
                this.setState({ loading: false })
            }
        });
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let pending_leads_list = [];
        let postdata = [];
        pending_leads_list = this.state.newapplicationdata;
        if (pending_leads_list !== null) {
            if (pending_leads_list.length > 0) {
                pending_leads_list.map((item, i) => {
                    let detail = <Wingsterlistitem
                        id={item.id}
                        user_id={item.wingsterdata[0].user_id}
                        profile_pic_url={item.wingsterdata[0].profile_pic_url}
                        ProfilepicType={ProfilepicType.user_nav__user_photo_xsmall}
                        name={item.wingsterdata[0].name}
                        work_as={item.wingsterdata[0].work_as}
                        address1={item.wingsterdata[0].address1}
                        address2={item.wingsterdata[0].address2}
                        phone_number={item.wingsterdata[0].phone_number}
                        company_website={item.wingsterdata[0].company_website}
                        company_email={item.wingsterdata[0].company_email}
                        company_logo_url={item.wingsterdata[0].company_logo_url}
                        alreadymember={false}
                        companylogotype={ProfilepicType.image_only_height_25}
                        approvebuttontype={ButtonType.btn_green}
                        rejectbuttontype={ButtonType.btn_red}
                        viewprofilebuttontype={ButtonType.btn_grey}
                        approvetext={ButtonText.approve}
                        rejecttext={ButtonText.reject}
                        viewprofiletext={ButtonText.viewprofile}
                        wingsterrejecthandler={this.wingsterrejecthandler}
                        wingsterapprovehandler={(event) => this.wingsterapproverejecthandler(event, item.id, wingster_wing_status.accepted, i, false)}
                    >
                    </Wingsterlistitem>
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
                    nodata_message={nodatatext_message.nonewapplicationforwingster}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        else {
            postdata = <Nodatamessage imagesource={nodataimage}
                type={nodatatext_image_configuration.userprofilevideo}
                nodata_message={nodatatext_message.nonewapplicationforwingster}
                btntype={ButtonType.edit_mode_button_profile}
                svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                ishow={true}
                icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
        }
        let completed_leads_list = [];
        let completepostdata = [];
        completed_leads_list = this.state.currentwingsterdata;
        if (completed_leads_list !== null) {
            if (completed_leads_list.length > 0) {
                completed_leads_list.map((item, i) => {
                    let detail = <Wingsterlistitem
                        id={item.id}
                        user_id={item.wingsterdata[0].user_id}
                        profile_pic_url={item.wingsterdata[0].profile_pic_url}
                        ProfilepicType={ProfilepicType.user_nav__user_photo_xsmall}
                        name={item.wingsterdata[0].name}
                        work_as={item.wingsterdata[0].work_as}
                        address1={item.wingsterdata[0].address1}
                        address2={item.wingsterdata[0].address2}
                        phone_number={item.wingsterdata[0].phone_number}
                        company_website={item.wingsterdata[0].company_website}
                        company_email={item.wingsterdata[0].company_email}
                        company_logo_url={item.wingsterdata[0].company_logo_url}
                        alreadymember={true}
                        companylogotype={ProfilepicType.image_only_height_25}
                        approvebuttontype={ButtonType.btn_green}
                        rejectbuttontype={ButtonType.btn_red}
                        viewprofilebuttontype={ButtonType.btn_grey}
                        rejecttext={ButtonText.remove}
                        viewprofiletext={ButtonText.viewprofile}
                        removefromwinghandler={(event) => this.deleteitemconfirmhandler(event, item.id, wingster_wing_status.rejected, i, true)}
                    >
                    </Wingsterlistitem>
                    return (
                        completepostdata.push(
                            <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                        )
                    )
                });
            }
            else {
                completepostdata = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.nowingster}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }

        }
        else {
            completepostdata = <Nodatamessage imagesource={nodataimage}
                type={nodatatext_image_configuration.userprofilevideo}
                nodata_message={nodatatext_message.nowingster}
                btntype={ButtonType.edit_mode_button_profile}
                svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                ishow={true}
                icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
        }
        return (
            <React.Fragment>
                <div className={classshared.w_container}>
                    {spinner}
                    <div className={classshared.margin_top__lv8}><h3 className={classshared.font_1_bold_text_dark.join(' ')}>Wingsters</h3></div>
                    <div className={classshared.text_dark_dim_high_thin_margin_b_m.join(' ')}>Manage current and new members of your Wing below</div>
                    <div className={classshared.font_1_medium_text_dark_text_12.join(' ')}>New Applications ({this.state.newapplicationcount})</div>
                    <div className={classshared.cards_exhibition_padding_t_l_border_top.join(' ')}>
                        {postdata}
                    </div>
                    <div className={classshared.margin_top__lv8}>
                        <div className={classshared.font_1_medium_text_dark_text_12.join(' ')}>Current Wingsters ({this.state.currentwingstercount})</div>
                        <div className={classshared.cards_exhibition_padding_t_l_border_top.join(' ')}>
                            {completepostdata}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default wingsterlist;