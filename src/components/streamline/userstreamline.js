import React, { Component } from 'react';
import * as classshared from './classconst';
import { commonplaceholder, ButtonText, Post_Type, ProfilepicType, textarearownumber, ButtonType, PageType, confirmdelete, label_text,socketendpoint } from '../../shared/utility'
import * as actions from '../../store/actions/index';
import axios from '../../store/axios-orders';
import { connect } from 'react-redux';
import { get_user_personal_feeds, userpostsave } from '../../actions/streamlines/dataactions';
import Streamlineitems from './streamlineitems';
import Feedpost from './feedpost';
import Spinner from '../UI/Spinner/Spinner'
import socket from '../../actions/socket';
import Userprofilenavlink from '../commonnavlinks/userprofilenavlink';
import reactStringReplace from 'react-string-replace';
import socketIOClient from "socket.io-client";


class userstreamline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feed_message: null,
            post_type: Post_Type.messages,
            file_url: null,
            video_image_caption: null,
            buttondisabled: true,
            list_user_feeds: null,
            clearfields_after_submit: false,
            delete_item_id: null,
            loading: false,
            client: socket()
        }
    }
    filldata() {
        this.setState({ loading: true })
        var data = get_user_personal_feeds(this.props.otheruserid, this.props.type_for)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ list_user_feeds: res.data, loading: false });
                }
            }
        });
    }
    componentWillUnmount() {
        const socket = socketIOClient(socketendpoint, {'transports': ['websocket', 'polling']});
        socket.off("show_updated_feed_to_notified_user");        
    }
    componentDidMount() {
        this.filldata();
        const socket = socketIOClient(socketendpoint, {'transports': ['websocket', 'polling']});       
        socket.on('show_updated_feed_to_notified_user', (data) => {            
            this.notificationdata(data)
        })
    }
    notificationdata(data) {        
        if (data !== null && data !== undefined) {
            let listdata = [];
            listdata.push(data);
            let selecteddata = listdata.find(i => i.poster_user_id === this.props.loggedin_user_id);
            if (selecteddata !== undefined) {                
                if (this.state.list_user_feeds === null) {
                    this.setState({ list_user_feeds: listdata})
                }
                else {
                    this.setState({ list_user_feeds: [data, ...this.state.list_user_feeds]})
                }
            }
        }
    }
    deleteitemconfirmhandler = (event, id) => {
        event.preventDefault();
        this.setState({ delete_item_id: id }, () => {
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
    feedmessagedchanged = (e) => {
        this.setState({
            feed_message: e.target.value,
            buttondisabled: false
        });
        if (e.target.value === "") {
            this.setState({
                buttondisabled: true
            });
        }
    }
    submit = (values) => {
        if (values.text_message !== "" && values.text_message !== null && values.text_message !== undefined) {
            let userid = null;
            if (values.user_id !== undefined) {
                userid = values.user_id
            }
            const data = {
                feed_message: values.text_message,
                mention_user_id: userid,
                post_type: this.state.post_type,
                file_url: this.state.file_url,
                video_image_caption: this.state.video_image_caption,
                otheruserid: this.props.otheruserid,
                type_for: this.props.type_for,
                exhibitor_id: null
            };
            var listdata = userpostsave(data)
            listdata.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({ clearfields_after_submit: true }, () => {
                            this.state.client.update_feed_post_notified_user(res.data[0]);                            
                            if (res.data[1] !== null) {
                                this.state.client.user_feedpost_save(res.data[1]);
                            }
                            //If loggedin user mention user and post something, that mentioned user can get notification about post.
                            if (res.data[2] !== null) {
                                this.state.client.user_feedpost_save(res.data[2]);
                            }
                            if (this.state.list_user_feeds === null) {
                                this.setState({ clearfields_after_submit: false, list_user_feeds: res.data[0] })
                            }
                            else {
                                this.setState({ clearfields_after_submit: false, list_user_feeds: [res.data[0], ...this.state.list_user_feeds] })
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
                    //check if current user is poster user and posting user available that time replace wall post message ##user name with posting username
                    //if currentuser is posting user that time wall_post_type={item.wall_post_type} as it is
                    let postingusername = item.visitor[0]["name"]
                    let wallposttype = item.wall_post_type                    
                    if (item.posting_user_id === this.props.loggedin_user_id) {
                        if (item.poster_user_id !== null && item.poster_user_id !== item.posting_user_id) { 
                            postingusername=label_text.you
                            wallposttype = reactStringReplace(item.wall_post_type_poster_user, "##username", (match, i) => (
                                <Userprofilenavlink
                                    username={item.postermentionusername}
                                    is_exhibitorprofile={false}
                                >{match}</Userprofilenavlink>
                            ));                           
                        }
                    }
                    return (
                        <Streamlineitems
                            is_tieups={this.props.is_tieups}
                            otheruserid={this.props.otheruserid}
                            otherusername={this.props.otherusername}
                            key={item.id}
                            id={item.id}
                            profile_pic_url={item.visitor[0]["profile_pic_url"]}
                            ProfilepicType={ProfilepicType.user_nav__user_photo_small}
                            wall_post_type={wallposttype}
                            userpostername={postingusername}
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
                            uploaded_pic={item.file_url}
                            useruploadedphototype={ProfilepicType.photos__image_large_streamline}
                            video_thumbnail_image_url={item.video_thumbnail_image_url}
                            video_id={item.video_id}
                            posttype={item.post_type}
                            loggedin_user_id={this.props.loggedin_user_id}
                            PageType={PageType.userprofilestreamline}
                            deleteposthandler={(event) => this.deleteitemconfirmhandler(event, item.id)}
                        >
                        </Streamlineitems>
                    )
                });
            }
        }
        let placeholder = commonplaceholder.userfeedpost + "" + commonplaceholder.more;
        if (this.props.otherusername !== null && this.props.otherusername !== undefined) {
            placeholder = commonplaceholder.userfeedpost + " " + commonplaceholder.to + " " + this.props.otherusername + "" + commonplaceholder.more;
        }
        return (
            <React.Fragment>
                {spinner}
                {
                    this.props.is_tieups ?
                        (
                            <Feedpost placeholder={placeholder}
                                clearfields_after_submit={this.state.clearfields_after_submit}
                                PostProfilepicType={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m} onSubmit={this.submit}
                                current_loggedin_user_profile_pic={this.props.current_loggedin_user_profile_pic}
                                feedmessagedchanged={this.feedmessagedchanged}
                                btntype={ButtonType.btnuserfeedpost}
                                userfeedposthandler={this.userfeedposthandler}
                                buttondisabled={this.state.buttondisabled}
                                buttontext={ButtonText.post}
                                is_cancel_button_show={false}
                                is_photo_button_show={false}
                                rownumber={textarearownumber.five}
                                pagetype={PageType.userprofilestreamline}
                                textarea_value={this.state.feed_message}
                                otheruserid={this.props.otheruserid}
                                otherusername={this.props.otherusername}>
                            </Feedpost>
                        ) : null
                }
                <div className={classshared.streamline__cards}>
                    {postdata}
                </div>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onuserfeedpostdelete: (data) => dispatch(actions.userpostdelete(data)),
    };
};
export default connect(null, mapDispatchToProps)(userstreamline, axios);