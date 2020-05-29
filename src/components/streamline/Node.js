import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import Button from '../UI/Button/Button';
import { ProfilepicType, ButtonText, PageType } from '../../shared/utility';
import { usercommentslike, usercommentsunlike, save_user_comments, delete_user_comments } from '../../actions/streamlines/dataactions';
import { save_user_wing_feeds_comments, save_user_wings_feed_comments_likes, delete_user_wings_feed_comments_likes } from '../../actions/wings/dataactions';
import socket from '../../actions/socket';
import NodeForm from './nodeform'

class Node extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comment_id: props.node.id,
            //user_post_id:props.node.user_post_id,
            current_user_likes: props.node.current_user_likes,
            comments_likes_total: props.node.comments_likes_total,
            showReplyForm: false,
            selectedCommentId: null,
            showMenuLead: false,
            childrendata: this.props.children,
            client: socket()
        }
        this.showMenuLead = this.showMenuLead.bind(this);
        this.closeMenuLead = this.closeMenuLead.bind(this);
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

    handleOpenReplyForm = id => () => {
        this.setState({
            showReplyForm: true,
            selectedCommentId: id
        });
    };

    handleCloseReplyForm = () => {
        this.setState({
            selectedCommentId: null,
            showReplyForm: false
        });
    };
    usercommentshandler = (event, commentid) => {
        event.preventDefault();
        let id = this.state.comment_id
        if (commentid !== undefined && commentid !== null) {
            id = commentid;
        }
        if (event.keyCode === 13) {
            const formdata = {
                user_post_id: this.props.node.user_post_id,
                id: id,
                comments: event.target.value,
                is_reply_for_comment: true
            };
            var data = null;
            if (this.props.PageType === PageType.userwings) {
                data = save_user_wing_feeds_comments(formdata)
            }
            else {
                data = save_user_comments(formdata)

            }
            data.then(res => {
                if (res.data["error"] === undefined) {
                    this.state.client.user_feeds_comments_totalcount_child();
                    this.setState({
                        selectedCommentId: null,
                        showReplyForm: false
                    })
                }
            });
        }
    }
    deletecommenthandler = (event, commentid, index) => {
        event.preventDefault();
        const dataval = {
            id: commentid
        };
        var data = delete_user_comments(dataval)
        data.then(res => {
            if (res !== undefined) {
                if (res.data === true) {
                    const commentsdata = Object.assign([], this.state.commentsdata);
                    commentsdata.splice(index, 1);
                    this.setState({ childrendata: commentsdata });
                }
            }
        });
    }
    usercommentslikehandler = (event, commentid) => {
        event.preventDefault();
        let id = this.state.comment_id
        if (commentid !== undefined && commentid !== null) {
            id = commentid;
        }
        const formdata = {
            user_feeds_comments_id: id
        };
        var data = null
        if (this.props.PageType === PageType.userwings) {
            data = save_user_wings_feed_comments_likes(formdata)
        }
        else {
            data = usercommentslike(formdata)
        }
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ current_user_likes: true, comments_likes_total: parseInt(this.state.totallikescount, 10) + 1 })
            }
        });
    }
    usercommentsunlikehandler = (event, commentid) => {
        event.preventDefault();
        let id = this.state.comment_id
        if (commentid !== undefined && commentid !== null) {
            id = commentid;
        }
        const formdata = {
            user_feeds_comments_id: id
        };
        var data = null
        if (this.props.PageType === PageType.userwings) {
            data = delete_user_wings_feed_comments_likes(formdata)
        }
        else {
            data = usercommentsunlike(formdata)
        }
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ current_user_likes: false, comments_likes_total: parseInt(this.state.totallikescount, 10) - 1 })
            }
        });
    }
    render() {
        //   let replycommentbox =null        
        //   if(this.state.is_show_reply_commentbox)
        //   {        
        //     replycommentbox = <div className={classshared.comments_list__main_with_space.join(' ')}>
        //                               <div className={classshared.user_nav__icon_box2}>
        //                                   <Profilepic type={this.props.commentusertype} profilepic_url={this.props.current_user_profile_pic_url} altname=""></Profilepic>
        //                               </div>
        //                               <input type="text" 
        //                                     placeholder={commonplaceholder.userpostcomment}  
        //                                     className={classshared.comment_box}
        //                                     onKeyUp={this.props.onKeyUp}></input>
        //                               <div className={classshared.margin_l_m}><Button btntype={ButtonType.btnsharecommentlikepost} 
        //                               clicked={( event ) => this.is_show_reply_commentbox_cancel( event, true)}>{ButtonText.cancel}</Button></div>
        //                           </div>
        //   }         
        //   let maincommentbox =null
        //   if(this.state.is_show_main_commentbox)
        //   {
        //     maincommentbox = <div className={classshared.comments_list__main_with_space.join(' ')}>
        //                               <div className={classshared.user_nav__icon_box2}>
        //                                   <Profilepic type={this.props.commentusertype} profilepic_url={this.props.current_user_profile_pic_url} altname=""></Profilepic>
        //                               </div>
        //                               <input type="text" 
        //                                     placeholder={commonplaceholder.userpostcomment}  
        //                                     className={classshared.comment_box}
        //                                     onKeyUp={( event ) => this.usercommentshandler( event,null,false)}></input>
        //                               <div className={classshared.margin_l_m}><Button btntype={ButtonType.btnsharecommentlikepost} 
        //                               clicked={( event ) => this.is_show_reply_commentbox_cancel( event, false)}>{ButtonText.cancel}</Button></div>
        //                           </div>
        //   }    

        let childnodes = [];
        if (this.state.childrendata) {
            if (this.state.childrendata.length > 0) {
                this.state.childrendata.map((item, i) => {
                    let detail =
                        <Node node={item} children={item.children}
                            PageType={this.props.PageType}
                            is_tieups={this.props.is_tieups}
                            otheruserid={this.props.otheruserid}
                            doticons={this.props.doticons}
                            commented_user_id={item.user_id}
                            loggedin_user_id={this.props.loggedin_user_id}
                            btnlistdeleteedit={this.props.btnlistdeleteedit}
                            deletecommenthandler={(event) => this.deletecommenthandler(event, item.id, i)}
                            btnuserpostmore={this.props.btnuserpostmore}
                            commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin} ischild={true}
                            current_user_profile_pic_url={this.props.current_user_profile_pic_url}
                            usercommentslikehandler={(event) => this.usercommentslikehandler(event, item.id)}
                            usercommentsunlikehandler={(event) => this.usercommentsunlikehandler(event, item.id)}
                            onKeyUp={(event) => this.usercommentshandler(event, item.id, true)} is_show_reply_commentbox={false} />

                    return (
                        childnodes.push(<li key={item.id} className={classshared.comments__reply.join(' ')}>{detail}</li>)
                    )
                })
                //   childnodes = this.props.children.map(function(childnode) {
                //   return (
                //     <li className={classshared.comments__reply.join(' ')}>
                //     <Node node={childnode} children={childnode.children}  commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin} ischild={true} current_user_profile_pic_url={this.props.current_user_profile_pic_url}/></li>
                //   );
                // });

            }
        }
        return (
            <React.Fragment>
                <li >
                    <div className={classshared.comments_list__main.join(' ')}>
                        <div className={classshared.comment_space.join(' ')}>
                            {
                                this.props.commented_user_id === this.props.loggedin_user_id ?
                                    (
                                        <div className={classshared.card__dots}>
                                            <div className={classshared.margin_r_m}><Button btntype={this.props.btnuserpostmore}
                                                clicked={this.showMenuLead} svgclass={classshared.dots__icon}
                                                icon={this.props.doticons}></Button>
                                                {
                                                    this.state.showMenuLead
                                                        ? (
                                                            <div className={classshared.commentdropdown}>
                                                                <Button btntype={this.props.btnlistdeleteedit} clicked={this.props.deletecommenthandler}>{ButtonText.delete}</Button>
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
                            {/* <div className={classshared.comments_header.join(' ')}>
                            <div className={classshared.user_nav__icon_box3}>
                                <Profilepic profilepic_url={this.props.node.userprofiledata[0]["profile_pic_url"]} type={this.props.commentusertype} altname=""></Profilepic>
                            </div>
                            <div className={classshared.comment_user_name.join(' ')}>{this.props.node.userprofiledata[0]["name"]}</div>
                            <div className={classshared.comments_message_text.join(' ')}>{this.props.node.originaluserprofiledata_reply}</div>
                        </div>
                        <p className={classshared.comments_message_text.join(' ')}>{this.props.node.comments}</p> */}
                            <div className={classshared.streamline__card_left.join(' ')}>
                                <Profilepic profilepic_url={this.props.node.userprofiledata[0]["profile_pic_url"]} type={this.props.commentusertype} altname=""></Profilepic>
                                <div className={classshared.streamline__card_header.join(' ')}>
                                    <div className={classshared.streamline__card_header_name}>
                                        <span className={classshared.font_1_medium_text_color__light_blue_margin_r_sm_text_transform_c_text_12.join(' ')}>{this.props.node.userprofiledata[0]["name"]}</span>
                                        <span className={classshared.font_2_regular_text_12.join(' ')}>{this.props.node.originaluserprofiledata_reply}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={classshared.streamline__card_content}>
                                <div className={classshared.streamline__card_inner_content}>
                                    <span className={classshared.font_2_regular_text_12.join(' ')}>{this.props.node.comments}</span>
                                </div>
                            </div>
                            {
                                this.props.is_tieups ?
                                    (<div className={classshared.comment_icons}>
                                        <div className={classshared.like_icon_margin_r_m.join(' ')}>
                                            {
                                                this.state.current_user_likes
                                                    ?
                                                    (
                                                        <div onClick={(event) => this.usercommentsunlikehandler(event)}><i className={classshared.fontawesome_heart_circle_alt_blue.join(' ')}></i></div>
                                                    )
                                                    :
                                                    (
                                                        <div onClick={(event) => this.usercommentslikehandler(event)}><i className={classshared.fontawesome_heart_circle_alt.join(' ')}></i></div>
                                                    )
                                            }
                                        </div>
                                        <a href="#/" id={this.props.id} className={classshared.like_icon.join(' ')} onClick={this.handleOpenReplyForm(this.props.node.id)}>
                                            <i className={classshared.fontawesome_reply.join(' ')}></i>
                                            <span className={classshared.margin_l_sm}> <span className={classshared.likes__number.join(' ')}>{ButtonText.reply}</span></span>
                                        </a>
                                    </div>) : null
                            }

                        </div>
                    </div>

                </li>
                {this.state.showReplyForm &&
                    this.state.selectedCommentId === this.props.node.id && (
                        <NodeForm
                            closeForm={this.handleCloseReplyForm}
                            parentId={this.props.node.id}
                            onKeyUp={(event) => this.usercommentshandler(event, this.props.node.id)}
                            commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin}
                            profilepic_url={this.props.current_user_profile_pic_url}
                        />
                    )}
                {childnodes ?
                    // <React.Fragment>{childnodes}{replycommentbox}</React.Fragment>
                    <React.Fragment>
                        {childnodes}
                    </React.Fragment>
                    : null}
            </React.Fragment>
        );
    }
}
//   const mapDispatchToProps = dispatch => {
//     return {                                   
//         onusercommentssave: ( data ) => dispatch( actions.usercommentssave( data ) ),       
//     };
// };
export default Node