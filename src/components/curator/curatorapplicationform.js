import React, { Component } from 'react';
import * as classshared from '../commoncss/classconst';
import TextInput from '../UI/reduxformcontrols/TextInput';
import Textinputwithevent from '../UI/reduxformcontrols/Textinputwithevent';
import Button from '../UI/Button/Button';
import { ICONS, ButtonType, titleheading, commonplaceholder, label_text, FilestackType, filestackoptionpdf, ButtonText, error_message } from '../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import ImageUpload from '../FilestackUpload/FilestackUpload';
import Icon from '../UI/Icon/uploadicon';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import Fileupload from '../UI/reduxformcontrols/fileupload';
import Autocomplete from 'react-google-autocomplete';
import { check_wing_exists } from '../../actions/curator/dataactions';


const options = [
    { value: 'proprietor', label: 'Proprietor' },
    { value: 'partnership', label: 'Partnership/LLP' },
    { value: 'private', label: 'Private Limited' }
]
class curatorapplicationform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeofbusiness: null,
            private: false,
            partnership: false,
            Private: false,
            proprietor: false,
            yesowner: true,
            noowner: null,
            identity_pancard: null,
            adharcard_passport: null,
            business_pancard: null,
            incorporate_certificate: null,
            gst_certificate: null,
            llp_certificate: null,
            shop_license_certificate: null,
            poform_certificate: null,
            location: null,
            displaysamewingnameerror: false,
            wingnamevalue: null,
            submitbuttondisabled: false
        }
    }
    componentDidMount() {
        this.props.change(titleheading.firstname.toLowerCase(), this.props.first_name);
        this.props.change(titleheading.lastname.toLowerCase(), this.props.last_name);
        this.props.change(titleheading.companyname.toLowerCase(), this.props.companyname);
        this.props.change(titleheading.designation.toLowerCase(), this.props.designation);
        this.props.change(titleheading.email.toLowerCase(), this.props.companyemail);
        this.props.change(titleheading.phonenumber.toLowerCase(), this.props.phonenumber);
    }
    businessproofchangehandler = (value) => {
        this.setState({ typeofbusiness: value.value })
        this.props.change("typeof_business", value.value);
        if (value.value.toString() === "proprietor") {
            this.setState({ proprietor: true, private: false, partnership: false })
        }
        else if (value.value.toString() === "partnership") {
            this.setState({ proprietor: false, private: false, partnership: true })
        }
        else {
            this.setState({ proprietor: false, private: true, partnership: false })
        }
    }
    isownerhandleryes = () => {
        this.setState({ yesowner: true, noowner: false })
        this.props.change("is_owner", true);
    }
    isownerhandlerno = () => {
        this.setState({ yesowner: false, noowner: true })
        this.props.change("is_owner", false);
    }
    identitypancardupload = (result) => {
        this.setState({ identity_pancard: result.filesUploaded[0]["url"] })
        this.props.change("identity_pancard", result.filesUploaded[0]["url"]);
    }
    adharcardpassportupload = (result) => {
        this.setState({ adharcard_passport: result.filesUploaded[0]["url"] })
        this.props.change("adharcard_passport", result.filesUploaded[0]["url"]);
    }
    businesspancardupload = (result) => {
        this.setState({ business_pancard: result.filesUploaded[0]["url"] })
        this.props.change("business_pancard", result.filesUploaded[0]["url"]);
    }
    incorporationcertificateupload = (result) => {
        this.setState({ incorporate_certificate: result.filesUploaded[0]["url"] })
        this.props.change("incorporate_certificate", result.filesUploaded[0]["url"]);
    }
    gstcertificateupload = (result) => {
        this.setState({ gst_certificate: result.filesUploaded[0]["url"] })
        this.props.change("gst_certificate", result.filesUploaded[0]["url"]);
    }
    llpcertificateupload = (result) => {
        this.setState({ llp_certificate: result.filesUploaded[0]["url"] })
        this.props.change("llp_certificate", result.filesUploaded[0]["url"]);
    }
    shoplicenseupload = (result) => {
        this.setState({ shop_license_certificate: result.filesUploaded[0]["url"] })
        this.props.change("shop_license_certificate", result.filesUploaded[0]["url"]);
    }
    poaformupload = (result) => {
        this.setState({ poform_certificate: result.filesUploaded[0]["url"] })
        this.props.change("poform_certificate", result.filesUploaded[0]["url"]);
    }
    wingnamechangehandler = (event) => {
        event.preventDefault();
        if (event.target.value !== "") {
            this.setState({ wingnamevalue: event.target.value })
            this.props.change("wingtitle", event.target.value);
            var data = check_wing_exists(event.target.value)
            data.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        if (res.data === true) {
                            this.setState({ displaysamewingnameerror: true })                            // 
                            this.props.change("checkwingname", true);
                        }
                        else {
                            this.setState({ displaysamewingnameerror: false })
                            this.props.change("checkwingname", false);
                        }
                    }
                }
            })
        }
        else {
            this.setState({ displaysamewingnameerror: false })
            this.props.change("checkwingname", false);
            this.props.change("wingtitle", null);
        }
    }
    render() {
        let divpancard = <React.Fragment>
            <div className={classshared.margin_b_m}>
                {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                <ImageUpload
                    option={filestackoptionpdf}
                    buttontype={FilestackType.uploaddoc}
                    buttontext={ButtonText.pancard}
                    onSuccessupload={this.businesspancardupload}
                    onErrorupload={this.onErrorImageupload} /> */}
                <div className={classshared.flex}>
                    <Field
                        name={titleheading.business_pancard.toLowerCase()}
                        type="text"
                        onSuccessupload={this.businesspancardupload}
                        buttontype={FilestackType.uploaddoc}
                        buttontext={ButtonText.pancardbusiness}
                        url={this.state.business_pancard}
                        component={Fileupload}
                        errorclass={classshared.formlabelerror}
                    //validate={[required()]}
                    />
                    {
                        this.state.business_pancard !== null ?
                            (
                                <div className={classshared.padding_l_l}> <div className={classshared.flex__column.join(' ')}>
                                    <a target="_blank" rel="noopener noreferrer"
                                        className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')} href={this.state.business_pancard} >
                                        Preview</a>
                                </div>
                                </div>
                            ) : null
                    }

                </div>
                <Field
                    component={TextInput}
                    name="business_pancard"
                    type="hidden"
                    style={{ height: 0 }}
                    validate={[required()]}
                    errorclass={classshared.formlabelerror_margin_left.join(' ')}
                />
            </div>
        </React.Fragment>
        let divgstcertificate = <React.Fragment>
            <div className={classshared.flex_margin_b_m.join(' ')}>
                <div className={classshared.flex}>
                    <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                    <ImageUpload
                        option={filestackoptionpdf}
                        buttontype={FilestackType.uploaddoc}
                        buttontext={ButtonText.gstcertificate}
                        onSuccessupload={this.gstcertificateupload}
                        onErrorupload={this.onErrorImageupload} />
                    {
                        this.state.gst_certificate !== null ?
                            (

                                <div className={classshared.padding_l_l}> <div className={classshared.flex__column.join(' ')}>
                                    <a target="_blank" rel="noopener noreferrer"
                                        className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')} href={this.state.gst_certificate} >
                                        Preview</a>
                                </div>
                                </div>
                            ) : null
                    }

                </div>
                <Field
                    component={TextInput}
                    name="gst_certificate"
                    type="hidden"
                    style={{ height: 0 }}
                />
            </div>
        </React.Fragment>
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
                <div className={classshared.popup__content_header}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.purple_heading_text_22.join(' ')}>Become a Curator</h2>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                        </div>
                    </div>
                    <div className={classshared.margin_l_m}>
                        <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>Kindly fill in your information below to apply.</h3></div>
                </div>
                <div className={classshared.popup__content_bottom}>
                    <Form onSubmit={handleSubmit}>
                        <div className={classshared.company_card}>
                            <div className={classshared.work__card}>
                                <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14_text_color_purple.join(' ')}>Personal Details</div></div>
                                <div className={classshared.flex}>
                                    <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                        <Field
                                            name={titleheading.firstname.toLowerCase()}
                                            type="text"
                                            component={TextInput}
                                            readonly={true}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.first_name}
                                            errorclass={classshared.formlabelerror}
                                        //validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.firstname}</label>
                                    </div>
                                    <div className={classshared.form_group_width50.join(' ')}>
                                        <Field
                                            name={titleheading.lastname.toLowerCase()}
                                            type="text"
                                            readonly={true}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.last_name}
                                            errorclass={classshared.formlabelerror}
                                        //validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.lastname}</label>
                                    </div>
                                </div>
                                <div className={classshared.flex}>
                                    <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                        <Field
                                            name={titleheading.companyname.toLowerCase()}
                                            type="text"
                                            readonly={true}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.company_name}
                                            errorclass={classshared.formlabelerror}
                                        //validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.companyname}</label>
                                    </div>
                                    <div className={classshared.form_group_width50.join(' ')}>
                                        <Field
                                            name={titleheading.designation.toLowerCase()}
                                            type="text"
                                            readonly={true}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.designation}
                                            errorclass={classshared.formlabelerror}
                                        //validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.designation}</label>
                                    </div>
                                </div>
                                <div className={classshared.flex}>
                                    <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                        <Field
                                            name={titleheading.email.toLowerCase()}
                                            type="text"
                                            readonly={true}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.email}
                                            errorclass={classshared.formlabelerror}
                                        //validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.email}</label>
                                    </div>
                                    <div className={classshared.form_group_width50.join(' ')}>
                                        <Field
                                            name={titleheading.phonenumber.toLowerCase()}
                                            type="text"
                                            readonly={true}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.phonenumber}
                                            errorclass={classshared.formlabelerror}
                                        //validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.phonenumber}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.company_card}>
                            <div className={classshared.work__card}>
                                <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14_text_color_purple.join(' ')}>Wing Details</div></div>
                                <div className={classshared.form_group_margin_r_m.join(' ')}>
                                    <Field
                                        name={titleheading.wingname.toLowerCase()}
                                        type="text"
                                        tabIndex={1}
                                        component={Textinputwithevent}
                                        onChangeHandler={this.wingnamechangehandler}
                                        className={classshared.input_box}
                                        placeholder={commonplaceholder.wingname}
                                        errorclass={classshared.formlabelerror}
                                        value={this.state.wingnamevalue}
                                    />
                                    <label className={classshared.form_label.join(' ')}>{label_text.wingname}</label>
                                    {
                                        this.state.displaysamewingnameerror ?
                                            (
                                                <label className={classshared.formlabelerror.join(' ')}>{error_message.samewingname}</label>
                                            ) :
                                            null

                                    }
                                    <Field
                                        component={TextInput}
                                        name="wingtitle"
                                        type="hidden"
                                        style={{ height: 0 }}
                                        validate={[required()]}
                                        errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                    />
                                    <Field
                                        component={TextInput}
                                        name="checkwingname"
                                        type="hidden"
                                        style={{ height: 0 }}
                                    />
                                </div>
                                <div className={classshared.form_group}>
                                    {/* <Field
                                            name={titleheading.region.toLowerCase()}
                                            type="text"
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.region}
                                            errorclass={classshared.formlabelerror}
                                            //validate={[required()]}
                                        /> */}

                                    <Autocomplete
                                        onPlaceSelected={(place) => {
                                            console.log(place["name"]);
                                            console.log(place["formatted_address"]);
                                            let data = null;
                                            if (place["name"] !== undefined) {
                                                data = place["name"]
                                            }
                                            else {
                                                data = place["formatted_address"]
                                            }
                                            this.props.change("location", data);
                                        }}
                                        types={['(regions)']}
                                        name="autolocation"
                                        tabIndex={2}
                                        className={classshared.input_box}
                                    />
                                    <label className={classshared.form_label.join(' ')}>{label_text.region}</label>
                                    <Field
                                        component={TextInput}
                                        name="location"
                                        type="hidden"
                                        style={{ height: 0 }}
                                        validate={[required()]}
                                        errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classshared.company_card}>
                            <div className={classshared.work__card}>
                                <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14_text_color_purple.join(' ')}>Document Upload</div></div>

                                <div className={classshared.margin_b_l}>
                                    <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14.join(' ')}>Proof of Identity</div></div>
                                    <div className={classshared.margin_b_m}>
                                        {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                                            <ImageUpload
                                                option={filestackoptionpdf}
                                                buttontype={FilestackType.uploaddoc}
                                                buttontext={ButtonText.pancard}
                                                onSuccessupload={this.identitypancardupload}
                                                onErrorupload={this.onErrorImageupload} />*/}
                                        <div className={classshared.flex}>
                                            <Field
                                                name={titleheading.pancard.toLowerCase()}
                                                type="text"
                                                onSuccessupload={this.identitypancardupload}
                                                buttontype={FilestackType.uploaddoc}
                                                buttontext={ButtonText.pancard}
                                                url={this.state.identity_pancard}
                                                component={Fileupload}
                                                errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                            //validate={[required()]}
                                            />
                                            {
                                                this.state.identity_pancard !== null ?
                                                    (
                                                        <div className={classshared.padding_l_l}>
                                                            <div className={classshared.flex__column.join(' ')}>
                                                                <a target="_blank" rel="noopener noreferrer"
                                                                    className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')} href={this.state.identity_pancard} >
                                                                    Preview</a>
                                                            </div>
                                                        </div>
                                                    ) : null
                                            }

                                        </div>
                                        <Field
                                            component={TextInput}
                                            name="identity_pancard"
                                            type="hidden"
                                            style={{ height: 0 }}
                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                            validate={[required()]}
                                        />
                                    </div>
                                </div>
                                <div className={classshared.margin_b_l}>
                                    <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14.join(' ')}>Proof of Address</div></div>
                                    <div className={classshared.margin_b_m}>
                                        {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                                            <ImageUpload
                                                option={filestackoptionpdf}
                                                buttontype={FilestackType.uploaddoc}
                                                buttontext={ButtonText.adharcardpassport}
                                                onSuccessupload={this.adharcardpassportupload}
                                                onErrorupload={this.onErrorImageupload} /> */}
                                        <div className={classshared.flex}>
                                            <Field
                                                name={titleheading.adharcard.toLowerCase()}
                                                type="text"
                                                tabIndex={3}
                                                onSuccessupload={this.adharcardpassportupload}
                                                buttontype={FilestackType.uploaddoc}
                                                buttontext={ButtonText.adharcardpassport}
                                                url={this.state.adharcard_passport}
                                                component={Fileupload}
                                                errorclass={classshared.formlabelerror}
                                            //validate={[required()]}
                                            />
                                            {
                                                this.state.adharcard_passport !== null ?
                                                    (
                                                        <div className={classshared.padding_l_l}>
                                                            <div className={classshared.flex__column.join(' ')}>
                                                                <a target="_blank" rel="noopener noreferrer"
                                                                    className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')} href={this.state.adharcard_passport} >
                                                                    Preview</a>
                                                            </div>
                                                        </div>
                                                    ) : null
                                            }

                                        </div>
                                        <Field
                                            component={TextInput}
                                            name="adharcard_passport"
                                            type="hidden"
                                            style={{ height: 0 }}
                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                            validate={[required()]}
                                        />
                                    </div>
                                </div>
                                <div className={classshared.margin_b_l}>
                                    <div className={classshared.margin_b_m}>  <div className={classshared.font_1_medium_text_14.join(' ')}>Business Proof</div></div>
                                    <div className={classshared.flex}>
                                        <Dropdown options={options}
                                            tabIndex={4}
                                            onChange={this.businessproofchangehandler}
                                            value={this.state.typeofbusiness}
                                            placeholder={commonplaceholder.selectbusinesstypeproof} />
                                    </div>
                                    <Field
                                        component={TextInput}
                                        name="typeof_business"
                                        type="hidden"
                                        style={{ height: 0 }}
                                        errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                        validate={[required()]}
                                    />

                                    {
                                        this.state.private ?
                                            (
                                                <div className={classshared.margin_top__lv4}>
                                                    {divpancard}
                                                    <div className={classshared.margin_b_m}>
                                                        {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                                                        <ImageUpload
                                                            option={filestackoptionpdf}
                                                            buttontype={FilestackType.uploaddoc}
                                                            buttontext={ButtonText.incorporatecertificate}
                                                            onSuccessupload={this.incorporationcertificateupload}
                                                            onErrorupload={this.onErrorImageupload} /> */}
                                                        <div className={classshared.flex}>
                                                            <Field
                                                                name={titleheading.incorporatecertificate.toLowerCase()}
                                                                type="text"
                                                                onSuccessupload={this.incorporationcertificateupload}
                                                                buttontype={FilestackType.uploaddoc}
                                                                buttontext={ButtonText.incorporatecertificate}
                                                                url={this.state.incorporate_certificate}
                                                                component={Fileupload}
                                                                errorclass={classshared.formlabelerror}

                                                            />
                                                            {
                                                                this.state.incorporate_certificate !== null ?
                                                                    (
                                                                        <div className={classshared.padding_l_l}>
                                                                            <div className={classshared.flex__column.join(' ')}>
                                                                                <a target="_blank" rel="noopener noreferrer" className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')}
                                                                                    href={this.state.incorporate_certificate} >
                                                                                    Preview</a>
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                            }
                                                        </div>
                                                        <Field
                                                            component={TextInput}
                                                            name="incorporate_certificate"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                            validate={[required()]}
                                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                                        />
                                                    </div>
                                                    <div className={classshared.margin_b_m}>
                                                        {divgstcertificate}
                                                    </div>
                                                </div>
                                            ) : null
                                    }
                                    {
                                        this.state.partnership ?
                                            (
                                                <div className={classshared.margin_top__lv4}>
                                                    <div className={classshared.margin_b_m}>
                                                        {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                                                        <ImageUpload
                                                            option={filestackoptionpdf}
                                                            buttontype={FilestackType.uploaddoc}
                                                            buttontext={ButtonText.partnershipdeed}
                                                            onSuccessupload={this.llpcertificateupload}
                                                            onErrorupload={this.onErrorImageupload} /> */}
                                                        <div className={classshared.flex}>
                                                            <Field
                                                                name={titleheading.partnershipdeed.toLowerCase()}
                                                                type="text"
                                                                onSuccessupload={this.llpcertificateupload}
                                                                buttontype={FilestackType.uploaddoc}
                                                                buttontext={ButtonText.partnershipdeed}
                                                                url={this.state.llp_certificate}
                                                                component={Fileupload}
                                                                errorclass={classshared.formlabelerror}
                                                            //validate={[required()]}
                                                            />
                                                            {
                                                                this.state.llp_certificate !== null ?
                                                                    (
                                                                        <div className={classshared.padding_l_l}>
                                                                            <div className={classshared.flex__column.join(' ')}>
                                                                                <a target="_blank" rel="noopener noreferrer"
                                                                                    className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')}
                                                                                    href={this.state.llp_certificate} >
                                                                                    Preview</a>
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                            }
                                                        </div>
                                                        <Field
                                                            component={TextInput}
                                                            name="llp_certificate"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                            validate={[required()]}
                                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                                        />
                                                    </div>
                                                    <div className={classshared.margin_b_m}>
                                                        {divpancard}
                                                    </div>
                                                    <div className={classshared.margin_b_m}>
                                                        {divgstcertificate}
                                                    </div>
                                                </div>
                                            ) : null
                                    }
                                    {
                                        this.state.proprietor ?
                                            (
                                                <div className={classshared.margin_top__lv4}>
                                                    <div className={classshared.margin_b_m}>
                                                        {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                                                        <ImageUpload
                                                            option={filestackoptionpdf}
                                                            buttontype={FilestackType.uploaddoc}
                                                            buttontext={ButtonText.shoplicense}
                                                            onSuccessupload={this.shoplicenseupload}
                                                            onErrorupload={this.onErrorImageupload} /> */}
                                                        <div className={classshared.flex}>
                                                            <Field
                                                                name={titleheading.shoplicense.toLowerCase()}
                                                                type="text"
                                                                onSuccessupload={this.shoplicenseupload}
                                                                buttontype={FilestackType.uploaddoc}
                                                                buttontext={ButtonText.shoplicense}
                                                                url={this.state.shop_license_certificate}
                                                                component={Fileupload}
                                                                errorclass={classshared.formlabelerror}
                                                            //validate={[required()]}
                                                            />
                                                            {
                                                                this.state.shop_license_certificate !== null ?
                                                                    (
                                                                        <div className={classshared.padding_l_l}>
                                                                            <div className={classshared.flex__column.join(' ')}>
                                                                                <a target="_blank" rel="noopener noreferrer"
                                                                                    className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')}
                                                                                    href={this.state.shop_license_certificate} >
                                                                                    Preview</a>
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                            }
                                                        </div>
                                                        <Field
                                                            component={TextInput}
                                                            name="shop_license_certificate"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                            validate={[required()]}
                                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                                        />
                                                    </div>
                                                </div>
                                            ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={classshared.company_card}>
                            <div className={classshared.work__card}>
                                <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14_text_color_purple.join(' ')}>Power of Attorney</div></div>

                                <div className={classshared.margin_l_m}>
                                    <div className={classshared.text_dark_margin_b_m.join(' ')}>
                                        Are you one of the Director/Promotor/Owner of the company you are representing?
                                        </div>
                                    <div className={classshared.form_group}>
                                        <input type="radio" name="powerofattorney" value="yes"
                                            checked={this.state.yesowner}
                                            onChange={this.isownerhandleryes} /> Yes, I am.<br />
                                        {
                                            this.state.yesowner ?
                                                (
                                                    <div className={classshared.margin_b_m}><div className={classshared.text_14}>That's great! You can proceed with the form application.</div></div>
                                                )
                                                : null
                                        }
                                    </div>
                                    <div className={classshared.form_group}>
                                        <input type="radio" name="powerofattorney" value="no" checked={this.state.noowner} onChange={this.isownerhandlerno} /> No, I work for this company as an employee.<br />
                                        {
                                            this.state.noowner ?
                                                (
                                                    <React.Fragment>
                                                        <div className={classshared.text_14}>No issues, just one last step! You need to submit a Power of Attorney form and we're done.</div>
                                                        <div className={classshared.margin_t_m}>
                                                            {/* <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                                                            <ImageUpload option={filestackoptionpdf} buttontype={FilestackType.uploaddoc} buttontext={ButtonText.poaform} onSuccessupload={this.onSuccessimageupload} onErrorupload={this.onErrorImageupload} /> */}
                                                            <div className={classshared.flex}>
                                                                <Field
                                                                    name={titleheading.poaform.toLowerCase()}
                                                                    type="text"
                                                                    onSuccessupload={this.poaformupload}
                                                                    buttontype={FilestackType.uploaddoc}
                                                                    buttontext={ButtonText.poaform}
                                                                    url={this.state.poform_certificate}
                                                                    component={Fileupload}
                                                                    errorclass={classshared.formlabelerror}
                                                                //validate={[required()]}
                                                                />
                                                                {
                                                                    this.state.poform_certificate !== null ?
                                                                        (
                                                                            <div className={classshared.padding_l_l}>
                                                                                <div className={classshared.flex__column.join(' ')}>
                                                                                    <a target="_blank" rel="noopener noreferrer" className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')}
                                                                                        href={this.state.poform_certificate} >
                                                                                        Preview</a>
                                                                                </div>
                                                                            </div>
                                                                        ) : null
                                                                }
                                                            </div>
                                                            <Field
                                                                component={TextInput}
                                                                name="poform_certificate"
                                                                type="hidden"
                                                                style={{ height: 0 }}
                                                                validate={[required()]}
                                                                errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                                            />
                                                            <Field
                                                                component={TextInput}
                                                                name="is_owner"
                                                                type="hidden"
                                                                style={{ height: 0 }}

                                                            />
                                                        </div>
                                                    </React.Fragment>
                                                )
                                                : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.form_group}>

                            <Button btntype={ButtonType.btn_purple_font_1_bold} buttontype="submit">{ButtonText.submit}</Button>


                        </div>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
curatorapplicationform = reduxForm({
    form: 'formcuratorapplication',
    //validate,
})(curatorapplicationform);
export default curatorapplicationform;