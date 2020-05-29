import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import * as classshared from './classconst';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { label_text, titleheading, ButtonType, ICONS } from '../../shared/utility';
import TextInput from '../UI/reduxformcontrols/TextInput';
import { combineValidators, isRequired } from 'revalidate'
import TextareaInput from '../UI/reduxformcontrols/TextareaInput'

const validate = combineValidators({
    title: isRequired({ message: 'The title is required' }),
    message: isRequired({ message: 'The message is required' })
})

class reportpopup extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
                
                        <div className={classshared.popup__content_header}>
                            <div className={classshared.sidebar__user_stats.join(' ')}>
                                <div className={classshared.sidebar__user_details_left.join(' ')}>
                                    <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.report}</h2>
                                </div>
                                <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.cancelreportpopup} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                </div>
                            </div>
                        </div>
                        <Form className={classshared.simple_form} onSubmit={handleSubmit}>
                            <div className={classshared.form_group}>
                                <div className={classshared.buttoncontainer}>
                                    <div className={classshared.mar_r_m}><Button btntype={this.props.btnsavetype} buttontype="submit" >{this.props.btnposttext}</Button></div>
                                    <div className={classshared.mar_r_m}><Button btntype={this.props.btncanceltype} buttontype="button" clicked={this.props.cancelreportpopup}>{this.props.btncanceltext}</Button></div>
                                </div>
                            </div>
                            <div className={classshared.form_group}>
                                <Field
                                    component={TextInput}
                                    name="user_post_id"
                                    type="hidden"
                                    style={{ height: 0 }}
                                    value={this.props.post_id}
                                />
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
                                <label className={classshared.form_label}>{titleheading.title}</label>
                            </div>
                            <div className={classshared.form_group}>
                                <Field
                                    name={titleheading.message.toLowerCase()}
                                    tabIndex={2}
                                    type="textarea"
                                    component={TextareaInput}
                                    className={classshared.feedtextareawithoutmargin.join(' ')}
                                    placeholder={label_text.message}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.form_input_error}
                                    labelname={titleheading.message}
                                    labelclassname={classshared.formlabel.join(' ')}
                                    labelerrorclassname={classshared.formlabelerror}
                                    rows="10" cols="70"
                                />
                                <label className={classshared.form_label}>{titleheading.message}</label>
                            </div>
                        </Form>
                   
            </React.Fragment>
        )
    }
};
reportpopup = reduxForm({
    form: 'reportpopup',
    validate,
})(reportpopup);
export default reportpopup;