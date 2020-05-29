import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import Button from '../UI/Button/Button';
import { ICONS, ButtonType } from '../../shared/utility';
import axios from '../../store/axios-orders';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
//import Feedpost from './feedpost';
import Skeleton from 'react-loading-skeleton';
import { userpostupdate, user_feeds_likes, user_feeds_unlike } from '../../actions/streamlines/dataactions'
import socket from '../../actions/socket';

class userphotoitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            totallikescount: props.totallikescount,
            totalcommentscount: props.totalcommentscount,
            totalcommentsdata: props.totalcommentsdata,
            currentuserlike: props.currentuserlike,
            commentvalue: null,
            is_edit_mode: false,
            //userpostername:props.userpostername,
            //wall_post_type:props.wall_post_type,
            //posttime:props.posttime,
            //postmessage:props.postmessage,
            buttondisabled: true,
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
    usercommentshandler = (event, id) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            const data = {
                user_post_id: id,
                comments: event.target.value
            };
            this.setState({ commentvalue: event.target.value });
            this.props.onusercommentssave(data);
            this.setState({ currentuserlike: true, totalcommentscount: parseInt(this.state.totalcommentscount, 10) + 1, commentvalue: "" })
        }
    }
    feedmessagedchanged = (e) => {
        this.setState({
            postmessage: e.target.value,
            buttondisabled: false
        });
        if (e.target.value === "") {
            this.setState({
                buttondisabled: true
            });
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
    userfeedposthandler = () => {
        const dataval = {
            feed_message: this.props.postmessage,
            id: this.props.id
        };
        // this.props.onuserpostupdate(data );  
        // this.setState({                
        //     is_edit_mode:false           
        // });      
        var data = userpostupdate(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({
                    is_edit_mode: false
                });
            }
        });
    }
    render() {
        return (
            <div className={classshared.photos__wrapper}>
                <div className={classshared.photos__image}>
                    <Profilepic profilepic_url={this.props.uploaded_pic} type={this.props.ProfilepicType} altname="" skeletonwidth={150} skeletonheight={150}></Profilepic>
                </div>
                <div className={classshared.photos__content}>
                    <div className={classshared.photos__content_inner}>
                        <div className={classshared.like_icon.join(' ')}>
                            <h3 className={classshared.font_1_regular_text_14.join(' ')}>{this.props.postmessage || <Skeleton />}</h3> </div>
                        <div className={classshared.like_icon.join(' ')}>
                            {
                                this.state.currentuserlike
                                    ?
                                    (
                                        <Button btntype={ButtonType.btnsharecommentlikepost} clicked={(event) => this.userpostunlikehandler(event, this.props.id)} svgclass={classshared.photo_icon_blue.join(' ')} icon={ICONS.THUMBSUPS}></Button>
                                    )
                                    :
                                    (
                                        <Button btntype={ButtonType.btnsharecommentlikepost} clicked={(event) => this.userpostlikehandler(event, this.props.id)} svgclass={classshared.photo_icon} icon={ICONS.THUMBSUPS}></Button>
                                    )
                            }
                            <span className={classshared.text_light.join(' ')}>{this.state.totallikescount || <Skeleton />}</span>
                        </div>
                        <div className={classshared.like_icon.join(' ')}>
                            <Button btntype={ButtonType.btnsharecommentlikepost} clicked={this.userpostcommenthandler} svgclass={classshared.photo_icon} icon={ICONS.POSTCOMMENTS}></Button>
                            <span className={classshared.text_light.join(' ')}>{this.state.totalcommentscount || <Skeleton />}</span>
                        </div>
                        <div className={classshared.card__dots_flex}>
                            <Button btntype={ButtonType.btnuserpostmore}
                                clicked={this.showMenu} svgclass={classshared.dots__icon}
                                icon={ICONS.MORE_VERTICAL}></Button>
                            {
                                this.state.showMenu
                                    ? (
                                        <div
                                            className={classshared.arrow_box}
                                            ref={(element) => {
                                                this.dropdownMenu = element;
                                            }}
                                        >
                                            {/* <Button  btntype={ButtonType.btnlistdeleteedit} clicked={this.editposthandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}></Button> */}
                                            <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.props.deleteposthandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.TRASH}></Button>
                                        </div>
                                    )
                                    : (
                                        null
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
////export default streamlineitems;
const mapDispatchToProps = dispatch => {
    return {        
        onusercommentssave: (data) => dispatch(actions.usercommentssave(data)),        
    };
};
export default connect(null, mapDispatchToProps)(userphotoitems, axios);