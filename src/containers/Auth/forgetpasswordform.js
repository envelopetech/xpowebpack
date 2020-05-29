import React, { Component } from 'react';
import * as classshared from './ClassConst';
import { label_text, ButtonType, commonplaceholder, entryformfieldname } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../components/UI/reduxformcontrols/TextInput';
import { required, email } from 'redux-form-validators'

class forgetpasswordform extends Component {
    render() {
        let error_div = null
        if (this.props.errormessage_show) {
            error_div = <div className={classshared.margin_top_bottom_10}>
                <span className={classshared.formlabelerror}>{this.props.errormessage_text}</span>
            </div>
        }
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
                <Form className={classshared.login_form} onSubmit={handleSubmit}>
                    <div className={classshared.form_group}>
                        <Field
                            name={entryformfieldname.workemail.toLowerCase()}
                            type="text"
                            tabIndex={1}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.workemail}
                            errorclass={classshared.formlabelerror}
                            inputbordererrorclass={classshared.input_box_error}
                            validate={[required(), email()]}
                        />
                        <label className={classshared.form_label.join(' ')}>{label_text.workemail}</label>
                    </div>   
                    <div className={classshared.form_group}>
                        {error_div}
                        </div>                 
                    <div className={classshared.centerdiv}> <Button btntype={ButtonType.signuplogin} buttontype="submit">Send me instructions</Button></div>
                </Form>
            </React.Fragment>
        )
    }
}
forgetpasswordform = reduxForm({
    form: 'formforgetpassword',
    //validate,
})(forgetpasswordform);
export default forgetpasswordform;
