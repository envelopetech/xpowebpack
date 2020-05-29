import React, { Component } from 'react';
import * as classshared from '../../Userprofilesetup/classconst';
import ImageUpload from '../../FilestackUpload/FilestackUpload';
import {
    FilestackType, ProfilepicType, titleheading, label_text, ButtonText, ButtonType, commonplaceholder, getfilestackpreviewurl
    , filestackoptionimage
    , error_message, TwoFactorAPIKey
} from '../../../shared/utility';
import Pic from '../../UI/profilepic/profilepic';
import defaultimage from '../../../assets/images/default_avatar.png';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Button from '../../UI/Button/Button';
import Autocomplete from 'react-google-autocomplete';
import { required, email } from 'redux-form-validators'
import PhoneNumber from '../../UI/reduxformcontrols/phonenumber';
import axios from 'axios';
import { verifyotpdetail } from '../../../actions/userprofilesetup/dataactions'


import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


class personalform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploaded_image_url: null,
            phone: props.phone_number,
            buttonotpdivvisible: false,
            otptextdivvisible: false,
            otpsessionid: null,
            is_savebutton_disabled: false,
            otpverficationerror: false,
            otpsetndbuttontext: "Send OTP"
        }
    }

    sendOTP = () => {        
        axios.get(`https://2factor.in/API/V1/${TwoFactorAPIKey}/SMS/+${this.state.phone}/AUTOGEN`
        ).then(response1 => {
            this.setState({ otpsessionid: response1.data.Details, otptextdivvisible: true, otpsetndbuttontext: "Resend OTP" })
        })
    }
    verifyotp = (e) => {
        if (e.target.value.length > 0) {
            var data = verifyotpdetail(this.state.otpsessionid, e.target.value)
            data.then(res => {
                this.setState({ is_savebutton_disabled: false, otpverficationerror: false })
            }).catch(error => {
                this.setState({ otpverficationerror: true, is_savebutton_disabled: true })
            });
        }
    }

    componentDidMount() {
        this.props.change("firstname", this.props.first_name);
        this.props.change("lastname", this.props.last_name);
        this.props.change("autolocation", this.props.location);
        this.props.change("email", this.props.personal_email);  //OR Comapny Email
        this.props.change("phonenumber", this.props.phone_number);
        this.props.change("profileimageurl", this.props.profile_pic_url);
        this.props.change("profileimageurlpreview", this.props.profile_pic_url_preview);
        this.props.change("address1", this.props.address1);
        this.props.change("address2", this.props.address2);
        //this.setState({ phone: this.props.phone_number });
    }
    onSuccessImageupload = (result) => {
        let preview = getfilestackpreviewurl(result.filesUploaded[0]["handle"]);
        let imageurl = result.filesUploaded[0]["url"];
        this.setState({
            uploaded_image_url: imageurl
        })
        this.props.change("profileimageurl", imageurl);
        this.props.change("profileimageurlpreview", preview);
    };

    phonenumberchange = (value) => {
        if (value >= 12) {
            if (this.props.phone_number !== value) {
                this.setState({ buttonotpdivvisible: true, is_savebutton_disabled: true, phone: value })
            }
        }
    }

    render() {
        const { handleSubmit } = this.props
        let uploadedimage = this.props.profile_pic_url === null ? defaultimage : this.props.profile_pic_url
        if (this.state.uploaded_image_url !== null) {
            uploadedimage = this.state.uploaded_image_url
        }
        return (
            <React.Fragment>
                <Form className={classshared.login_form_settings.join(' ')} onSubmit={handleSubmit}>
                    <div className={classshared.content.join(' ')}>
                        <div className={classshared.signupWrapper.join(' ')}>
                            <div className={classshared.signupContent.join(' ')}>
                                <div className={classshared.half_flex}>
                                    <div className={classshared.avatar_upload}>
                                        <div className={classshared.avatar_edit}>
                                            <ImageUpload buttontype={FilestackType.userprofilesteppic} option={filestackoptionimage} onSuccessupload={this.onSuccessImageupload} />
                                        </div>
                                        <div className={classshared.avatar_preview}>
                                            <Pic type={ProfilepicType.profilesetuppic} profilepic_url={uploadedimage}></Pic>
                                        </div>
                                    </div>
                                    <div className={classshared.centered_text_center.join(' ')}>
                                        <p className={classshared.upload_pic_dim__high.join(' ')}>Upload Profile Picture</p>
                                        <p className={classshared.upload_pic_tip_text.join(' ')}>Tip: Adding a picture adds a lot of trust factor amongst other community members.</p>
                                    </div>
                                </div>
                                <div className={classshared.half_flex}>

                                    <div className="">

                                        <div className={classshared.margin_top__lv8}>
                                            <div className={classshared.form_group}>
                                                <Field
                                                    name={titleheading.firstname.toLowerCase()}
                                                    type="text"
                                                    tabIndex={1}
                                                    component={TextInput}
                                                    className={classshared.input_box}
                                                    placeholder={commonplaceholder.first_name}
                                                    errorclass={classshared.formlabelerror}
                                                    inputbordererrorclass={classshared.input_box_error}
                                                    validate={[required()]}
                                                />
                                                <label className={classshared.form_label.join(' ')}>{label_text.firstname}</label>
                                            </div>
                                            <div className={classshared.form_group}>
                                                <Field
                                                    name={titleheading.lastname.toLowerCase()}
                                                    type="text"
                                                    tabIndex={2}
                                                    component={TextInput}
                                                    className={classshared.input_box}
                                                    placeholder={commonplaceholder.last_name}
                                                    errorclass={classshared.formlabelerror}
                                                    inputbordererrorclass={classshared.input_box_error}
                                                    validate={[required()]}
                                                />
                                                <label className={classshared.form_label.join(' ')}>{label_text.lastname}</label>
                                            </div>
                                            <div className={classshared.form_group}>
                                                <Field
                                                    name={titleheading.address1.toLowerCase()}
                                                    type="text"
                                                    tabIndex={3}
                                                    component={TextInput}
                                                    className={classshared.input_box}
                                                    placeholder={commonplaceholder.address1}
                                                    errorclass={classshared.formlabelerror}
                                                    inputbordererrorclass={classshared.input_box_error}
                                                    validate={[required()]}
                                                />
                                                <label className={classshared.form_label.join(' ')}>{label_text.address1}</label>
                                            </div>
                                            <div className={classshared.form_group}>
                                                <Field
                                                    name={titleheading.address2.toLowerCase()}
                                                    type="text"
                                                    tabIndex={4}
                                                    component={TextInput}
                                                    className={classshared.input_box}
                                                    placeholder={commonplaceholder.address2}
                                                    errorclass={classshared.formlabelerror}
                                                    inputbordererrorclass={classshared.input_box_error}
                                                    validate={[required()]}
                                                />
                                                <label className={classshared.form_label.join(' ')}>{label_text.address2}</label>
                                            </div>
                                            <div className={classshared.form_group}>
                                                <Field
                                                    component={TextInput}
                                                    name="profileimageurl"
                                                    type="hidden"
                                                    style={{ height: 0 }}
                                                />
                                                <Field
                                                    component={TextInput}
                                                    name="profileimageurlpreview"
                                                    type="hidden"
                                                    style={{ height: 0 }}
                                                />
                                                <Field
                                                    component={TextInput}
                                                    name="location"
                                                    type="hidden"
                                                    style={{ height: 0 }}
                                                />
                                                <Autocomplete
                                                    tabIndex={5}
                                                    onPlaceSelected={(place) => {
                                                        //console.log(place);
                                                        this.props.change("location", place);
                                                    }}
                                                    types={['(regions)']}
                                                    name="autolocation"
                                                    className={classshared.input_box}
                                                    value={this.props.location}
                                                />
                                                <label className={classshared.form_label.join(' ')}>{label_text.location}</label>
                                            </div>
                                            {/* <div className={classshared.form_group}>
                                                <Field
                                                    name={titleheading.email.toLowerCase()}
                                                    type="text"
                                                    tabIndex={6}
                                                    component={TextInput}
                                                    className={classshared.input_box}
                                                    placeholder={commonplaceholder.email}
                                                    errorclass={classshared.formlabelerror}
                                                    inputbordererrorclass={classshared.input_box_error}
                                                    validate={[required(), email()]}
                                                />
                                                <label className={classshared.form_label.join(' ')}>{label_text.email}</label>
                                            </div> */}
                                            <div className={classshared.form_group}>
                                                <div className={classshared.flex}>
                                                    <div>
                                                        <Field
                                                            tabIndex={7}
                                                            component={PhoneNumber}
                                                            name="phone_number"
                                                            placeholder={commonplaceholder.phonenumber}
                                                            phone={this.state.phone}
                                                            phonenumberchange={this.phonenumberchange}
                                                        />                                                       
                                                        <Field
                                                            component={TextInput}
                                                            name="phonenumber"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />
                                                        {/* <Field
                                                            name="phonenumber"
                                                            type="text"
                                                            tabIndex={7}
                                                            component={TextInput}
                                                            className={classshared.input_box}
                                                            placeholder={commonplaceholder.phonenumber}
                                                            errorclass={classshared.formlabelerror}
                                                            inputbordererrorclass={classshared.input_box_error}
                                                            validate={[required()]}
                                                            onBlur={this.phonenumberchange}
                                                        />                                                        */}
                                                        <label className={classshared.form_label.join(' ')}>{label_text.phonenumber}</label>
                                                    </div>
                                                    {
                                                        this.state.buttonotpdivvisible ?
                                                            (
                                                                <div className={classshared.margin_t_sm}>
                                                                    <div className={classshared.margin_l_m}>
                                                                        <Button btntype={ButtonType.tagsbutton} clicked={this.sendOTP}>{this.state.otpsetndbuttontext}</Button>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                    }
                                                </div>
                                            </div>
                                            {
                                                this.state.otptextdivvisible ?
                                                    (
                                                        <div className={classshared.form_group}>
                                                            <Field
                                                                name={commonplaceholder.otp.toLowerCase()}
                                                                type="text"
                                                                tabIndex={2}
                                                                component={TextInput}
                                                                className={classshared.input_box}
                                                                placeholder={commonplaceholder.otp}
                                                                errorclass={classshared.formlabelerror}
                                                                inputbordererrorclass={classshared.input_box_error}
                                                                validate={[required()]}
                                                                onBlur={this.verifyotp}
                                                            />
                                                            <label className={classshared.form_label.join(' ')}>{commonplaceholder.otp}</label>
                                                            {
                                                                this.state.otpverficationerror ?
                                                                    (<label className={classshared.formlabelerror.join(' ')}>{error_message.otpnotmatched}</label>) : null
                                                            }
                                                        </div>
                                                    ) : null
                                            }

                                            <div className={classshared.form_group}>
                                                <div className={classshared.flex_align_center_bottom.join(' ')}>
                                                    {
                                                        this.state.is_savebutton_disabled ?
                                                            (<Button btntype={ButtonType.profilesetupbuttondisabled}>{ButtonText.save}</Button>) :
                                                            (
                                                                <React.Fragment>
                                                                    <Button btntype={ButtonType.profilesetupbutton} buttontype="submit">
                                                                        {
                                                                            this.props.loading ? (<React.Fragment> <span className={classshared.margin_r_sm}><i
                                                                                className={classshared.fontawesome_refresh.join(' ')}
                                                                            /></span><span>Submitting the data...</span></React.Fragment>) : (<span>{ButtonText.save}</span>)
                                                                        }
                                                                    </Button>
                                                                </React.Fragment>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

personalform = reduxForm({
    form: 'personalform',
    //validate
})(personalform);

export default personalform