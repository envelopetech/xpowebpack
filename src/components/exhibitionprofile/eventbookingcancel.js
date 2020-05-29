import React from 'react';
import * as classshared from '../commoncss/classconst';
import { ICONS, ButtonType } from '../../shared/utility';
import Button from '../UI/Button/Button';


const eventbookingcancel = (props) => {
    return (
        <React.Fragment>
            <div className={classshared.closepopup}>
                <Button btntype={ButtonType.btn_close_popup} clicked={props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
            </div>
            <div className={classshared.padding_content_flex_align_center_flex_justify_center.join(' ')}>
                <div className={classshared.center}>
                    <div className={classshared.margin_b_m}><div className={classshared.card_summary_header_font_1_medium_text_22_text_dark.join(' ')}>Confirm</div></div>
                    <div className={classshared.margin_bottom__lv4}> <div className={classshared.text_14_text_dark.join(' ')}>Are you sure you want to cancel your booking?</div></div>
                </div>
                <div className={classshared.margin_t_m.join(' ')}><Button clicked={props.cancelbookinghandler} btntype={ButtonType.btn_blue_font_1_bold_text_14_width100per}>Yes, I am sure</Button>
                </div>
                <div className={classshared.margin_t_m.join(' ')}><Button btntype={ButtonType.btn_btn_outline_blue_width100per} clicked={props.closemodal}>Back</Button></div>
            </div>
        </React.Fragment>
    )
}
export default React.memo(eventbookingcancel);