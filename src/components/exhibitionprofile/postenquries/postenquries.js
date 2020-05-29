import React, { Component } from 'react';
import * as classshared from './classconst';
import { commonplaceholder, ButtonText, ButtonType } from '../../../shared/utility'
import Button from '../../UI/Button/Button';
import 'react-responsive-modal/styles.css';
import { MultipleSelect } from "react-select-material-ui";
import { get_exhibitor_name_value_by_event_id } from '../../../actions/events/dataactions';
import ReCAPTCHA from "react-google-recaptcha";
import * as actions from '../../../store/actions/index';
import axios from '../../../store/axios-orders';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';

const TEST_SITE_KEY = "6LfMgJUUAAAAALdffJ0Ja2hfq7M4OZ_YmLSGVjca";
const DELAY = 1000;
class postenquries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_exhibitor_list: false,
            checked_all_exhibitor: true,
            checked_card: true,
            checked_specific_exhibitor: false,
            exhibitordata: null,
            message: '',

            callback: "not fired",
            captcha_value: null,
            load: false,
            expired: "false",
            exhibitor_id: null,
            is_all_exhibitor: true,
            errormessage: null
        }
        this._reCaptchaRef = React.createRef();
    }

    exhibitorchange = (value) => {
        this.setState({ exhibitor_id: value })
    }

    handleChange = value => {
        this.setState({ captcha_value: value });
        if (value === null) this.setState({ expired: "true" });
    }

    messagechange = (e) => {
        this.setState({ message: e.target.value })
    }

    asyncScriptOnLoad = () => {
        this.setState({ callback: "called!" });
        console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
    }

    componentDidMount() {
        var data = get_exhibitor_name_value_by_event_id(this.props.event_id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data[0]["error"] === undefined && res.data[0].length > 0) {
                    this.setState({ exhibitordata: res.data[0] });
                }
            }
        });
        setTimeout(() => {
            this.setState({ load: true });
        }, DELAY);
        console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
    }

    allexhibitorcheckhandler = () => {
        this.setState({ show_exhibitor_list: false, checked_all_exhibitor: true, checked_specific_exhibitor: false, is_all_exhibitor: true, errormessage: null })
    }

    specificexhibitorcheckhandler = () => {
        this.setState({ show_exhibitor_list: true, checked_all_exhibitor: false, checked_specific_exhibitor: true, is_all_exhibitor: false, errormessage: null })
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        if (this.state.is_all_exhibitor === false) {
            if (this.state.exhibitor_id === null || this.state.message === '' || this.state.captcha_value === null) {
                this.setState({ errormessage: "Please select exhibitor and enter message and verify that you are not a robot" })
                return;
            }
        }
        else {
            if (this.state.message === '' || this.state.captcha_value === null) {
                this.setState({ errormessage: "Please enter message and verify that you are not a robot" })
                return;
            }
        }
        const data = {
            is_all_exhibitor: this.state.is_all_exhibitor,
            exhibitor_id: this.state.exhibitor_id,
            message: this.state.message
        };
        this.props.on_post_exhibition_enquiries_by_visitor(data);
        this.setState({ message: '', checked_all_exhibitor: true, checked_specific_exhibitor: false, show_exhibitor_list: false, errormessage: null })
    }
    render() {
        //let redirect=null; 
        //if(this.props.return === true)
        //{            
        //   redirect = <Redirect to={`/exhibitionprofile/${this.props.event_id}`} /> 
        //   //redirect = <Redirect to={'/exhibitionprofile/4'} />
        //}
        let errordiv = null;
        if (this.state.errormessage !== null) {
            errordiv = <div className={classshared.form_group}>
                <span className={classshared.labelerror}>{this.state.errormessage}</span>
            </div>
        }
        let divblurclass = null
        if (this.props.eventlivestatus === false) {
            divblurclass = classshared.blurdiv
        }
        return (
            <React.Fragment>
                {/* {redirect}  */}
                <div className={classshared.relative}>
                <div className={divblurclass}>
                    <div className={classshared.flex_flex_align_center.join(' ')}>
                        <div className={classshared.size1of3.join(' ')}>
                            <div className={classshared.text_22_text_dark_font_1_medium_margin_b_sm.join(' ')}>Interested in knowing more?</div>
                            <div className={classshared.text_14_dim__high.join(' ')}>
                                Connect with our sales team to talk about how we
                                can help your business process at scale, or sign up
                                for more info.
                                </div>
                            <div className={classshared.margin_top__lv8}>
                                <ReCAPTCHA
                                    style={{ display: "inline-block" }}
                                    theme="dark"
                                    ref={this._reCaptchaRef}
                                    sitekey={TEST_SITE_KEY}
                                    onChange={this.handleChange}
                                    asyncScriptOnLoad={this.asyncScriptOnLoad}
                                />
                            </div>
                        </div>
                        <div className={classshared.size2of3.join(' ')}>
                            <form className={classshared.simple_form_enquries.join(' ')}>
                                <div className={classshared.form_group}>
                                    <input type="radio" name="exhibitor" value="All" checked={this.state.checked_all_exhibitor} onChange={this.allexhibitorcheckhandler} /> Ask all exhibitors <br /><span className={classshared.text_11_margin_b_m.join(' ')}>(This will send your enquiry to all the participating exhibitors)</span><br />
                                </div>
                                <div className={classshared.form_group}>
                                    <input type="radio" name="exhibitor" value="specific" checked={this.state.checked_specific_exhibitor} onChange={this.specificexhibitorcheckhandler} /> Ask specific exhibitors <br /><span className={classshared.text_11_margin_b_m.join(' ')}>(This will send your enquiry to only those exhibitors whom you select)</span><br />
                                </div>
                                {
                                    this.state.show_exhibitor_list
                                        ?
                                        (
                                            <div className={classshared.form_group}>
                                                <MultipleSelect
                                                    required
                                                    placeholder={commonplaceholder.exhibitorname}
                                                    label="Select as many exhibitors as you like to send your enquiry"
                                                    options={this.state.exhibitordata}
                                                    onChange={this.exhibitorchange}
                                                    SelectProps={{
                                                        isCreatable: false,
                                                        msgNoOptionsAvailable: "No exhibitor found",
                                                        msgNoOptionsMatchFilter: "No exhibitor name matches the filter"
                                                    }} />
                                            </div>
                                        )
                                        :
                                        null
                                }
                                <div className={classshared.form_group}>
                                    <textarea type="text" className={classshared.input_box}
                                        required rows="5" onChange={this.messagechange} value={this.state.message} />
                                    <label className={classshared.form_label_margin__lv0.join(' ')}>Enter product details or any other specific requirements to receive an accurate quote</label>
                                </div>
                                <div className={classshared.form_group}>
                                    <input type="checkbox" checked={this.state.checked_card} /> Share my xporium networking card with the exhibitors
                        </div>
                                <div className={classshared.form_group}>
                                    <Button btntype={ButtonType.exhibition_enquries_submit} buttontype="button" clicked={this.onHandleSubmit}>{ButtonText.submit}</Button>
                                </div>
                                {errordiv}
                            </form>
                        </div>
                    </div>
                </div>
                {
                    this.props.eventlivestatus === false ?
                        (<div className={classshared.hovertext.join(' ')}>
                            You can place the enquiries once the exhibition goes live. Please check back soon.<br />
                        </div>) : null
                }
</div>

            </React.Fragment>
        )
    }
}
// const mapStateToProps = state => {       
//     return {           
//         return:state.postenquiriesreducer.return  
//     };
// };
const mapDispatchToProps = dispatch => {
    return {
        on_post_exhibition_enquiries_by_visitor: (data) => dispatch(actions.post_exhibition_enquiries_by_visitor(data)),

    };
};
export default connect(null, mapDispatchToProps)(postenquries, axios);
//export default  postenquries;
//https://www.google.com/recaptcha/admin/site/345342156
//site name: localhost
//dilip.xporium@gmail.com