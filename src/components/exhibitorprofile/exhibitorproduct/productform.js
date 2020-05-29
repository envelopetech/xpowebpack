import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Tagsautoinput from '../../UI/reduxformcontrols/Tagsautoinput'
import Button from '../../UI/Button/Button';
import { ICONS, ProfilepicType, ButtonType, ButtonText, titleheading, commonplaceholder, label_text, error_message, FilestackType, filestackoptionpdf, filestackoptionimage, getfilestackthumbnailurl, getfilestacklargeurl } from '../../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
//import { required} from 'redux-form-validators'
//import RichTextEditor from 'react-rte';
//import RichTextEditorComp from '../../UI/reduxformcontrols/richtexteditor'
//import Producttechnicalspecform from './producttechnicalspecform'
//import Producttechnicalsepcitems from './producttechnicalsepcitems'
import { combineValidators, isRequired } from 'revalidate'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ImageUpload from '../../FilestackUpload/FilestackUpload';
import Icon from '../../UI/Icon/uploadicon';
//import PDFViewer  from 'mgr-pdf-viewer-react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import Productimageaddeditslider from './productimageaddeditslider';
import UploadIllustrationimage from '../../../assets/images/illustration_image_upload.svg';
import { update_exhibitor_product_primary_image } from '../../../actions/exhibitor/dataactions';
import uniqueId from 'react-html-id';
import DownloadIcon from '../../UI/Icon/downloadicon';
import Spinner from '../../UI/Spinner/Spinner';
import shortid from "shortid";

import Profilepic from '../../UI/profilepic/profilepic'

const validate = combineValidators({
    product_category: isRequired({ message: 'Product category is required' }),
    productname: isRequired({ message: 'Product name is required' }),
    price: isRequired({ message: 'Price is required' }),
})


const params = {
    slidesPerView: 3,
    //modules: [Pagination, Navigation],
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    spaceBetween: 10,
    //getSwiper: updateSwiper,
    //shouldSwiperUpdate:true,
    rebuildOnUpdate: true,
    observer: true
}
class productform extends Component {
    constructor(props) {
        super(props);
        uniqueId.enableUniqueIds(this);
        this.state = {
            is_open_technical_spec_form: false,
            editorState: EditorState.createEmpty(),
            technicalspecname: "",
            technicalspecvalue: "",
            is_error_name: false,
            is_error_value: false,
            technicalspecdata: [],
            technicalspec_id: null,
            is_edit_mode: false,
            tagsdata: props.tagsdata === null ? null : props.tagsdata,
            selectedtag_edit_time_data: props.product_data !== null ? props.product_data["tag_name_data"] !== null ? props.product_data["tag_name_data"] : null : null,
            brochureurl: null,//"https://cdn.filestackcontent.com/27NF48dqQzagACWw3VXR"//Temporary,
            product_image_data: null,
            product_pic_url: null,
            isChecked: false,
            loading: false,
        }
    }
    componentDidMount() {
        if (this.props.product_data !== null) {
            this.props.change(titleheading.productname.toLowerCase(), this.props.product_data["name"]);
            this.props.change(titleheading.price.toLowerCase(), this.props.product_data["price"]);
            this.props.change("product_category", this.props.product_data["product_category"]);
            this.props.change("is_primary_image_url", this.props.product_data["product_pic_url"]);
            this.setState({
                product_pic_url: this.props.product_data["product_pic_url"]
            })

            if (this.props.product_data["product_summary"] !== null && this.props.product_data["product_summary"] !== "") {
                this.props.change("product_description", this.props.product_data["product_summary"]);
                const html = this.props.product_data["product_summary"];
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    this.setState({ editorState })
                }
            }
            if (this.props.product_data["product_technical_spec_data"] !== null && this.props.product_data["product_technical_spec_data"].length > 0) {
                this.setState({ technicalspecdata: this.props.product_data["product_technical_spec_data"][0] }, () => {
                    //this.props.change("producttechnicaldetail", JSON.stringify(this.props.product_data["product_technical_spec_data"][0]));
                });
            }
            if (this.props.product_data["brochure"] !== null && this.props.product_data["brochure"] !== "") {
                this.setState({ brochureurl: this.props.product_data["brochure"] }, () => {
                    this.props.change("company_brochure_url", this.props.product_data["brochure"]);
                });
            }
            if (this.props.product_data["product_images_data"] !== null && this.props.product_data["product_images_data"].length > 0) {
                this.setState({ product_image_data: this.props.product_data["product_images_data"] }, () => {
                    //this.props.change("updateddata", JSON.stringify(this.props.product_data["product_images_data"]));
                });
            }
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState }, () => {
            let value = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            this.props.change("product_description", value);
        });
    }
    opentechnicalform = (event) => {
        event.preventDefault();
        this.setState({ is_open_technical_spec_form: true, technicalspecname: "", technicalspecvalue: "" });
    }
    canceltechnicalform = (event) => {
        event.preventDefault();
        this.setState({ is_open_technical_spec_form: false, technicalspecname: "", technicalspecvalue: "" });
    }
    specnamechangehandler = (e) => {
        this.setState({
            technicalspecname: e.target.value
        });
        if (e.target.value !== "") {
            this.setState({
                is_error_name: false
            });
        }
        else {
            this.setState({
                is_error_name: true
            });
        }
    }
    specvaluechangehandler = (e) => {
        this.setState({
            technicalspecvalue: e.target.value
        });
        if (e.target.value !== "") {
            this.setState({
                is_error_value: false
            });
        }
        else {
            this.setState({
                is_error_value: true
            });
        }
    }
    technicalspecificationsavehandler = (event) => {
        event.preventDefault();
        if (this.state.technicalspecname !== "" && this.state.technicalspecvalue !== "") {
            if (this.state.is_edit_mode) {
                const index = this.state.technicalspecdata.findIndex((data) => {
                    return data.id === this.state.technicalspec_id
                })
                const singledata = Object.assign([], this.state.technicalspecdata[index]);
                singledata.spec_name = this.state.technicalspecname;
                singledata.spec_value = this.state.technicalspecvalue;

                const technicalspecdata = Object.assign([], this.state.technicalspecdata);
                technicalspecdata[index] = singledata;
                // //this.setState({ technicalspecdata: technicalspecdata, is_edit_mode: false, is_open_technical_spec_form: false, technicalspecname: "", technicalspecvalue: "" });
                // this.setState({ technicalspecdata: technicalspecdata, is_edit_mode: false, is_open_technical_spec_form: false, technicalspecname: "", technicalspecvalue: "" }, () => {
                //     this.props.change("producttechnicaldetail", JSON.stringify(technicalspecdata));
                // });
                var myObj1 = {}
                let myList1 = [];
                technicalspecdata.forEach(element => {
                    myObj1 = {
                        "spec_name": element.spec_name,
                        "spec_value": element.spec_value,
                        "product_id": this.props.product_id,
                    };
                    myList1.push(myObj1);
                });

                this.setState({ technicalspecdata: technicalspecdata, is_edit_mode: false, is_open_technical_spec_form: false, technicalspecname: "", technicalspecvalue: "" }, () => {
                    this.props.change("producttechnicaldetail", JSON.stringify(myList1));
                });
            }
            else {
                var myObj = {}
                myObj = {
                    "spec_name": this.state.technicalspecname,
                    "spec_value": this.state.technicalspecvalue,
                    "product_id": this.props.product_id,
                    "id": this.nextUniqueId(),
                };
                let myList = [];
                if (this.state.technicalspecdata !== null) {
                    myList = this.state.technicalspecdata;
                }
                myList.push(myObj);
                //this.setState({ technicalspecdata: myList, is_edit_mode: false, is_open_technical_spec_form: false, technicalspecname: "", technicalspecvalue: "" });
                this.setState({ technicalspecdata: myList, is_edit_mode: false, is_open_technical_spec_form: false, technicalspecname: "", technicalspecvalue: "" }, () => {
                    this.props.change("producttechnicaldetail", JSON.stringify(myList));
                });
            }
        }
        else {
            if (this.state.technicalspecname === "") {
                this.setState({ is_error_name: true });
            }
            if (this.state.technicalspecvalue === "") {
                this.setState({ is_error_value: true });
            }
        }
    }
    edittechnicalspec = (event, id, specname, specvalue) => {
        event.preventDefault();
        this.setState({ is_open_technical_spec_form: true }, () => {
            this.setState({ technicalspecname: specname, technicalspecvalue: specvalue, technicalspec_id: id, is_edit_mode: true });
        });
    }
    deletetechnicalspec = (event, index) => {
        event.preventDefault();
        // let filterdata = this.state.technicalspecdata.filter((post) => {
        //     return id !== post.id;
        // });
        // this.setState(state => {
        //     state.technicalspecdata = filterdata;
        //     return state;
        // });
        const technicalspecdata = Object.assign([], this.state.technicalspecdata);
        technicalspecdata.splice(index, 1);
        this.setState({ technicalspecdata: technicalspecdata });
        this.props.change("producttechnicaldetail", JSON.stringify(technicalspecdata));
        if (technicalspecdata === null || technicalspecdata.length === 0) {
            this.props.change("istechnicalspecalldelete", true);
        }
    }
    tagschangehandler = (values) => {
        this.props.change("product_category", values);
        this.setState({ selectedtag_edit_time_data: values })
    };
    onSuccessbrochureupload = (result) => {
        console.log(JSON.stringify(result));
        let url = result.filesUploaded[0]["url"];
        this.props.change("company_brochure_url", url);
        this.setState({ brochureurl: url });
    };
    onSuccessimageuploadprimaryproduct = (result) => {
        this.setState({ loading: true })
        var myObj = {}
        let url = result.filesUploaded[0]["url"];
        let thumbnailurl = getfilestackthumbnailurl(result.filesUploaded[0]["handle"])
        let largeimage = getfilestacklargeurl(result.filesUploaded[0]["handle"])
        myObj = {
            "product_pic_url": url,
            "product_pic_thumbnail_url": thumbnailurl,
            "product_pic_large_url": largeimage,
            "product_id": this.props.product_id,
            "id": shortid.generate(),
            "is_primary_image": true,
            "image_handle":result.filesUploaded[0]["handle"]
        };
        let myList = [];
        let myObj1 = {}
        if (this.state.product_image_data !== null) {
            this.state.product_image_data.forEach(element => {
                myObj1 = {
                    "product_pic_url": element.product_pic_url,
                    "product_pic_thumbnail_url": element.product_pic_thumbnail_url,
                    "product_pic_large_url": element.product_pic_large_url,
                    "product_id": this.props.product_id,
                    "id": element.id,
                    "is_primary_image": false,
                    "image_handle":result.filesUploaded[0]["handle"]
                };
                myList.push(myObj1);
            });
        }
        myList.push(myObj);
        this.setState({ product_image_data: myList, loading: false, product_pic_url: url }, () => {
            this.props.change("updateddata", JSON.stringify(myList));
            this.props.change("is_primary_image_url", url);
        });
    }
    onSuccessimageupload = (result) => {
        this.setState({ loading: true })
        var myObj = {}
        let url = result.filesUploaded[0]["url"];
        let thumbnailurl = getfilestackthumbnailurl(result.filesUploaded[0]["handle"])
        let largeimage = getfilestacklargeurl(result.filesUploaded[0]["handle"])
        myObj = {
            "product_pic_url": url,
            "product_pic_thumbnail_url": thumbnailurl,
            "product_pic_large_url": largeimage,
            "product_id": this.props.product_id,
            "id": shortid.generate(),
            "is_primary_image": false,
            "image_handle":result.filesUploaded[0]["handle"]
        };
        let myList = [];
        if (this.state.product_image_data !== null) {
            myList = this.state.product_image_data;
        }
        myList.push(myObj);
        this.setState({ product_image_data: myList, loading: false }, () => {
            this.props.change("updateddata", JSON.stringify(myList));

        });
    };
    deleteimagefromlisthandler = (event, index) => {
        this.setState({ loading: true })
        event.preventDefault();
        const imagedata = Object.assign([], this.state.product_image_data);
        imagedata.splice(index, 1);
        this.setState({ product_image_data: imagedata, loading: false });
        this.props.change("updateddata", JSON.stringify(imagedata));
        if (imagedata === null || imagedata.length === 0) {
            this.props.change("isproductimagealldelete", true);
        }
    }
    makeitprimaryimagehandler = (event, imageid, product_pic_url, index) => {
        event.preventDefault();
        this.setState({ loading: true })
        event.preventDefault();
        let productmainimageurl = product_pic_url
        if (!this.props.product_editable) {
            var myObj = {}
            let myList = [];
            this.state.product_image_data.forEach(element => {
                let primaryimage = false
                if (element.id === imageid) {
                    primaryimage = true
                    productmainimageurl = element.product_pic_url
                }
                else {
                    primaryimage = false
                }
                myObj = {
                    "product_pic_url": element.product_pic_url,
                    "product_pic_thumbnail_url": element.product_pic_thumbnail_url,
                    "product_pic_large_url": element.product_pic_large_url,
                    "product_id": this.props.product_id,
                    "id": element.id,
                    "is_primary_image": primaryimage,
                    "image_handle":element.image_handle                   
                };
                myList.push(myObj);
            });

            this.setState({ product_image_data: myList, loading: false, product_pic_url: productmainimageurl }, () => {
                this.props.change("updateddata", JSON.stringify(myList));
                this.props.change("is_primary_image_url", productmainimageurl);
            });
        }
        else {
            if (this.props.product_data["product_images_data"] !== null && this.props.product_data["product_images_data"].length > 0) {
                const dataval = {
                    product_id: this.props.product_id,
                    product_image_id: imageid
                };
                var returndata = update_exhibitor_product_primary_image(dataval)
                returndata.then(res => {
                    if (res !== undefined) {
                        if (res.data["error"] === undefined) {
                            this.setState({ product_image_data: res.data["product_images_data"], loading: false, product_pic_url: product_pic_url });
                            this.props.change("is_primary_image_url", product_pic_url);
                        }
                    }
                })
            }
            else {
                var myObj1 = {}
                let myList1 = [];
                let productprimaryimage = product_pic_url
                this.state.product_image_data.forEach(element => {
                    let primaryimage = false
                    if (element.id === imageid) {
                        primaryimage = true
                        productprimaryimage = element.product_pic_url
                    }
                    else {
                        primaryimage = false
                    }
                    myObj1 = {
                        "product_pic_url": element.product_pic_url,
                        "product_pic_thumbnail_url": element.product_pic_thumbnail_url,
                        "product_pic_large_url": element.product_pic_large_url,
                        "product_id": this.props.product_id,
                        "id": element.id,
                        "is_primary_image": primaryimage,
                        "image_handle":element.image_handle 
                    };
                    myList1.push(myObj1);
                });
                this.setState({ product_image_data: myList1, loading: false, product_pic_url: productprimaryimage }, () => {
                    this.props.change("updateddata", JSON.stringify(myList1));
                    this.props.change("is_primary_image_url", productprimaryimage);
                });
            }
        }
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let listdiv = null
        let list = [];
        list = this.state.technicalspecdata;
        if (list !== null && list.length > 0) {
            let detail = null;
            let intro_detail = [];
            list.map((item, i) => {
                detail = <tr key={item.id}>
                    <td>{item.spec_name}</td>
                    <td>{item.spec_value}</td>
                    <td>
                        <div className={classshared.buttoncontainer}>
                            <div className={classshared.mar_r_m}><Button btntype={ButtonType.btn_textlink_showmoreless_blue} buttontype="button" clicked={(event) => this.edittechnicalspec(event, item.id, item.spec_name, item.spec_value)}>{ButtonText.edit}</Button></div>
                            <div className={classshared.mar_r_m}><Button btntype={ButtonType.btn_textlink_showmoreless_pink} buttontype="button" clicked={(event) => this.deletetechnicalspec(event, i)}>{ButtonText.delete}</Button></div></div>
                    </td>
                </tr>
                return (
                    intro_detail.push(
                        <React.Fragment>{detail}</React.Fragment>
                    )
                )
            })
            listdiv = <div className={classshared.flex}>
                <table className={classshared.bucket} id="attributes">
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                        <th>Modify</th>
                    </tr>
                    {intro_detail}
                </table>
            </div>
        }
        let listproductimage = [];
        let divrenderproductimage = null;
        listproductimage = this.state.product_image_data
        if (listproductimage !== null) {
            let data = null;
            data = listproductimage.map((item, i) => {
                let islazyloading = false;
                if (i > 3) {
                    islazyloading = true;
                }
                let items = <Productimageaddeditslider key={item.id}
                    product_image={item.product_pic_url}
                    is_lazyloading={islazyloading}
                    deleteicon={ICONS.TRASH}
                    primaryicon={ICONS.PLUS}
                    id={item.id}
                    isChecked={this.state.isChecked}
                    is_primary={item.is_primary_image}
                    deleteimagefromlist={(event) => this.deleteimagefromlisthandler(event, i)}
                    makeitprimaryimage={(event) => this.makeitprimaryimagehandler(event, item.id, item.product_pic_url, i)}
                ></Productimageaddeditslider>
                return (
                    <div>{items}</div>
                )
            }
            )
            if (listproductimage.length > 3) {
                divrenderproductimage = <Swiper {...params}>
                    {data}
                </Swiper>
            }
            else {
                divrenderproductimage = <div className={classshared.flex}>{data}</div>
            }
        }
        else {
            divrenderproductimage = <img className={classshared.margin_t_b_25_width50.join(' ')} src={UploadIllustrationimage} alt=""></img>
        }
        let pdfviewrender = null;
        if (this.state.brochureurl !== null) {
            pdfviewrender =
                <div className={classshared.margin_top_bottom_10.join(' ')}>
                    <Button
                        btntype={ButtonType.btn_text_color_strongblue_font_1_medium}
                        clicked={(event) => { event.preventDefault(); window.open(this.state.brochureurl); }}>
                        <DownloadIcon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></DownloadIcon>{ButtonText.downloadbrochure}
                    </Button>
                </div>
        }


        let mainproductimageviver = null;
        if (this.state.product_pic_url !== null) {
            mainproductimageviver =
                <div className={classshared.margin_top_bottom_10.join(' ')}>
                    <Profilepic type={ProfilepicType.photos__image_large_streamline} profilepic_url={this.state.product_pic_url} altname=""></Profilepic>
                </div>
        }

        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
                {spinner}
               
                        <div className={classshared.popup__content_header.join(' ')}>
                            <div className={classshared.sidebar__user_stats.join(' ')}>
                                <div className={classshared.sidebar__user_details_left.join(' ')}>
                                    <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>Add Product</h2>
                                </div>
                                <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                </div>
                            </div>
                            <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>You can add your product details here.</h3>
                        </div>
                        <div className={classshared.popup__content_bottom}>
                            <Form onSubmit={handleSubmit}>
                                <div className={classshared.company_card}>
                                    <div className={classshared.work__card}>
                                        <div className={classshared.form_group}>
                                            <Field
                                                name={titleheading.productname.toLowerCase()}
                                                type="text"
                                                tabIndex={1}
                                                component={TextInput}
                                                className={classshared.input_box}
                                                placeholder={commonplaceholder.product_name}
                                                errorclass={classshared.formlabelerror}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.productname}</label>
                                        </div>
                                        <div className={classshared.margin_r_m}>
                                            <div className={classshared.form_group.join(' ')}>
                                                <Field
                                                    name={titleheading.productcategory.toLowerCase()}
                                                    component={Tagsautoinput}
                                                    tabIndex={2}
                                                    selectedvalues={this.state.selectedtag_edit_time_data}
                                                    tags={this.state.tagsdata}
                                                    handleChange={this.tagschangehandler}
                                                    className={classshared.input_box}
                                                    placeholder={commonplaceholder.product_category}
                                                />
                                                <Field
                                                    component={TextInput}
                                                    name="product_category"
                                                    type="hidden"
                                                    style={{ height: 0 }}
                                                    placeholder={commonplaceholder.product_name}
                                                    errorclass={classshared.formlabelerror}
                                                />
                                                <Field
                                                    component={TextInput}
                                                    name="product_description"
                                                    type="hidden"
                                                    value={this.state.productdescription}
                                                    style={{ height: 0 }}
                                                />
                                            </div></div>
                                        <div className={classshared.margin_r_m}>
                                            <div className={classshared.form_group.join(' ')}>
                                                <div className={classshared.flex.join(' ')}>
                                                    <span className={classshared.margin_r_m}>{this.props.currency_name}</span>
                                                    <Field
                                                        name={titleheading.price.toLowerCase()}
                                                        type="number"
                                                        tabIndex={3}
                                                        component={TextInput}
                                                        className={classshared.input_box_without_width}
                                                        placeholder={commonplaceholder.price}
                                                        errorclass={classshared.formlabelerror}
                                                    />
                                                </div>
                                                <label className={classshared.form_label.join(' ')}>{label_text.price}</label>
                                            </div></div>
                                    </div>
                                </div>
                                <div className={classshared.company_card}>
                                    <div className={classshared.work__card}>
                                        <div className={classshared.margin_b_l}><h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.productdescription}</h2></div>
                                        <Editor
                                            editorState={this.state.editorState}
                                            editorClassName={classshared.texteditor}
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                                        <label className={classshared.form_label.join(' ')}>{label_text.productdescription}</label>
                                    </div>
                                </div>
                                <div className={classshared.company_card}>
                                    <div className={classshared.work__card}>
                                        <div className={classshared.margin_b_l}>
                                            <div className={classshared.listheadertextclass.join(' ')}>
                                                <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                                    <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.technicalspecification}</h2>
                                                    <div className={classshared.flex}>
                                                        <Button
                                                            btntype={ButtonType.btn_text_color_strongblue_font_1_medium}
                                                            clicked={this.opentechnicalform} svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}
                                                            icon={ICONS.CIRCLEWITHPLUS}>{ButtonText.addattribute}</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.is_open_technical_spec_form
                                                ?
                                                (
                                                    <div className={classshared.company_card}>
                                                        <div className={classshared.simple_form}>
                                                            <div className={classshared.flex}>
                                                                <div className={classshared.margin_r_m}>
                                                                    <div className={classshared.form_group.join(' ')}>
                                                                        <input type="text"
                                                                            tabIndex={4}
                                                                            placeholder={commonplaceholder.specname}
                                                                            className={classshared.input_box}
                                                                            value={this.state.technicalspecname}
                                                                            onChange={this.specnamechangehandler}></input>
                                                                        {
                                                                            this.state.is_error_name
                                                                                ?
                                                                                (
                                                                                    <label className={classshared.formlabelerror}>{error_message.specname}</label>
                                                                                )
                                                                                :
                                                                                null
                                                                        }
                                                                        <label className={classshared.form_label.join(' ')}>{label_text.specname}</label>
                                                                    </div> </div>
                                                                <div className={classshared.form_group}>
                                                                    <input type="text"
                                                                        tabIndex={5}
                                                                        placeholder={commonplaceholder.specvalue}
                                                                        className={classshared.input_box}
                                                                        value={this.state.technicalspecvalue}
                                                                        onChange={this.specvaluechangehandler}></input>
                                                                    {
                                                                        this.state.is_error_value
                                                                            ?
                                                                            (
                                                                                <label className={classshared.formlabelerror}>{error_message.specvalue}</label>
                                                                            )
                                                                            :
                                                                            null
                                                                    }
                                                                    <label className={classshared.form_label.join(' ')}>{label_text.specvalue}</label>
                                                                </div>
                                                            </div>
                                                            <div className={classshared.form_group}>
                                                                <div className={classshared.buttoncontainer}>
                                                                    <div className={classshared.mar_r_m}>
                                                                        <Button
                                                                            btntype={ButtonType.btnsavecancel}
                                                                            buttontype="button" clicked={this.technicalspecificationsavehandler}>{ButtonText.save}
                                                                        </Button>
                                                                    </div>
                                                                    <div className={classshared.mar_r_m}>
                                                                        <Button btntype={ButtonType.btnsavecancel}
                                                                            buttontype="button"
                                                                            clicked={this.canceltechnicalform}>{ButtonText.cancel}
                                                                        </Button></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                null
                                        }
                                        {listdiv}
                                    </div>
                                </div>
                                <div className={classshared.company_card}>
                                    <div className={classshared.work__card}>
                                        <div className={classshared.margin_b_l}>
                                            <div className={classshared.listheadertextclass.join(' ')}>
                                                <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                                    <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.companybrochure}</h2>
                                                    <div className={classshared.flex}>
                                                        <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.BELL}></Icon>
                                                        <ImageUpload option={filestackoptionpdf} buttontype={FilestackType.uploadbrochure} onSuccessupload={this.onSuccessbrochureupload} onErrorupload={this.onErrorImageupload} />
                                                        <Field
                                                            component={TextInput}
                                                            name="company_brochure_url"
                                                            type="hidden"
                                                            value={this.state.productdescription}
                                                            style={{ height: 0 }}
                                                        />
                                                        <Field
                                                            component={TextInput}
                                                            name="is_primary_image_url"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />
                                                        <Field
                                                            component={TextInput}
                                                            name="updateddata"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />
                                                        <Field
                                                            component={TextInput}
                                                            name="isproductimagealldelete"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />
                                                        <Field
                                                            component={TextInput}
                                                            name="istechnicalspecalldelete"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />
                                                        <Field
                                                            component={TextInput}
                                                            name="producttechnicaldetail"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />
                                                        <Field
                                                            component={TextInput}
                                                            name="is_primary_image_bool"
                                                            type="hidden"
                                                            style={{ height: 0 }}
                                                        />

                                                    </div>
                                                </div>
                                                {pdfviewrender}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classshared.company_card}>
                                    <div className={classshared.work__card}>
                                        <div className={classshared.size1of1}>
                                            <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                                <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.mainproductimage}</h2>
                                                <div className={classshared.flex}>
                                                    <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.BELL}></Icon>
                                                    <ImageUpload option={filestackoptionimage} buttontype={FilestackType.uploadimages} onSuccessupload={this.onSuccessimageuploadprimaryproduct} onErrorupload={this.onErrorImageupload} />
                                                </div>
                                            </div>
                                            {mainproductimageviver}
                                        </div>
                                    </div>
                                </div>
                                <div className={classshared.company_card}>
                                    <div className={classshared.work__card}>
                                        <div className={classshared.size1of1}>
                                            <div className={classshared.flex_flex_justify_sb.join(' ')}>
                                                <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{label_text.productgallery}</h2>
                                                <div className={classshared.flex}>
                                                    <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.BELL}></Icon>
                                                    <ImageUpload option={filestackoptionimage} buttontype={FilestackType.uploadimages} onSuccessupload={this.onSuccessimageupload} onErrorupload={this.onErrorImageupload} />
                                                </div>
                                            </div>
                                            {divrenderproductimage}
                                        </div>
                                    </div>
                                </div>
                                <div className={classshared.form_group}><Button btntype={ButtonType.btn_purple_font_1_bold_text_15} buttontype="submit">{ButtonText.save}</Button></div>
                            </Form>
                        </div>
                  
            </React.Fragment >
        )
    }
}
productform = reduxForm({
    form: 'formproduct',
    validate,
})(productform);

export default productform;
//https://cdn.filestackcontent.com/S85YkRE1QZ2XYwGR3ZN9
//https://cdn.filestackcontent.com/veFGjDBuRpW8cWIUY9zA
//https://cdn.filestackcontent.com/f668G8iTFiCKpYgEQZYQ