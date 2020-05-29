import React, { Component } from 'react';
import * as classshared from './classconst';
import {
    commonplaceholder, ButtonType, ButtonText, ProfilepicType, textarearownumber, getfilestackpreviewurl, PageType, FilestackType
    , Post_Type,  ICONS, nodatatext_image_configuration, nodatatext_message, filestackoptionimage, confirmdelete
} from '../../shared/utility'
import * as actions from '../../store/actions/index';
import axios from '../../store/axios-orders';
import { connect } from 'react-redux';
import { getuserflatimagefeeds, userpostsave } from '../../actions/streamlines/dataactions';
import Userphotoitems from './userphotoitems';
import Feedpost from './feedpost';
import Nodatamessage from '../nodatamessage/nodatamessage'
import nodataimage from '../../assets/images/nodatafound.svg';
//import { confirmAlert } from 'react-confirm-alert';
//import DeleteConfirmation from '../UI/Deleteconfirmation/deleteconfirmation'
import Spinner from '../UI/Spinner/Spinner'

class userphotos extends Component {
    constructor(props) {
        super(props)
        this.state = {                 
            feed_message: null,
            post_type: Post_Type.images,
            file_url: null,
            video_image_caption: null,
            buttondisabled: true,
            list_user_feeds: null,            
            uploaded_image_url: null,
            uploaded_image_url_preview: null,
            totalphotocount: 0,
            clearfields_after_submit: false,
            delete_item_id: null,
            loading:false
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
        this.setState({loading:true})
        var data = getuserflatimagefeeds(this.props.type_for)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ totalphotocount: res.data.length });
                    setTimeout(
                        function () {
                            this.setState({ list_user_feeds: res.data ,loading: false});
                        }
                        .bind(this),
                        500
                    );
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
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={this.deleteposthandler}/>
            //         );
            //     },
            // });
            confirmdelete(this.deleteposthandler);
        });
    }
    deleteposthandler = () => {              
        const data = {
            id: this.state.delete_item_id
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
    submit = (values) => {
        if (this.state.uploaded_image_url !== null && this.state.uploaded_image_url !== undefined) {
            let userid = null;
            if (values.user_id !== undefined) {
                userid = values.user_id
            }
            const data = {
                feed_message: values.text_message,
                mention_user_id: userid,
                post_type: this.state.post_type,
                file_url: this.state.uploaded_image_url,
                file_url_preview: this.state.uploaded_image_url_preview,
                video_image_caption: this.state.video_image_caption,
                otheruserid: this.props.otheruserid,
                type_for: this.props.type_for,
                exhibitor_id: null
            };
            // this.props.onuserfeedpostsave(data);
            // this.setState({ clearfields_after_submit: true, uploaded_image_url: null, video_image_caption: null }, () => {
            //     this.setState({ clearfields_after_submit: false })
            // });
            var listdata = userpostsave(data)
            listdata.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({ clearfields_after_submit: true, uploaded_image_url: null, video_image_caption: null  }, () => {                            
                            if (this.state.list_user_feeds === null) {
                                this.setState({ clearfields_after_submit: false, list_user_feeds: res.data })
                            }
                            else {
                                this.setState({ clearfields_after_submit: false, list_user_feeds: [res.data, ...this.state.list_user_feeds] })
                            }
                        });
                    }
                }
            });
        }
    }    
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }  
        let list = [];
        list = this.state.list_user_feeds;
        let postdata = null;
        if (list !== null) {            
            if (list.length > 0) {
                postdata = list.map((item, i) => {
                    return (
                        <Userphotoitems
                            key={item.id}
                            id={item.id}
                            uploaded_pic={item.file_url}
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
                            btntype={ButtonType.btnuserfeedpost}
                            deleteposthandler={(event) => this.deleteitemconfirmhandler(event, item.id)}>
                        </Userphotoitems>
                    )
                });
            }
            else {
                postdata = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.noexhibitorphotosfound}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        //#region If data null than skeleton display
        else {
            // if(this.state.totalphotocount > 0)
            // {
            //     postdata = range(0, this.state.totalphotocount -1).map((i)  => (
            //         <Userphotoitems ProfilepicType={ProfilepicType.photos__image_large} ></Userphotoitems>
            //         ));
            // }  
            postdata = <Nodatamessage imagesource={nodataimage}
                            type={nodatatext_image_configuration.userprofilevideo}
                            nodata_message={nodatatext_message.noexhibitorphotosfound}
                            btntype={ButtonType.edit_mode_button_profile}
                            svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                            ishow={true}
                            icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}>                    
                        </Nodatamessage>
        }
        //#endregion        
        let placeholder = commonplaceholder.userfeedpost + "" + commonplaceholder.more;
        let displaypostvideodiv = null
        if (this.props.otheruserid !== null && this.props.otheruserid !== undefined) {
            placeholder = commonplaceholder.userfeedpost + " " + commonplaceholder.to + " " + this.props.otherusername + "" + commonplaceholder.more;
        }
        else {
            displaypostvideodiv =
                <Feedpost placeholder={placeholder}
                    PostProfilepicType={ProfilepicType.uploadeduserstreamlinephoto}
                    clearfields_after_submit={this.state.clearfields_after_submit}
                    onSubmit={this.submit}
                    userstreamlinephoto={true}
                    feedtype="images"
                    uploaded_image_url={this.state.uploaded_image_url}
                    uploaded_file_url={this.state.uploaded_image_url}
                    btntype={ButtonType.btnuserfeedpost}
                    buttondisabled={this.state.buttondisabled}
                    buttontext={ButtonText.post}
                    is_cancel_button_show={false}
                    is_photo_button_show={true}
                    rownumber={textarearownumber.five}
                    pagetype={PageType.userprofilephoto}
                    onSuccessImageupload={this.onSuccessImageupload}
                    filestacktype={FilestackType.streamphoto}
                    uploadfileoption={filestackoptionimage}
                    otheruserid={this.props.otheruserid}>
                </Feedpost>
            if (this.props.is_editmode_exhibitor !== null && this.props.is_editmode_exhibitor !== undefined && this.props.is_editmode_exhibitor === false) {
                displaypostvideodiv = null;
            }
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.margin_t_b_25.join(' ')}>
                    {displaypostvideodiv}
                </div>
                <div className={classshared.photos__cards.join(' ')}>
                    {postdata}
                </div>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        //onuserfeedpostsave: (data) => dispatch(actions.userpostsave(data)),
        onuserfeedpostdelete: (data) => dispatch(actions.userpostdelete(data)),
    };
};
export default connect(null, mapDispatchToProps)(userphotos, axios);