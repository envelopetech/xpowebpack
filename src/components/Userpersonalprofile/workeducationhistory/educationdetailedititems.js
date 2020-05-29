import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { geteducationdetailbyid, usereducationdetailsaveedit } from '../../../actions/userprofile/dataactions';
import Educationdetailform from './educationdetailform';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
import Profilepic from '../../UI/profilepic/profilepic';
import { ICONS, ButtonType, ButtonText } from '../../../shared/utility';
import Skeleton from 'react-loading-skeleton';


class educationdetailedititems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_editform_show: false,
            edidata: null,
            college_logo_url: props.college_logo_url,
            name: props.name,
            college_name: props.college_name,
            year_from: props.year_from,
            year_to: props.year_to,
            id: props.id,
            college_logo_url_preview: props.college_logo_url_preview,
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
    editeducationdetailhandler = (event, id) => {
        window.scrollTo(0, 0);
        event.preventDefault();
        this.setState({ is_editform_show: true, showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            var data = geteducationdetailbyid(id)
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
            name: values.degree,
            college_name: values.collegename,
            year_from: values.year,
            year_to: values.yearto,
            id: values.education_id,
            college_logo_url: values.imageurl,
            college_logo_url_preview: values.imageurlpreview
        };
        var data = usereducationdetailsaveedit(dataval, values.education_id)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({
                    is_editform_show: false,
                    name: res.data["name"],
                    college_name: res.data["college_name"],
                    year_from: res.data["year_from"],
                    year_to: res.data["year_to"],
                    id: res.data["id"],
                    college_logo_url: res.data["college_logo_url"],
                    college_logo_url_preview: res.data["college_logo_url_preview"],
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
        if (this.state.name === null || this.state.name === undefined) {
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
                                <Button btntype={ButtonType.btnlistdeleteedit} clicked={(event) => this.editeducationdetailhandler(event, this.state.id)} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}>{ButtonText.edit}</Button>
                                <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.props.deleteeducationdetailhandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.TRASH}>{ButtonText.delete}</Button>
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
            if (this.state.college_name !== null) {
                editform =
                    <Educationdetailform onSubmit={this.submit} name={this.state.name}
                        college_name={this.state.college_name}
                        year_from={this.state.year_from}
                        year_to={this.state.year_to}
                        college_logo_url={this.state.college_logo_url}
                        college_logo_url_preview={this.state.college_logo_url_preview}
                        education_id={this.state.id}
                        cancelform={this.cancelformhandler}
                        yearerror={this.state.yearerror} />
            }
        }

        return (
            <div className={classshared.work__card}>
                <div className={classshared.work__card_top}>
                    <Profilepic profilepic_url={this.state.college_logo_url} type={this.props.type} altname=""></Profilepic>
                    <div className={classshared.work__card_content}>
                        <div className={classshared.listingtext_margin_r_sm.join(' ')}>{this.state.name || <Skeleton />} - {this.state.college_name || <Skeleton />}</div>
                        <div className={classshared.listingtext.join(' ')}>{this.state.year_from || <Skeleton />}-{this.state.year_to || <Skeleton />}</div>
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
export default connect(null, mapDispatchToProps)(educationdetailedititems);