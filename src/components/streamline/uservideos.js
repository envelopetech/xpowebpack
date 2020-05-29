import React, { Component } from 'react';
import * as classshared from './classconst';
import {
    ButtonType, ButtonText, ProfilepicType, getfilestackpreviewurl, Post_Type
    , titleheading, ICONS, nodatatext_image_configuration, nodatatext_message, confirmdelete, customPopUp
} from '../../shared/utility'
import * as actions from '../../store/actions/index';
import axios from '../../store/axios-orders';
import { connect } from 'react-redux';
import { getuserflatvideosfeeds, uservideosave } from '../../actions/streamlines/dataactions';
import Uservideoitems from './uservideoitems';
//import stream from 'getstream';
import Button from '../UI/Button/Button';
import Modal from "react-responsive-modal";
//import Uservideoforms from './uservideoform';
import Nodatamessage from '../nodatamessage/nodatamessage'
import nodataimage from '../../assets/images/nodatafound.svg';
//import { confirmAlert } from 'react-confirm-alert';
//import DeleteConfirmation from '../UI/Deleteconfirmation/deleteconfirmation'

class uservideos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_type: Post_Type.videos,
            buttondisabled: true,
            list_user_feeds: null,
            is_open_video_upload_form: false,
            filecontent: null,
            title: null,
            description: null,
            delete_item_id: null
        }
    }
    onSuccessImageupload = (result) => {
        let preview = getfilestackpreviewurl(result.filesUploaded[0]["handle"]);
        let imageurl = result.filesUploaded[0]["url"];
        this.setState({
            uploaded_image_url: imageurl,
            uploaded_image_url_preview: preview
        })
    };
    filldata() {
        var data = getuserflatvideosfeeds(this.props.type_for)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ list_user_feeds: res.data });
                }
            }
        });
    }
    componentDidMount() {
        this.filldata();
    }
    deleteitemconfirmhandler = (event, id) => {
        event.preventDefault();
        this.setState({ delete_item_id: id }, () => {
            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={this.deleteposthandler} />
            //         );
            //     },
            // });
            confirmdelete(this.deleteposthandler);
        });
    }
    deleteposthandler = () => {
        const data = {
            id: this.state.id
        };
        this.props.onuserfeedpostdelete(data);
        let filterdata = this.state.list_user_feeds.filter((post) => {
            return this.state.delete_item_id !== post.id;
        });
        this.setState(state => {
            state.list_user_feeds = filterdata;
            return state;
        });
    }
    submit = () => {
        var formData = new FormData();
        formData.append("feed_message", this.state.title);
        formData.append("description", this.state.description);
        formData.append("videofile", this.state.filecontent);
        formData.append("type_for", this.props.type_for);
        formData.append("exhibitor_id", null);
        var data = uservideosave(formData)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ is_open_video_upload_form: false }, () => {
                    this.setState({ list_user_feeds: [res.data, ...this.state.list_user_feeds], title: null, description: null, filecontent: null })
                })
            }
        });
    }
    closepopuphandler = () => {
        this.setState({ is_open_video_upload_form: false });
    }
    openpopuphandler = () => {
        this.setState({ is_open_video_upload_form: true });
    }
    handlefileuploadChange = (e) => {
        let file = e.target.files[0]
        this.setState({
            filecontent: file
        })
    }
    descriptionchanged = (e) => {
        this.setState({
            description: e.target.value,
        });
    }
    titlechanged = (e) => {
        this.setState({
            title: e.target.value,
        });
    }
    render() {
       
        let list = [];
        list = this.state.list_user_feeds;
        let postdata = null;
        if (list !== null) {
            if (list.length > 0) {
                postdata = list.map((item, i) => {
                    return (
                        <Uservideoitems
                            key={item.id}
                            id={item.id}
                            profile_pic_url={item.visitor[0]["profile_pic_url"]}
                            uploaded_video_url={item.file_url}
                            ProfilepicType={ProfilepicType.photos__image_large}
                            wall_post_type={item.wall_post_type}
                            userpostername={item.visitor[0]["name"]}
                            posttime={item.postdatetime}
                            postmessage={item.feed_message}
                            currentuserprofileforcomment={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m}
                            current_user_profile_pic_url={this.props.current_loggedin_user_profile_pic}
                            callback={this.callback}
                            successCallback={this.successCallback}
                            failCallback={this.failCallback}
                            totallikescount={item.likes}
                            totalcommentscount={item.comments[1]}
                            totalcommentsdata={item.comments[0]}
                            currentuserlike={item.currentuserlike}
                            edittimeprofilepic={this.props.PostProfilepicType}
                            video_thumbnail_image_url={item.video_thumbnail_image_url}
                            btntype={ButtonType.btnuserfeedpost}
                            video_id={item.video_id}
                            post_type={item.post_type}
                            deleteposthandler={(event) => this.deleteitemconfirmhandler(event, item.id)}>
                        </Uservideoitems>
                    )
                });
            }
            else {
                postdata = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.noprofilevideofound}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        let displaypostvideodiv = null
        if (this.props.otheruserid === null || this.props.otheruserid === undefined) {
            displaypostvideodiv =<div className={classshared.margin_t_m}> <div className={classshared.uploadvideobuttondiv}><Button btntype={ButtonType.btnuploadvideo} clicked={this.openpopuphandler}>{ButtonText.upoadavideo}</Button></div></div>
            if (this.props.is_editmode_exhibitor !== null && this.props.is_editmode_exhibitor !== undefined && this.props.is_editmode_exhibitor === false) {
                displaypostvideodiv = null;
            }
        }
        return (
            <React.Fragment>
                <Modal open={this.state.is_open_video_upload_form} styles={customPopUp}
                    onClose={this.closepopuphandler} center showCloseIcon={false}>
                    {/* <Uservideoforms  
                            onSubmit={this.submit} 
                            cancelform={this.closepopuphandler}
                            btnuserfeedpost={ButtonType.btnuserfeedpost}
                            btnuploadvideo={ButtonType.btnuploadvideo}
                            btnposttext={ButtonText.post}
                            btncanceltext={ButtonText.cancel}></Uservideoforms>*/}
                    
                            <div className={classshared.popup__content_header}>
                                <div className={classshared.sidebar__user_stats.join(' ')}>
                                    <div className={classshared.sidebar__user_details_left.join(' ')}>
                                        <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.uploadvideo}</h2>
                                    </div>
                                    <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                        <Button btntype={ButtonType.btn_close_popup} clicked={this.closepopuphandler} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                    </div>
                                </div>
                            </div>
                            <div className={classshared.simple_form}>
                                <div className={classshared.form_group}>
                                    <div className={classshared.buttoncontainer}>
                                        <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnuserfeedpost} buttontype="button" clicked={this.submit}>{ButtonText.post}</Button></div>
                                        <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnuploadvideo} buttontype="button" clicked={this.closepopuphandler}>{ButtonText.cancel}</Button></div>
                                    </div>
                                </div>
                                <div className={classshared.form_group}>
                                    <input className={classshared.input_box} value={this.state.title} onChange={this.titlechanged}></input>
                                    <label className={classshared.form_label}>{titleheading.title}</label>
                                </div>
                                <div className={classshared.form_group}>
                                    <input className={classshared.input_box} value={this.state.description} onChange={this.descriptionchanged}></input>
                                    <label className={classshared.form_label}>{titleheading.description}</label>
                                </div>
                                <div className={classshared.form_group}>
                                    <input type='file' onChange={this.handlefileuploadChange} className={classshared.input_box} required />
                                    <label className={classshared.form_label}>{titleheading.uploadvideo}</label>
                                </div>
                            </div>
                       
                </Modal>
                {displaypostvideodiv}
                <div className={classshared.photos__cards.join(' ')}>
                    {postdata}
                </div>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        //onuserfeedpostsave: ( data ) => dispatch( actions.userpostsave( data ) ), 
        onuserfeedpostdelete: (data) => dispatch(actions.userpostdelete(data)),
    };
};
export default connect(null, mapDispatchToProps)(uservideos, axios);