import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import * as classshared from './classconst';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { label_text, titleheading, ButtonType, ICONS } from '../../shared/utility';
import TextInput from '../UI/reduxformcontrols/TextInput';
import { combineValidators, isRequired } from 'revalidate'
import UploadFiles from '../UI/reduxformcontrols/uploadfiles'

const validate = combineValidators({
    file: isRequired({ message: 'The file is required' })
})

class uservideoform extends Component {

    constructor(props) {
        super(props);

        this.state = { filecontent: null };
    }
    handlefileuploadChange = (e) => {
        console.log(e.target.files[0])
        this.setState({ filecontent: e.target.files[0] });
        this.props.change("filecontent", e.target.files[0]);
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
               
                        <div className={classshared.popup__content_header}>
                            <div className={classshared.sidebar__user_stats.join(' ')}>
                                <div className={classshared.sidebar__user_details_left.join(' ')}>
                                    <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.uploadvideo}</h2>
                                </div>
                                <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.cancelform} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                </div>
                            </div>
                        </div>
                        <Form className={classshared.simple_form} onSubmit={handleSubmit}>
                            <div className={classshared.form_group}>
                                <div className={classshared.buttoncontainer}>
                                    <div className={classshared.mar_r_m}><Button btntype={this.props.btnuserfeedpost} buttontype="submit" >{this.props.btnposttext}</Button></div>
                                    <div className={classshared.mar_r_m}><Button btntype={this.props.btnuploadvideo} buttontype="button" clicked={this.props.cancelform}>{this.props.btncanceltext}</Button></div>
                                </div>
                            </div>
                            <div className={classshared.form_group}>
                                <Field
                                    name={titleheading.title.toLowerCase()}
                                    type="text"
                                    tabIndex={1}
                                    component={TextInput}
                                    className={classshared.input_box}
                                    placeholder={label_text.title}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_error}
                                    labelname={titleheading.title}
                                    labelclassname={classshared.formlabel.join(' ')}
                                    labelerrorclassname={classshared.formlabelerror}
                                />
                                <label className={classshared.form_label_margin_left_0.join(' ')}>{titleheading.title}</label>
                            </div>
                            <div className={classshared.form_group}>
                                <Field
                                    name={titleheading.description.toLowerCase()}
                                    type="text"
                                    tabIndex={2}
                                    component={TextInput}
                                    className={classshared.input_box}
                                    placeholder={label_text.description}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_error}
                                    labelname={titleheading.description}
                                    labelclassname={classshared.formlabel.join(' ')}
                                    labelerrorclassname={classshared.formlabelerror}
                                />
                                <label className={classshared.form_label}>{titleheading.description}</label>
                            </div>
                            <div className={classshared.form_group}>
                                <Field
                                    name="file"
                                    tabIndex={3}
                                    component={UploadFiles}
                                    className={classshared.input_box}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_error}
                                    labelname={titleheading.uploadvideo}
                                    labelclassname={classshared.formlabel.join(' ')}
                                    labelerrorclassname={classshared.formlabelerror}
                                    onchange={this.handlefileuploadChange}
                                />
                                <label className={classshared.form_label}>{titleheading.uploadvideo}</label>
                            </div>
                        </Form>
                   
            </React.Fragment>
        )
    }
};
uservideoform = reduxForm({
    form: 'uservideo',
    validate,
})(uservideoform);
export default uservideoform;