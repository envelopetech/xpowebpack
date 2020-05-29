import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Button from '../../UI/Button/Button';
import { ICONS, ButtonType, ButtonText, titleheading, commonplaceholder, label_text } from '../../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { required, email } from 'redux-form-validators';
import { get_exhibitr_staff_invitation_from_existing_members } from '../../../actions/exhibitor/dataactions';
import Option from './Option'
import Select from 'react-select';

class staffform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_invite_new_member: false,
            users_data: null,
        }
    }
    componentDidMount() {
        var data = get_exhibitr_staff_invitation_from_existing_members(this.props.exhibitor_id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ users_data: res.data });
                }
            }
        });
    }
    invitememberhandler = (event) => {
        event.preventDefault();
        this.setState({ is_invite_new_member: true });
    }
    cancelnewmemberinvitation = (event) => {
        event.preventDefault();
        this.setState({ is_invite_new_member: false });
    }
    render() {
        let errordiv = null;
        if (this.props.errormessage !== null) {
            errordiv = <div className={classshared.margin_top_bottom_10}>
                <span className={classshared.formlabelerror}>{this.props.errormessage}</span>
            </div>
        }
        const { users_data } = this.state;
        let title = "Add Team Members"
        let subtitle = "You can add your co-workers to your team here."
        const { handleSubmit } = this.props;
        let divbottomdisplay = null;
        if (users_data !== null) {
            divbottomdisplay =
                <React.Fragment>
                    <div className={classshared.margin_top_bottom_48.join(' ')}>
                        <Select
                            classNamePrefix="react-select"
                            isMulti={true}
                            onChange={this.props.exhibitorchangehandler}
                            components={{ Option }}
                            options={users_data}
                            placeholder={commonplaceholder.searchinviteexistingstaffmembers}
                        />

                        {errordiv}
                    </div>

                    <div className={classshared.margin_left_60}>
                        <Button btntype={ButtonType.btn_purple_font_1_bold_text_15} svgclass={classshared.icon_20_white_margin_r_10.join(' ')} icon={ICONS.LINECHECK} clicked={this.props.exhistingmemberstaffinvitationsend}>{ButtonText.asktojoin}</Button>
                    </div>
                    <div className={classshared.center_margin_t_m.join(' ')}>
                        Co-worker still not on Xporium? <Button btntype={ButtonType.btn_bluelink} clicked={this.invitememberhandler}>{ButtonText.clicktoinvite}</Button>
                    </div>
                </React.Fragment>
        }
        if (this.state.is_invite_new_member) {
            title = "Invite Users"
            divbottomdisplay = <React.Fragment>
                <div className={classshared.margin__lv8}>
                    <Form onSubmit={handleSubmit}>
                        <div className={classshared.form_group}>
                            <Field
                                name={titleheading.firstname.toLowerCase()}
                                type="text"
                                tabIndex={1}
                                component={TextInput}
                                className={classshared.input_box}
                                placeholder={commonplaceholder.first_name}
                                errorclass={classshared.formlabelerror}
                                validate={[required()]}
                            />
                            <label className={classshared.form_label.join(' ')}>{label_text.firstname}</label>
                        </div>
                        <div className={classshared.form_group}>
                            <Field
                                name={titleheading.lastname.toLowerCase()}
                                tabIndex={2}
                                type="text"
                                component={TextInput}
                                className={classshared.input_box}
                                placeholder={commonplaceholder.last_name}
                                errorclass={classshared.formlabelerror}
                                validate={[required()]}
                            />
                            <label className={classshared.form_label.join(' ')}>{label_text.lastname}</label>
                        </div>
                        <div className={classshared.form_group}>
                            <Field
                                name={titleheading.email.toLowerCase()}
                                type="text"
                                tabIndex={3}
                                component={TextInput}
                                className={classshared.input_box}
                                placeholder={commonplaceholder.workemail}
                                errorclass={classshared.formlabelerror}
                                validate={[required(), email()]}
                            />
                            <label className={classshared.form_label.join(' ')}>{label_text.email}</label>
                        </div>
                        {/* <div className={classshared.form_group}>                                            
                                <Field
                                name={titleheading.role.toLowerCase()}
                                type="text"  
                                tabIndex={4}                 
                                component={TextInput}                    
                                className={classshared.input_box}
                                placeholder={commonplaceholder.role}
                                errorclass ={classshared.formlabelerror}  
                                validate={[required()]}                                              
                                />
                                <label className={classshared.form_label.join(' ')}>{label_text.role}</label>
                        </div> */}
                        <div className={classshared.form_group}>
                            <div className={classshared.buttoncontainer}>
                                <div className={classshared.mar_r_m}> <Button btntype={ButtonType.btn_outline_purple} svgclass={classshared.icon_20_icon_dark_purple_margin_r_10.join(' ')} buttontype="submit" icon={ICONS.LINECHECK}>{ButtonText.sendinvite}</Button></div>
                                <div className={classshared.mar_r_m}><Button btntype={ButtonType.btn_outline_purple} svgclass={classshared.icon_20_icon_dark_purple_margin_r_10.join(' ')} buttontype="button" clicked={this.cancelnewmemberinvitation}>{ButtonText.cancel}</Button></div>
                            </div>
                        </div>
                    </Form>
                </div>
            </React.Fragment>
        }
        //const { handleSubmit} = this.props;  
        return (
            <React.Fragment>
                <div className={classshared.popup__content_header}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{title}</h2>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                        </div>
                    </div>
                    <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>{subtitle}</h3>
                </div>
                <div className={classshared.popup__content_bottom}>
                    {divbottomdisplay}
                </div>
            </React.Fragment>
        )
    }
}
staffform = reduxForm({
    form: 'formstaff',
    //validate,
})(staffform);
export default staffform;