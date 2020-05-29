import React from 'react';
import * as classshared from '../../streamline/classconst';
import Button from '../../UI/Button/Button';
import Profilepic from '../../UI/profilepic/profilepic';
import Icon from '../../UI/Icon/Icon';
import Warningicon from '../../UI/Icon/warnings';
import { ICONS,lead_status, customPopUp } from '../../../shared/utility';
import Userprofilenavlink from '../../commonnavlinks/userprofilenavlink';
import Leadrefusedreason from '../../streamline/wingstreamline/leadrefusedreason';
import socket from '../../../actions/socket';
import { refused_lead_by_curator_users } from '../../../actions/curator/dataactions'
import Modal from "react-responsive-modal";//'../../UI/Modal/Modal';

class dealsitems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: false,
            openleadrejectmodal: false,
            client: socket()
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }
    openleadrejectmodalhandler = (event, id) => {
        event.preventDefault();
        this.setState({ openleadrejectmodal: true, current_feed_id: id })
    }
    closeleadrejectmodalhandler = (event) => {
        event.preventDefault();
        this.setState({ openleadrejectmodal: false })
    }
    submitrefusedreason = (values) => {        
        this.setState({ loading: true })
        const dataval = {
            id: this.props.current_feed_id,
            lead_reject_comment: values.message,
            lead_status: lead_status.rejected
        };
        var data = refused_lead_by_curator_users(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {                
                this.state.client.wing_lead_post_reject_by_curator_id(res.data)
                this.state.client.callback_after_reject_lead_by_curator(this.props.current_feed_id)
                this.setState({
                    openleadrejectmodal: false, loading: false
                })
            }
        });
    }
    render() {
        let mentionusername = null
        if (this.props.mentionsuserid !== null && this.props.mentionsuserid !== undefined) {
            mentionusername = <Userprofilenavlink username={this.props.mentionusername} userid={this.props.mentionsuserid}></Userprofilenavlink>
        }
        let postedusername = null
        if (this.props.userpostid !== null && this.props.userpostid !== undefined) {

            postedusername = <Userprofilenavlink username={this.props.userpostername} userid={this.props.userpostid}></Userprofilenavlink>
        }
        let divleadstatusname = null;
        let divcongrats = null;
        let leadrejectcommentdiv = null;

        if (this.props.leadstatusname !== null) {
            divleadstatusname = <span className={classshared.card_label_orange_text.join(' ')}>{this.props.leadstatusname}</span>
        }
        let divposttime = null
        divposttime =<div className={classshared.margin_b_m}> <div className={classshared.flex_flex_align_center.join(' ')}>
            <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}><span className={classshared.text_transform_c}>{this.props.leadstatus}</span> {this.props.statuschangeddatetime}</span>
            <div className={classshared.seperator_dot.join(' ')}></div>
            <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>Referred {this.props.posttime}</span>
            <div className={classshared.seperator_dot.join(' ')}></div>{divleadstatusname}
        </div></div>

        leadrejectcommentdiv = <div className={classshared.margin_b_m}><div className={classshared.flex_flex_align_center.join(' ')}>
            <div className={classshared.font_2_bold_text_color_green.join(' ')}>{this.props.leaddealamounttext}: {this.props.currency_name} {this.props.leadamount}</div>
            <div className={classshared.seperator_grey.join(' ')}>|</div>
            <span className={classshared.font_2_regular_text_normal.join(' ')}>Referred to {mentionusername}</span></div></div>
        return (
            <React.Fragment>
                 <Modal open={this.state.openleadrejectmodal} styles={customPopUp}
                    onClose={this.closeleadrejectmodalhandler} center showCloseIcon={false}>
                    <Leadrefusedreason
                    title="Refused Lead"
                    subtitle="Add the reason below to refused the lead."
                        onSubmit={this.submitrefusedreason}
                        closemodal={this.closeleadrejectmodalhandler}
                    >
                    </Leadrefusedreason>
                </Modal>
                <div className={classshared.card__wrapper}>
                    <div className={classshared.streamline__card}>
                        {
                            !this.props.completeddeal ?
                                (
                                    <div className={classshared.card__dots}>
                                        <div className={classshared.margin_r_m}><Button btntype={this.props.btnuserpostmore}
                                            clicked={this.showMenu} svgclass={classshared.dots__icon}
                                            icon={this.props.doticons}></Button>
                                            {
                                                this.state.showMenu
                                                    ? (
                                                        <div className={classshared.dropdown_without_arrow}>
                                                            <Button btntype={this.props.btnlistdeleteedit} clicked={this.props.leadclosemenuhandler} >{this.props.accepttext}</Button>
                                                            <Button btntype={this.props.btnlistdeleteedit} clicked={this.openleadrejectmodalhandler} >{this.props.rejecttext}</Button>
                                                        </div>
                                                    )
                                                    : (
                                                        null
                                                    )
                                            }
                                        </div>
                                    </div>
                                ) : null
                        }
                        <div className={classshared.streamline__card_left.join(' ')}>
                            <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname=""></Profilepic>
                            <div className={classshared.streamline__card_header.join(' ')}>
                                <div className={classshared.streamline__card_header_name}>
                                    {postedusername}
                                    <span className={classshared.font_2_regular_text_normal_text_14.join(' ')}>
                                    <span className={classshared.margin_l_sm}>has submitted his lead for approval</span> </span>
                                </div>
                                {divposttime}
                            </div>
                        </div>
                        <div className={classshared.streamline__card_right}>
                            <div className={classshared.streamline__card_content}>
                                {divcongrats}
                                <div id="divborderconversion" className={classshared.lead__card_content}>

                                    <div className={classshared.streamline__card_inner_content}>
                                        <span className={classshared.font_1_bold_text_dark.join(' ')}>Lead Type:</span>
                                        <span className={classshared.font_2_regular_text_normal_text_transform_c.join(' ')}> {this.props.lead_type}</span>
                                    </div>

                                    <div className={classshared.streamline__card_inner_content}>

                                        <span className={classshared.font_1_bold_text_dark.join(' ')}>Requirement:</span>

                                        <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}> {this.props.postmessage}</span>
                                    </div>
                                </div>
                                {leadrejectcommentdiv}
                            </div>
                        </div>
                    </div>
                    <div className={classshared.streamline_Card_attachment.join(' ')}>
                        <div className={classshared.stream_card_flex}>
                            <Icon svgclass={classshared.dots__icon_margin_r_sm.join(' ')} icon={ICONS.ATTACHMENT}></Icon>
                            <div className={classshared.font_1_medium_text_normal.join(' ')}>
                                <a target="_blank" rel="noopener noreferrer" href={this.props.downloadfile}>Download Invoice</a>
                            </div>
                        </div>
                        {
                            !this.props.completeddeal ?
                                (
                                    <div className={classshared.streamline_warning.join(' ')}>
                                        <Warningicon svgclass={classshared.dots__icon_margin_r_sm.join(' ')} icon={ICONS.ATTACHMENT}></Warningicon>
                                        <div className={classshared.font_1_medium_text_normal.join(' ')}>
                                            <span className={classshared.text_color_orange}>Kindly verify the invoice before approving</span>
                                        </div>
                                    </div>
                                ) : null
                        }

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default dealsitems;