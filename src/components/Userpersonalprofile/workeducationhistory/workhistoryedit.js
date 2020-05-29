import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { getallworkexpdetailpopup } from '../../../actions/userprofile/dataactions';
import { titleheading, ButtonType, ButtonText, ProfilepicType, ICONS, range, nodatatext_image_configuration, nodatatext_message, confirmdelete } from '../../../shared/utility'
import Button from '../../UI/Button/Button';
import Workhistoryedititems from './workhistoryedititems';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Workhistoryform from './workhistoryform';
import { userwokexpsaveedit } from '../../../actions/userprofile/dataactions'
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import DeleteConfirmation from '../../UI/Deleteconfirmation/deleteconfirmation'
import shortid from "shortid";

class workhistoryedit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allworkhistorydata: null,
            is_addworkdetail_form: false,
            company_logo_url: null,
            company_name: null,
            designation: null,
            year_from: null,
            month_from: null,
            year_to: null,
            month_to: null,
            work_id: null,
            toyear: null,
            fromyear: null,
            totaldatacount: 0,
            yearerror: false,
            delete_item_id: null
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.filldata();
    }
    filldata() {
        var data = getallworkexpdetailpopup()
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ totaldatacount: res.data.length })
                setTimeout(
                    function () {
                        this.setState({ allworkhistorydata: res.data });
                    }
                        .bind(this),
                    2000
                );
            }
        });
    }
    deleteitemconfirmhandler = (event, id) => {
        event.preventDefault();
        this.setState({ delete_item_id: id }, () => {
            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={this.deleteworkdetailhandler}/>
            //         );
            //     },
            // });
            confirmdelete(this.deleteworkdetailhandler);
        });
    }
    deleteworkdetailhandler = () => {
        const data = {
            id: this.state.delete_item_id
        };
        this.props.onworkexpdelete(data);
        let filterdata = this.state.allworkhistorydata.filter((post) => {
            return this.state.delete_item_id !== post.id;
        });
        this.setState(state => {
            state.allworkhistorydata = filterdata;
            return state;
        });
    }
    addworkdetailhandler = (event) => {
        event.preventDefault();
        this.setState({ is_addworkdetail_form: true })
    }
    cancelformhandler = (event) => {
        event.preventDefault();
        this.setState({ is_addworkdetail_form: false })
    }
    submit = (values) => {
        if (values.yearto !== "Present") {
            let year_from = parseInt(values.year, 10)
            let year_to = parseInt(values.yearto, 10)
            if (year_from > year_to) {
                this.setState({
                    yearerror: true
                })
                return;
            }
            else {
                this.setState({
                    yearerror: false
                })
            }
        }
        const dataval = {
            company_name: values.companyname,
            designation: values.designation,
            year_from: values.year,
            month_from: parseInt(values.month, 10) + 1,
            year_to: values.yearto,
            month_to: parseInt(values.monthto, 10) + 1,
            id: values.workexp_id,
            company_logo_url: values.imageurl,
            company_logo_url_preview: values.imageurlpreview === undefined ? null : values.imageurlpreview,
            present: values.present
        };
        var data = userwokexpsaveedit(dataval, null)
        data.then(res => {

            if (res.data["error"] === undefined) {
                this.setState({ is_addworkdetail_form: false }, () => {
                    // this.state.allworkhistorydata.push(res.data)
                    //     this.setState(this.state)
                    this.setState({ allworkhistorydata: [res.data, ...this.state.allworkhistorydata] })
                })
            }
        });
    }
    render() {
        let showsavebutton = null;
        let list = []
        list = this.state.allworkhistorydata;
        let workdetail = null;
        let addform = null;
        if (list !== null) {
            if (list.length > 0) {
                workdetail = list.map((item, i) => {
                    return (
                        <Workhistoryedititems key={item.id} company_logo_url={item.company_logo_url} company_logo_url_preview={item.company_logo_url_preview}
                            id={item.id}
                            type={ProfilepicType.user_nav__user_photo_medium}
                            company_name={item.company_name} year_from={item.year_from} fromyear={item.fromyear} toyear={item.toyear}
                            year_to={item.year_to} month_to={item.month_to} month_from={item.month_from}
                            designation_in_company={item.designation_in_company} designation={item.designation}
                            deleteworkhistoryhandler={(event) => this.deleteitemconfirmhandler(event, item.id)}
                        ></Workhistoryedititems>
                    )
                });
            }
            else {
                workdetail = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.alllistworkhistorypopup}
                    nodata_message={nodatatext_message.noworkhistory}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={false}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        else {
            if (this.state.totaldatacount > 0) {
                workdetail = range(0, this.state.totaldatacount - 1).map((i) => (
                    <Workhistoryedititems key={shortid.generate()}></Workhistoryedititems>
                ));
            }
            else {
                workdetail = <Workhistoryedititems key={shortid.generate()}></Workhistoryedititems>
            }
        }
        if (this.state.is_addworkdetail_form) {
            addform = <React.Fragment>
                <Workhistoryform onSubmit={this.submit}
                    company_name={this.state.company_name}
                    company_logo_url={this.state.company_logo_url}
                    company_logo_url_preview={this.state.company_logo_url_preview}
                    designation={this.state.designation}
                    year_from={this.state.year_from}
                    year_to={this.state.year_to}
                    month_to={this.state.month_to}
                    month_from={this.state.month_from}
                    work_id={this.state.id}
                    cancelform={this.cancelformhandler}
                    fromyear={this.state.fromyear}
                    toyear={this.state.toyear}
                    yearerror={this.state.yearerror}>
                </Workhistoryform>
            </React.Fragment>
        }
        else {
            showsavebutton = <Button btntype={ButtonType.btn_add_record} clicked={this.addworkdetailhandler} svgclass={classshared.icon_15_icon_dark_purple.join(' ')} icon={ICONS.PLUS}>{ButtonText.addworkplace}</Button>
        }
        return (
            <React.Fragment>
                <div className={classshared.popup__content_header}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.editworkhistory}</h2>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                        </div>
                    </div>
                    <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>{titleheading.work_detail}</h3>
                </div>
                <div className={classshared.popup__content_bottom}>
                    {/* <Button btntype={ButtonType.btn_add_record} clicked={this.addworkdetailhandler} svgclass={classshared.icon_20_icon_dark_purple_margin_r_10.join(' ')} icon={ICONS.PLUS}>{ButtonText.addworkplace}</Button> */}
                    {showsavebutton}
                </div>
                {addform}
                {workdetail}
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onworkexpdelete: (data) => dispatch(actions.deleteworkexpdetail(data)),
    };
};
export default connect(null, mapDispatchToProps)(workhistoryedit);