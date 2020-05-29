import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';

import Button from '../../UI/Button/Button';
import { ICONS, ButtonType, ButtonText, titleheading, commonplaceholder, } from '../../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate'
import TextareaInput from '../../UI/reduxformcontrols/TextareaInput'
import TextInput from '../../UI/reduxformcontrols/TextInput';

const validate = combineValidators({
    message: isRequired({ message: 'is required' }),
})

class leadrefusedreason extends Component {

    componentDidMount() {
        this.props.change("id", this.props.id);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
                <div className={classshared.popup__content_header.join(' ')}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{this.props.title}</h2>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                        </div>
                    </div>
                    <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>{this.props.subtitle}</h3>
                </div>
                <div className={classshared.popup__content_bottom}>
                    <Form onSubmit={handleSubmit}>
                        <div className={classshared.company_card}>
                            <div className={classshared.work__card}>
                                <div className={classshared.form_group_margin_r_m}>

                                    <Field
                                        tabIndex={1}
                                        name={titleheading.message.toLowerCase()}
                                        type="textarea"
                                        component={TextareaInput}
                                        className={classshared.feedtextareawithoutmargin.join(' ')}
                                        placeholder={commonplaceholder.leadreajectreason}
                                        inputbordererrorclass={classshared.form_input_error}
                                        labelname={titleheading.message}
                                        labelclassname={classshared.formlabel.join(' ')}
                                        labelerrorclassname={classshared.formlabelerror}
                                        rows="10" cols="70"
                                    />
                                    <div className={classshared.margin_l_l}><label className={classshared.form_label}>{titleheading.reason}</label></div>
                                    <Field
                                        component={TextInput}
                                        name="id"
                                        type="hidden"
                                        style={{ height: 0 }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className={classshared.form_group}><Button btntype={ButtonType.btn_purple_font_1_bold_text_15} buttontype="submit">{ButtonText.save}</Button></div>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
leadrefusedreason = reduxForm({
    form: 'leadrefused',
    validate,
})(leadrefusedreason);

export default leadrefusedreason;
