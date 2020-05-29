import React, { Component } from 'react';
import * as classshared from '../../../commoncss/classconst';
import { ButtonType, ButtonText, ICONS, label_text, wingster_wing_status, FilestackType, filestackoptionimage, users_type, customPopUp  } from '../../../../shared/utility';
import Icon from '../../../UI/Icon/Icon';
import Button from '../../../UI/Button/Button';
import 'react-responsive-modal/styles.css';
import axios from '../../../../store/axios-orders';
import { connect } from 'react-redux';
import UserTieups from '../../../Userpersonalprofile/usertieups/usertieups';
import { exitfromwings, join_user_wings_save, wingnameupdatebycurator } from '../../../../actions/wings/dataactions';
import ImageUpload from '../../../FilestackUpload/FilestackUpload';
import Modal from "react-responsive-modal";//'../../UI/Modal/Modal';
import 'react-responsive-modal/styles.css';
import Aboutmeedit from '../../../Userpersonalprofile/aboutme/aboutmeedit';
import * as actions from '../../../../store/actions/index';
import MediaQuery from 'react-responsive';
import SidebarPic from '../../../UI/Layout/sidebarimage/sidebar';

class aboutme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cover_image_url: props.wingdata.wing_pic_url,
            userjoiningstatus: props.userjoiningstatus,
            about_me: props.wingdata.description,
            is_openaboutme_modal: false,
            wing_title: props.wingdata.title,
            is_wingtitle_edit: false,
            show_save_button: false
            //applytowingjointext: ButtonText.applytowingjoin,
            //applytowingjointype: ButtonType.btn_blue_font_1_bold_text_14
        }
    }

    joinwinghandler = (event) => {
        event.preventDefault();
        const formdata = {
            wing_id: this.props.wing_id
        };
        var data = join_user_wings_save(formdata)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ userjoiningstatus: wingster_wing_status.requested })
            }
        });
    }
    deletefromwinghandler = (event) => {
        event.preventDefault();
        const formdata = {
            wing_id: this.props.wing_id
        };
        var data = exitfromwings(formdata)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ userjoiningstatus: null });
            }
        });
    }
    editabouthandler = (event) => {
        event.preventDefault();
        this.setState({ is_openaboutme_modal: true });
    }
    aboutmechanged = (e) => {
        this.setState({
            about_me: e.target.value, aboutmevalid: true

        });
    }
    closeaboutmemodalhandler = () => {
        this.setState({ is_openaboutme_modal: false });
    }
    saveaboutme = () => {
        const data = {
            wingid: this.props.wingdata.id,
            about_me: this.state.about_me
        };
        this.props.onaboutmesaveupdate(data);
        this.setState({ is_openaboutme_modal: false });
    }
    onSuccessImageupload = (result) => {
        const data = {
            wingid: this.props.wingdata.id,
            cover_pic_url: result.filesUploaded[0]["url"],
        };
        this.props.oncoverimagesaveupdate(data);
        this.setState({ childloading: true }, () => {
            localStorage.setItem('wing_pic_url', result.filesUploaded[0]["url"])
            this.setState({ cover_image_url: result.filesUploaded[0]["url"] }, () => {
                setTimeout(
                    function () {
                        this.setState({ childloading: false });
                    }
                        .bind(this),
                    5000
                );
            })
        })
    };
    titlechangehandler = (event) => {
        event.preventDefault();
        this.setState({ wing_title: event.target.value });

    }

    edittitleendhandler = (event) => {
        this.setState({ is_wingtitle_edit: true, show_save_button: true });

    }
    savetitlehandler = (event) => {
        event.preventDefault();
        const dataval = {
            wingid: this.props.wingdata.id,
            title: this.state.wing_title
        };
        var data = wingnameupdatebycurator(dataval)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ is_wingtitle_edit: false, show_save_button: false });
                    localStorage.setItem('wingname', this.state.wing_title)
                }
            }
        });
    }
    render() {
        let divjoinwingbuttondiv = null
        if ((this.props.usertypename === users_type.visitor) && !this.props.is_member) {
            divjoinwingbuttondiv = <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} clicked={this.joinwinghandler}>{ButtonText.applytowingjoin}</Button>
        }

        let wingtitle = null
        if (this.state.is_wingtitle_edit) {
            wingtitle = <React.Fragment><div className={classshared.main__subtitles}> <input
                type="text"
                onChange={this.titlechangehandler}
                className={classshared.input_box}
                defaultValue={this.state.wing_title}>
            </input> <div className={classshared.margin__10}><Button btntype={ButtonType.edit_mode_button_profile} clicked={this.savetitlehandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.SAVE}></Button></div></div>
            </React.Fragment>
        }
        else {
            let edittitlebutton = null
            if (this.props.is_editmode) {
                edittitlebutton = <Button btntype={ButtonType.edit_mode_button_profile} clicked={this.edittitleendhandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.NEWMESSAGE}></Button>
            }
            wingtitle = <React.Fragment>
                <div className={classshared.main__subtitles}><div className={classshared.rightheadertext.join(' ')}>
                    {this.state.wing_title}
                </div><div className={classshared.margin__10}>{edittitlebutton}</div></div></React.Fragment>
        }
        let coverpic = null
        let styleback = '';
        if (this.state.cover_image_url !== undefined) {
            coverpic = this.state.cover_image_url
            styleback = `url(${coverpic})`
        }
        //if (this.props.usertypename === users_type.wingster) {
        let editcoverpic = null;
        let editaboutme = null;
        let userstatusbuttondiv = null;
        let aboutme = null;
        if (this.state.about_me !== null && this.state.about_me !== undefined && this.state.about_me !== "") {           
            aboutme = this.state.about_me            
        }
        // if (this.props.wing_member_wing_id !== null && this.props.wing_member_wing_id !== undefined) {
        //     if (this.props.wing_member_wing_id.toString() === this.props.wing_id.toString()) {
        //         if (this.state.userjoiningstatus === null) {
        //             userstatusbuttondiv = <div className={classshared.margin_r_m}>
        //                 <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} clicked={this.joinwinghandler}>{ButtonText.applytowingjoin}</Button></div>
        //         }
        //         else {
        //             if (this.state.userjoiningstatus.toString() === wingster_wing_status.requested.toString()) {
        //                 userstatusbuttondiv = <div className={classshared.margin_r_m}>
        //                     <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} disabled>{ButtonText.requested}</Button></div>
        //             }
        //             else if (this.state.userjoiningstatus.toString() === wingster_wing_status.accepted.toString()) {
        //                 userstatusbuttondiv = <div className={classshared.margin_r_m}>
        //                     <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} clicked={this.deletefromwinghandler}>{ButtonText.exitfromwing}</Button></div>
        //             }
        //             else if (this.state.userjoiningstatus.toString() === wingster_wing_status.rejected.toString()) {
        //                 userstatusbuttondiv = <div className={classshared.margin_r_m}>
        //                     <Button btntype={ButtonType.btn_blue_font_1_bold_text_14}>{ButtonText.rejected}</Button></div>
        //             }
        //         }
        //     }
        // }
        // else {
        //     userstatusbuttondiv = <div className={classshared.margin_r_m}>
        //         <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} clicked={this.joinwinghandler}>{ButtonText.applytowingjoin}</Button></div>
        // }        
        if (this.props.is_curator) {
            if (this.props.is_editmode) {
                userstatusbuttondiv = <div className={classshared.margin_r_m}><Button btntype={ButtonType.editprofile} clicked={this.props.reseteditprofileclick} svgclass={classshared.icon_20_white_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}>{ButtonText.reset}</Button></div>
                editcoverpic = <ImageUpload buttontype={FilestackType.usercoverpic} option={filestackoptionimage} onSuccessupload={this.onSuccessImageupload} onErrorupload={this.onErrorImageupload} />
                editaboutme = <div><Button btntype={ButtonType.edit_mode_button_profile} clicked={this.editabouthandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.NEWMESSAGE}></Button></div>
                if (aboutme == null) {
                    aboutme = "Please click edit button to write about yourself!  "
                }
            }
            else {
                userstatusbuttondiv = <div className={classshared.margin_r_m}><Button btntype={ButtonType.editprofile} svgclass={classshared.icon_20_white_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}
                    clicked={this.props.oneditprofileclick}>{ButtonText.edit}</Button></div >
            }
        }
        let membersdiv = null;
        if (this.props.wingdata.wing_members_data !== null) {
            if (this.props.wingdata.wing_members_data.length > 0) {
                membersdiv = <UserTieups totaltieupes={this.props.totaltieupes} tieupsdata={this.props.wingdata.wing_members_data[0]} nametext={label_text.members}></UserTieups>
            }
        }
        return (
            <React.Fragment>
                <Modal open={this.state.is_openaboutme_modal} styles={customPopUp}
                    onClose={this.closeaboutmemodalhandler} center showCloseIcon={false}>
                    <Aboutmeedit closemodal={this.closeaboutmemodalhandler} aboutmevalue={this.state.about_me} changed={this.aboutmechanged} required="true"
                        isvalidaboutme={this.state.aboutmevalid} saveaboutme={this.saveaboutme}></Aboutmeedit>
                </Modal>
                <MediaQuery query="(max-width: 1224px)">
                    <div className={classshared.main__hero} style={{ backgroundImage: styleback }}>
                        {editcoverpic} </div>
                    <SidebarPic
                        is_editmode={this.state.is_editmode}
                        profile_pic_url={this.props.profile_pic_url}
                        headerheading={this.props.headerheading}
                        joindatetime={this.props.joindatetime}
                        onSuccessImageupload={this.props.onSuccessImageupload}
                        imagetype={this.props.imagetype}
                        usertypename={this.props.usertypename}
                        filestacktype={this.props.filestacktype}>
                    </SidebarPic>
                    <div className={classshared.mobile_view_content}>
                        <div className={classshared.margin_t_m}>
                            <div className={classshared.flex}>
                                {userstatusbuttondiv}
                            </div>
                        </div>
                        <div className={classshared.margin_t_m}>
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.locationtitle_movile_view.join(' ')}>
                                    <Icon svgclass={classshared.icon_15_icon_purple_dim__high.join(' ')} icon={ICONS.LOCATION_PIN}></Icon>
                                    {this.props.wingdata.location}
                                </div>
                                <div className={classshared.margin_t_sm}>
                                    <div className={classshared.locationtitle_movile_view.join(' ')}>
                                        <Icon svgclass={classshared.icon_18_icon_purple_dim__high.join(' ')} icon={ICONS.SHIELD}></Icon>
                                        Most Promising
                                    </div></div>
                            </div>
                        </div>
                        <div className={classshared.margin_t_m}>
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.descriptiontext.join(' ')}>
                                    {aboutme}
                                </div>{editaboutme}
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-device-width: 1224px)">
                    <div className={classshared.main__hero} style={{ backgroundImage: styleback }}>
                        {editcoverpic}
                        <div className={classshared.main__hero_content.join(' ')}>
                            {wingtitle}
                            {/* <div className={classshared.main__tags.join(' ')}>
                                <div className={classshared.tagbtn.join(' ')}>#Trending</div>
                                <div className={classshared.tagbtn.join(' ')}>#Champions</div>
                            </div> */}
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.locationtitle.join(' ')}>
                                    <Icon svgclass={classshared.icon_20_icon_purple_dim__high.join(' ')} icon={ICONS.LOCATION_PIN}></Icon>
                                    {this.props.wingdata.location}
                                </div>
                                <span className={classshared.seperator_grey.join(' ')}>|</span>
                                <div className={classshared.locationtitle.join(' ')}>
                                    <Icon svgclass={classshared.icon_20_icon_purple_dim__high.join(' ')} icon={ICONS.SHIELD}></Icon>
                                    Most Promising
                            </div>
                            </div>
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.descriptiontext.join(' ')}>
                                    {aboutme}
                                </div>
                                {editaboutme}
                            </div>
                            {membersdiv}
                            <div className={classshared.main__buttons}>
                                {userstatusbuttondiv}
                                {divjoinwingbuttondiv}
                            </div>
                        </div>
                    </div>
                </MediaQuery>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaboutmesaveupdate: (data) => dispatch(actions.wingaboutmesaveupdate(data)),
        oncoverimagesaveupdate: (data) => dispatch(actions.wingcoverimagesaveupdate(data)),
    };
};
export default connect(null, mapDispatchToProps)(aboutme, axios);