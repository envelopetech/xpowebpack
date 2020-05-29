import React from 'react';
import * as classshared from './classconst';
import {
    titleheading, ButtonText, ProfilepicType, ButtonType, ICONS, report_form_name, PageType, report_type
    , encodedstring, wingster_wing_status, customPopUp 
} from '../../../shared/utility'
import Profilepic from '../../UI/profilepic/profilepic'
import Button from '../../UI/Button/Button';
import Reportpopup from '../../streamline/reportpopup';
import axios from '../../../store/axios-orders';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";//'../../UI/Modal/Modal';
import Navlinkbutton from '../../UI/Button/navlinkbutton';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

class userwingitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            is_user_wings_reports_popup: false,
            //is_open_join_wing_message: false,
            //is_requested: false
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
    open_wings_reports_popup_handler = () => {
        this.setState({ is_user_wings_reports_popup: true });
    }
    close_wings_reports_popup_handler = () => {
        this.setState({ is_user_wings_reports_popup: false });
    }
    // close_wing_join_message_popup_handler = () => {
    //     this.setState({ is_open_join_wing_message: false, is_requested: true });
    // }
    userfeedsreportsave = (values) => {
        let formname = report_form_name.manageuserwing
        if (this.props.page_type === PageType.explorewings) {
            formname = report_form_name.explorewing
        }
        const dataval = {
            title: values.title,
            message: values.message,
            table_primary_id: this.props.id,
            report_type: report_type.general,
            form_name: formname
        };
        this.props.on_feed_post_report_save(dataval);
        this.setState({ is_user_wings_reports_popup: false })
    }
    render() {

        let actionmoredivbutton = null
        if (this.props.wing_member_wing_id !== null && this.props.wing_member_wing_id !== undefined) {
            if (!this.props.is_curator && this.props.wing_member_wing_id === this.props.id) {
                if (this.props.userjoiningstatus == null || this.props.userjoiningstatus.toString() === wingster_wing_status.rejected.toString()) {
                    actionmoredivbutton =
                        <div onClick={this.props.joinwingrequesthandler} className={classshared.flex_margin_t_sm.join(' ')}>
                            <div className={classshared.margin_t_xs.join(' ')}><i className={classshared.fontawesome_plus.join(' ')}></i></div>
                            <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.joinawing}</span></span></div>
                        </div>
                }
                else if (this.props.userjoiningstatus.toString() === wingster_wing_status.requested.toString()) {
                    actionmoredivbutton =
                        <div onClick={this.props.cancelwingrequesthandler} className={classshared.flex_margin_t_sm.join(' ')}>
                            <div className={classshared.margin_t_xs.join(' ')}><i className={classshared.fontawesome_close.join(' ')}></i></div>
                            <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.cancel}</span></span></div>
                        </div>
                }
                else if (this.props.userjoiningstatus.toString() === wingster_wing_status.accepted.toString()) {
                    actionmoredivbutton =
                        <div onClick={this.props.deletefromwinghandler} className={classshared.flex_margin_t_sm.join(' ')}>
                            <div className={classshared.margin_t_xs.join(' ')}><i className={classshared.fontawesome_trash.join(' ')}></i></div>
                            <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.exit}</span></span></div>
                        </div>
                }
            }
        }
        else {
            actionmoredivbutton =
                <div onClick={this.props.joinwingrequesthandler} className={classshared.flex_margin_t_sm.join(' ')}>
                    <div className={classshared.margin_t_xs}><i className={classshared.fontawesome_plus.join(' ')}></i></div>
                    <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.joinawing}</span></span></div>
                </div>
        }
        let navcuratordiv = null
        if (this.props.curated_userid !== undefined && this.props.curated_userid !== null) {
            let encoded = encodedstring(this.props.curated_userid)
            navcuratordiv = <NavLink
                target="_blank"
                className={classshared.displaycursor.join(' ')}
                to={`/home/${encoded}`}><div className={classshared.avatars_margin_l_m}>
                    <Profilepic type={ProfilepicType.wingmembers} profilepic_url={this.props.curate_by_profile_pic}></Profilepic>
                </div></NavLink>
        }
        let viewmorediv = null;
        if (this.props.id !== null && this.props.id !== undefined) {
            let encoded = encodedstring(this.props.id)
            viewmorediv = <React.Fragment>
                <Navlinkbutton btntype={ButtonType.btn_btn_outline_blue}
                    link={`/userwings/${encoded}`}>{ButtonText.viewmore}
                </Navlinkbutton>
            </React.Fragment>
        }
        let membersdiv = null;
        let membersdata = [];
        if (this.props.wing_members_data !== null && this.props.wing_members_data !== undefined) {
            if (this.props.wing_members_data.length > 0) {
                this.props.wing_members_data.map((item, i) => {
                    let detail =
                        <Profilepic type={ProfilepicType.avatar_40px} profilepic_url={item.profile_pic_url}></Profilepic>
                    return (
                        membersdata.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                    )
                })
                membersdiv =
                    <React.Fragment> <span className={classshared.font_2_regular_text_14_text_dark.join(' ')}>{titleheading.members}</span><br />
                        <div className={classshared.avatars_margin_l_m}>
                            {membersdata}
                            <div className={classshared.members_count_round}>
                                <span className={classshared.members_count_fig_font_2_bold.join(' ')}>{this.props.totalwingmembers || <Skeleton width={100} />}</span>
                            </div>
                        </div>
                    </React.Fragment>
            }
        }
        return (
            <React.Fragment>
                <Modal open={this.state.is_user_wings_reports_popup} styles={customPopUp}
                    onClose={this.close_wings_reports_popup_handler} center showCloseIcon={false}>
                    <Reportpopup cancelreportpopup={this.close_wings_reports_popup_handler}
                        btnsavetype={ButtonType.btnsavecancel}
                        btncanceltype={ButtonType.btnuploadvideo}
                        btnposttext={ButtonText.sendmessage}
                        btncanceltext={ButtonText.cancel}
                        post_id={this.props.id}
                        onSubmit={this.userfeedsreportsave}>
                    </Reportpopup>
                </Modal>
                <div className={classshared.wing__card.join(' ')}>
                    <div className={classshared.wing__card_upper}>
                        <div className={classshared.streamline__card_left}>
                            <div className={classshared.user_nav__icon_box}>
                                <Profilepic type={ProfilepicType.user_nav__user_photo_large} profilepic_url={this.props.wing_pic_url}></Profilepic>
                            </div>
                        </div>
                        <div>
                            <div className={classshared.wing_card_content}>
                                <h4 className={classshared.font_1_bold_text_normal.join(' ')}>{this.props.title || <Skeleton width={530} />}</h4>
                                <div>
                                    <span className={classshared.font_2_regular_text_12.join(' ')}><i className={classshared.fontawesome_location_alt.join(' ')}></i>{this.props.location || <Skeleton width={530} />}</span>
                                </div>
                                <div className={classshared.margin_t_sm}>
                                    <p className={classshared.font_2_regular_text_12.join(' ')}>{this.props.descriptionsubstring || <Skeleton width={400} />}</p>
                                </div>
                                <div className={classshared.wing_details_micro.join(' ')}>
                                    <div>
                                        {membersdiv}
                                    </div>
                                    <div className={classshared.wing_status}>
                                        <span className={classshared.font_2_regular_text_14_text_dark.join(' ')}>{titleheading.wingstatus}</span><br />
                                        <span className={classshared.font_2_regular_text_color_green.join(' ')}>{this.props.status_name || <Skeleton />}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classshared.wing__card__bottom}>
                        <div>
                            <span className={classshared.font_1_medium_text_light_uppercase.join(' ')}>{titleheading.lifetimeperformance}</span>
                            <div className={classshared.wing__stats_numbers}>
                                <div className={classshared.wing__stats_number}>
                                    <div className={classshared.font_2_bold_text_normal.join(' ')}>
                                        {titleheading.totalbusinessgenerated}
                                    </div>
                                    <div className={classshared.wing__stats_fig}>
                                        <div>{titleheading.inr} &nbsp;</div>
                                        <div>{this.props.totalbusiness}</div>
                                    </div>
                                </div>
                                <div className={classshared.wing__stats_number}>
                                    <div className={classshared.font_2_bold_text_normal.join(' ')}>
                                        {titleheading.leadsgenerated}
                                    </div>
                                    <div className={classshared.wing__stats_fig}>
                                        <div>{this.props.totalleads}</div>
                                    </div>
                                </div>
                                <div className={classshared.wing__stats_number}>
                                    <div className={classshared.font_2_bold_text_normal.join(' ')}>
                                        {titleheading.activemembers}
                                    </div>
                                    <div className={classshared.wing__stats_fig}>
                                        <div>{this.props.totalwingsmembers}</div>
                                    </div>
                                </div>
                                <div className={classshared.wing__stats_number}>
                                    <div className={classshared.font_2_bold_text_normal.join(' ')}>
                                        {titleheading.largestdealsize}
                                    </div>
                                    <div className={classshared.wing__stats_fig}>
                                        <div>{titleheading.inr} &nbsp;</div>
                                        <div>{this.props.largestdealsize}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.wing__card_btn_wrapper}>
                            <div className={classshared.wing__card_curator}>
                                <div className={classshared.wing_card_curator_details}>
                                    <span className={classshared.font_2_regular_text_light.join(' ')}>Curated since {this.props.curate_at}</span></div>
                                {navcuratordiv}
                                {/* <div className={classshared.avatars_margin_l_m}>
                                    <Profilepic type={ProfilepicType.wingmembers} profilepic_url={this.props.curate_by_profile_pic}></Profilepic>
                                </div> */}
                            </div>
                            <div className={classshared.wing__card_buttons}>
                                {/* <Button btntype={ButtonType.btn_outline_purple}>{ButtonText.viewmore}</Button> */}
                                {viewmorediv}
                                <div className={classshared.list_dropdown}>
                                    <Button islisting={true} btntype={ButtonType.wingsaction} clicked={this.showMenu} svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')} icon={ICONS.SELECTARROW}>{ButtonText.action}</Button>
                                    {
                                        this.state.showMenu
                                            ? (
                                                <div
                                                    className={classshared.list_dropdown_content}>
                                                    {actionmoredivbutton}
                                                    {/* {
                                                        this.props.page_type === PageType.explorewings ?
                                                            (
                                                                { actionmoredivbutton }
                                                            )
                                                            :
                                                            (
                                                                <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.props.deletefromwinghandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.TRASH}>{ButtonText.exit}</Button>
                                                            )
                                                    } */}
                                                    {/* <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.open_wings_reports_popup_handler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.FLAG}>{ButtonText.report}</Button> */}
                                                    <div onClick={this.props.open_wings_reports_popup_handler} className={classshared.flex_margin_t_sm.join(' ')}>
                                                        <div className={classshared.margin_t_xs.join(' ')}><i className={classshared.fontawesome_flag.join(' ')}></i></div>
                                                        <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.report}</span></span></div>
                                                    </div>
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
                </div>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        on_feed_post_report_save: (data) => dispatch(actions.feed_post_report_save(data)),
    };
};
export default connect(null, mapDispatchToProps)(userwingitems, axios);