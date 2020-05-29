import React, { Component } from 'react';
import * as classshared from './classconst';
import { ProfilepicType, label_text, ButtonText, ButtonType, commonplaceholder, entryformfieldname, ICONS, error_message, TwoFactorAPIKey } from '../../shared/utility';
import Pic from '../UI/profilepic/profilepic';
import defaultimage from '../../assets/images/default_avatar.png';
import { Field, reduxForm } from 'redux-form';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import { Form } from 'semantic-ui-react';
import TextInput from '../../components/UI/reduxformcontrols/TextInput';
import Button from '../../components/UI/Button/Button';
import Icon from '../UI/Icon/Icon';
import PhoneNumber from '../UI/reduxformcontrols/phonenumber';
import { required } from 'redux-form-validators'
import axios from 'axios';
import { verifyotpdetail } from '../../actions/userprofilesetup/dataactions';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

const styles = {
    content: {
        display: 'flex',
        maxWidth: '940px',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            maxWidth: '375px',
            flexDirection: 'column',
            padding: '15px',
        }
    },

    marginBottomLg: {
        marginBottom: '48px',
    },

    marginSides: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    marginRight: {
        marginRight: '25px',
        '@media (max-width: 768px)': {
            marginRight: '0px',
        }
    },

    otpButton: {
        display: 'flex',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
        }
    }



}

class thirdstep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otpdivvisible: false,
            otpsessionid: null,
            is_savebutton_disabled: true,
            otpverficationerror: false,
            phonenumber: "",
            otpsetndbuttontext: "Send OTP"
        }
    }
    componentDidMount() {
        this.props.change("address1", this.props.address1);
        this.props.change("address2", this.props.address2);
        this.props.change("phonenumber", this.props.phone_number);
        this.setState({ phonenumber: this.props.phone_number })

    }
    handleOnChange = value => {
        this.props.change("phonenumber", value);
        this.setState({ phonenumber: value })
        // if (value.length > 14) {
        //     var data = getotpdetail(value)
        //     data.then(res => {
        //         this.setState({ otpsessionid: res.data.Details, otpdivvisible: true })
        //     });
        // }
    }
    checkotp = (e) => {
        if (e.target.value.length > 0) {
            this.setState({ phonenumber: e.target.value })
            //     var data = getotpdetail(e.target.value)
            //     data.then(res => {
            //         debugger;
            //         this.setState({ otpsessionid: res.data.Details, otpdivvisible: true })
            //     });
        }
    }
    sendOTP = () => {
        // debugger;
        // var data = getotpdetail(this.state.phonenumber)
        // data.then(res => {
        //     debugger;
        //     this.setState({ otpsessionid: res.data.Details, otpdivvisible: true })
        // });
        axios.get(`https://2factor.in/API/V1/${TwoFactorAPIKey}/SMS/+${this.state.phonenumber}/AUTOGEN`
        ).then(response1 => {
            this.setState({ otpsessionid: response1.data.Details, otpdivvisible: true, otpsetndbuttontext: "Resend OTP" })
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
    render() {
        const { classes } = this.props;
        let profilepicurl = defaultimage
        if (this.props.profile_pic_url !== null && this.props.profile_pic_url !== undefined) {
            profilepicurl = this.props.profile_pic_url
        }
        const { handleSubmit, previousPage } = this.props
        return (
            <React.Fragment>
                <Form className={classshared.login_form} onSubmit={handleSubmit}>
                    <div className={classshared.fixed_content.join(' ')}>
                        <div className={classshared.navbar}>
                            <div className={classshared.w_container}>
                                <a href="https://xporium.com" className={classshared.brand}><img src={logoimage} height="40" alt=""></img></a>

                            </div>
                        </div>
                        <div className={clsx(classes.content, classes.marginBottomLg, classes.marginSides)}>
                            <div className={classshared.size1of1.join(' ')}>
                                <div className={classshared.overflow__visible.join(' ')}>
                                    <div className={classshared.progressDot_inactive}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                    <div className={classshared.progressDot_active}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                </div>
                                <h1 className={classshared.font_1_regular_text_dark.join(' ')}>Your business card is almost ready</h1>
                                <div className={classshared.font_weight_thin_text_dark.join(' ')}>Fill out your business card details to share them with other Wingsters.</div>
                            </div>
                        </div>
                        <div className={classes.marginSides}>
                        <div className={classes.content}>
                            <div className={clsx(classshared.half_flex, classes.marginRight)}>
                                <div className={classshared.card_back.join(' ')}>
                                    <div className={classshared.personal_header}>
                                        <div className={classshared.margin_r_sm}>
                                            <Pic type={ProfilepicType.user_nav__user_photo_xsmall} profilepic_url={profilepicurl}></Pic>
                                        </div>
                                        <div className="">
                                            <p className={classshared.text_12_font_1_medium.join(' ')}>{this.props.first_name} {this.props.last_name}</p>
                                            <p className={classshared.text_11}>{this.props.designation} at {this.props.business_name}</p>
                                        </div>
                                    </div>
                                    <div className={classshared.other_info}>
                                        <p className={classshared.text_10}>{this.props.address1}</p>
                                        <p className={classshared.text_10}>{this.props.address2}</p>
                                        <p className={classshared.text_10}>{this.props.phone_number}</p>
                                        <p className={classshared.text_10}>{this.props.company_website}</p>
                                        <p className={classshared.text_10}>{this.props.company_email}</p>
                                    </div>
                                    <div className={classshared.company_logo}>
                                        <Pic type={ProfilepicType.user_nav__user_photo_medium} profilepic_url={this.props.company_logo_url}></Pic>
                                    </div>
                                </div>
                            </div>
                            <div className={classshared.half_flex}>
                                <div className="">
                                    <div className={classshared.margin_top__lv8}>
                                        <div className={classshared.form_group}>
                                            <Field
                                                name={entryformfieldname.address1.toLowerCase()}
                                                type="text"
                                                tabIndex={1}
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
                                                name={entryformfieldname.address2.toLowerCase()}
                                                type="text"
                                                tabIndex={2}
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
                                            <div className={classes.otpButton}>
                                                <div>
                                                    <Field
                                                        component={TextInput}
                                                        name="phonenumber"
                                                        type="hidden"
                                                        style={{ height: 0 }}
                                                    />
                                                    <Field
                                                        tabIndex={2}
                                                        component={PhoneNumber}
                                                        name="phone_number"
                                                        placeholder={commonplaceholder.phonenumber}
                                                        phone={this.props.phone_number}
                                                        phonenumberchange={this.handleOnChange}
                                                    />
                                                    <label className={classshared.form_label.join(' ')}>{label_text.phonenumber}</label>
                                                </div>
                                                <div className={classshared.margin_t_sm}>
                                                    <div className={classshared.margin_l_m}>
                                                        <Button btntype={ButtonType.tagsbutton} clicked={this.sendOTP}>{this.state.otpsetndbuttontext}</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.otpdivvisible ?
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
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                       
                    </div>
                <div className={classshared.fixed_footer}>
                    <div className={classshared.flex_align_center_bottom.join(' ')}>
                        <a href="#/" className={classshared.explore__items} onClick={previousPage}>
                            <Icon svgclass={classshared.common__icon} icon={ICONS.LEFTARROW} />
                            <strong className={classshared.side_nav__item}>{ButtonText.back} </strong>
                        </a>
                    </div>
                    <div className={classshared.flex_align_center_bottom.join(' ')}>
                        {
                            this.state.is_savebutton_disabled ?
                                (<Button btntype={ButtonType.profilesetupbuttondisabled}>{ButtonText.save}</Button>) :
                                (
                                    <React.Fragment>
                                        <Button btntype={ButtonType.profilesetupbutton} buttontype="submit">{ButtonText.save}</Button>
                                        <div className={classshared.margin_l_m}>
                                            <a href="#/" className={classshared.explore__items} onClick={this.props.nextrecommendpage}>
                                                <strong className={classshared.side_nav__item}>{ButtonText.skip} </strong>
                                            </a>
                                        </div>
                                    </React.Fragment>
                                )
                        }
                    </div>
                </div>
                </Form>
            </React.Fragment >
        )
    }
}
thirdstep = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    //validate,
})(thirdstep);

export default withStyles(styles)(thirdstep);