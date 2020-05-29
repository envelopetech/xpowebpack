import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { ProfilepicType, ICONS, ButtonText, ButtonType, encodedstring, filestackanimatemultipleimage, customPopUp } from '../../../shared/utility'
import Profilepic from '../../UI/profilepic/profilepic'
//import { Redirect } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { get_exhibitor_product_by_id, exhibitor_product_update } from '../../../actions/exhibitor/dataactions';
import Modal from "react-responsive-modal";//'../../UI/Modal/Modal';
import Productform from './productform';
import Skeleton from 'react-loading-skeleton';
import { Redirect } from 'react-router-dom';


class productlistitem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirecttohome: false,
            showeditMenu: false,
            is_editform_show: false,
            product_data: null,
            productname: props.name,
            price: props.displayprice,
            product_summary: props.product_summary,
            is_detail_form_open: false,
            product_detail_data: null,
            product_primary_url: props.product_pic_url

        }
        this.showeditMenu = this.showeditMenu.bind(this);
        this.closeeditMenu = this.closeeditMenu.bind(this);
    }

    showeditMenu(event) {
        event.preventDefault();
        this.setState({ showeditMenu: true }, () => {
            document.addEventListener('click', this.closeeditMenu);
        });
    }

    closeeditMenu(event) {
        event.preventDefault();
        this.setState({ showeditMenu: false }, () => {
            document.removeEventListener('click', this.closeeditMenu);
        });
    }
    editproducthandler = (event, id, isdeatil) => {
        window.scrollTo(0, 0);
        event.preventDefault();
        var data = get_exhibitor_product_by_id(id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ product_data: res.data, showeditMenu: false }, () => {
                        if (isdeatil) {
                            this.setState({ is_detail_form_open: true })
                        }
                        else {
                            this.setState({ is_editform_show: true })
                        }
                    });
                }
            }
        });
    }
    closeaddnewrecordhandler = () => {
        this.setState({ is_editform_show: false });
    }
    closedetailform = () => {
        this.setState({ is_detail_form_open: false });
    }
    submit = (values) => {
        let productimagedata = null
        let producttechdetail = null
        if (values.updateddata !== undefined && values.updateddata !== null) {
            productimagedata = JSON.stringify(JSON.parse(values.updateddata))
        }
        if (values.producttechnicaldetail !== undefined && values.producttechnicaldetail !== null) {
            producttechdetail = JSON.stringify(JSON.parse(values.producttechnicaldetail))
        }
        const dataval = {
            name: values.productname,
            product_category: values.product_category,
            price: values.price,
            product_summary: values.product_description,
            product_id: this.props.id,
            brochure: values.company_brochure_url,
            product_pic_url: values.is_primary_image_url,
            product_technical_spec_data: producttechdetail,
            product_images_data: productimagedata,
            isproductimagealldelete: values.isproductimagealldelete,
            istechnicalspecalldelete: values.istechnicalspecalldelete,
        };
        var returndata = exhibitor_product_update(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({
                        productname: res.data["name"],
                        price: res.data["price"],
                        product_summary: res.data["product_summary"],
                        is_editform_show: false,
                        product_primary_url: res.data["product_pic_url"]
                    })
                }
            }
        })
    }
    redirecthandler = () => {
        this.setState({
            redirecttoproductdetailpage: true
        })
    }
    render() {
        let bulkimageurl = null
        if (this.props.bulk_image !== null && this.props.bulk_image !== undefined && this.props.bulk_image.length > 0) {
            bulkimageurl = filestackanimatemultipleimage + "[" + this.props.bulk_image + "]";
        }
        else {
            bulkimageurl = this.state.product_primary_url
        }
        let redirecttoproductpage = null;
        if (this.state.redirecttoproductdetailpage) {
            let encoded = encodedstring(this.props.id)
            if (this.props.otheruserid !== null && this.props.otheruserid !== null) {
                let encodeduserid = encodedstring(this.props.otheruserid)
                redirecttoproductpage = <Redirect to={`/exhibitorproductdetail/${encoded}$/${encodeduserid}`} />
            }
            else {

                redirecttoproductpage = <Redirect to={`/exhibitorproductdetail/${encoded}`} />
            }
        }       
        return (
            <React.Fragment>
                {redirecttoproductpage}
                <Modal open={this.state.is_editform_show} styles={customPopUp}
                    onClose={this.closeaddnewrecordhandler} center showCloseIcon={false}>
                    <Productform onSubmit={this.submit} product_id={this.props.id}
                        product_editable={true}
                        closemodal={this.closeaddnewrecordhandler}
                        currency_name={this.props.currency_name}
                        tagsdata={this.props.tagsdata}
                        product_data={this.state.product_data}
                    ></Productform>
                </Modal>
                <div className={classshared.event_card_wrapper} >
                    <div className={classshared.img_square_m_wrapper_with_height} onClick={this.redirecthandler}>
                        <Profilepic type={ProfilepicType.img_square_l} profilepic_url={bulkimageurl} altname="" skeletonwidth={150} skeletonheight={150}></Profilepic>
                    </div>
                    <div className={classshared.event_card_content_exhibitor_product}>
                        {
                            this.props.is_editmode
                                ?
                                (
                                    <div className={classshared.card__dots}>
                                        <div className={classshared.margin_r_m}><Button btntype={ButtonType.btnuserpostmore}
                                            clicked={this.showeditMenu} svgclass={classshared.icon_20_icon_light_grey.join(' ')}
                                            icon={ICONS.MORE_HORIZONTAL}></Button></div>
                                        {
                                            this.state.showeditMenu
                                                ? (
                                                    <div
                                                        className={classshared.arrow_box}
                                                        ref={(element) => {
                                                            this.dropdownMenu = element;
                                                        }}
                                                    >
                                                        <Button btntype={ButtonType.btnlistdeleteedit}
                                                            clicked={(event) => this.editproducthandler(event, this.props.id, false)}>
                                                            <i className={classshared.fontawesome_manage_width_20_margin_t_sm_margin_r_sm.join(' ')}></i>
                                                            {ButtonText.edit}
                                                        </Button>
                                                        <Button btntype={ButtonType.btnlistdeleteedit}
                                                            clicked={this.props.deleteproducthandler}>
                                                            <i className={classshared.fontawesome_trash_width_20_margin_r_sm.join(' ')}></i>
                                                            {ButtonText.delete}</Button>
                                                    </div>
                                                )
                                                : (
                                                    null
                                                )
                                        }
                                    </div>
                                )
                                :
                                null
                        }
                        <h4 className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')}>{this.state.productname || <Skeleton />}</h4>
                        <div className={classshared.margin_b_sm}>
                            <span className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}> {this.state.price || <Skeleton />}</span>
                        </div>
                        <p className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.descriptionsubstring || <Skeleton />}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default productlistitem