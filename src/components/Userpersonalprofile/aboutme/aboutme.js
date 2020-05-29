import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { FilestackType, ButtonType, ButtonText, ICONS, profiletabindex, filestackoptionimage, label_text, ProfilepicType, customPopUp } from '../../../shared/utility';
import ImageUpload from '../../FilestackUpload/FilestackUpload';
import Button from '../../UI/Button/Button';
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import Aboutmeedit from './aboutmeedit';
import AboutmeDesignationedit from './aboutmedesignationedit';
import * as actions from '../../../store/actions/index';
import axios from '../../../store/axios-orders';
import { connect } from 'react-redux';
import UserTieups from '../usertieups/usertieups';
//import Tabitems from '../userprofiletabs/tabitems';
import Spinner from '../../UI/Spinner/Spinner';
import Skeleton from 'react-loading-skeleton';
import MediaQuery from 'react-responsive';
import SidebarPic from '../../UI/Layout/sidebarimage/sidebar';

// const options = {
//     accept: 'image/*',
//     };
// let designationborderclass= classshared.userlabelmedium;
// let paragraphborderclass= classshared.paragraph;
class aboutme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            childloading: false,
            cover_image_url: props.cover_image_url,
            profile_pic_url: props.profile_pic_url,
            name: props.name,
            designation: props.designation,
            location: props.location,
            about_me: props.about_me,
            is_open_designationmodal: false,
            is_openaboutme_modal: false,
            aboutmevalid: false,
            companyname: props.companyname,
            designationformvalid: false,
            alonedesignation: props.alonedesignation,
            // otheruserid: props.otheruserid,
            // otherusername: props.otherusername === null ? null : props.otherusername,
            //tabindex: profiletabindex.streamline,
            showMenu: false,
            btnfollow_text: props.btnfollow_text,
            tieupsdata: null,
            totaltieupes: null,
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.name !== prevState.name) {
            return {
                cover_image_url: nextProps.cover_image_url,
                profile_pic_url: nextProps.profile_pic_url,
                name: nextProps.name,
                designation: nextProps.designation,
                location: nextProps.location,
                about_me: nextProps.about_me,
                companyname: nextProps.companyname,
                alonedesignation: nextProps.alonedesignation,
                btnfollow_text: nextProps.btnfollow_text,
                tieupsdata: nextProps.tieupsdata,
                totaltieupes: nextProps.totaltieupes,
            }
        }
        else {
            return null;
        }

    }
    onSuccessImageupload = (result) => {
        const data = {
            cover_pic_url: result.filesUploaded[0]["url"],
        };
        this.props.oncoverimagesaveupdate(data);
        this.setState({ childloading: true }, () => {
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
    editdesignationhandler = (event) => {
        event.preventDefault();
        this.setState({ is_open_designationmodal: true });
    }
    editabouthandler = (event) => {
        event.preventDefault();
        this.setState({ is_openaboutme_modal: true });
    }
    closeaboutmemodalhandler = () => {
        this.setState({ is_openaboutme_modal: false });
    }
    closedesignationmodalhandler = () => {
        this.setState({ is_open_designationmodal: false });
    }
    aboutmechanged = (e) => {
        this.setState({
            about_me: e.target.value, aboutmevalid: true

        });
    }
    saveaboutme = () => {
        const data = {
            about_me: this.state.about_me
        };
        this.props.onaboutmesaveupdate(data);
        this.setState({ is_openaboutme_modal: false });
    }
    designationchanged = (e) => {
        this.setState({
            alonedesignation: e.target.value,
            designationformvalid: true

        });
    }
    companychanged = (e) => {
        this.setState({
            companyname: e.target.value,
            designationformvalid: true
        });
    }
    locationchanged = (e) => {
        this.setState({
            location: e.target.value,
            designationformvalid: true
        });
    }
    savedesignationlocation = () => {
        const data = {
            designation: this.state.alonedesignation,
            company_name: this.state.companyname,
            location: this.state.location
        };
        this.props.ondesignationlocationsaveupdate(data);
        this.setState({ is_open_designationmodal: false, designation: this.state.alonedesignation + " At " + this.state.companyname });
    }
    settabindexhandler = () => {
        this.setState({ tabindex: profiletabindex.tieups })
    }
    // onChange = (activeKey) => {
    //     this.setState({
    //         tabindex: activeKey
    //     });
    // }
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

    render() {


        let coverpic = null
        let styleback = '';
        if (this.state.cover_image_url !== undefined) {
            coverpic = this.state.cover_image_url
            styleback = `url(${coverpic})`
        }
        let aboutme = null;
        if (this.state.about_me !== null && this.state.about_me !== undefined) {
            aboutme = this.state.about_me
        }
        let spinner = null;
        if (this.state.childloading) {
            spinner = <Spinner />
        }
        let tieupsdiv = null;
        if (this.state.tieupsdata !== null) {
            tieupsdiv = <UserTieups otheruserid={this.props.otheruserid} totaltieupes={this.state.totaltieupes}
                settabindexhandler={this.settabindexhandler}
                tieupsdata={this.state.tieupsdata}
                nametext={label_text.tieups}></UserTieups>
        }
        let editcoverpic = null;
        let editdesignation = null;
        let editaboutme = null;
        let buttons = null;
        let resetbutton = null;
        if (this.props.is_editmode) {
            resetbutton = <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} clicked={this.props.reseteditprofileclick}>{ButtonText.reset}</Button>
            editcoverpic = <ImageUpload buttontype={FilestackType.usercoverpic} option={filestackoptionimage} onSuccessupload={this.onSuccessImageupload} onErrorupload={this.onErrorImageupload} />
            editdesignation = <div className={classshared.margin_l_m}><Button btntype={ButtonType.edit_mode_button_profile} clicked={this.editdesignationhandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.NEWMESSAGE}></Button></div>
            editaboutme = <div><Button btntype={ButtonType.edit_mode_button_profile} clicked={this.editabouthandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.NEWMESSAGE}></Button></div>
            if (this.state.about_me === null || this.state.about_me === undefined) {
                aboutme = "Please click edit button to write about yourself!  "
            }
        }
        else {
            resetbutton = <Button btntype={ButtonType.btn_blue_font_1_bold_text_14} clicked={this.props.oneditprofileclick}>{ButtonText.edit}</Button>
        }
        buttons =
            <React.Fragment>
                {resetbutton}
                <div className={classshared.margin_l_m.join(' ')}>
                    <Button btntype={ButtonType.btn_btn_outline_blue}>
                        {ButtonText.recentactivity}
                    </Button>
                </div>
            </React.Fragment>
        if (this.props.otheruserid !== null && this.props.otheruserid !== undefined) {
            buttons = <React.Fragment>
                {/* <Button btntype={ButtonType.editprofile}>{ButtonText.tieups}</Button> */}
                <div className={classshared.margin_l_m}>
                    <Button islisting={true} btntype={ButtonType.btn_btn_outline_blue} clicked={this.showMenu}>{ButtonText.more}</Button>
                    {
                        this.state.showMenu
                            ? (
                                <div
                                    className={classshared.list_dropdown_content}
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}>
                                    <Button btntype={ButtonType.btnlistdeleteedit} svgclass={classshared.icon_20_icon_purple_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}>
                                        {ButtonText.sendmessage}
                                    </Button>
                                    {
                                        this.props.btnfollow_text
                                            ?
                                            (
                                                <Button btntype={ButtonType.btnlistdeleteedit} svgclass={classshared.icon_20_icon_purple_margin_r_10.join(' ')} clicked={this.props.unfollowuserhandler} icon={ICONS.TRASH}>{ButtonText.unfollow}</Button>
                                            )
                                            :
                                            (
                                                <Button btntype={ButtonType.btnlistdeleteedit} svgclass={classshared.icon_20_icon_purple_margin_r_10.join(' ')} clicked={this.props.followuserhandler} icon={ICONS.TRASH}>{ButtonText.follow}</Button>
                                            )
                                    }
                                </div>
                            )
                            :
                            (
                                null
                            )
                    }
                </div>
            </React.Fragment>
        }
        return (
            <React.Fragment>
                {spinner}
                <Modal open={this.state.is_openaboutme_modal} styles={customPopUp}
                    onClose={this.closeaboutmemodalhandler} center showCloseIcon={false}>
                    <Aboutmeedit closemodal={this.closeaboutmemodalhandler} aboutmevalue={this.state.about_me} changed={this.aboutmechanged} required="true"
                        isvalidaboutme={this.state.aboutmevalid} saveaboutme={this.saveaboutme}></Aboutmeedit>
                </Modal>
                <Modal open={this.state.is_open_designationmodal} styles={customPopUp}
                    onClose={this.closedesignationmodalhandler} center showCloseIcon={false}>
                    <AboutmeDesignationedit closemodal={this.closedesignationmodalhandler}
                        designationvalue={this.state.alonedesignation}
                        companyvalue={this.state.companyname}
                        locationvalue={this.state.location}
                        ondesignationchanged={this.designationchanged}
                        oncompanychanged={this.companychanged}
                        onlocationchanged={this.locationchanged} required="true"
                        isvalidaboutme={this.state.designationformvalid} saveaboutme={this.savedesignationlocation}></AboutmeDesignationedit>
                </Modal>

                <MediaQuery query="(max-width: 1224px)">
                    <div className={classshared.main__hero} style={{ backgroundImage: styleback }}>
                        {editcoverpic} </div>
                    <SidebarPic is_editmode={this.props.is_editmode}
                        otheruserid={this.props.otheruserid}
                        profile_pic_url={this.props.profile_pic_url}
                        first_name={this.props.name}
                        filestackoptionimage={filestackoptionimage}
                        onSuccessImageupload={this.props.onSuccessImageupload}
                        imagetype={ProfilepicType.user_nav__user_photo_large}
                        headerheading={this.props.headerheading}
                        joindatetime={this.props.joindatetime}
                        filestacktype={FilestackType.userprofilepic}>
                    </SidebarPic>
                    <div className={classshared.mobile_view_content}>
                        {/* <div>
                            <div class={classshared.padding_l_30px}><div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>{this.state.name || <Skeleton width={100} />}</div></div>
                            <div className={classshared.text_12_text_dark.join(' ')}>{this.props.joining_date || <Skeleton width={100} />}</div>
                        </div> */}
                        <div className={classshared.margin_t_m}>
                            <div className={classshared.flex}>
                                {resetbutton}
                                <div className={classshared.margin_l_m.join(' ')}><Button btntype={ButtonType.recentactivity} clicked={this.props.unfollowuserhandler} >{ButtonText.follow}</Button></div>
                            </div>
                        </div>
                        <div className={classshared.margin_t_m}>
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.locationtitle_movile_view.join(' ')}>
                                    <i className={classshared.fontawesome_user.join(' ')}></i>
                                    {this.state.designation || <Skeleton width={100} />}
                                </div>
                                <div className={classshared.margin_t_sm}>
                                    <div className={classshared.locationtitle_movile_view.join(' ')}>
                                        <i className={classshared.fontawesome_location_alt.join(' ')}></i>
                                        {this.state.location || <Skeleton width={100} />}
                                    </div> {editdesignation}</div>
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
                            <h1 className={classshared.rightheadertext.join(' ')}>{this.state.name || <Skeleton width={100} />}</h1>
                            {/* <div className={classshared.main__tags.join(' ')}>
                                <div className={classshared.tagbtn.join(' ')}>#Trending</div>
                                <div className={classshared.tagbtn.join(' ')}>#Champions</div>
                            </div> */}
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.locationtitle.join(' ')}>
                                    <i className={classshared.fontawesome_user.join(' ')}></i>
                                    {this.state.designation || <Skeleton width={100} />}
                                </div>
                                <span className={classshared.seperator_grey.join(' ')}>|</span>
                                <div className={classshared.locationtitle.join(' ')}>
                                    <i className={classshared.fontawesome_location_alt.join(' ')}></i>
                                    {this.state.location || <Skeleton width={100} />}
                                </div> {editdesignation}
                            </div>
                            <div className={classshared.main__subtitles}>
                                <div className={classshared.descriptiontext.join(' ')}>
                                    {aboutme}
                                </div>{editaboutme}
                            </div>
                            {tieupsdiv}
                            <div className={classshared.margin_top_bottom_10}>
                                <div className={classshared.main__buttons}>
                                    {buttons}
                                </div>
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
        onaboutmesaveupdate: (data) => dispatch(actions.aboutmesaveupdate(data)),
        ondesignationlocationsaveupdate: (data) => dispatch(actions.designationlocationsaveupdate(data)),
        oncoverimagesaveupdate: (data) => dispatch(actions.usercoverimagesaveupdate(data)),
    };
};
export default connect(null, mapDispatchToProps)(aboutme, axios);