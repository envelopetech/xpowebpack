import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Button from '../../UI/Button/Button';
import { ICONS, ButtonType, ButtonText, titleheading, commonplaceholder, label_text, FilestackType, filestackoptionimage } from '../../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate'
import ImageUpload from '../../FilestackUpload/FilestackUpload';
import Icon from '../../UI/Icon/uploadicon';
import UploadIllustrationimage from '../../../assets/images/illustration_image_upload.svg';
import TextareaInput from '../../UI/reduxformcontrols/TextareaInput'
import Spinner from '../../UI/Spinner/Spinner'
const validate = combineValidators({
    invoicevalue: isRequired({ message: 'is required' }),
})

class leadclose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showinvoiceform: false,
            showloseform: false,
            checked_winlead: false,
            check_loselead: false,
            invoiceurl: null,
            loading: false
        }
    }

    onSuccessbrochureupload = (result) => {
        this.setState({ loading: true }, () => {
            let url = result.filesUploaded[0]["url"];
            this.props.change("invoice_url", url);
            this.setState({
                invoiceurl: url, loading: false
            })
        });

    };

    winleadcheckhandler = () => {
        this.setState({ showinvoiceform: true, checked_winlead: true, check_loselead: false, showloseform: false })
        this.props.change("leadwinlose", true);
    }
    loseleadcheckhandler = () => {
        this.setState({ showinvoiceform: false, checked_winlead: false, check_loselead: true, showloseform: true })
        this.props.change("leadwinlose", false);
    }


    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        const { handleSubmit } = this.props;

        return (
            <React.Fragment>
                {spinner}
               
                        <div className={classshared.popup__content_header.join(' ')}>
                            <div className={classshared.sidebar__user_stats.join(' ')}>
                                <div className={classshared.sidebar__user_details_left.join(' ')}>
                                    <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>Close Lead</h2>
                                </div>
                                <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                </div>
                            </div>
                            <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>Add the invoice value below to verify the lead closure/Refuse the lead.</h3>
                        </div>
                        <div className={classshared.popup__content_bottom}>

                            <div className={classshared.buttoncontainer}>
                                <div className={classshared.centerdivflex}>
                                    <div className={classshared.form_group}>
                                        <input type="radio" name="winlose" value="win" checked={this.state.checked_winlead} onChange={this.winleadcheckhandler} /> Win Lead <br />
                                    </div>
                                    <div className={classshared.margin_l_m}>
                                        <input type="radio" name="winlose" value="lose" checked={this.state.check_loselead} onChange={this.loseleadcheckhandler} /> Lose Lead <br />
                                    </div>
                                </div>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    component={TextInput}
                                    name="leadwinlose"
                                    type="hidden"
                                    style={{ height: 0 }}
                                    errorclass={classshared.formlabelerror}
                                />
                                {
                                    this.state.showinvoiceform ?
                                        (
                                            <React.Fragment>
                                                <div className={classshared.company_card}>
                                                    <div className={classshared.work__card}>
                                                        <div className={classshared.form_group_margin_r_m.join(' ')}>
                                                            <div className={classshared.flex_flex_flex_justify_center.join(' ')}>
                                                                <span className={classshared.margin_r_m}>{this.props.currency_name}</span>
                                                                <Field
                                                                    name={titleheading.invoicevalue.toLowerCase()}
                                                                    type="number"
                                                                    component={TextInput}
                                                                    className={classshared.input_box}
                                                                    placeholder={commonplaceholder.invoicevalue}
                                                                    errorclass={classshared.formlabelerror}
                                                                />

                                                            </div>
                                                            <Field
                                                                component={TextInput}
                                                                name="invoice_url"
                                                                type="hidden"
                                                                style={{ height: 0 }}
                                                                errorclass={classshared.formlabelerror}
                                                            />
                                                            <div className={classshared.margin_l_l}><label className={classshared.form_label}>{label_text.invoicevalue}</label></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classshared.company_card}>
                                                    <div className={classshared.work__card}>
                                                        <div className={classshared.size1of1}>
                                                            <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                                                <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.images}</h2>
                                                                <div className={classshared.flex}>
                                                                    <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.BELL}></Icon>
                                                                    <ImageUpload option={filestackoptionimage} buttontype={FilestackType.uploadimages} 
                                                                    onSuccessupload={this.onSuccessbrochureupload} 
                                                                    onErrorupload={this.onErrorImageupload} />
                                                                </div>
                                                            </div>
                                                            {
                                                                this.state.invoiceurl !== null ?
                                                                    (<img className={classshared.margin_t_b_25_width50.join(' ')} src={this.state.invoiceurl} alt=""></img>

                                                                    ) : (
                                                                        <img className={classshared.margin_t_b_25_width50.join(' ')} src={UploadIllustrationimage} alt=""></img>
                                                                    )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                        :
                                        null
                                }
                                {
                                    this.state.showloseform ?
                                        (
                                            <React.Fragment>
                                                <div className={classshared.company_card}>
                                                    <div className={classshared.work__card}>
                                                        <div className={classshared.form_group_margin_r_m.join(' ')}>
                                                            <Field
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
                                                        </div>

                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : null

                                }
                                {
                                    this.state.showloseform || this.state.showinvoiceform ?
                                        (
                                            <div className={classshared.form_group}><Button btntype={ButtonType.btn_purple_font_1_bold_text_15} buttontype="submit">{ButtonText.save}</Button></div>
                                        )
                                        : null

                                }
                            </Form>
                        </div>
                   
            </React.Fragment>
        )

    }
}
leadclose = reduxForm({
    form: 'closelead',
    validate,
})(leadclose);

export default leadclose;