import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import Productdetailtechnicalspec from './productdetailtechnicalspec';
import Button from '../../UI/Button/Button';
import { ButtonType, ButtonText, label_text, encodedstring } from '../../../shared/utility';
import ProductImages from './productimages';
import NavButton from '../../UI/Button/navlinkbutton';

class productdetail extends Component {
    render() {
        let listdiv = null
        let list = [];
        let rendersepcdiv = [];
        list = this.props.product_data.product_technical_spec_data[0];
        if (list.length > 0) {
            let detail = null;
            list.map((item) => {
                detail = <Productdetailtechnicalspec key={item.id} spec_name={item.spec_name} spec_value={item.spec_value}></Productdetailtechnicalspec>
                return (
                    rendersepcdiv.push(
                        <React.Fragment>{detail}</React.Fragment>
                    )
                )
            })
            listdiv = <div class={classshared.grid_container.join(' ')}>{rendersepcdiv}</div>
        }
        let imagediv = null;
        let listimage = this.props.product_data.product_images_data;
        if (listimage.length > 0) {
            imagediv = <ProductImages imagedata={listimage}></ProductImages>
        }

        let postedusername = null
        if (this.props.otheruserid !== null && this.props.otheruserid !== undefined) {
            let encoded = encodedstring(this.props.otheruserid)
            postedusername = <NavButton btntype={ButtonType.btn_back_button} link={`/exhibitorprofile/${encoded}`}>{ButtonText.back}</NavButton>
        }
        else {
            postedusername = <NavButton btntype={ButtonType.btn_back_button} link={`/exhibitorprofile`}>{ButtonText.back}</NavButton>
        }
        return (
            <div className={classshared.w_container_padding_all_l.join(' ')}>
                {postedusername}
                <div className={classshared.popup__content_header_flex.join(' ')}>
                    <div className={classshared.size1of2}>
                        <h2 className={classshared.font_1_bold_text_22_text_dark_margin_bottom__lv4.join(' ')}>{this.props.product_data.name}</h2>
                        <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>{this.props.product_data.product_summary}</h3>
                    </div>
                    <div className={classshared.size1of2_flex_relative.join(' ')}>
                        <h1 className={classshared.text_dark_font_1_bold_absolute_right__lv0_bottom__lv0.join(' ')}>{this.props.currency_name}{this.props.product_data.price}</h1>
                    </div>
                </div>
                {
                    this.props.product_data.tag_name_data !== null && this.props.product_data.tag_name_data !== undefined ?
                    (
                        <div className={classshared.border_bottom_flex_padding.join(' ')}>
                            <div className={classshared.margin_t_m}>
                                <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.product_category}</h2>
                                <div className={classshared.margin_t_m}> <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>{this.props.product_data.tag_name_data}</h3></div> </div>
                        </div>
                    ) : null
                }
                {
                    listdiv !== null ?
                    (
                        <div className={classshared.margin_t_m}>
                            <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.technicalspecification}</h2>
                            {listdiv}
                        </div>
                    ) : null
                }
                {
                    this.props.product_data.brochure !== null && this.props.product_data.brochure !== undefined ?
                    (
                        <div className={classshared.border_bottom_flex_padding.join(' ')}>
                            <Button btntype={ButtonType.btn_purple_font_1_bold} clicked={(event) => { event.preventDefault(); window.open(this.props.product_data.brochure); }}>{ButtonText.downloadbrochure}</Button>
                        </div>
                    ) : null
                }
                <div className={classshared.margin_top__lv8}>{imagediv}</div>
            </div>
        )
    }
}
export default productdetail;