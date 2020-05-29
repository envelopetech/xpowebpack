import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { FilestackType, ButtonType, ButtonText, ICONS, Exhibitiorprofiletabindex, commonplaceholder, label_text, filestackoptionimage } from '../../../shared/utility';
import ImageUpload from '../../FilestackUpload/FilestackUpload';
import Button from '../../UI/Button/Button';
import 'react-responsive-modal/styles.css';
import * as actions from '../../../store/actions/index';
import axios from '../../../store/axios-orders';
import { connect } from 'react-redux';
import Tabitems from '../exhibitorprofiletab/tabitems';
import { update_exhibitor_cover_pic, update_exhibitor_about_me } from '../../../actions/exhibitor/dataactions';
import Spinner from '../../UI/Spinner/Spinner';
import MediaQuery from 'react-responsive';

// const options = {
//     accept: 'image/*',
//     };
class aboutme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otheruserid: props.otheruserid === null ? null : props.otheruserid,
            otherusername: props.otherusername === null ? null : props.otherusername,
            tabindex: Exhibitiorprofiletabindex.aboutme,
            about_me: props.exhibitordata.about_me,
            cover_pic_url: props.exhibitordata.cover_pic_url,
            name: props.exhibitordata.name,
            exhibitor_id: props.exhibitordata.id,
            is_editmode: props.otheruserid === null ? true : false,
            is_show_about_edit_fields: false,
            childloading: false,
        }
    }
    onChange = (activeKey) => {
        this.setState({
            tabindex: activeKey
        });
    }
    editexhibitorprofilehandler = () => {
        this.setState({ is_editmode: true });
    }
    previewpagehandler = () => {
        this.setState({ is_editmode: false, is_show_about_edit_fields: false });
    }
    editabouthandler = (event) => {
        event.preventDefault();
        this.setState({ is_show_about_edit_fields: true });
    }
    closeaboutmeeditmode = (event) => {
        event.preventDefault();
        this.setState({ is_show_about_edit_fields: false });
    }
    aboutexhibitorchange = (event) => {
        event.preventDefault();
        this.setState({ about_me: event.target.value });
    }
    saveaboutme = (event) => {
        event.preventDefault();
        const dataval = {
            about_me: this.state.about_me,
        };
        var data = update_exhibitor_about_me(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ is_show_about_edit_fields: false }, () => {
                })
            }
        });
    }
    onSuccessImageupload = (result) => {
        //console.log(JSON.stringify(result));
        //alert(result.filesUploaded[0]["url"])       
        const dataval = {
            cover_pic_url: result.filesUploaded[0]["url"],
        };
        this.setState({ childloading: true }, () => {
            var data = update_exhibitor_cover_pic(dataval)
            data.then(res => {
                if (res.data["error"] === undefined) {
                    this.setState({ cover_pic_url: result.filesUploaded[0]["url"] }, () => {
                        setTimeout(
                            function () {
                                this.setState({ childloading: false });
                            }
                                .bind(this),
                            2000
                        );
                    })
                }
            });
        })
    };
    render() {
        let aboutme = "Please click edit button to write about yourself!  "
        if (this.state.about_me !== null && this.state.about_me !== undefined) {
            aboutme = this.state.about_me;
        }
        let spinner = null;
        if (this.state.childloading) {
            spinner = <Spinner />
        }
        let editcoverpic = null;
        let editaboutme = null;
        let resetbutton = null;
        let headingstringname = "your";
        if (this.state.otheruserid === null) {
            if (this.state.is_editmode) {
                resetbutton = <Button btntype={ButtonType.exhibitor_edit_profile} clicked={this.previewpagehandler}>{ButtonText.preview}</Button>
                editcoverpic = <ImageUpload buttontype={FilestackType.usercoverpic} option={filestackoptionimage} onSuccessupload={this.onSuccessImageupload} onErrorupload={this.onErrorImageupload} />
                if (this.state.is_show_about_edit_fields) {
                    editaboutme = <div className={classshared.buttoncontainer}>
                        <div className={classshared.mar_r_m}><Button btntype={ButtonType.edit_mode_button_profile} buttontype="button" clicked={this.saveaboutme} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.SAVE}></Button></div>
                        <div className={classshared.mar_r_m}><Button btntype={ButtonType.edit_mode_button_profile} buttontype="button" clicked={this.closeaboutmeeditmode} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={ICONS.CROSS}></Button></div>
                    </div>
                }
                else {
                    editaboutme = <div className={classshared.margin_t_b_10.join(' ')}>
                        <Button btntype={ButtonType.edit_mode_button_profile}
                            clicked={this.editabouthandler}
                            svgclass={classshared.icon_15_white_margin_r_0.join(' ')}
                            icon={ICONS.NEWMESSAGE}>
                        </Button>                        
                    </div>
                }
            }
            else {
                resetbutton = <Button btntype={ButtonType.exhibitor_edit_profile}
                    clicked={this.editexhibitorprofilehandler}>{ButtonText.editprofile}</Button>
            }
        }
        else {
            headingstringname = this.state.name + "'s"
            resetbutton = null;
        }
        let commondescriptiondiv = <div className={classshared.main__subtitles}>
            <div className={classshared.descriptiontext.join(' ')}>
                {
                    this.state.is_show_about_edit_fields
                        ?
                        (
                            <React.Fragment>
                                <textarea type="text"
                                    className={classshared.input_box_text_area_edit}
                                    placeholder={commonplaceholder.about_exhibitor}
                                    required rows="5"
                                    value={this.state.about_me}
                                    cols="100" onChange={this.aboutexhibitorchange} />
                            </React.Fragment>
                        ) :
                        (
                            <React.Fragment>{aboutme} </React.Fragment>
                        )
                }
            </div>{editaboutme}
        </div>
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.edit_header.join(' ')}>
                    <div className={classshared.text_12}>{label_text.exhibitorbusinesspage} {headingstringname} business page</div>
                    {resetbutton}
                </div>
                <MediaQuery query="(max-width: 1224px)">
                    <div className={classshared.main__hero} style={{ backgroundImage: `url(${this.state.cover_pic_url})` }}>
                        {editcoverpic} </div>
                    <div className={classshared.mobile_view_content}>
                        <div className={classshared.margin_t_m}>
                            {commondescriptiondiv}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-device-width: 1224px)">
                    <div className={classshared.main__hero} style={{ backgroundImage: `url(${this.state.cover_pic_url})` }}>
                        {editcoverpic}
                        <div className={classshared.main__hero_content.join(' ')}>
                            <h1 className={classshared.rightheadertext.join(' ')}>{this.state.name}</h1>
                            {/* <div className={classshared.main__tags.join(' ')}>
                                <div className={classshared.tagbtn.join(' ')}>#Trending</div>
                                <div className={classshared.tagbtn.join(' ')}>#Champions</div>
                            </div> */}
                            {commondescriptiondiv}
                            <div className={classshared.main__buttons}>
                                <div className={classshared.margin_r_m}><Button btnview3d={true} btntype={ButtonType.btn_blue_font_1_bold_text_14}>{ButtonText.viewin3d}</Button></div>
                                <Button btntype={ButtonType.btn_btn_outline_blue} clicked={this.sendeinquirieshandler}>{ButtonText.sendenquiry}</Button>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <Tabitems loggedin_user_id={this.props.loggedin_user_id}
                    current_loggedin_user_profile_pic={this.props.currentuserprofilepicforotheruser}
                    otherusername={this.state.otherusername}
                    otheruserid={this.state.otheruserid}
                    tabindex={this.state.tabindex}
                    exhibitor_id={this.state.exhibitor_id}
                    onChange={this.onChange}
                    exhibitordata={this.props.exhibitordata}
                    is_editmode={this.state.is_editmode}
                    edit_mode_button_profile={ButtonType.edit_mode_button_profile}
                    icon={ICONS.NEWMESSAGE}
                    saveicon={ICONS.SAVE}
                    crossicon={ICONS.CROSS}
                    currency_name={this.props.currency_name}>
                </Tabitems>
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