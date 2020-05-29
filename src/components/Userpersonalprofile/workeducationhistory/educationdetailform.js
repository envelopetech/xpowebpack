import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import YearPickerSelection from '../../UI/reduxformcontrols/YearPicker';
import Imageupload from '../../UI/reduxformcontrols/imageupload';
import { combineValidators, isRequired } from 'revalidate'
import { ButtonType, ButtonText, label_text, titleheading, FilestackType, getfilestackpreviewurl, ICONS, commonplaceholder, error_message } from '../../../shared/utility';
import * as classshared from '../../commoncss/classconst';
import Button from '../../UI/Button/Button';
import { required } from 'redux-form-validators';

const validate = combineValidators({
    //degree: isRequired({message: 'Degree is required'}),
    //collegename: isRequired({message: 'College name is required'}),    
    year: isRequired({ message: 'Please provide a from year' }),
    yearto: isRequired({ message: 'Please provide a to year' })
})

//   const options = {
//     accept: 'image/*',
//     };
class educationdetailform extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { openmodel: false, showtomonthyeardiv: true };
    }
    toggle() {
        this.setState({ openmodel: true });
    }
    componentDidMount() {

        this.props.change("education_id", this.props.education_id);
        this.props.change(titleheading.collegename.toLowerCase(), this.props.college_name);
        this.props.change(titleheading.degree.toLowerCase(), this.props.name);
        this.props.change("imageurl", this.props.college_logo_url);
        this.props.change("imageurlpreview", this.props.college_logo_url_preview);
        this.props.change(titleheading.year.toLowerCase(), this.props.year_from);
        this.props.change(titleheading.yearto.toLowerCase(), this.props.year_to);
    }
    onSuccessImageupload = (result) => {
        let preview = getfilestackpreviewurl(result.filesUploaded[0]["handle"]);
        this.props.change("imageurl", result.filesUploaded[0]["url"]);
        this.props.change("imageurlpreview", preview);
    }

    closedmodelhandler = () => {
        this.setState({ openmodel: false });
    }
    render() {
        const { handleSubmit } = this.props;
        let yearlabelerror = null
        if (this.props.yearerror) {
            yearlabelerror = <span className={classshared.formlabelerror}>{error_message.fromtoyear}</span>
        }
        return (
            <React.Fragment>
                <Form className={classshared.simple_form} onSubmit={handleSubmit}>
                    <div className={classshared.form_group}>
                        <div className={classshared.buttoncontainer}>
                            <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnsavecancel} buttontype="submit" svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')} icon={ICONS.SAVE}>{ButtonText.save}</Button></div>
                            <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnsavecancel} buttontype="button" clicked={this.props.cancelform} svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')} icon={ICONS.CROSS}>{ButtonText.cancel}</Button></div>
                        </div>
                    </div>
                    <div className={classshared.form_group}>
                        <Field
                            component={TextInput}
                            name="education_id"
                            type="hidden"
                            style={{ height: 0 }}
                        />
                        <Field
                            name={titleheading.degree.toLowerCase()}
                            type="text"
                            tabIndex={1}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.degree}
                            errorclass={classshared.formlabelerror}
                            validate={[required()]} />
                        <label className={classshared.form_label}>{titleheading.degree}</label>
                    </div>
                    <div className={classshared.form_group}>
                        <Field
                            name={titleheading.collegename.toLowerCase()}
                            type="text"
                            tabIndex={2}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.college_name}
                            errorclass={classshared.formlabelerror}
                            validate={[required()]} />
                        <label className={classshared.form_label}>{commonplaceholder.college_name}</label>
                    </div>
                    <div className={classshared.form_group}>

                        <Field
                            component={TextInput}
                            name="imageurl"
                            type="hidden"
                            style={{ height: 0 }}
                        />
                        <Field
                            component={TextInput}
                            name="imageurlpreview"
                            type="hidden"
                            style={{ height: 0 }}
                        />
                        <Field
                            tabIndex={3}
                            labelname={commonplaceholder.college_logo}
                            name={titleheading.collegelogo.toLowerCase()}
                            component={Imageupload}
                            buttontype={FilestackType.moderatordoc}
                            preview={this.props.college_logo_url_preview}
                            onSuccessupload={this.onSuccessImageupload}
                            fieldvalue={this.props.college_logo_url}
                            formlabelclass={classshared.form_label}
                        />
                        <label className={classshared.form_label}>{commonplaceholder.college_logo}</label>
                    </div>
                    <div className={classshared.form_group}>
                        <div className={classshared.buttoncontainer}>
                            <div className={classshared.mar_r_m}><label className={classshared.form_label_display_margin_left_0.join(' ')}>{titleheading.from}</label></div>
                            <div className={classshared.mar_r_m}>
                                <Field
                                    tabIndex={4}
                                    defaultValue={label_text.yearselection}
                                    className={classshared.form_input_select}
                                    name={titleheading.year.toLowerCase()}
                                    component={YearPickerSelection}
                                    value={this.props.year_from}
                                    istoyear={false}
                                    monthvalue={this.props.year_from}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_select_error}
                                />
                                {yearlabelerror}
                            </div>
                            <div className={classshared.mar_r_m}>
                                <label className={classshared.form_label_display_margin_left_0.join(' ')}>{titleheading.to}</label>
                            </div>
                            <div className={classshared.mar_r_m}>
                                <Field
                                    tabIndex={5}
                                    defaultValue={label_text.yearselection}
                                    className={classshared.form_input_select}
                                    name={titleheading.yearto.toLowerCase()}
                                    component={YearPickerSelection}
                                    value={this.props.year_to}
                                    monthvalue={this.props.year_to}
                                    istoyear={true}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_select_error}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}
educationdetailform = reduxForm({
    form: 'educationdetailform',
    validate,
})(educationdetailform);

export default educationdetailform;


