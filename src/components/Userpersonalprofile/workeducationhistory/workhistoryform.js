import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import YearPickerSelection from '../../UI/reduxformcontrols/YearPicker';
import MonthPickerSelection from '../../UI/reduxformcontrols/MonthPicker';
import Imageupload from '../../UI/reduxformcontrols/imageupload';
import ToggleCheckbox from '../../UI/reduxformcontrols/ToggleCheckbox';
import { combineValidators, isRequired } from 'revalidate'
import { ButtonType, ButtonText, label_text, titleheading, FilestackType, getfilestackpreviewurl, ICONS, commonplaceholder, error_message, customPopUp } from '../../../shared/utility';
import * as classshared from '../../commoncss/classconst';
import Button from '../../UI/Button/Button';
import { required } from 'redux-form-validators';

const validate = combineValidators({
    //companyname: isRequired({ message: 'The company name is required' }),
    //designation: isRequired({ message: 'Designation is required' }),
    year: isRequired({ message: 'Please provide a year' }),
    month: isRequired({ message: 'Please provide a month' })
})

//   const options = {
//     accept: 'image/*',
//     };
class workhistoryform extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { openmodel: false, showtomonthyeardiv: true };
    }
    toggle() {
        this.setState({ openmodel: true });
    }
    componentDidMount() {
        this.props.change("workexp_id", this.props.work_id);
        this.props.change(titleheading.companyname.toLowerCase(), this.props.company_name);
        this.props.change(titleheading.designation.toLowerCase(), this.props.designation);
        this.props.change("imageurl", this.props.company_logo_url);
        this.props.change("imageurlpreview", this.props.company_logo_url_preview);
        this.props.change(titleheading.year.toLowerCase(), this.props.year_from);
        this.props.change(titleheading.yearto.toLowerCase(), this.props.year_to);
        this.props.change(titleheading.month.toLowerCase(), this.props.month_from);
        this.props.change(titleheading.monthto.toLowerCase(), this.props.month_to);
        if (this.props.toyear !== null && this.props.toyear.toString().toLowerCase() === "present") {
            this.props.change(titleheading.present.toLowerCase(), true)
            this.setState({ showtomonthyeardiv: false })
        }
        else {
            this.props.change(titleheading.present.toLowerCase(), false)
            this.setState({ showtomonthyeardiv: true })
        }
    }
    onSuccessImageupload = (result) => {
        let preview = getfilestackpreviewurl(result.filesUploaded[0]["handle"]);
        this.props.change("imageurl", result.filesUploaded[0]["url"]);
        this.props.change("imageurlpreview", preview);
    }
    currentchangehandler = (event) => {
        if (event.target.checked) {
            this.setState({ showtomonthyeardiv: false })
        }
        else {
            this.setState({ showtomonthyeardiv: true })
        }
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
        // let shofilesoption=null;
        // let modeldata=null;        
        //     if(this.props.company_logo_url_preview !== null)
        //     {
        //         shofilesoption = <a onClick={this.toggle} className={classshared.show_link}>Show Files</a>
        //         modeldata = <Modal open={this.state.openmodel} styles={customPopUp}
        //                     onClose={this.closedmodelhandler} center >
        //                          <iframe className={classshared.iframeclass700}
        //                                 src={this.props.company_logo_url_preview} title={this.props.company_name}>
        //                         </iframe>                         
        //                     </Modal>
        //     }
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
                            name="workexp_id"
                            type="hidden"
                            style={{ height: 0 }}
                        />
                        <Field
                            name={titleheading.companyname.toLowerCase()}
                            type="text"
                            tabIndex={1}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.businessname}
                            errorclass={classshared.formlabelerror}
                            validate={[required()]} />
                        <label className={classshared.form_label}>{titleheading.company_name}</label>
                    </div>
                    <div className={classshared.form_group}>
                        {/* <Field
                            name={titleheading.designation.toLowerCase()}
                            type="text"
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={label_text.designation}
                            errorclass={classshared.formlabelerror}
                            inputbordererrorclass={classshared.form_input_error}
                            labelname={titleheading.designation}
                            labelclassname={classshared.formlabel.join(' ')}
                            labelerrorclassname={classshared.formlabelerror}
                        /> */}
                        <Field
                            name={titleheading.designation.toLowerCase()}
                            type="text"
                            tabIndex={2}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.designation}
                            errorclass={classshared.formlabelerror}
                            validate={[required()]} />
                        <label className={classshared.form_label}>{titleheading.designation}</label>
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
                            labelname={titleheading.company_logo}
                            name={titleheading.companylogo.toLowerCase()}
                            component={Imageupload}
                            buttontype={FilestackType.moderatordoc}
                            preview={this.props.company_logo_url_preview}
                            onSuccessupload={this.onSuccessImageupload}
                            fieldvalue={this.props.company_logo_url}
                            formlabelclass={classshared.form_label}
                        />
                        <label className={classshared.form_label}>{titleheading.company_logo}</label>
                    </div>
                    <div className={classshared.form_group}>
                        <div className={classshared.buttoncontainer}>
                            <div className={classshared.mar_r_m}><label className={classshared.form_label_display_margin_left_0.join(' ')}>{titleheading.from}</label></div>
                            <div className={classshared.mar_r_m}>
                                <Field
                                    tabIndex={4}
                                    defaultValue={label_text.monthselection}
                                    className={classshared.form_input_select}
                                    name={titleheading.month.toLowerCase()}
                                    component={MonthPickerSelection}
                                    istomonth={false}
                                    value={this.props.month_from}
                                    monthvalue={this.props.month_from}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_select_error}
                                />
                            </div>
                            <div className={classshared.mar_r_m}>
                                <Field
                                    tabIndex={5}
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
                            </div>
                        </div>
                    </div>
                    <div className={classshared.form_group}>
                        <div className={classshared.buttoncontainer}>
                            <div className={classshared.mar_r_sm}>
                                <label>
                                    <Field
                                        tabIndex={6}
                                        name={titleheading.present.toLowerCase()}
                                        component={ToggleCheckbox}
                                        defaultChecked={false}
                                        onChange={this.currentchangehandler}
                                    />
                                </label>
                            </div>
                            <div className={classshared.mar_r_sm}> <span className={classshared.form_label_display_margin_left_0.join(' ')}>{label_text.currentlabel}</span></div>
                        </div>
                    </div>
                    {
                        this.state.showtomonthyeardiv
                        ? (
                            <div className={classshared.form_group}>
                                <div className={classshared.buttoncontainer}>
                                    <div className={classshared.mar_r_m}><label className={classshared.form_label_display_margin_left_0.join(' ')}>{titleheading.to}</label></div>
                                    <div className={classshared.mar_r_m}>
                                        <Field
                                            tabIndex={7}
                                            defaultValue={label_text.monthselection}
                                            className={classshared.form_input_select}
                                            name={titleheading.monthto.toLowerCase()}
                                            component={MonthPickerSelection}
                                            istomonth={true}
                                            value={this.props.month_to}
                                            monthvalue={this.props.month_to}
                                            errorclass={classshared.formlabelerror}
                                            inputbordererrorclass={classshared.form_input_select_error}
                                        />
                                        {yearlabelerror}
                                    </div>
                                    <div className={classshared.mar_r_m}>
                                        <Field
                                            tabIndex={8}
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
                        )
                        : 
                        (
                            null
                        )
                    }
                </Form>
            </React.Fragment>
        )
    }
}
workhistoryform = reduxForm({
    form: 'workhistory',
    validate,
})(workhistoryform);

export default workhistoryform;


