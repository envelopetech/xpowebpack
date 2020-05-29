import React, { Component } from 'react';
import * as classshared from '../commoncss/classconst';
import Datepicker from '../UI/reduxformcontrols/DatePicker';
import TextInput from '../UI/reduxformcontrols/TextInput';
import Button from '../UI/Button/Button';
import { ButtonType, titleheading, commonplaceholder, ButtonText, FilestackType } from '../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { format } from "date-fns";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Fileupload from '../UI/reduxformcontrols/fileupload';
import { required } from 'redux-form-validators';

class eventform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sDate: "",
            endD: "",
            event_pic_url:null,
            event_cover_pic_url:null
        }
    }
    startdatechange = (e) => {
        this.setState({ sDate: e.target.value });
    }
    enddatechange = (e) => {
        this.setState({ endD: e.target.value });
    }
    registrationenddatechange= (e) => {
        this.setState({ endD: e.target.value });
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState }, () => {
            let value = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            this.props.change("event_description", value);
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const { sDate } = this.state;
        return (
            <React.Fragment>
                <div className={classshared.w_container_main_content_coming_soon.join(' ')}>
                    <div className={classshared.margin_top__lv4}>
                        <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>Event</h2>
                    </div>
                    <div className={classshared.margin_t_sm}>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className={classshared.form_group_margin_r_m.join(' ')}>
                            <Field
                                name={titleheading.event_title.toLowerCase()}
                                type="text"
                                readonly={true}
                                component={TextInput}
                                className={classshared.input_box}
                                placeholder={commonplaceholder.title}
                                errorclass={classshared.formlabelerror}
                                validate={[required()]}
                            />
                            <label className={classshared.form_label.join(' ')}>Title</label>
                        </div>

                        <div className={classshared.form_group_margin_r_m.join(' ')}>
                            <Editor
                                editorState={this.state.editorState}
                                editorClassName={classshared.texteditor}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <Field
                                component={TextInput}
                                name="event_description"
                                type="hidden"
                                value={this.state.event_description}
                                style={{ height: 0 }}
                            />
                            <label className={classshared.form_label.join(' ')}>Description</label>
                        </div>

                        <div className={classshared.flex}>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.wingname.toLowerCase()}
                                    tabIndex={1}
                                    component={Datepicker}
                                    placeholder="Start Date"
                                    className={classshared.input_box}
                                    errorclass={classshared.formlabelerror}
                                    onChangeHandler={this.startdatechange}
                                    validate={[required()]}
                                />
                                <label className={classshared.form_label.join(' ')}>Start Date</label>
                            </div>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.wingname.toLowerCase()}
                                    tabIndex={2}
                                    component={Datepicker}
                                    min={format(sDate, "YYYY-MM-DD")}
                                    className={classshared.input_box}
                                    placeholder="End Date"
                                    errorclass={classshared.formlabelerror}
                                    onChangeHandler={this.enddatechange}
                                    validate={[required()]}
                                />
                                <label className={classshared.form_label.join(' ')}>End Date</label>
                            </div>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.wingname.toLowerCase()}
                                    tabIndex={1}
                                    component={Datepicker}
                                    className={classshared.input_box}
                                    errorclass={classshared.formlabelerror}
                                    onChangeHandler={this.startdatechange}
                                />
                                <label className={classshared.form_label.join(' ')}>Start Time</label>
                            </div>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.wingname.toLowerCase()}
                                    tabIndex={2}
                                    component={Datepicker}
                                    min={format(sDate, "YYYY-MM-DD")}
                                    className={classshared.input_box}
                                    errorclass={classshared.formlabelerror}
                                    onChangeHandler={this.enddatechange}
                                />
                                <label className={classshared.form_label.join(' ')}>End Time</label>
                            </div>
                        </div>
                        <div className={classshared.form_group_margin_r_m.join(' ')}>
                            <Field
                                name={titleheading.address.toLowerCase()}
                                type="text"
                                tabIndex={1}
                                component={TextInput}
                                className={classshared.input_box}
                                placeholder={commonplaceholder.address}
                                errorclass={classshared.formlabelerror}
                                inputbordererrorclass={classshared.formlabelerror}
                            />
                            <label className={classshared.form_label.join(' ')}>Address</label>
                        </div>

                        <div className={classshared.flex}>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.event_fees.toLowerCase()}
                                    type="text"
                                    tabIndex={1}
                                    component={TextInput}
                                    className={classshared.input_box}
                                    placeholder={commonplaceholder.event_fees}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.formlabelerror}
                                    validate={[required()]}
                                />
                                <label className={classshared.form_label.join(' ')}>Fees</label>
                            </div>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.wingname.toLowerCase()}
                                    tabIndex={2}
                                    component={Datepicker}
                                    placeholder="Rgistration end date"
                                    min={format(sDate, "YYYY-MM-DD")}
                                    className={classshared.input_box}
                                    errorclass={classshared.formlabelerror}
                                    onChangeHandler={this.registrationenddatechange}
                                />
                                <label className={classshared.form_label.join(' ')}>Registrations End Date</label>
                            </div>
                        </div>

                        <div className={classshared.flex}>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.event_number.toLowerCase()}
                                    type="text"
                                    tabIndex={1}
                                    component={TextInput}
                                    className={classshared.input_box}
                                    placeholder={commonplaceholder.event_number}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.formlabelerror}
                                    validate={[required()]}
                                />
                                <label className={classshared.form_label.join(' ')}>Event Numbers</label>
                            </div>
                            <div className={classshared.form_group_margin_r_m_width50.join(' ')}>
                                <Field
                                    name={titleheading.edition.toLowerCase()}
                                    type="text"
                                    tabIndex={1}
                                    component={TextInput}
                                    className={classshared.input_box}
                                    placeholder={commonplaceholder.event_edition}
                                    errorclass={classshared.formlabelerror}
                                    inputbordererrorclass={classshared.formlabelerror}
                                    validate={[required()]}
                                />
                                <label className={classshared.form_label.join(' ')}>Edition</label>
                            </div>
                        </div>
                        <div className={classshared.company_card}>
                            <div className={classshared.work__card}>
                                <div className={classshared.margin_b_m}>
                                    <div className={classshared.font_1_medium_text_14_text_color_purple.join(' ')}>Event Picture Upload</div>
                                </div>


                                <div className={classshared.margin_b_l}>
                                    <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14.join(' ')}>Event Picture</div></div>
                                    <div className={classshared.margin_b_m}>                                       
                                        <div className={classshared.flex}>
                                            <Field
                                                name={titleheading.event_pic.toLowerCase()}
                                                type="text"
                                                onSuccessupload={this.eventpicupload}
                                                buttontype={FilestackType.uploaddoc}
                                                buttontext="Event Picture"
                                                url={this.state.event_pic_url}
                                                component={Fileupload}
                                                errorclass={classshared.formlabelerror_margin_left.join(' ')}                                            
                                            />
                                            {
                                                this.state.event_pic_url !== null ?
                                                    (
                                                        <div className={classshared.padding_l_l}>
                                                            <div className={classshared.flex__column.join(' ')}>
                                                                <a target="_blank" rel="noopener noreferrer"
                                                                    className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')} href={this.state.event_pic_url} >
                                                                    Preview</a>
                                                            </div>
                                                        </div>
                                                    ) : null
                                            }

                                        </div>
                                        <Field
                                            component={TextInput}
                                            name="event_pic_url"
                                            type="hidden"
                                            style={{ height: 0 }}
                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                            validate={[required()]}
                                        />
                                    </div>
                                </div>
                                <div className={classshared.margin_b_l}>
                                    <div className={classshared.margin_b_m}> <div className={classshared.font_1_medium_text_14.join(' ')}>Cover Picture</div></div>
                                    <div className={classshared.margin_b_m}>                                        
                                        <div className={classshared.flex}>
                                            <Field
                                                name={titleheading.event_cover_pic.toLowerCase()}
                                                type="text"
                                                tabIndex={3}
                                                onSuccessupload={this.coverpicupload}
                                                buttontype={FilestackType.uploaddoc}
                                                buttontext="Cover Picture"
                                                url={this.state.event_cover_pic_url}
                                                component={Fileupload}
                                                errorclass={classshared.formlabelerror}
                                            //validate={[required()]}
                                            />
                                            {
                                                this.state.event_cover_pic_url !== null ?
                                                    (
                                                        <div className={classshared.padding_l_l}>
                                                            <div className={classshared.flex__column.join(' ')}>
                                                                <a target="_blank" rel="noopener noreferrer"
                                                                    className={classshared.font_2_bold_text_color_blue_margin_r_sm_text_12.join(' ')} href={this.state.event_cover_pic_url} >
                                                                    Preview</a>
                                                            </div>
                                                        </div>
                                                    ) : null
                                            }

                                        </div>
                                        <Field
                                            component={TextInput}
                                            name="cover_pic_url"
                                            type="hidden"
                                            style={{ height: 0 }}
                                            errorclass={classshared.formlabelerror_margin_left.join(' ')}
                                            validate={[required()]}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className={classshared.form_group}>
                            <Button btntype={ButtonType.btn_purple_font_1_bold} buttontype="submit">{ButtonText.submit}</Button>
                        </div>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
eventform = reduxForm({
    form: 'formevent',
})(eventform);
export default eventform;