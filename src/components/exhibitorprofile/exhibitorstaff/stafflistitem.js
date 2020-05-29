import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import Profilepic from '../../UI/profilepic/profilepic';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { tieups_status, ICONS, ButtonType, ButtonText, encodedstring } from '../../../shared/utility';
import Button from '../../UI/Button/Button'

class stafflistitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
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
        //if(!this.dropdownMenu.contains(event.target)) {          
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
        //}
    }
    render() {
        let classname = null;
        let statusclass = ""
        switch (this.props.statusname) {
            case (tieups_status.accepted):
                statusclass = classshared.font_1_regular_text_color_green_text_12;
                classname = statusclass.join(' ')
                break;
            case (tieups_status.rejected):
                statusclass = classshared.font_1_regular_text_color_green_text_12;
                classname = statusclass.join(' ')
                break;
            case (tieups_status.requested):
                statusclass = classshared.font_1_regular_text_color_red_text_12;
                classname = statusclass.join(' ')
                break;
            default:
                break;
        }
        let namelink = null;
        let location = null;
        if (this.props.userid !== null && this.props.userid !== undefined) {
            // let text = this.props.userid;
            // let bytes = utf8.encode(text);
            // let encoded = base64.encode(bytes);  
            let encoded = encodedstring(this.props.userid)
            namelink = <React.Fragment>
                <NavLink
                    className={classshared.anchorremoveline.join(' ')}
                    to={`/home/${encoded}`}>{this.props.name}</NavLink>
            </React.Fragment>
            location = <div className={classshared.listingtext.join(' ')}>{this.props.location || <Skeleton />} </div>
        }
        else {
            namelink = <React.Fragment>
                <span
                    className={classshared.anchorremoveline.join(' ')}
                >{this.props.name}</span>
            </React.Fragment>
        }
        let buttondivhideshowskeleton = null;
        if (this.props.is_editmode) {
            buttondivhideshowskeleton =
                <div>
                    <Button
                        islisting={true}
                        btntype={ButtonType.btnlistselect}
                        clicked={this.showMenu}
                        svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')}
                        icon={ICONS.SELECTARROW}>{ButtonText.select}
                    </Button>
                    {
                        this.state.showMenu
                            ?
                            (
                                <div
                                    className={classshared.list_dropdown_content}
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}
                                >
                                    {/* <Button  btntype={ButtonType.btnlistdeleteedit} clicked={( event ) => this.resendmemberrequest( event, this.props.id)} svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')} icon={ICONS.FLAG}>{ButtonText.resend}</Button>*/}
                                    {/* <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.props.deletestaffrequesthandler}>
                                        <i className={classshared.fontawesome_trash_width_20_margin_r_sm.join(' ')}></i>{ButtonText.delete}</Button> */}
                                    <div onClick={this.props.deletestaffrequesthandler} className={classshared.flex_margin_t_sm.join(' ')}>
                                        <div className={classshared.margin_t_xs.join(' ')}><i className={classshared.fontawesome_trash.join(' ')}></i></div>
                                        <div> <span className={classshared.margin_l_sm}><span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{ButtonText.exit}</span></span></div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                null
                            )
                    }
                </div>
        }
        return (
            <div className={classshared.work__card_whiteback.join(' ')}>
                <div className={classshared.work__card_top}>
                    <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname={this.props.name}></Profilepic>
                    <div className={classshared.work__card_content}>
                        <div className={classshared.listingtext_margin_r_sm.join(' ')}>{namelink || <Skeleton />}</div>
                        <div className={classshared.listingtext.join(' ')}>{this.props.designation || <Skeleton />}</div>
                        {location}
                        {
                            this.props.is_editmode ?
                                (<div className={classname}>{this.props.statusname || <Skeleton />}</div>) : null
                        }
                    </div>
                    <div className={classshared.list_dropdown}>{buttondivhideshowskeleton}</div>
                </div>
            </div>
        )
    }
}
export default stafflistitem;