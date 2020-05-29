import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { getworkexpbyid } from '../../../actions/userprofile/dataactions';
import Workhistoryform from './workhistoryform';
import { userwokexpsaveedit } from '../../../actions/userprofile/dataactions'
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
//import defaultimage from '../../../assets/images/default_avatar.png';
import Profilepic from '../../UI/profilepic/profilepic';
import { ICONS, ButtonType, ButtonText } from '../../../shared/utility';
import Skeleton from 'react-loading-skeleton';



class workhistoryedititems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_editform_show: false,
            edidata: null,
            company_logo_url: props.company_logo_url,
            company_name: props.company_name,
            designation: props.designation,
            year_from: props.year_from,
            month_from: parseInt(props.month_from, 10) - 1,//props.month_from,
            year_to: props.year_to,
            month_to: props.month_to == null ? null : parseInt(props.month_to, 10) - 1,
            id: props.id,
            fromyear: props.fromyear,
            toyear: props.toyear,
            designation_in_company: props.designation_in_company,
            company_logo_url_preview: props.company_logo_url_preview,
            showMenu: false,
            yearerror: false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    cancelformhandler = (event) => {
        event.preventDefault();
        this.setState({ is_editform_show: false })

    }
    editworkdetailhandler = (event, id) => {
        window.scrollTo(0, 0);
        event.preventDefault();
        this.setState({ is_editform_show: true, showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            var data = getworkexpbyid(id)
            data.then(res => {
                if (res !== undefined) {
                    // this.setState({company_logo_url: res.data["company_logo_url"],
                    // company_logo_url_preview:res.data["company_logo_url_preview"],
                    // company_name:res.data["company_name"],
                    // designation:res.data["designation"], 
                    // year_from: res.data["year_from"], 
                    // year_to:res.data["year_to"],
                    // month_to:res.data["month_to"],
                    // month_from:res.data["month_from"],                   
                    // id:res.data["id"]
                    //})
                }
            });
        });
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
            company_logo_url_preview: values.imageurlpreview
        };
        var data = userwokexpsaveedit(dataval, values.workexp_id)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({
                    is_editform_show: false,
                    company_name: res.data["company_name"],
                    designation: res.data["designation"],
                    year_from: res.data["year_from"],
                    month_from: res.data["month_from"],
                    year_to: res.data["year_to"],
                    month_to: res.data["month_to"],
                    id: res.data["id"],
                    company_logo_url: res.data["company_logo_url"],
                    company_logo_url_preview: res.data["company_logo_url_preview"],
                    fromyear: res.data["fromyear"],
                    toyear: res.data["toyear"],
                    designation_in_company: res.data["designation_in_company"]
                })
            }
        });
    }
    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        event.preventDefault();
        //if (!this.dropdownMenu.contains(event.target)) {          
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
        //}
    }
    render() {
        let buttondivhideshowskeleton = null;

        if (this.state.designation_in_company === null || this.state.designation_in_company === undefined) {
            buttondivhideshowskeleton = <Skeleton />
        }
        else {
            buttondivhideshowskeleton = <div><Button islisting={true} btntype={ButtonType.btnlistselect} clicked={this.showMenu} svgclass={classshared.icon_20_icon_grey_padding_t_sm.join(' ')} icon={ICONS.SELECTARROW}>{ButtonText.select}</Button>
                {
                    this.state.showMenu
                        ? (
                            <div
                                className={classshared.list_dropdown_content}
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <Button btntype={ButtonType.btnlistdeleteedit} clicked={(event) => this.editworkdetailhandler(event, this.state.id)} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}>{ButtonText.edit}</Button>
                                <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.props.deleteworkhistoryhandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.TRASH}>{ButtonText.delete}</Button>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        }

        let editform = null;
        if (this.state.is_editform_show) {
            if (this.state.company_name !== null) {
                editform =
                    <Workhistoryform onSubmit={this.submit} company_name={this.state.company_name}
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
                        yearerror={this.state.yearerror} />
            }
        }
        return (
            <div className={classshared.work__card}>
                <div className={classshared.work__card_top}>
                    <Profilepic profilepic_url={this.state.company_logo_url} type={this.props.type} altname=""></Profilepic>
                    <div className={classshared.work__card_content}>
                        <div className={classshared.listingtext_margin_r_sm.join(' ')}>{this.state.designation_in_company || <Skeleton />}</div>
                        <div className={classshared.listingtext.join(' ')}>{this.state.fromyear || <Skeleton />}-{this.state.toyear || <Skeleton />}</div>
                    </div>
                    <div className={classshared.list_dropdown}>
                        {buttondivhideshowskeleton}
                    </div>
                </div>
                {editform}
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onuserwokexpsaveedit: (data, id) => dispatch(actions.userwokexpsaveedit(data, id)),
    };
};
export default connect(null, mapDispatchToProps)(workhistoryedititems);