import React from 'react';
import * as classshared from '../classconst';
import Button from '../../UI/Button/Button';
import Profilepic from '../../UI/profilepic/profilepic';
import Leadclose from './leadclose';
import Modal from "react-responsive-modal";
import {
    save_user_wing_feeds_comments, upldate_deal_by_mentioned_users, refused_lead_by_mentioned_users, upldate_deal_by_lose_mentioned_users
    , get_user_wings_feeds_comments, save_user_wings_feed_likes, delete_user_wing_feed_likes, delete_user_wing_feeds_comments
} from '../../../actions/wings/dataactions';
import { lead_status, titleheading, Userwingstabindex, report_form_name, report_type, ButtonType, ButtonText, commonplaceholder, ProfilepicType, ICONS, users_type, customPopUp } from '../../../shared/utility';
import Reportpopup from '../reportpopup';
import Leadrefusedreason from './leadrefusedreason';
import Node from '../Node';
import socket from '../../../actions/socket';

class userwingstreamlineitem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenuLead: false,
            totallikescount: props.totallikescount,
            totalcommentscount: props.totalcommentscount,
            totalcommentsdata: props.totalcommentsdata,
            currentuserlike: props.currentuserlike,
            commentvalue: '',
            openleadclosemodal: false,
            openleadrejectmodal: false,
            is_userfeeds_reports_popup: false,
            client: socket()
        }
        this.showMenuLead = this.showMenuLead.bind(this);
        this.closeMenuLead = this.closeMenuLead.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }
    showMenuLead(event) {
        event.preventDefault();
        this.setState({ showMenuLead: true }, () => {
            document.addEventListener('click', this.closeMenuLead);
        });
    }
    closeMenuLead(event) {
        event.preventDefault();
        this.setState({ showMenuLead: false }, () => {
            document.removeEventListener('click', this.closeMenuLead);
        });
    }
    handleChange = (e) => {
        this.setState({ commentvalue: e.target.value });
    }
    userpostlikehandler = (event, id) => {
        event.preventDefault();
        const dataval = {
            user_post_id: id
        };
        var data = save_user_wings_feed_likes(dataval)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ currentuserlike: true, totallikescount: parseInt(this.state.totallikescount, 10) + 1 })
                }
            }
        });
    }
    userpostunlikehandler = (event, id) => {
        event.preventDefault();
        const dataval = {
            user_post_id: id
        };
        var data = delete_user_wing_feed_likes(dataval)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ currentuserlike: false, totallikescount: parseInt(this.state.totallikescount, 10) - 1 })
                }
            }
        });
    }
    leadclosemenuhandler = (event) => {
        event.preventDefault();
        this.setState({ openleadclosemodal: true })
    }
    closeleadmodalhandler = (event) => {
        event.preventDefault();
        this.setState({ openleadclosemodal: false })
    }
    keyPress = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value !== "" && e.target.value !== null && e.target.value !== undefined) {
                const dataval = {
                    user_post_id: this.props.id,
                    comments: e.target.value,
                    is_reply_for_comment: false,
                    wing_id: this.props.wing_id
                };
                this.setState({ commentvalue: e.target.value });
                let data = save_user_wing_feeds_comments(dataval)
                data.then(res => {
                    if (res.data["error"] === undefined) {
                        this.setState({ totalcommentscount: parseInt(this.state.totalcommentscount, 10) + 1, commentvalue: '' })
                        if (this.state.commentsdata === null) {
                            this.setState({ commentsdata: res.data })
                        }
                        else {
                            this.setState({ commentsdata: [res.data, ...this.state.commentsdata] })
                        }
                    }
                });
            }
        }
    }
    submit = (values) => {
        if (values.leadwinlose === true) {
            const dataval = {
                id: this.props.id,
                lead_amount: values.invoicevalue,
                invoice_url: values.invoice_url,
                lead_status: lead_status.win
            };
            var data = upldate_deal_by_mentioned_users(dataval)
            data.then(res => {
                if (res.data["error"] === undefined) {
                    this.state.client.wing_lead_post_win_by_poster_id(res.data);
                    this.setState({
                        openleadclosemodal: false
                    })

                }
            });
        }
        else {
            const dataval1 = {
                id: this.props.id,
                lead_reject_comment: values.message,
                lead_status: lead_status.lose
            };
            var data1 = upldate_deal_by_lose_mentioned_users(dataval1)
            data1.then(res => {
                if (res.data["error"] === undefined) {
                    this.state.client.wing_lead_post_lose_by_poster_id(res.data);
                    this.setState({
                        openleadclosemodal: false
                    })
                }
            });
        }
    }
    submitrefusedreason = (values) => {
        const dataval = {
            id: this.props.id,
            lead_reject_comment: values.message,
            lead_status: lead_status.denied
        };
        var data = refused_lead_by_mentioned_users(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.state.client.wing_lead_post_refused_by_poster_id(res.data);
                this.setState({
                    openleadrejectmodal: false
                })
            }
        });
    }
    close_userfeeds_reports_popup_handler = () => {
        this.setState({ is_userfeeds_reports_popup: false });
    }
    open_userfeeds_reports_popup_handler = () => {
        this.setState({ is_userfeeds_reports_popup: true });
    }
    openleadrejectmodalhandler = (event) => {
        event.preventDefault();
        this.setState({ openleadrejectmodal: true })
    }
    closeleadrejectmodalhandler = (event) => {
        event.preventDefault();
        this.setState({ openleadrejectmodal: false })
    }
    userfeedsreportsave = (values) => {
        const dataval = {
            title: values.title,
            message: values.message,
            table_primary_id: this.props.id,
            report_type: report_type.feedpost,
            form_name: report_form_name.wingpost
        };
        this.props.on_feed_post_report_save(dataval);
        this.setState({ is_userfeeds_reports_popup: false })
    }
    filldata() {
        var data = get_user_wings_feeds_comments(this.props.id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ commentsdata: res.data });
                }
            }
        });
    }
    componentDidMount() {
        this.filldata();
    }
    deletecommenthandler = (event, id, index) => {
        event.preventDefault();
        const dataval = {
            id: id
        };
        var data = delete_user_wing_feeds_comments(dataval)
        data.then(res => {
            if (res !== undefined) {
                if (res.data === true) {
                    const commentsdata = Object.assign([], this.state.commentsdata);
                    commentsdata.splice(index, 1);
                    this.setState({ commentsdata: commentsdata, totalcommentscount: parseInt(this.state.totalcommentscount, 10) - 1 });
                }
            }
        });
    }
    render() {
        //alert(this.props.displayleadcontent)
        //alert(this.props.closeleadbuttonvisible)
        let likediv = null;
        if (this.state.currentuserlike) {
            likediv = <div onClick={(event) => this.userpostunlikehandler(event, this.props.id)}><i className={classshared.fontawesome_heart_circle_alt_blue.join(' ')}></i></div>
        }
        else {
            likediv = <div onClick={(event) => this.userpostlikehandler(event, this.props.id)}><i className={classshared.fontawesome_heart_circle_alt.join(' ')}></i></div>

        }
        let list = [];
        list = this.state.commentsdata;
        let nodes = [];
        if (list !== null && list !== undefined) {
            if (list.length > 0) {
                list.map((item, i) => {
                    let detail =
                        <Node node={item} children={item.children}
                            PageType={this.props.PageType}
                            btnlistdeleteedit={ButtonType.btnlistdeleteedit}
                            btnuserpostmore={ButtonType.btnuserpostmore}
                            doticons={ICONS.MORE_VERTICAL}
                            commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin}
                            ischild={false}
                            deletecommenthandler={(event) => this.deletecommenthandler(event, item.id, i)}
                            current_user_profile_pic_url={this.props.current_user_profile_pic_url}
                            is_show_reply_commentbox={false} />
                    return (
                        nodes.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                    )
                })
            }
        }
        let divleadstatusname = null;
        let divcongrats = null;
        let leadrejectcommentdiv = null;
        if (this.props.leadstatusname !== null) {
            divleadstatusname = <span className={classshared.card_label__blue.join(' ')}>{this.props.leadstatusname}</span>
        }
        let divposttime = <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{this.props.posttime}</span>
        if (this.props.tabitems.toString() === Userwingstabindex.conversion.toString()) {
            divposttime = <div className={classshared.margin_b_m}><div className={classshared.flex_flex_align_center.join(' ')}>
                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}><span className={classshared.text_transform_c}>{this.props.leadstatus}</span> {this.props.statuschangeddatetime}</span>
                <div className={classshared.seperator_grey.join(' ')}>|</div>
                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>Referred {this.props.posttime}</span>
            </div></div>
            divcongrats = <div className={classshared.streamline__card_inner_content}>
                <span className={classshared.font_1_bold_text_dark.join(' ')}>{this.props.leadstatusmessage}</span>
                <span className={classshared.font_2_regular_text_normal.join(' ')}> {this.props.leadstatusmessagetext}</span>
            </div>
            if (this.props.lead_status !== null) {
                if (this.props.lead_status.toLowerCase() === lead_status.close.toLowerCase()) {

                    leadrejectcommentdiv = <div className={classshared.margin_b_m}> <div className={classshared.flex_flex_align_center.join(' ')}>
                        <div className={classshared.font_2_bold_text_color_green.join(' ')}>{this.props.leaddealamounttext}: {this.props.currency_name} {this.props.leadamount}</div>
                        <div className={classshared.seperator_grey.join(' ')}>|</div>
                        <span className={classshared.font_2_regular_text_normal.join(' ')}>Approved by <a href="#/">{this.props.curatorname}</a></span></div></div>
                }
                else if (this.props.lead_status.toLowerCase() === lead_status.lose.toLowerCase()) {
                    leadrejectcommentdiv = <div className={classshared.streamline__card_inner_content}>
                        <span className={classshared.font_2_bold_text_color_red.join(' ')}>{titleheading.reason}</span>
                        <span className={classshared.font_2_bold_text_color_red.join(' ')}> {this.props.lead_reject_comment}</span>
                    </div>
                }
            }
        }
        return (
            <React.Fragment>
                <Modal open={this.state.is_userfeeds_reports_popup} styles={customPopUp}
                    onClose={this.close_userfeeds_reports_popup_handler} center showCloseIcon={false}>
                    <Reportpopup cancelreportpopup={this.close_userfeeds_reports_popup_handler}
                        btnsavetype={ButtonType.btnsavecancel}
                        btncanceltype={ButtonType.btnuploadvideo}
                        btnposttext={ButtonText.sendmessage}
                        btncanceltext={ButtonText.cancel}
                        post_id={this.props.id}
                        onSubmit={this.userfeedsreportsave}>
                    </Reportpopup>
                </Modal>
                <Modal open={this.state.openleadclosemodal} styles={customPopUp}
                    onClose={this.closeleadmodalhandler} center showCloseIcon={false}>
                    <Leadclose
                        onSubmit={this.submit}
                        post_id={this.props.id}
                        closemodal={this.closeleadmodalhandler}
                        currency_name={this.props.currency_name}
                    >
                    </Leadclose>
                </Modal>
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
                    <div id={this.props.divid} className={classshared.streamline__card}>
                        <div className={classshared.card__dots}>
                            <div className={classshared.margin_r_m}><Button btntype={this.props.btnuserpostmore}
                                clicked={this.showMenuLead} svgclass={classshared.dots__icon}
                                icon={this.props.doticons}></Button>
                                {
                                    this.state.showMenuLead
                                        ? (
                                            <div className={classshared.dropdown_without_arrow}>
                                                {
                                                    this.props.usertypename !== users_type.visitor ?
                                                        (
                                                            <div>
                                                                {
                                                                    this.props.displayleadcontent && this.props.closeleadbuttonvisible ?
                                                                        (
                                                                            this.props.lead_status === lead_status.open ?
                                                                                (
                                                                                    <React.Fragment>
                                                                                        <Button btntype={this.props.btnlistdeleteedit} clicked={this.leadclosemenuhandler} >{this.props.dealclosetext}</Button>
                                                                                        <Button btntype={this.props.btnlistdeleteedit} clicked={this.openleadrejectmodalhandler} >{this.props.refusedlead}</Button>
                                                                                    </React.Fragment>
                                                                                ) : null
                                                                        ) : null
                                                                }
                                                                {
                                                                    this.props.deletebuttonvisible ?
                                                                        (
                                                                            <Button btntype={this.props.btnlistdeleteedit} clicked={this.props.deleteposthandler} >{this.props.deletebuttontext}</Button>
                                                                        ) : null
                                                                }
                                                            </div>
                                                        ) : null
                                                }
                                                <Button btntype={this.props.btnlistdeleteedit} clicked={this.open_userfeeds_reports_popup_handler}>{this.props.reporttext}</Button>
                                            </div>
                                        )
                                        : (
                                            null
                                        )
                                }
                            </div>
                        </div>
                        <div className={classshared.streamline__card_left.join(' ')}>
                            <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname=""></Profilepic>
                            <div className={classshared.streamline__card_header.join(' ')}>
                                <div className={classshared.streamline__card_header_name}>
                                    <span className={classshared.font_1_medium_text_color__light_blue_margin_r_sm_text_transform_c.join(' ')}>{this.props.userpostername}</span>
                                    <span className={classshared.font_2_regular_text_normal_text_14.join(' ')}>
                                        <span className={classshared.margin_l_sm}> {this.props.wall_post_type_header}</span></span>
                                    {divleadstatusname}
                                </div>
                                {divposttime}
                            </div>
                        </div>
                        <div className={classshared.streamline__card_right}>
                            <div className={classshared.streamline__card_content}>
                                {divcongrats}
                                <div id={this.props.divborderconversion} className={classshared.lead__card_content}>
                                    {
                                        this.props.displayleadcontent ?
                                            (
                                                <div className={classshared.streamline__card_inner_content}>
                                                    <span className={classshared.font_1_bold_text_12_text_dark.join(' ')}>Lead Type:</span>
                                                    <span className={classshared.font_2_regular_text_normal_text_transform_c.join(' ')}> {this.props.lead_type}</span>
                                                </div>
                                            )
                                            : null
                                    }
                                    <div className={classshared.streamline__card_inner_content}>
                                        {
                                            this.props.displayleadcontent ?
                                                (
                                                    <span className={classshared.font_1_bold_text_12_text_dark.join(' ')}>Requirement:</span>
                                                )
                                                : null
                                        }
                                        <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}> {this.props.postmessage}</span>
                                    </div>
                                </div>
                                {leadrejectcommentdiv}
                                {
                                    this.props.displayleadcontent && this.props.directmessagedivdisplay ?
                                        (
                                            <div className={classshared.streamline__card_inner_content}>
                                                <span className={classshared.font_1_bold_text_12_text_dark.join(' ')}>Contact Details:</span>
                                                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}> Will DM</span>
                                            </div>
                                        )
                                        : null
                                }

                                <div className={classshared.media_icons}>
                                    <div className={classshared.like_icon_padding.join(' ')}>
                                        {/* <Button btntype={this.props.btnsharecommentlikepost} svgclass={classshared.icon_20_icon_dark_grey_margin_r_10.join(' ')} icon={this.props.thumbsups}></Button> */}
                                        {likediv}
                                        {
                                            this.state.totallikescount > 0 ?
                                                (
                                                    <span className={classshared.margin_l_sm}><span className={classshared.text_light.join(' ')}>{this.state.totallikescount}</span></span>
                                                ) :
                                                null
                                        }
                                    </div>
                                    <div className={classshared.like_icon_padding.join(' ')}>
                                        <div onClick={this.props.userpostcommenthandler}><i className={classshared.fontawesome_comments_alt.join(' ')}></i></div>
                                        {
                                            this.state.totalcommentscount > 0 ?
                                                (
                                                    <span className={classshared.margin_l_sm}> <span className={classshared.text_light.join(' ')}>{this.state.totalcommentscount}</span></span>
                                                ) :
                                                null
                                        }
                                    </div>
                                    <div className={classshared.like_icon_padding.join(' ')}>                                       
                                        <div onClick={this.props.userpostsharehandler}><i className={classshared.fontawesome_megaphone.join(' ')}></i></div>
                                        <span className={classshared.margin_l_sm}> <span className={classshared.text_light.join(' ')}>13</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classshared.comment}>
                        {/* <Usercommentslist 
                            PageType={this.props.PageType}                            
                            loggedin_user_id={this.props.loggedin_user_id} 
                            user_post_id={this.props.id} 
                            currentuserprofileforcomment={this.props.currentuserprofileforcomment} 
                            current_user_profile_pic_url={this.props.loggedin_user_pic_url}
                            btnuserpostmore={this.props.btnuserpostmore}
                            doticons={this.props.doticons} 
                            btnlistdeleteedit={this.props.btnlistdeleteedit}>
                        </Usercommentslist> */}
                        <ul className={classshared.comments_list}>
                            {nodes}
                        </ul>
                        <div className={classshared.comments_list__main.join(' ')}>
                            <div className={classshared.user_nav__icon_box2}>
                                <Profilepic type={this.props.currentuserprofileforcomment} profilepic_url={this.props.loggedin_user_pic_url} altname=""></Profilepic>
                            </div>
                            {/* <input type="text" placeholder={this.props.userpostcomment} defaultValue={this.state.commentvalue} className={classshared.comment_box} onKeyUp={(event) => this.usercommentshandler(event, this.props.id)}></input> */}
                            <input type="text" placeholder={commonplaceholder.userpostcomment}
                                value={this.state.commentvalue}
                                onChange={this.handleChange}
                                className={classshared.comment_box}
                                onKeyDown={this.keyPress}
                            ></input>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default userwingstreamlineitem;