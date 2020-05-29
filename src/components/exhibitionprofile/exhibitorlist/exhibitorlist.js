import React, { Component } from 'react';
import * as classshared from './classconst';
import { get_exhibitor_by_event_id } from '../../../actions/events/dataactions';
import { ButtonType, label_text, constantvalues, ProfilepicType, searchplaceholder, searchpagetype, range, ICONS } from '../../../shared/utility'
import Button from '../../UI/Button/Button';
import 'react-responsive-modal/styles.css';

import Exhibitorlistitem from './exhibitorlistitem'
import Search from '../../UI/search/search'


class exhibitorlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exhibitordata: null,
            moreexhibitordata: null,
            totalexhibitorcount: 0,
            all_records: false,
            is_show_allrecords: false,
            totalshowlesscount: 0,
            totalshowmorecount: 0,
            loading: false,
            showmessage: true
        }
    }
    filldata(all_records) {

        var data = get_exhibitor_by_event_id(all_records, this.props.event_id)
        data.then(res => {
            if (res !== undefined) {
                if (res.data[0]["error"] === undefined && res.data[0].length > 0) {
                    if (res.data[1] !== undefined) {
                        this.setState({ totalexhibitorcount: res.data[1] }, () => {
                            if (this.state.totalexhibitorcount == 0) {
                                //this.setState({ showmessage: true })
                            }
                        });
                    }
                    if (all_records) {
                        this.setState({ totalshowmorecount: res.data[0].length, moreexhibitordata: res.data[0], loading: false });
                    }
                    else {
                        this.setState({ totalshowlesscount: res.data[0].length, exhibitordata: res.data[0], loading: false });
                    }
                }
                // else {
                //     this.setState({ loading: false, showmessage: true });
                // }
            }
        });
    }
    componentDidMount() {
        if (!this.props.withoutloggedin) {
            this.setState({ loading: true })
            this.filldata(this.state.all_records);
        }
    }
    showmorerecord = (event) => {
        event.preventDefault();
        this.setState({
            is_show_allrecords: true,
        })

        this.setState({ all_records: true }, () => {
            this.filldata(this.state.all_records);
        });
    }
    showlessrecord = (event) => {
        event.preventDefault();
        this.setState({
            is_show_allrecords: false,
        })
    }
    render() {

        let divtest = null
        if (this.state.showmessage) {
            divtest = <div className={classshared.margin_top__lv4}>
                <p className={classshared.paragraphletter}>We are still enrolling the exhibitors. Please visit shortly once the registration window ends to view the exhibitor list</p>
            </div>
        }
        let butonshowmoreless = null;
        if (this.state.totalexhibitorcount !== null) {
            if (this.state.totalexhibitorcount > constantvalues.eventexhibitordata) {
                let allotherrecords = parseInt(this.state.totalexhibitorcount, 10)
                if (this.state.is_show_allrecords) {
                    butonshowmoreless = <div className={classshared.showalllescenterdivtieups.join(' ')}> <Button btntype={ButtonType.showmorelesslink}
                        clicked={this.showlessrecord}>{label_text.showlessrecord} {constantvalues.eventexhibitordata} {label_text.records} <i className={classshared.uparrow.join(' ')}></i></Button></div>
                }
                else {
                    butonshowmoreless = <div className={classshared.showalllescenterdivtieups.join(' ')}> <Button btntype={ButtonType.showmorelesslink}
                        clicked={this.showmorerecord}>{label_text.showallrecords} {allotherrecords} {label_text.records} <i className={classshared.downarrow.join(' ')}></i></Button></div>
                }
            }
        }
        let tieupsdeetail = [];
        let finalist = null;
        finalist = this.state.exhibitordata;
        if (finalist !== null) {
            if (finalist.length > 0) {
                finalist.map((item, i) => {
                    let detail =
                        <Exhibitorlistitem id={item.id}
                            iconname={ICONS.LNRSHOP}
                            company_logo_url={item.company_logo_url}
                            type={ProfilepicType.square_image_large}
                            name={item.name}
                        ></Exhibitorlistitem>
                    return (
                        tieupsdeetail.push(
                            <React.Fragment>{detail}</React.Fragment>
                        )
                    )
                });
            }
        }
        //#region If data null than skeleton display
        else {
            if (this.state.totalshowlesscount > 0) {
                tieupsdeetail = range(0, this.state.totalshowlesscount - 1).map((i) => (
                    <Exhibitorlistitem type={ProfilepicType.square_image_large} iconname={ICONS.LNRSHOP}></Exhibitorlistitem>
                ));
            }
        }
        //#endregion


        let tieupsdeetailmore = [];
        let morelist = null;
        if (this.state.is_show_allrecords) {
            morelist = this.state.moreexhibitordata
            if (morelist !== null) {
                if (morelist.length > 0) {
                    morelist.map((item, i) => {
                        let detail =
                            <Exhibitorlistitem id={item.id}
                                iconname={ICONS.LNRSHOP}
                                company_logo_url={item.company_logo_url}
                                type={ProfilepicType.square_image_large}
                                name={item.name}
                            ></Exhibitorlistitem>

                        return (
                            tieupsdeetailmore.push(
                                <React.Fragment>{detail}</React.Fragment>
                            )
                        )

                    });
                }
            }
            //#region If data null than skeleton display
            else {
                if (this.state.totalshowmorecount > 0) {
                    tieupsdeetailmore = range(0, this.state.totalshowmorecount - 1).map((i) => (
                        <Exhibitorlistitem type={ProfilepicType.square_image_large} iconname={ICONS.LNRSHOP}></Exhibitorlistitem>
                    ));
                }
            }
            //#endregion

        }

        let showdivtieups = null;
        if (this.state.totalexhibitorcount !== null && this.state.totalexhibitorcount > 0) {
            showdivtieups = <React.Fragment>
                <div className={classshared.margin_t_b_25.join(' ')}>
                    <Search placeholder={searchplaceholder.headersearch} pagetype={searchpagetype.profiletieups}></Search>
                </div>
                <h1 className={classshared.headertext.join(' ')}>Total Exhibitors ({this.state.totalexhibitorcount})</h1>
                {/* <div className={classshared.photos__cards.join(' ')}>
                    {tieupsdeetail}
                    {tieupsdeetailmore}
                </div>
                <div className={classshared.margin_t_b_25.join(' ')}>{butonshowmoreless}
                </div> */}

            </React.Fragment>
        }

        return (
            <React.Fragment>
                {/* {showdivtieups} */}
                {divtest}
            </React.Fragment>
        )
    }
}
export default exhibitorlist;