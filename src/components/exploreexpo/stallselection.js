import React from 'react';
import * as classshared from '../commoncss/classconst';
import { ICONS, ButtonType } from '../../shared/utility';
import Button from '../UI/Button/Button';
import Stallselectionitems from './stallselectionitems'
import { Field, reduxForm } from 'redux-form';
import TextInput from '../UI/reduxformcontrols/TextInput';
import { Form } from 'semantic-ui-react';
import { resizescreenpopup } from '../../shared/resizescreen.js'
import ReactDOM from "react-dom";
import isMobile from '../../shared/isMobile';

class stallselection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_stall: null,
            checked_id: null,
            is_show_proceed: false
        }
        this.handleResize = this.handleResize.bind(this);
    }
    handleResize() {
        if (isMobile.any() !== null) {
            let ele = ReactDOM.findDOMNode(this.refs.popupdivstall)
            resizescreenpopup(ele);
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        if (isMobile.any() !== null) {
            let ele = ReactDOM.findDOMNode(this.refs.popupdivstall)
            resizescreenpopup(ele);
        }
    }
    onchangehandler = (event, id, stall_name) => {
        event.preventDefault();
        this.setState({ checked_id: id, selected_stall: stall_name, is_show_proceed: true })
        this.props.change("stall_id", id);
    }
    render() {
        let divstalldata = [];
        if (this.props.event_stall_data !== null && this.props.event_stall_data !== undefined) {
            this.props.event_stall_data.map((items, i) => {
                let detail = [];
                items.stalldata.map((item, i) => {
                    let data = <Stallselectionitems
                        id={item.id}
                        stall_name={item.stall_name}
                        is_booked={item.is_booked}
                        isChecked={false}
                        checked_id={this.state.checked_id}
                        onchangehandler={(event) => this.onchangehandler(event, item.id, item.stall_name)}
                    >
                    </Stallselectionitems>
                    return (
                        detail.push(
                            <div key={item.id}>{data}</div>
                        )
                    )
                })
                return (
                    divstalldata.push(
                        <div key={i}>{detail}</div>
                    )
                )
            })
        }
        let selectedstalldiv = null
        if (this.state.selected_stall !== null) {
            selectedstalldiv = <div className={classshared.margin_b_m}><div className={classshared.text_12_text_dark.join(' ')}>You have selected Stall {this.state.selected_stall}</div></div>
        }
        const { handleSubmit, previousPage } = this.props
        return (
            <React.Fragment>

                <div className={classshared.closepopup}>
                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                </div>
                <div className={classshared.padding_content_flex_align_center_flex_justify_center.join(' ')} ref="popupdivstall">
                    <div>
                        <div className={classshared.center}>
                            <div className={classshared.card_summary_header_font_1_medium_text_22_text_dark.join(' ')}>Please select your stall</div>
                            {selectedstalldiv}
                            <div className={classshared.stalls_grid.join(' ')}>
                                {divstalldata}
                            </div>
                        </div>
                        <div className={classshared.booking_pass.join(' ')}>
                        </div>
                        <Form className={classshared.login_form} onSubmit={handleSubmit}>
                            <Field
                                component={TextInput}
                                name="companyimageurl"
                                type="hidden"
                                style={{ height: 0 }}
                            />
                            {
                                this.state.is_show_proceed ?
                                    (
                                        <div className={classshared.margin_t_m}><Button btntype={ButtonType.btn_blue_font_1_bold_text_14_width100per} buttontype="submit">Proceed</Button>
                                        </div>
                                    ) :
                                    (
                                        <div className={classshared.margin_t_m}><Button btntype={ButtonType.btn_blue_font_1_bold_text_14_disabled_width100per}>Proceed</Button>
                                        </div>
                                    )
                            }
                            <div className={classshared.margin_t_sm}>
                                <Button btntype={ButtonType.btn_btn_outline_blue_width100per} clicked={previousPage}>Back</Button>
                            </div>
                        </Form>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}
stallselection = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    //validate,
})(stallselection);
export default stallselection