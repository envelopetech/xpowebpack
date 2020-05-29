import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import Button from '../UI/Button/Button';
import { ICONS, ButtonType, ButtonText, commonplaceholder, textarearownumber, ProfilepicType, PageType, Post_Type, report_type, report_form_name, label_text, socketendpoint, customPopUp } from '../../shared/utility';
import Skeleton from 'react-loading-skeleton';
import axios from '../../store/axios-orders';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Feedpost from './feedpost';
import YouTube from 'react-youtube';
import Reportpopup from './reportpopup';
import Modal from "react-responsive-modal";
import Node from './Node'
import { userpostupdate } from '../../actions/streamlines/dataactions'
import { get_user_feeds_comments, usercommentssave, user_feeds_likes, user_feeds_unlike } from '../../actions/streamlines/dataactions';
import socket from '../../actions/socket';
import socketIOClient from "socket.io-client";


const opts = {
    height: '390',
    width: '640',
};
class streamlineitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            totallikescount: props.totallikescount,
            totalcommentscount: props.totalcommentscount,
            totalcommentsdata: props.totalcommentsdata,
            currentuserlike: props.currentuserlike,
            commentvalue: '',
            is_edit_mode: false,
            wall_post_type: props.wall_post_type,
            posttime: props.posttime,
            postmessage: props.postmessage,
            buttondisabled: true,
            is_userfeeds_reports_popup: false,
            clearfields_after_submit: false,
            commentsdata: null,
            client: socket()
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
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
    userpostunlikehandler = (event, id) => {
        event.preventDefault();
        const data = {
            user_post_id: id
        };
        var listdata = user_feeds_unlike(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ currentuserlike: false, totallikescount: parseInt(this.state.totallikescount, 10) - 1 })
                }
            }
        });
    }
    userpostlikehandler = (event, id) => {
        event.preventDefault();
        const data = {
            user_post_id: id
        };

        var listdata = user_feeds_likes(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ currentuserlike: true, totallikescount: parseInt(this.state.totallikescount, 10) + 1 }, () => {
                        this.state.client.user_feeds_likes(res.data);
                    });
                }
            }
        });
    }
    handleChange = (e) => {
        this.setState({ commentvalue: e.target.value });
    }
    keyPress = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value !== "" && e.target.value !== null && e.target.value !== undefined) {
                const dataval = {
                    user_post_id: this.props.id,
                    comments: e.target.value,
                    is_reply_for_comment: false
                };
                this.setState({ commentvalue: e.target.value });
                let listdata = usercommentssave(dataval)
                listdata.then(res => {
                    if (res.data["error"] === undefined) {
                        this.setState({ totalcommentscount: parseInt(this.state.totalcommentscount, 10) + 1, commentvalue: '' })

                        if (this.state.commentsdata === null) {
                            this.setState({ commentsdata: res.data[0] })
                        }
                        else {
                            this.setState({ commentsdata: [res.data[0], ...this.state.commentsdata] })
                        }
                        //this.state.client.update_user_feeds_comments(res.data[0]);
                        if (res.data[1] !== null) {
                            this.state.client.user_feeds_comments(res.data[1]);
                        }
                    }
                });
            }
        }
    }
    editposthandler = () => {
        this.setState({
            is_edit_mode: true,
            buttondisabled: false
        });
    }
    userpostcancelhandler = () => {
        this.setState({
            is_edit_mode: false
        });
    }
    submit = (values) => {
        let userid = null;
        if (values.user_id !== undefined) {
            userid = values.user_id
        }
        const dataval = {
            id: this.props.id,
            feed_message: values.text_message,
            mention_user_id: userid,
            post_type: this.state.post_type,
            file_url: this.state.file_url,
            video_image_caption: this.state.video_image_caption,
            otheruserid: this.props.otheruserid
        };
        var data = userpostupdate(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({
                    is_edit_mode: false, clearfields_after_submit: true,
                    //userpostername: res.data["name"],
                    wall_post_type: res.data["wall_post_type"],
                    posttime: res.data["postdatetime"],
                    postmessage: res.data["feed_message"],
                })
            }
        });
    }
    userfeedsreportsave = (values) => {
        const dataval = {
            title: values.title,
            message: values.message,
            table_primary_id: this.props.id,
            report_type: report_type.feedpost,
            form_name: report_form_name.userprofile
        };
        this.props.on_feed_post_report_save(dataval);
        this.setState({ is_userfeeds_reports_popup: false })
    }
    close_userfeeds_reports_popup_handler = () => {
        this.setState({ is_userfeeds_reports_popup: false });
    }
    open_userfeeds_reports_popup_handler = () => {
        this.setState({ is_userfeeds_reports_popup: true });
    }
    filldata() {
        var data = get_user_feeds_comments(this.props.id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ commentsdata: res.data });
                }
            }
        });
    }
    componentWillUnmount() {
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.off("show_user_feeds_comments_totalcount_child");
    }
    componentDidMount() {
        this.filldata();
        const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
        socket.on('show_user_feeds_comments_totalcount_child', () => {
            this.setState({ totalcommentscount: parseInt(this.state.totalcommentscount, 10) + 1 });
        })
    }
    deletecommenthandler = (event, id, index) => {
        const commentsdata = Object.assign([], this.state.commentsdata);
        commentsdata.splice(index, 1);
        this.setState({ commentsdata: commentsdata, totalcommentscount: parseInt(this.state.totalcommentscount, 10) - 1 });
    }
    render() {
        let liket = this.props.currentuserlike
        if (this.state.currentuserlike !== null) {
            liket = this.state.currentuserlike
        }
        let list = [];
        list = this.state.commentsdata;
        let nodes = [];
        if (list !== null) {
            if (list.length > 0) {
                list.map((item, i) => {
                    let detail =
                        <Node
                            is_tieups={this.props.is_tieups}
                            otheruserid={this.props.otheruserid}
                            node={item} children={item.children}
                            PageType={this.props.PageType}
                            btnlistdeleteedit={ButtonType.btnlistdeleteedit}
                            btnuserpostmore={ButtonType.btnuserpostmore}
                            doticons={ICONS.MORE_VERTICAL}
                            commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin}
                            ischild={false}
                            loggedin_user_id={this.props.loggedin_user_id}
                            deletecommenthandler={(event) => this.deletecommenthandler(event, item.id, i)}
                            current_user_profile_pic_url={this.props.current_user_profile_pic_url}
                            is_show_reply_commentbox={false}
                            commented_user_id={item.user_id} />
                    return (
                        nodes.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                    )
                })
            }
        }
        let editdiv = null;
        let placeholder = commonplaceholder.userfeedpost + "" + commonplaceholder.more;
        if (this.props.otherusername !== null && this.props.otherusername !== undefined) {
            placeholder = commonplaceholder.userfeedpost + " " + commonplaceholder.to + " " + this.props.otherusername + "" + commonplaceholder.more;
        }
        if (this.state.is_edit_mode) {
            editdiv = <React.Fragment>
                <div className={classshared.width100vh}>
                    <Feedpost placeholder={placeholder}
                        PostProfilepicType={this.props.edittimeprofilepic}
                        clearfields_after_submit={this.state.clearfields_after_submit}
                        onSubmit={this.submit}
                        current_loggedin_user_profile_pic={this.props.current_user_profile_pic_url}
                        btntype={this.props.btntype}
                        buttondisabled={this.state.buttondisabled}
                        buttontext={ButtonText.post}
                        textarea_value={this.state.postmessage}
                        is_cancel_button_show={true}
                        cancelbuttontext={ButtonText.cancel}
                        rownumber={textarearownumber.three}
                        btncanceltype={ButtonType.btncancelpost}
                        userpostcancelhandler={this.userpostcancelhandler}
                        is_photo_button_show={false}
                        pagetype={PageType.userprofilestreamline}
                        otheruserid={this.props.otheruserid}>
                    </Feedpost>
                </div>
            </React.Fragment>
        }
        else {
            let divimage = null
            if (this.props.posttype === Post_Type.images) {
                divimage = <div className={classshared.photos__image}>
                    <Profilepic profilepic_url={this.props.uploaded_pic} type={this.props.useruploadedphototype} altname=""></Profilepic>
                </div>
            }
            else if (this.props.posttype === Post_Type.videos) {
                divimage = <div className={classshared.photos__image}>
                    <YouTube
                        videoId={this.props.video_id}
                        opts={opts}
                        onReady={this._onReady}
                    />
                </div>
            }
            editdiv = <React.Fragment>{this.state.postmessage || <Skeleton width={100} />}{divimage}</React.Fragment>
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
                <div className={classshared.card__wrapper}>
                    <div className={classshared.streamline__card}>
                        <div className={classshared.card__dots}>
                            <div className={classshared.margin_r_m}><Button btntype={ButtonType.btnuserpostmore}
                                clicked={this.showMenu} svgclass={classshared.dots__icon}
                                icon={ICONS.MORE_VERTICAL}></Button></div>
                            {
                                this.state.showMenu
                                    ? (
                                        <div
                                            className={classshared.arrow_box}
                                            ref={(element) => {
                                                this.dropdownMenu = element;
                                            }}>
                                            {
                                                this.props.otheruserid === null || this.props.otheruserid === undefined ?
                                                    (
                                                        <React.Fragment>
                                                            <div onClick={this.editposthandler} className={classshared.flex}>
                                                                <div className={classshared.margin_t_xs}><i className={classshared.fontawesome_manage.join(' ')}></i></div>
                                                                <div><span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.edit}</span></span></div>
                                                            </div>
                                                            <div onClick={this.props.deleteposthandler} className={classshared.flex_margin_t_sm.join(' ')}>
                                                                <div className={classshared.margin_t_xs}><i className={classshared.fontawesome_trash.join(' ')}></i></div>
                                                                <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.delete}</span></span></div>
                                                            </div></React.Fragment>
                                                    )

                                                    : null
                                            }
                                            {/* <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.open_userfeeds_reports_popup_handler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.FLAG}>{ButtonText.report}</Button> */}
                                            <div onClick={this.open_userfeeds_reports_popup_handler} className={classshared.flex}>
                                                <div className={classshared.margin_t_xs}><i className={classshared.fontawesome_flag.join(' ')}></i></div>
                                                <div><span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.report}</span></span></div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        null
                                    )
                            }
                        </div>
                        <div className={classshared.streamline__card_left.join(' ')}>
                            <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname=""></Profilepic>
                            <div className={classshared.streamline__card_header.join(' ')}>
                                <div className={classshared.streamline__card_header_name}>
                                    {
                                        this.props.userpostername === label_text.you ?
                                            (
                                                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{this.props.userpostername || <Skeleton width={100} />}</span>
                                            )
                                            :
                                            (
                                                <span className={classshared.font_1_medium_text_color__light_blue_margin_r_sm_text_transform_c.join(' ')}>{this.props.userpostername || <Skeleton width={100} />}</span>
                                            )
                                    }
                                    <span className={classshared.font_2_regular_text_normal_text_14.join(' ')}>
                                        <span className={classshared.margin_l_sm}> {this.state.wall_post_type || <Skeleton width={100} />}</span>
                                    </span>
                                </div>
                                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{this.state.posttime || <Skeleton width={100} />}</span>
                            </div>
                        </div>
                        <div className={classshared.streamline__card_right}>
                            <div className={classshared.streamline__card_content}>
                                <div className={classshared.streamline__card_inner_content}>
                                    <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{editdiv}</span>
                                </div>
                                {
                                    this.props.is_tieups ?
                                        (
                                            <div className={classshared.media_icons}>
                                                <div className={classshared.like_icon_padding.join(' ')}>
                                                    {
                                                        liket
                                                            ?
                                                            (
                                                                <div onClick={(event) => this.userpostunlikehandler(event, this.props.id)}><i className={classshared.fontawesome_heart_circle_alt_blue.join(' ')}></i></div>
                                                            )
                                                            :
                                                            (
                                                                <div onClick={(event) => this.userpostlikehandler(event, this.props.id)}><i className={classshared.fontawesome_heart_circle_alt.join(' ')}></i></div>
                                                            )
                                                    }
                                                    <span className={classshared.margin_l_sm}><span className={classshared.text_light.join(' ')}>{this.state.totallikescount}</span></span>
                                                </div>
                                                <div className={classshared.like_icon_padding.join(' ')}>
                                                    <div onClick={this.userpostcommenthandler}><i className={classshared.fontawesome_comments_alt.join(' ')}></i></div>
                                                    <span className={classshared.margin_l_sm}> <span className={classshared.text_light.join(' ')}>{this.state.totalcommentscount}</span></span>
                                                </div>
                                                <div className={classshared.like_icon_padding.join(' ')}>
                                                    <div onClick={this.userpostsharehandler}><i className={classshared.fontawesome_megaphone.join(' ')}></i></div>
                                                    <span className={classshared.margin_l_sm}> <span className={classshared.text_light.join(' ')}>13</span></span>
                                                </div>
                                            </div>
                                        ) :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classshared.comment}>
                        {/* <Usercommentslist                            
                            loggedin_user_id={this.props.loggedin_user_id}
                            user_post_id={this.props.id}
                            currentuserprofileforcomment={this.props.currentuserprofileforcomment}
                            current_user_profile_pic_url={this.props.current_user_profile_pic_url}
                            otheruserid={this.props.otheruserid}
                            otherusername={this.props.otherusername}
                            btnlistdeleteedit={ButtonType.btnlistdeleteedit}
                            btnuserpostmore={ButtonType.btnuserpostmore}
                            doticons={ICONS.MORE_VERTICAL}>
                        </Usercommentslist> */}
                        <ul className={classshared.comments_list}>
                            {nodes}
                        </ul>
                        <div className={classshared.comments_list__main.join(' ')}>
                            <div className={classshared.user_nav__icon_box2}>
                                <Profilepic type={this.props.currentuserprofileforcomment} profilepic_url={this.props.current_user_profile_pic_url} altname=""></Profilepic>
                            </div>
                            <input type="text" placeholder={commonplaceholder.userpostcomment}
                                value={this.state.commentvalue}
                                onChange={this.handleChange}
                                className={classshared.comment_box}
                                onKeyDown={this.keyPress}
                            ></input>
                            {/* <input value={this.state.commentvalue} onKeyDown={this.keyPress} onChange={this.handleChange} /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
//export default streamlineitems;
const mapDispatchToProps = dispatch => {
    return {
        on_feed_post_report_save: (data) => dispatch(actions.feed_post_report_save(data)),
    };
};
export default connect(null, mapDispatchToProps)(streamlineitems, axios);