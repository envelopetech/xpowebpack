import React, { Component } from 'react';
import * as classshared from './classconst';
import { get_exhibitor_introduction_detail_by_exhibitorid } from '../../../actions/exhibitor/dataactions';
//import { range } from '../../../shared/utility'
import 'react-responsive-modal/styles.css';
import Introductionitems from './introductionitems'
import shortid from "shortid";
import Spinner from '../../UI/Spinner/Spinner';

class introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            introdata: null,
            totalcount: 0,
            is_show_about_edit_fields: false,
            loading:false
        }
    }
    componentDidMount() {
        this.setState({loading:true})
        if (this.props.exhibitor_id !== undefined) {
            var data = get_exhibitor_introduction_detail_by_exhibitorid(this.props.exhibitor_id)
            data.then(res => {
                if (res !== undefined) {
                    if (res.data["error"] === undefined) {
                        this.setState({ introdata: res.data[0], totalcount: res.data[1], loading:false });
                    }
                }
            });
        }
    }
    render() {
        let spinnerform = null
        if (this.state.loading) {
            spinnerform = <Spinner />
        }
        let skeleton = null
        skeleton = <Introductionitems
            key={shortid.generate()}
            is_editmode={this.props.is_editmode}
            edit_mode_button_profile={this.props.edit_mode_button_profile}
            icon={this.props.icon}
            saveicon={this.props.saveicon}
            crossicon={this.props.crossicon}
            otherusername={this.props.otherusername}
            otheruserid={this.props.otheruserid}
            exhibitor_id={this.props.exhibitor_id}></Introductionitems>

        let intro_detail = [];
        if (this.state.introdata !== null) {
            if (this.state.introdata.length > 0) {
                this.state.introdata.map((item, i) => {
                    let detail =
                        <Introductionitems
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            detail_description={item.detail_description}
                            otherusername={this.props.otherusername}
                            otheruserid={this.props.otheruserid}
                            //exhibitor_id={item.exhibitor_id}
                            is_editmode={this.props.is_editmode}
                            edit_mode_button_profile={this.props.edit_mode_button_profile}
                            icon={this.props.icon}
                            saveicon={this.props.saveicon}
                            crossicon={this.props.crossicon}
                            exhibitor_id={this.props.exhibitor_id}
                        ></Introductionitems>
                    return (
                        intro_detail.push(
                            <React.Fragment key={item.id}>{detail}</React.Fragment>
                        )
                    )
                });
            }
            else {
                // if(this.state.totalcount > 0)
                // {
                intro_detail = skeleton
                // }          
            }
        }
        //#region If data null than skeleton display
        else {
            intro_detail = skeleton 
        }
        //#endregion
        return (
            <React.Fragment>
                 {spinnerform}
                <div className={classshared.flex_column.join(' ')}>
                    {intro_detail}
                </div>
            </React.Fragment>
        )
    }
}
export default introduction;