import React, { Component } from 'react';
import * as classshared from './classconst';
import Button from '../../UI/Button/Button';
import { SingleSelect } from "react-select-material-ui";
import 'react-responsive-modal/styles.css';
import { getexhibitorprofiledropdowndata, update_exhibitor_additional_info } from '../../../actions/exhibitor/dataactions'
import { label_text } from '../../../shared/utility';
import MultiSelect from '../../UI/Multiselect/Multiselect';


class additionalinfo extends Component {
    constructor(props) {
        super(props)          
        this.state = {
            industry: props.exhibitordata.industryname !== null && props.exhibitordata.industryname !== undefined   ? props.exhibitordata.industryname.length > 0 ? props.exhibitordata.industryname : "" : "",
            turnovername: props.exhibitordata.turnovername !== null && props.exhibitordata.turnovername !== undefined  ? props.exhibitordata.turnovername.length > 0 ? props.exhibitordata.turnovername[0]["label"] : "" : "",
            naturename: props.exhibitordata.naturename,
            workforcename: props.exhibitordata.workforcename !== null && props.exhibitordata.workforcename !== undefined ? props.exhibitordata.workforcename.length > 0 ? props.exhibitordata.workforcename[0]["label"] : "" : "",
            ceoname: props.exhibitordata.ceoname,
            address1: props.exhibitordata.address1,
            is_show_about_edit_fields: false,
            ceofirstname: props.exhibitordata.company_ceo_first_name,
            ceolastname: props.exhibitordata.company_ceo_last_name,
            nature_id: props.exhibitordata.nature_id,
            turnover_id: props.exhibitordata.turnover_id,
            work_force_id: props.exhibitordata.work_force_id,
            naturedata: null,
            turnoverdata: null,
            workforcedata: null,
            user_industry: props.exhibitordata.industry,
            industrydata: null
        }
    }
    componentDidMount() {
        var data = getexhibitorprofiledropdowndata(this.state.user_industry)
        data.then(([industrydatareturn, get_nature_allreturn, get_turnover_allreturn, get_workforce_allreturn]) =>
            this.setState({
                industrydata: industrydatareturn.data,
                naturedata: get_nature_allreturn.data,
                turnoverdata: get_turnover_allreturn.data,
                workforcedata: get_workforce_allreturn.data
            })
        )
    }
    editfieldsshowhandler = (event) => {
        event.preventDefault();
        this.setState({ is_show_about_edit_fields: true });
    }
    closeeditmodehandler = (event) => {
        event.preventDefault();
        this.setState({ is_show_about_edit_fields: false });
    }

    handlenaturechange = (value) => {
        //this.setState({nature_id:value})
        let filterdata = this.state.naturedata.filter((post) => {
            return value === post.value;
        });
        this.setState({ nature_id: value, naturename: filterdata[0].label })
    }
    handleturnoverchange = (value) => {
        //this.setState({turnover_id:value})
        let filterdata = this.state.turnoverdata.filter((post) => {
            return value === post.value;
        });
        this.setState({ turnover_id: value, turnovername: filterdata[0].label })
    }
    handleworkforcechange = (value) => {
        //this.setState({work_force_id:value})
        let filterdata = this.state.workforcedata.filter((post) => {
            return value === post.value;
        });
        this.setState({ work_force_id: value, workforcename: filterdata[0].label })
    }
    firstnamechange = (event) => {
        event.preventDefault();
        this.setState({
            ceofirstname: event.target.value,
            ceoname: event.target.value + " " + this.state.ceolastname
        });
    }
    lastnamechange = (event) => {
        event.preventDefault();
        this.setState({ ceolastname: event.target.value, ceoname: this.state.ceofirstname + " " + event.target.value });
    }
    addresschange = (event) => {
        event.preventDefault();
        this.setState({ address1: event.target.value });
    }
    onmultiselectchange = (currentNode, selectedNodes) => {
        let arr = ''
        let labelname = ''
        if (selectedNodes.length > 0) {
            selectedNodes.forEach(node => {
                if (arr === '') {
                    arr = node.value
                }
                else {
                    arr = arr + "," + node.value
                }
                if (labelname === '') {
                    labelname = node.label
                }
                else {
                    labelname = labelname + "," + node.label
                }
            });
            this.setState({ user_industry: arr, industry: labelname });
        }
        else {
            this.setState({ user_industry: null, industry: null });
        }
        // if(currentNode.checked)
        // {
        //     let r = this.state.user_industry
        //     let val= r +","+currentNode.value

        //     let industrylabel = this.state.industry
        //     let industrylabelval= industrylabel +","+currentNode.label
        //     this.setState({
        //         user_industry: val,
        //         industry:industrylabelval
        //       })
        // }   
        // else{              
        //     var array = this.state.user_industry.toString(); // make a separate copy of the array
        //     var strArray = array.split(',');
        //     for (var i = 0; i < strArray.length; i++) {
        //         if (strArray[i].toString() === currentNode.value.toString()) {
        //             strArray.splice(i, 1);
        //         }
        //     }            
        //     var array1 = this.state.industry.toString(); // make a separate copy of the array            
        //     var strArray1 = array1.split(',');
        //     for (var j = 0; j < strArray1.length; j++) {
        //         var t = strArray1[j].toString().trim()
        //         var k = currentNode.label.trim()
        //         if (t === k) {
        //             strArray1.splice(j, 1);
        //         }
        //     }
        //     this.setState({user_industry: strArray, industry:array1});
        // }            
    }

    saveexhibitoradditioninfo = (event) => {
        event.preventDefault();
        const dataval = {
            address1: this.state.address1,
            nature_id: this.state.nature_id,
            turnover_id: this.state.turnover_id,
            work_force_id: this.state.work_force_id,
            company_ceo_first_name: this.state.ceofirstname,
            company_ceo_last_name: this.state.ceolastname,
            industry: this.state.user_industry
        };
        var data = update_exhibitor_additional_info(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ is_show_about_edit_fields: false }, () => {
                })
            }
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.is_editmode === false) {
            return ({ is_show_about_edit_fields: false }) // <- this is setState equivalent
        }
        else
        {
            return null;
        }
    }
    render() {

        let editdiv = null;
        if (this.props.is_editmode)//if(this.props.otheruserid ===null || this.props.otheruserid ===undefined)
        {
            if (this.state.is_show_about_edit_fields) {
                editdiv = <div className={classshared.buttoncontainer}>
                    <div className={classshared.mar_r_m}><Button btntype={this.props.edit_mode_button_profile} buttontype="button" clicked={this.saveexhibitoradditioninfo} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={this.props.saveicon}></Button></div>
                    <div className={classshared.mar_r_m}><Button btntype={this.props.edit_mode_button_profile} buttontype="button" clicked={this.closeeditmodehandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={this.props.crossicon}></Button></div>
                </div>
            }
            else {
                editdiv = <div className={classshared.margin_t_b_10.join(' ')}>
                    <Button btntype={this.props.edit_mode_button_profile} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={this.props.icon} clicked={this.editfieldsshowhandler}>
                    </Button>
                </div>
            }
        }
        return (
            <React.Fragment>
                <div className={classshared.size1of3.join(' ')}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <div className={classshared.text_12_uppercase.join(' ')}>
                                Additional Information
                            </div>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            {editdiv}
                        </div>
                    </div>

                    <div className={classshared.background_card}>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>Industry</div>
                            {
                                this.state.is_show_about_edit_fields
                                    ?
                                    (
                                        <React.Fragment>
                                            <MultiSelect data={this.state.industrydata} onChange={this.onmultiselectchange} customclass={classshared.dropdown} />
                                        </React.Fragment>
                                    ) :
                                    (
                                        <React.Fragment><div className={classshared.font_2_regular_text_dark.join(' ')}>{this.state.industry}</div></React.Fragment>
                                    )
                            }
                        </div>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>Nature</div>
                            {
                                this.state.is_show_about_edit_fields
                                    ?
                                    (
                                        <React.Fragment>
                                            <SingleSelect value={this.state.nature_id} placeholder="Select a nature" options={this.state.naturedata} onChange={this.handlenaturechange} />
                                        </React.Fragment>
                                    ) :
                                    (
                                        <React.Fragment><div className={classshared.font_2_regular_text_dark.join(' ')}>{this.state.naturename}</div></React.Fragment>
                                    )
                            }
                        </div>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>Products</div>
                            <div className={classshared.font_2_regular_text_dark.join(' ')}>Soft Drinks, Juices, Mineral Water</div>
                        </div>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>Turnover</div>
                            {
                                this.state.is_show_about_edit_fields
                                    ?
                                    (
                                        <React.Fragment>
                                            <SingleSelect value={this.state.turnover_id} placeholder="Select turnover" options={this.state.turnoverdata} onChange={this.handleturnoverchange} />
                                        </React.Fragment>
                                    ) :
                                    (
                                        <React.Fragment><div className={classshared.font_2_regular_text_dark.join(' ')}>{this.state.turnovername} {label_text.currencyinr}</div></React.Fragment>
                                    )
                            }
                        </div>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>CEO</div>
                            {
                                this.state.is_show_about_edit_fields
                                    ?
                                    (
                                        <React.Fragment>
                                            <div className={classshared.buttoncontainer}>
                                                <input type="text"
                                                    className={classshared.input_box_edit_fields.join(' ')}
                                                    required
                                                    value={this.state.ceofirstname}
                                                    onChange={this.firstnamechange}
                                                />
                                                <div className={classshared.mar_r_m}></div><input type="text"
                                                    className={classshared.input_box_edit_fields.join(' ')}
                                                    required
                                                    value={this.state.ceolastname}
                                                    onChange={this.lastnamechange}
                                                /> </div>
                                        </React.Fragment>
                                    ) :
                                    (
                                        <React.Fragment><div className={classshared.font_2_regular_text_dark.join(' ')}>{this.state.ceoname}</div></React.Fragment>
                                    )
                            }
                        </div>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>Work-force</div>
                            {
                                this.state.is_show_about_edit_fields
                                    ?
                                    (
                                        <React.Fragment>
                                            <SingleSelect value={this.state.work_force_id} placeholder="Select work-force" options={this.state.workforcedata} onChange={this.handleworkforcechange} />
                                        </React.Fragment>
                                    ) :
                                    (
                                        <React.Fragment><div className={classshared.font_2_regular_text_dark.join(' ')}>{this.state.workforcename} {label_text.employees}</div></React.Fragment>
                                    )
                            }
                        </div>
                        <div className={classshared.margin_t_m_margin_b_m.join(' ')}>
                            <div className={classshared.text_11_uppercase_letter_spacing.join(' ')}>Head Office</div>
                            {
                                this.state.is_show_about_edit_fields
                                    ?
                                    (
                                        <React.Fragment>
                                            <textarea type="text"
                                                className={classshared.input_box_edit_fields.join(' ')}
                                                required rows="5"
                                                value={this.state.address1}
                                                cols="100" onChange={this.addresschange} />
                                        </React.Fragment>
                                    ) :
                                    (
                                        <React.Fragment><div className={classshared.font_2_regular_text_dark.join(' ')}>{this.state.address1}</div></React.Fragment>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default additionalinfo;