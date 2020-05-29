import React, { PureComponent } from 'react';
import * as classshared from '../../commoncss/classconst';
import { get_product_by_exhibitor_id, exhibitor_product_save, exhibitor_product_delete } from '../../../actions/exhibitor/dataactions';
import Productlistitem from './productlistitem'
import { ButtonText, ButtonType, nodatatext_image_configuration, nodatatext_message, ICONS, confirmdelete, customPopUp } from '../../../shared/utility'
import Button from '../../UI/Button/Button';
import Modal from "react-responsive-modal";
import Productform from './productform'
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import Spinner from '../../UI/Spinner/Spinner';

class productlist extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            exhibitorproductdata: null,
            add_product_modal_open: false,
            producttags: null,
            loading: false,           
            product_delete_id: null
        }
    }
    filldata() {
        var data = get_product_by_exhibitor_id(this.props.exhibitor_id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ exhibitorproductdata: res.data[0] });
                    if (res.data[1] !== null && res.data[1].length > 0) {
                        this.setState({ producttags: res.data[1], loading: false });
                    }
                }
            }
        });
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.filldata();
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.exhibitorproductdata !== this.state.exhibitorproductdata;
    // }
    addnewrecordhandler = (event) => {
        event.preventDefault();
        this.setState({ add_product_modal_open: true });
    }
    closeaddnewrecordhandler = () => {
        this.setState({ add_product_modal_open: false });
    }    
    deleteproducthandlerconfirm = (event, id) => {
        event.preventDefault();       
        this.setState({ product_delete_id: id }, () => {
            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={ this.deleteproducthandler}/>
            //         );
            //     },
            // });
            confirmdelete(this.deleteproducthandler);
        });        
    }
    deleteproducthandler = () => {            
        const dataval = {
            id: this.state.product_delete_id
        };
        var returndata = exhibitor_product_delete(dataval)
        returndata.then(res => {
            let filterdata = this.state.exhibitorproductdata.filter((post) => {
                return this.state.product_delete_id !== post.id;
            });
            this.setState(state => {
                state.exhibitorproductdata = filterdata;
                return state;
            });
        })
    }
    submit = (values) => {
        this.setState({ loading: true })
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
            exhibitor_id: this.props.exhibitor_id,
            brochure: values.company_brochure_url,
            product_pic_url: values.is_primary_image_url,
            product_technical_spec_data: producttechdetail,
            product_images_data: productimagedata,
            isproductimagealldelete: values.isproductimagealldelete,
            istechnicalspecalldelete: values.istechnicalspecalldelete,
        };
        var returndata = exhibitor_product_save(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ exhibitorproductdata: [res.data, ...this.state.exhibitorproductdata], add_product_modal_open: false, });
                }
            }
        })
    }
    render() {          
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let divnodatamessage =
            <Productlistitem
                currency_name={this.props.currency_name}
                is_editmode={this.props.is_editmode}>
            </Productlistitem>
        let list = [];
        let detail = null;
        list = this.state.exhibitorproductdata;
        if (list !== null) {
            if (list.length > 0) {
                detail = list.map((item, i) => (
                    <Productlistitem
                        key={item.id}
                        id={item.id}
                        otheruserid={this.props.otheruserid}
                        name={item.name}
                        currency_name={this.props.currency_name}
                        displayprice={item.displayprice}
                        product_summary={item.product_summary}
                        product_pic_url={item.product_pic_url}
                        bulk_image ={item.image_handle_ids}
                        tagsdata={this.state.producttags}
                        deleteproducthandler={(event) => this.deleteproducthandlerconfirm(event, item.id)}
                        is_editmode={this.props.is_editmode}
                        descriptionsubstring={item.descriptionsubstring}>
                    </Productlistitem>
                ));
            }
            else {
                detail =
                <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.noexhibitorproducrfound}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}>
                </Nodatamessage>
            }
        }
        else {
            detail = divnodatamessage
        }
        return (
            <React.Fragment>
                {spinner}                
                <Modal open={this.state.add_product_modal_open} styles={customPopUp}
                    onClose={this.closeaddnewrecordhandler} center showCloseIcon={false}>
                    <Productform onSubmit={this.submit} product_id={null}
                        product_editable={false}
                        closemodal={this.closeaddnewrecordhandler}
                        currency_name={this.props.currency_name}
                        tagsdata={this.state.producttags}
                        product_data={null}
                    ></Productform>
                </Modal>
                <div className={classshared.w_container}>
                    <div className={classshared.flex_margin_b_m_flex_align_center_margin__lv4_flex_justify_sb.join(' ')}>
                        <div className={classshared.listheadertextclass.join(' ')}>
                            <h2 className={classshared.font_1_regular_text_dark.join(' ')}>Your Products</h2>
                            <div className={classshared.font_1_regular_text_color_grey.join(' ')}>Below are the list of Products added by your
                                organisation</div>
                        </div>
                        {
                            this.props.is_editmode
                            ?
                            (
                                <Button btntype={ButtonType.btn_btn_outline_blue} clicked={this.addnewrecordhandler}>{ButtonText.addproduct}</Button>
                            ) :
                            null
                        }
                    </div>
                    <div className={classshared.margin_top_bottom_48.join(' ')}>
                        {detail}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default productlist;