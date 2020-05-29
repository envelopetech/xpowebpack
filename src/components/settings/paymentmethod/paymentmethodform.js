import React, { Component } from 'react';
import * as classshared from '../../Userprofilesetup/classconst';
import { titleheading, label_text, ButtonText, ButtonType, commonplaceholder } from '../../../shared/utility';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Button from '../../UI/Button/Button';
import { required } from 'redux-form-validators';

class paymentmethodform extends Component {
    componentDidMount() {
        this.props.change("cardnumber", this.props.cardnumber);
        this.props.change("cvvnumber", this.props.cvvnumber);
        this.props.change("expirationcode", this.props.expirationcode);
        this.props.change("postalcode", this.props.postalcode);
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <React.Fragment>
                <Form className={classshared.login_form.join(' ')} onSubmit={handleSubmit}>
                    <div className={classshared.content.join(' ')}>
                        <h1 className={classshared.font_1_regular_text_dark.join(' ')}>Payment Method</h1>
                        <div className={classshared.font_weight_thin_text_dark.join(' ')}>You can update your payment method details below</div>
                        <div className={classshared.size2of3_padding_t_l_border_top.join(' ')}>
                            <div className={classshared.background_card_margin_b_m.join(' ')}>
                               <div className={classshared.margin_b_m}><div className={classshared.text_14}>Your current payment method is <span className={classshared.font_1_bold_text_normal.join(' ')}>Visa ending with 2505</span></div></div> 
                                <div className={classshared.margin_top__lv8}>
                                    <div className={classshared.form_group}>
                                        <Field
                                            name={titleheading.cardnumber.toLowerCase()}
                                            type="text"
                                            tabIndex={1}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.cardnumber}
                                            errorclass={classshared.formlabelerror}
                                            inputbordererrorclass={classshared.input_box_error}
                                            validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.cardnumber}</label>
                                    </div>
                                    <div className={classshared.form_group}>
                                        <Field
                                            name={titleheading.cvvnumber.toLowerCase()}
                                            type="text"
                                            tabIndex={2}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.cvvnumber}
                                            errorclass={classshared.formlabelerror}
                                            inputbordererrorclass={classshared.input_box_error}
                                            validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.cvvnumber}</label>
                                    </div>
                                    <div className={classshared.form_group}>
                                        <Field
                                            name={titleheading.expirationcode.toLowerCase()}
                                            type="text"
                                            tabIndex={3}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.expirationcode}
                                            errorclass={classshared.formlabelerror}
                                            inputbordererrorclass={classshared.input_box_error}
                                            validate={[required()]}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.expirationcode}</label>
                                    </div>
                                    <div className={classshared.form_group}>
                                        <Field
                                            name={titleheading.postalcode.toLowerCase()}
                                            type="text"
                                            tabIndex={4}
                                            component={TextInput}
                                            className={classshared.input_box}
                                            placeholder={commonplaceholder.postalcode}
                                            errorclass={classshared.formlabelerror}
                                            inputbordererrorclass={classshared.input_box_error}
                                            validate={[required()]}/>
                                        <label className={classshared.form_label.join(' ')}>{label_text.postalcode}</label>
                                    </div>
                                    <div className={classshared.form_group}>
                                        <div className={classshared.flex_align_center_bottom.join(' ')}>
                                            <Button btntype={ButtonType.profilesetupbutton} buttontype="submit">
                                                {ButtonText.updatecard}
                                            </Button>
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
paymentmethodform = reduxForm({
    form: 'paymentmethodform',
    //validate
})(paymentmethodform);
export default paymentmethodform