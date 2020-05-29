import React, { Component } from 'react';
import * as classshared from '../../../commoncss/classconst';
import Button from '../../../UI/Button/Button';
import { ButtonType, ICONS, getcalltype } from '../../../../shared/utility'
import { reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

class schedulecallthirdstep extends Component {
    render() {
        let calltype = getcalltype(this.props.call_type)
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
           
                    <div className={classshared.popup__content_header.join(' ')}>
                        <div className={classshared.sidebar__user_stats.join(' ')}>
                            <div className={classshared.sidebar__user_details_left.join(' ')}>
                            </div>
                            <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                            </div>
                        </div>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className={classshared.popup__content_bottom}>
                            <div className={classshared.background_card.join(' ')}>
                                <div className={classshared.sidebar__user}>
                                    <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>Thank you! Your call has been scheduled successfully. </div>
                                    <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>{this.props.name}</div>
                                    <div className={classshared.margin_b_sm}> <div className={classshared.font_1_medium_text_12_text_light.join(' ')}>{this.props.finalcallschedulestring}</div></div>
                                    <div className={classshared.card_label__blue.join(' ')}>{calltype} Call</div>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.flex_flex_flex_justify_center.join(' ')}>
                            <Button btntype={ButtonType.btn_purple_font_1_bold} buttontype="submit">Finish</Button>
                        </div>
                    </Form>
               </React.Fragment>
        )
    }
}
schedulecallthirdstep = reduxForm({
    form: 'schedulecallthirdstepform',
    //validate,
})(schedulecallthirdstep);
export default schedulecallthirdstep;