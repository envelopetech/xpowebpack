import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { getalleducationdetailpopup, usereducationdetailsaveedit } from '../../../actions/userprofile/dataactions';
import { titleheading, ButtonType, ButtonText, ICONS, range, nodatatext_image_configuration, nodatatext_message, confirmdelete } from '../../../shared/utility'
import Button from '../../UI/Button/Button';
import Educationdetailedititems from './educationdetailedititems';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Educationdetailform from './educationdetailform';
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import shortid from "shortid";
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import DeleteConfirmation from '../../UI/Deleteconfirmation/deleteconfirmation'

class educationdetailedit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alleducationdata: null,
            is_addeducationdetail_form: false,
            college_logo_url: null,
            college_logo_url_preview: null,
            college_name: null,
            name: null,
            year_from: null,
            year_to: null,
            education_id: null,
            totaldatacount: 0,
            yearerror: false,
            delete_item_id: null
        }
    }
    componentDidMount() {
        //alert(yeardifference(2008, 2006));
        window.scrollTo(0, 0);
        this.filldata();
    }
    filldata() {
        var data = getalleducationdetailpopup()
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ totaldatacount: res.data.length })
                setTimeout(
                    function () {
                        this.setState({ alleducationdata: res.data });
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
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={this.deleteeducationdetailhandler}/>
            //         );
            //     },
            // });
            confirmdelete(this.deleteeducationdetailhandler);
        });
    }
    deleteeducationdetailhandler = () => {
        const data = {
            id: this.state.delete_item_id
        };
        this.props.oneducationdetaildelete(data);
        let filterdata = this.state.alleducationdata.filter((post) => {
            return this.state.delete_item_id !== post.id;
        });
        this.setState(state => {
            state.alleducationdata = filterdata;
            return state;
        });
    }
    addeducationdetailhandler = (event) => {
        event.preventDefault();
        this.setState({ is_addeducationdetail_form: true })
    }
    cancelformhandler = (event) => {
        event.preventDefault();
        this.setState({ is_addeducationdetail_form: false })
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
            name: values.degree,
            college_name: values.collegename,
            year_from: values.year,
            year_to: values.yearto,
            id: values.education_id,
            college_logo_url: values.imageurl,
            college_logo_url_preview: values.imageurlpreview
        };
        var data = usereducationdetailsaveedit(dataval, null)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ is_addeducationdetail_form: false }, () => {
                    this.setState({ alleducationdata: [res.data, ...this.state.alleducationdata] })
                })
            }
        });
    }
    render() {
        let showsavebutton = null;
        let list = []
        list = this.state.alleducationdata;
        let educationdetail = null;
        let addform = null;
        if (list !== null) {
            if (list.length > 0) {
                educationdetail = list.map((item, i) => {
                    return (
                        <Educationdetailedititems key={item.id} college_logo_url={item.college_logo_url} college_logo_url_preview={item.college_logo_url_preview}
                            id={item.id}
                            name={item.name} college_name={item.college_name} year_from={item.year_from} year_to={item.year_to}
                            deleteeducationdetailhandler={(event) => this.deleteitemconfirmhandler(event, item.id)}></Educationdetailedititems>
                    )
                });
            }
            else {
                educationdetail = <Nodatamessage imagesource={nodataimage}
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
                educationdetail = range(0, this.state.totaldatacount - 1).map((i) => (
                    <Educationdetailedititems key={shortid.generate()}></Educationdetailedititems>
                ));
            }
            else {
                educationdetail = <Educationdetailedititems></Educationdetailedititems>
            }
        }
        if (this.state.is_addeducationdetail_form) {
            addform = <React.Fragment>
                <Educationdetailform onSubmit={this.submit}
                    name={this.state.name}
                    college_name={this.state.college_name}
                    company_logo_url_preview={this.state.company_logo_url_preview}
                    year_from={this.state.year_from}
                    year_to={this.state.year_to}
                    college_logo_url={this.state.college_logo_url}
                    college_logo_url_preview={this.state.college_logo_url_preview}
                    education_id={this.state.education_id}
                    cancelform={this.cancelformhandler}
                    yearerror={this.state.yearerror}>
                </Educationdetailform>
            </React.Fragment>
        }
        else {
            showsavebutton = <Button btntype={ButtonType.btn_add_record} clicked={this.addeducationdetailhandler} svgclass={classshared.icon_15_icon_dark_purple.join(' ')} icon={ICONS.PLUS}>{ButtonText.addeducation}</Button>
        }
        return (
            <React.Fragment>
                <div className={classshared.popup__content_header}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.education}</h2>
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
                {educationdetail}
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        oneducationdetaildelete: (data) => dispatch(actions.deleteeducationdetail(data)),
    };
};
export default connect(null, mapDispatchToProps)(educationdetailedit);