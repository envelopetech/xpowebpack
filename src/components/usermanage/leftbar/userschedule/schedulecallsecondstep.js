import React, { Component } from 'react';
import * as classshared from '../../../commoncss/classconst';
import Button from '../../../UI/Button/Button';
import { ICONS, ButtonType, ProfilepicType, ButtonText, getcalltype } from '../../../../shared/utility'
import { reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Profilepic from '../../../UI/profilepic/profilepic';

class schedulecallsecondstep extends Component {
    render() {
        let calltype = getcalltype(this.props.call_type)
        const { handleSubmit, previousPage } = this.props;
        return (
            <React.Fragment>

                <div className={classshared.popup__content_header.join(' ')}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>Schedule a Call</h2>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                        </div>
                    </div>
                    <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>Check your details and confirm your call with <strong>{this.props.name}</strong></h3>
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className={classshared.popup__content_bottom}>
                        <div className={classshared.background_card.join(' ')}>
                            <div className={classshared.sidebar__user}>
                                <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>You are scheduling a call with: </div>
                                <div className={classshared.user_nav__icon_box_padding}>
                                    <Profilepic type={ProfilepicType.user_nav__user_photo_large} profilepic_url={this.props.wingsterprofilepic}></Profilepic>
                                </div>
                                <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>{this.props.name}</div>
                                <div className={classshared.margin_b_sm}><div className={classshared.font_1_medium_text_12_text_light.join(' ')}>{this.props.finalcallschedulestring}</div></div>
                                <div className={classshared.card_label__blue.join(' ')}>{calltype} Call</div>
                            </div>
                        </div>
                    </div>
                    <div className={classshared.flex_flex_justify_sb.join(' ')}>
                        <Button btntype={ButtonType.btn_btn_outline_grey} clicked={previousPage}>{ButtonText.back}</Button>
                        <Button btntype={ButtonType.btn_purple_font_1_bold} buttontype="submit">{ButtonText.confirmandbook}</Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}
schedulecallsecondstep = reduxForm({
    form: 'schedulecallsecondstepform',
    //validate,
})(schedulecallsecondstep);
export default schedulecallsecondstep;