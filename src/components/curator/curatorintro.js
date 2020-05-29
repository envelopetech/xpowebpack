import React, { Component } from 'react';
import * as classesshared from '../commoncss/classconst';
import Button from '../UI/Button/Button';
import { ICONS, ButtonType, ButtonText, customPopUp } from '../../shared/utility'
import Modal from "react-responsive-modal";
import Curatorapplicationform from './curatorapplicationform';
import { curator_wing_save } from '../../actions/curator/dataactions';
import { Redirect } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import MediaQuery from 'react-responsive';

class curatorintro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isopenapplyform: false,
            redirecttocurator: false,
            error: null,
            loading: false
        }

    }
    openapplymodalhandler = (event) => {
        this.setState({ isopenapplyform: true });
    }
    closeapplymodalhandler = () => {
        this.setState({ isopenapplyform: false });
    }
    submit = (values) => {
        if (values.checkwingname === false) {
            this.setState({ loading: true })
            const dataval = {
                typeof_business: values.typeof_business,
                individual_pancard: values.identity_pancard,
                adharcard_passport: values.adharcard_passport,
                business_pancard: values.business_pancard,
                incorporation_certificate: values.incorporate_certificate,
                gst_certificate: values.gst_certificate,
                partnership_deed_llp_certificate: values.llp_certificate,
                shop_license: values.shop_license_certificate,
                poa_form: values.poform_certificate,
                // first_name:values.firstname,
                // last_name:values.lastname,
                // companyname:values.companyname,
                // designation:values.designation,
                // email:values.email,
                // phonenumber:values.phonenumber,
                wingname: values.wingname,
                location: values.location,
                title: values.wingname,
                is_owner: values.is_owner
            }
            var returndata = curator_wing_save(dataval)
            returndata.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({ isopenapplyform: false, redirecttocurator: true, loading: false });
                    }
                }
            })
        }
    }
    render() {        
        const redirectToReferrer = this.state.redirecttocurator;
        if (redirectToReferrer === true) {
            return <Redirect to="/logout" />
        }
        let spinnerform = null
        if (this.state.loading) {
            spinnerform = <Spinner />
        }
        let commondiv = <React.Fragment>
            <div className={classesshared.background_card_padding_all_l.join(' ')}>
                <div className={classesshared.text_dark}>
                    <span className={classesshared.text_transform_c}> {this.props.first_name}</span>, looks like you're not a Curator, yet. Interested to become one?
                        </div>
                <h1 className={classesshared.text_color_blue_uppercase_text_38.join(' ')}>Create. Manage. Earn.</h1>
                <p className={classesshared.text_14_margin_top__lv4_margin_b_l.join(' ')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div className={classesshared.flex}>
                    <Button btntype={ButtonType.btn_btn_outline_grey}
                        buttontype="button"
                        svgclass={classesshared.icon_20_icon_light_grey.join(' ')}
                        icon={ICONS.CONTROLLERPLAY}>{ButtonText.howitworks}</Button>
                    <Button btntype={ButtonType.btn_purple_font_1_bold}
                        buttontype="button"
                        clicked={this.openapplymodalhandler}
                    >{ButtonText.applynow}</Button>
                </div>
            </div>
        </React.Fragment>
        return (
            <React.Fragment>
                {spinnerform}
                <Modal open={this.state.isopenapplyform} styles={customPopUp}
                    onClose={this.closeapplymodalhandler} center showCloseIcon={false}>
                    <Curatorapplicationform onSubmit={this.submit}
                        closemodal={this.closeapplymodalhandler}
                        first_name={this.props.first_name}
                        last_name={this.props.last_name}
                        companyname={this.props.companyname}
                        designation={this.props.designation}
                        companyemail={this.props.companyemail}
                        phonenumber={this.props.phonenumber}
                    ></Curatorapplicationform>
                </Modal>
                <div className={classesshared.w_container_flex_coloumn_padding_t_xl_padding_bottom_lv8.join(' ')}>
                    <MediaQuery query="(max-width: 1224px)">
                        <div className={classesshared.size1of1}>
                            {commondiv}
                        </div>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <div className={classesshared.size2of3}>
                            {commondiv}
                        </div>
                    </MediaQuery>
                </div>
            </React.Fragment>
        )
    }
}
export default curatorintro;