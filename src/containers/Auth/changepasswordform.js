import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../components/UI/reduxformcontrols/TextInput';
import { ButtonType, ButtonText, titleheading, commonplaceholder, ICONS, password_validation } from '../../shared/utility';
import * as classshared from './ClassConst';
import Button from '../../components/UI/Button/Button';
import { required, confirmation } from 'redux-form-validators'
import Icon from '../../components/UI/Icon/Icon';



const initialState = {
    hiddenoldpassword: true,
    hiddennewpassword: true,
}
class changepasswordform extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.changedmessage !== null && nextProps.changedmessage !== "" && nextProps.changedmessage !== undefined) {
            this.props.dispatch(reset("changepassword"));
        }
    }
    toggleShowoldpassword = () => {
        this.setState({ hiddenoldpassword: !this.state.hiddenoldpassword });
    }
    toggleShownewpassword = () => {
        this.setState({ hiddennewpassword: !this.state.hiddennewpassword });
    }
    render() {
        let errordiv = null;
        if (this.props.changedmessage !== null) {
            errordiv = <span className={classshared.labelerror}>{this.props.changedmessage}</span>
        }
        const { handleSubmit } = this.props;
        let buttondiv = null
        buttondiv = <div className={classshared.form_group}>
            <Button onClick={handleSubmit} btntype={ButtonType.btn_blue_font_1_bold_text_14} buttontype="submit" tabIndex={4}>
            {
                this.props.logoutredirect ? (<span className={classshared.margin_r_sm}><i
                    className={classshared.fontawesome_refresh.join(' ')}
                /></span>) : null
            }
                {ButtonText.save}</Button></div>
        return (
            <React.Fragment>
                <Form className={classshared.login_form.join(' ')} onSubmit={handleSubmit}>                   
                    <div className={classshared.form_group}>
                        <Field
                            name={titleheading.newpassword.toLowerCase()}
                            type={this.state.hiddennewpassword ? "password" : "text"}
                            component={TextInput}
                            tabIndex={2}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.newpassword}
                            errorclass={classshared.formlabelerror}
                            inputbordererrorclass={classshared.input_box_error}
                            validate={[required(), password_validation]}
                        />
                        <label className={classshared.form_label.join(' ')}>{commonplaceholder.newpassword}                       
                            <span className={classshared.cursorpointer} onClick={this.toggleShownewpassword} ><Icon svgclass={classshared.icon_20_icon_blue_margin_r_10_verticalalignbottom.join(' ')}
                                icon={ICONS.EYEPASSWORD}>
                            </Icon></span>
                        </label>
                    </div>
                    <div className={classshared.form_group}>
                        <Field
                            name={titleheading.confirm_password.toLowerCase()}
                            type="password"
                            tabIndex={3}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={commonplaceholder.confirmpassword}
                            errorclass={classshared.formlabelerror}
                            inputbordererrorclass={classshared.input_box_error}
                            validate={[required(), confirmation({ field: 'newpassword', fieldLabel: 'Password' }), password_validation]}
                        />
                        <label className={classshared.form_label.join(' ')}>{commonplaceholder.confirmpassword}</label>
                    </div>
                    {errordiv}
                    {buttondiv}
                </Form>
            </React.Fragment>
        )
    }
}
changepasswordform = reduxForm({
    form: 'changepassword',    
})(changepasswordform);
export default changepasswordform;