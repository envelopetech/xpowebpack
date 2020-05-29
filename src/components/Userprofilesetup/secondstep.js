import React, { Component } from 'react';
import * as classshared from './classconst';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import ImageUpload from '../FilestackUpload/FilestackUpload';
import { FilestackType, ProfilepicType, label_text, ButtonText, ButtonType, commonplaceholder, entryformfieldname, ICONS, getfilestackpreviewurl, filestackoptionimage, url_validation } from '../../shared/utility';
import Pic from '../UI/profilepic/profilepic';
import defaultimage from '../../assets/images/default_avatar.png';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../components/UI/reduxformcontrols/TextInput';
import Button from '../../components/UI/Button/Button';
import Icon from '../UI/Icon/Icon';
//import MultiSelect from '../UI/Multiselect/Multiselect';
import { required } from 'redux-form-validators';
import { get_industry_name_value } from '../../actions/userprofilesetup/dataactions';
import { MultipleSelect } from "react-select-material-ui";
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

const styles = {
    content: {
        display: 'flex',
        maxWidth: '940px',
        alignItems: 'center',
        margin: '0px auto',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            padding: '15px',
        }
    },

    marginBottomLg: {
        marginBottom: '48px',
    }
}
// import { combineValidators, isRequired} from 'revalidate'

// const validate = combineValidators({
//     companyname: isRequired({message: 'Required'}),   
//     designation: isRequired({message: 'Required'}),
//     website: isRequired({message: 'Required'}),
//   }) 
// const options = {
// accept: 'image/*',
// };
// const url_validation = value =>
// /* eslint-disable */
//   value && !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(value) ?
//   'Invalid URL' : undefined

const industryplaceholder = {
    placeholder: "Select Industry"
}
class secondstep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploaded_image_url: props.company_logo_url === null ? defaultimage : props.company_logo_url,
            industry_array: '',
            industrydata: null,
            industryvalue: null
        }
    }
    industrychange = (values) => {
        this.setState({ industryvalue: values })
        this.props.change("industry_id", values);
    }
    onSuccessImageupload = (result) => {
        let preview = getfilestackpreviewurl(result.filesUploaded[0]["handle"]);
        let imageurl = result.filesUploaded[0]["url"];
        this.setState({
            uploaded_image_url: imageurl
        })
        this.props.change("companyimageurl", imageurl);
        this.props.change("companyimageurlpreview", preview);
    };
    componentDidMount() {

        var data = get_industry_name_value()
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {

                    this.setState({ industrydata: res.data }, () => {
                        this.props.change("companyname", this.props.business_name);
                        this.props.change("designation", this.props.designation);
                        this.props.change("industry_id", this.props.industry);
                        this.props.change("website", this.props.company_website);
                        this.props.change("companyimageurl", this.props.company_logo_url);
                        this.props.change("companyimageurlpreview", this.props.company_logo_url_preview);
                        if (this.props.industry !== null && this.props.industry !== undefined) {
                            this.setState({ industryvalue: this.props.industrylist })
                        }
                    });
                }
            }
        });


    }

    render() {
        const { classes } = this.props;
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
                        <div className={clsx(classes.content, classes.marginBottomLg)}>
                            <div className={classshared.size1of1.join(' ')}>
                                <div className={classshared.overflow__visible.join(' ')}>
                                    <div className={classshared.progressDot_inactive}></div>
                                    <div className={classshared.progressDot_active}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                </div>
                                <h1 className={classshared.font_1_regular_text_dark.join(' ')}>Tell us about your business</h1>
                                <div className={classshared.font_weight_thin_text_dark.join(' ')}>Share your business information here so that your stall in our exhibitions looks credible.</div>
                            </div>
                        </div>
                        <div className={classes.content}>
                            <div className={classshared.half_flex}>
                                <div className={classshared.avatar_upload}>
                                    <div className={classshared.avatar_edit}>
                                        <ImageUpload buttontype={FilestackType.userprofilesteppic} option={filestackoptionimage} onSuccessupload={this.onSuccessImageupload} />
                                    </div>
                                    <div className={classshared.avatar_preview}>
                                        <Pic type={ProfilepicType.profilesetuppic} profilepic_url={this.state.uploaded_image_url}></Pic>
                                    </div>
                                </div>
                                <div className={classshared.centered_text_center.join(' ')}>
                                    <p className={classshared.upload_pic_dim__high.join(' ')}>Upload Company Logo</p>
                                    <p className={classshared.upload_pic_tip_text.join(' ')}>Tip: Adding a logo in your business profile will make your stall in our exhibitions look more attractive.</p>
                                </div>
                            </div>
                            <div className={classshared.half_flex}>
                                <div className="">
                                    <div className={classshared.margin_top__lv8}>
                                        <div className={classshared.form_group}>
                                            <Field
                                                component={TextInput}
                                                name="companyimageurl"
                                                type="hidden"
                                                style={{ height: 0 }}
                                            />
                                            <Field
                                                component={TextInput}
                                                name="companyimageurlpreview"
                                                type="hidden"
                                                style={{ height: 0 }}
                                            />
                                            <Field
                                                name={entryformfieldname.companyName.toLowerCase()}
                                                type="text"
                                                tabIndex={1}
                                                component={TextInput}
                                                className={classshared.input_box}
                                                placeholder={commonplaceholder.businessname}
                                                errorclass={classshared.formlabelerror}
                                                inputbordererrorclass={classshared.input_box_error}
                                                validate={[required()]}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.businessname}</label>
                                        </div>
                                        <div className={classshared.form_group}>
                                            <Field
                                                name={entryformfieldname.desgination.toLowerCase()}
                                                type="text"
                                                tabIndex={2}
                                                component={TextInput}
                                                className={classshared.input_box}
                                                placeholder={commonplaceholder.designation}
                                                errorclass={classshared.formlabelerror}
                                                inputbordererrorclass={classshared.input_box_error}
                                                validate={[required()]}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.designation}</label>
                                        </div>
                                        <div className={classshared.form_group}>
                                            <Field
                                                component={TextInput}
                                                name="industry_id"
                                                type="hidden"
                                                style={{ height: 0 }}
                                            />
                                            <MultipleSelect
                                                required
                                                placeholder="Select Industry"
                                                options={this.state.industrydata}
                                                onChange={this.industrychange}
                                                values={this.state.industryvalue}
                                                SelectProps={{
                                                    isCreatable: false,
                                                    msgNoOptionsAvailable: "No industry found",
                                                    msgNoOptionsMatchFilter: "No industry name matches the filter"
                                                }} />

                                            <label className={classshared.form_label.join(' ')}>{label_text.industry}</label>
                                        </div>
                                        <div className={classshared.form_group}>
                                            <Field
                                                name={entryformfieldname.website.toLowerCase()}
                                                type="text"
                                                tabIndex={3}
                                                component={TextInput}
                                                className={classshared.input_box}
                                                placeholder={commonplaceholder.website}
                                                errorclass={classshared.formlabelerror}
                                                inputbordererrorclass={classshared.input_box_error}
                                                validate={[url_validation]}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.website}</label>
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
                        <Button btntype={ButtonType.profilesetupbutton} buttontype="submit">{ButtonText.next}</Button>
                        <div className={classshared.margin_l_m}>
                            <a href="#/" className={classshared.explore__items} onClick={this.props.skipPage}>
                                <strong className={classshared.side_nav__item}>{ButtonText.skip} </strong>
                            </a>
                        </div>
                    </div>
                </div>
                </Form>
            </React.Fragment >
        )
    }
}
secondstep = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    //validate,
})(secondstep);
export default withStyles(styles)(secondstep);