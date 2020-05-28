import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../components/UI/reduxformcontrols/TextInput';
import { Redirect } from 'react-router-dom';
import { ButtonType, ButtonText, label_text, titleheading, commonplaceholder, ICONS, password_validation } from '../../shared/utility';
import * as classshared from './ClassConst';
import Button from '../../components/UI/Button/Button';
import { required, email, confirmation } from 'redux-form-validators'
import Icon from '../../components/UI/Icon/Icon';

// const validate = combineValidators({
//     email: isRequired({message: 'Email is required'}),
//     password: isRequired({message: 'Password is required'}),  
//     confirmpassword: isRequired({message: 'Confirm Password is required'})         
//   }) 
// const required = value => value ? undefined : 'Required'
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//   'Invalid email address' : undefined
// const password = 


class authform extends Component {
    state = {
        hidden: true,
        rememberchecked: false,
        redirecttoforgetpassword: false
    };
    redirecttoforgetpasswordhandler = () => {
        this.setState({ redirecttoforgetpassword: true })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.islogin !== this.props.islogin) {
            // this.props.destroy();
            // this.props.initialize();
            this.props.dispatch(initialize('auth', {}));
        }
    }
    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }
    remembercheckedchanged = () => {
        this.setState({ rememberchecked: !this.state.rememberchecked }, () => {
            if (this.state.rememberchecked) {
                localStorage.setItem('is_remember_me', true)
            }
            else {
                localStorage.setItem('is_remember_me', false)
            }
        });
    }
    componentDidMount() {
        let is_remember_me = localStorage.getItem('is_remember_me')
        if (JSON.parse(is_remember_me) === false) {
            localStorage.setItem('is_remember_me', false)
        }
    }
    render() {
        let redirecttoforgetpasswordpage = null
        if (this.state.redirecttoforgetpassword) {
            redirecttoforgetpasswordpage = <Redirect to="/forgetpassword" />
        }
        const { handleSubmit } = this.props;
        let divconfirmpassword = null
        let divfirstnamelastname = null
        let buttondiv = null
        let btntext = ButtonText.signup;
        let passworddiv = null;
        if (!this.props.islogin) {

            divfirstnamelastname = <React.Fragment><div className={classshared.form_group}>
                <div>
                    <Field
                        name={titleheading.firstname.toLowerCase()}
                        type="text"
                        tabIndex={1}
                        component={TextInput}
                        className={classshared.input_box}
                        placeholder={label_text.firstname}
                        errorclass={classshared.formlabelerror}
                        inputbordererrorclass={classshared.input_box_error}
                        validate={[required()]}
                    />
                </div>
                <div><label className={classshared.form_label.join(' ')}>{label_text.firstname}</label></div>
            </div>
                <div className={classshared.form_group}>
                    <div>
                        <Field
                            name={titleheading.lastname.toLowerCase()}
                            type="text"
                            tabIndex={1}
                            component={TextInput}
                            className={classshared.input_box}
                            placeholder={label_text.lastname}
                            errorclass={classshared.formlabelerror}
                            inputbordererrorclass={classshared.input_box_error}
                            validate={[required()]}
                        />
                    </div>
                    <div><label className={classshared.form_label.join(' ')}>{label_text.lastname}</label></div>
                </div>
            </React.Fragment>
            divconfirmpassword = <div className={classshared.form_group}>
                <Field
                    name={titleheading.confirm_password.toLowerCase()}
                    type="password"
                    tabIndex={3}
                    component={TextInput}
                    className={classshared.input_box}
                    placeholder={commonplaceholder.confirmpassword}
                    errorclass={classshared.formlabelerror}
                    inputbordererrorclass={classshared.input_box_error}
                    validate={[required(), confirmation({ field: 'password', fieldLabel: 'Password' }), password_validation]}
                />
                <label className={classshared.form_label.join(' ')}>{commonplaceholder.confirmpassword}</label>
            </div>
            passworddiv = <Field
                name={titleheading.password.toLowerCase()}
                type={this.state.hidden ? "password" : "text"}
                component={TextInput}
                tabIndex={2}
                className={classshared.input_box}
                placeholder={commonplaceholder.password}
                errorclass={classshared.formlabelerror}
                inputbordererrorclass={classshared.input_box_error}
                validate={[required(), password_validation]}
            />
        }
        else {
            btntext = ButtonText.login;
            passworddiv = <Field
                name={titleheading.password.toLowerCase()}
                type={this.state.hidden ? "password" : "text"}
                component={TextInput}
                tabIndex={2}
                className={classshared.input_box}
                placeholder={commonplaceholder.password}
                errorclass={classshared.formlabelerror}
                inputbordererrorclass={classshared.input_box_error}
                validate={[required(), password_validation]} />
        }
        buttondiv = <div className={classshared.form_group}>
            <Button
                onClick={handleSubmit}
                btntype={ButtonType.signuplogin}
                buttontype="submit" tabIndex={4}>{btntext}
            </Button></div>
        return (
            <React.Fragment>
                {redirecttoforgetpasswordpage}
                <Form className={classshared.login_form.join(' ')} onSubmit={handleSubmit}>
                    {divfirstnamelastname}
                    <div className={classshared.form_group}>
                        <div>
                            <Field
                                name={titleheading.email.toLowerCase()}
                                type="text"
                                tabIndex={1}
                                component={TextInput}
                                className={classshared.input_box}
                                placeholder={label_text.email}
                                errorclass={classshared.formlabelerror}
                                inputbordererrorclass={classshared.input_box_error}
                                validate={[required(), email()]}
                            />
                        </div>
                        <div><label className={classshared.form_label.join(' ')}>{label_text.email}</label></div>
                    </div>
                    <div className={classshared.form_group}>
                        {passworddiv}
                        <label className={classshared.form_label.join(' ')}>{label_text.password}
                            {/* <span><Icon svgclass={classshared.icon_20_icon_blue_margin_r_10_verticalalignbottom.join(' ')}
                                icon={ICONS.INFOWITHCIRCLE}>
                            </Icon></span> */}
                            <span className={classshared.cursorpointer} onClick={this.toggleShow} ><Icon svgclass={classshared.icon_20_icon_blue_margin_r_10_verticalalignbottom.join(' ')}
                                icon={ICONS.EYEPASSWORD}>
                            </Icon></span>
                        </label>
                    </div>
                    {divconfirmpassword}
                    {
                        this.props.islogin ?
                            (
                                <div className={classshared.from_to_container}>
                                    <div className={classshared.form_group}>
                                        <div>
                                            <label className={classshared.label_checkbox}><input className={classshared.margin_r_sm} type="checkbox" name="checkbox" checked={this.state.rememberchecked} onChange={this.remembercheckedchanged} />
                                            Remember Me
                                        </label>
                                        </div>

                                    </div>
                                    <div className={classshared.form_group}>
                                        <div>
                                            <Button btntype={ButtonType.btn_textlink_showmoreless_black} buttontype="button" clicked={this.redirecttoforgetpasswordhandler}>Forgot Password?</Button>
                                        </div>

                                    </div>
                                </div>

                            ) : null
                    }
                    {buttondiv}
                </Form>
            </React.Fragment>
        )
    }
}
authform = reduxForm({
    form: 'auth',
    //validate,
})(authform);
export default authform;