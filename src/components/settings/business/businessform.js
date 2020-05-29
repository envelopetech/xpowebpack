import React, { Component } from 'react';
import * as classshared from '../../Userprofilesetup/classconst';
import ImageUpload from '../../FilestackUpload/FilestackUpload';
import { FilestackType, ProfilepicType, label_text, ButtonText, ButtonType, commonplaceholder, entryformfieldname, getfilestackpreviewurl, filestackoptionimage, url_validation } from '../../../shared/utility';
import Pic from '../../UI/profilepic/profilepic';
import defaultimage from '../../../assets/images/default_avatar.png';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Button from '../../UI/Button/Button';
//import MultiSelect from '../../UI/Multiselect/Multiselect';
import { required } from 'redux-form-validators';
import { get_industry_name_value } from '../../../actions/userprofilesetup/dataactions';
import { MultipleSelect } from "react-select-material-ui";

class businessform extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uploaded_image_url: props.company_logo_url === null ? defaultimage : props.company_logo_url,
            industry_array: null,
            industrydata: null,
            industryvalue: null
        }
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

    industrychange = (values) => {
        this.setState({ industryvalue: values })
        this.props.change("industry_id", values);
    }

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

        const { handleSubmit } = this.props
        return (
            <React.Fragment>
                <Form className={classshared.login_form.join(' ')} onSubmit={handleSubmit}>
                    <div className={classshared.fixed_content.join(' ')}>

                        <div className={classshared.content.join(' ')}>
                            <div className={classshared.signupWrapper.join(' ')}>
                                <div className={classshared.signupContent.join(' ')}>
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
                                                    {/* <MultiSelect data={data} onChange={this.onmultiselectchange} customclass={classshared.dropdown} /> */}
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
                                                        validate={[required(), url_validation]}
                                                    />
                                                    <label className={classshared.form_label.join(' ')}>{label_text.website}</label>
                                                </div>
                                                <div className={classshared.form_group}>
                                                    <Button btntype={ButtonType.profilesetupbutton} buttontype="submit">
                                                        {
                                                            this.props.loading ? (<React.Fragment> <span className={classshared.margin_r_sm}><i
                                                                className={classshared.fontawesome_refresh.join(' ')}
                                                            /></span><span>Submitting the data...</span></React.Fragment>) : (<span>{ButtonText.save}</span>)
                                                        }
                                                    </Button></div>
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
businessform = reduxForm({
    form: 'businessform',
})(businessform);


export default businessform