import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import axios from '../../store/axios-orders';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Notification_Type, ButtonType, ButtonText,encodedstring } from '../../shared/utility'
import Button from '../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import shortid from "shortid";

class likesnotifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_read_notification: props.is_read_notification
        }
    }
    notificationmasrkasseenhandler = (event, id) => {
        event.preventDefault();
        const data = {
            id: id
        };
        this.props.onuser_notification_mark_asread(data);
        this.setState({ is_read_notification: true })
    }
    render() {
        let userid = encodedstring(this.props.poster_user_id)
        let isreadclass = null;
        if (this.state.is_read_notification) {
            isreadclass = classshared.notification_item_isread
        }
        else {
            isreadclass = classshared.notification_item
        }
        let tieupsbutton = null
        if (this.props.notification_type === Notification_Type.Tieups && this.props.is_request_or_response === true) {
            tieupsbutton = <div className={classshared.flex}>
                <div className={classshared.margin_r_sm}> <Button btntype={ButtonType.btn_blue_font_1_bold_text_11}
                    clicked={this.props.accepttieupsrequest}>{ButtonText.confirm}</Button></div>
                <Button btntype={ButtonType.btn_grey_font_1_bold_text_11}
                    clicked={this.props.deletetiupesrequest}>{ButtonText.delete}</Button>
            </div>
        }
        else if (this.props.notification_type === Notification_Type.Follow && this.props.is_follow === false) {
            tieupsbutton = <div className={classshared.flex}>
                <div className={classshared.margin_r_sm}> <Button btntype={ButtonType.btn_blue_font_1_bold_text_11}
                    clicked={this.props.followuserhandler}>{ButtonText.follow}</Button></div>
            </div>
        }
        return (
            <React.Fragment>
                <li className={isreadclass.join(' ')} onClick={(event) => this.notificationmasrkasseenhandler(event, this.props.activityverbid)}>
                    <div className={classshared.flex}>
                        <div className={classshared.streamline__card_left.join(' ')}>
                            <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname=""></Profilepic>
                        </div>
                        <div className={classshared.streamline__card_right.join(' ')}>
                            <div className={classshared.streamline__card_header.join(' ')}>
                                <div className={classshared.streamline__card_header_name}>
                                    <NavLink
                                        key={shortid.generate()}
                                        id="bluelink"
                                        className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_transform_c_text_12.join(' ')}
                                        to={`/home/${userid}`}>{this.props.userpostername}</NavLink>
                                    {/* <span className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_transform_c_text_13.join(' ')}>{this.props.userpostername}</span> */}
                                    <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{this.props.notification_messages}</span>
                                </div>
                                <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{this.props.posttime}</span>
                                <span className={classshared.margin_t_sm}>{tieupsbutton}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onuser_notification_mark_asread: (data) => dispatch(actions.user_notification_mark_asread(data)),
    };
};
export default connect(null, mapDispatchToProps)(likesnotifications, axios);