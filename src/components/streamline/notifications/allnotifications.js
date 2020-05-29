import React, { Component } from 'react';
import * as classshared from '../classconst';
import { get_users_all_notifications, staffrequestresponsesavebyvisitor, response_tieups_request } from '../../../actions/streamlines/dataactions'
import Spinner from '../../UI/Spinner/Spinner'
import Staffrequestnotifications from './staffrequestnotifications'
import Tieupsnotifications from './tieupsnotifications'
import { wingster_wing_status, ICONS, nodatatext_image_configuration, nodatatext_message } from '../../../shared/utility';
import shortid from "shortid";
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';


class allnotifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staffnotificationdata: [],
            tiupesnotificationdata: [],
            loading: false,
            alldatablank: false
        }
    }
    filldata() {
        this.setState({ loading: true })
        var data = get_users_all_notifications()
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {                    
                    //this.setState({ staffnotificationdata: res.data[0], tiupesnotificationdata: res.data[1], loading: false });
                    this.setState({ staffnotificationdata: res.data[0], tiupesnotificationdata: res.data[1], loading: false }, () => {
                        if (res.data[0].length === 0 && res.data[1].length === 0) {
                            this.setState({ alldatablank: true })
                        }
                    });
                }
            }
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.filldata();
    }
    acceptrejectstaffrequest = (event, status, id) => {
        event.preventDefault();
        const dataval = {
            id: id,
            request_status: status
        };
        var returndata = staffrequestresponsesavebyvisitor(dataval)
        returndata.then(res => {
            let filterdata = this.state.staffnotificationdata.filter((post) => {
                return id !== post.id;
            });
            this.setState(state => {
                if (filterdata.length === 0 && this.state.tiupesnotificationdata.length === 0) {
                    state.alldatablank = true
                }
                state.staffnotificationdata = filterdata;
                return state;
            });
        })
    }
    acceptrejecttieupsrequest = (event, status, id) => {
        event.preventDefault();
        const dataval = {
            id: id,
            status: status
        };
        var returndata = response_tieups_request(dataval)
        returndata.then(res => {
            let filterdata = this.state.tiupesnotificationdata.filter((post) => {
                return id !== post.id;
            });
            this.setState(state => {
                state.tiupesnotificationdata = filterdata;
                if (filterdata.length === 0 && this.state.staffnotificationdata.length === 0) {
                    state.alldatablank = true
                }
                return state;
            });
        })
    }
    render() {        
        let divblank = null
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }

        let staffnotificationsdiv = []
        let liststaff = []
        liststaff = this.state.staffnotificationdata
        let divstaff = null
        if (liststaff !== null) {
            if (liststaff.length > 0) {
                liststaff.map((item, i) => {
                    let detail = <Staffrequestnotifications
                        username={item.exhibitor_data[0]["name"]}
                        userid={item.exhibitor_data[0]["user_id"]}
                        profilepic_url={item.exhibitor_data[0]["company_logo_url"]}
                        exhibitor_id={item.exhibitor_id}
                        acceptstaffrequest={(event) => this.acceptrejectstaffrequest(event, wingster_wing_status.accepted, item.id)}
                        rejectstaffrequest={(event) => this.acceptrejectstaffrequest(event, wingster_wing_status.rejected, item.id)}>>
                </Staffrequestnotifications>
                    return (
                        staffnotificationsdiv.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                    )
                });
                divstaff = <React.Fragment key={shortid.generate()}>
                    <div>
                        <div>
                            <span className={classshared.font_1_medium}>Staff Request Notifications</span>
                        </div>
                        <div className={classshared.margin_t_m}>
                            <div class={classshared.notification_list_main_div}>
                                <ul className={classshared.notification_list}>{staffnotificationsdiv}</ul></div>
                        </div>
                    </div>
                </React.Fragment>
            }
            else {
                divstaff = null
            }
        }
        else {
            divstaff = null
        }

        let tieupsnotificationsdiv = []
        let divtieups = null
        let listtieupsdiv = []
        listtieupsdiv = this.state.tiupesnotificationdata
        if (listtieupsdiv !== null) {
            if (listtieupsdiv.length > 0) {
                listtieupsdiv.map((item, i) => {
                    let detail = <Tieupsnotifications
                        username={item.user_tieups_data[0]["name"]}
                        userid={item.user_tieups_data[0]["user_id"]}
                        profilepic_url={item.user_tieups_data[0]["profile_pic_url"]}
                        accepttieupsrequest={(event) => this.acceptrejecttieupsrequest(event, wingster_wing_status.accepted, item.id)}
                        rejecttieupsrequest={(event) => this.acceptrejecttieupsrequest(event, wingster_wing_status.rejected, item.id)}>>
                </Tieupsnotifications>
                    return (
                        tieupsnotificationsdiv.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                    )
                });
                divtieups = <React.Fragment key={shortid.generate()}>
                    <div>
                        <div>
                            <span className={classshared.font_1_medium}>Tieups Request Notifications</span>
                        </div>
                        <div className={classshared.margin_t_m}>
                            <div class={classshared.notification_list_main_div}>
                                <ul className={classshared.notification_list}>{tieupsnotificationsdiv}</ul></div>
                        </div>
                    </div>
                </React.Fragment>
            }
            else {
                divtieups = null
            }
        }
        else {
            divtieups = null
        }

        if (this.state.alldatablank) {
            divblank = <Nodatamessage imagesource={nodataimage}
                type={nodatatext_image_configuration.userprofilevideo}
                nodata_message={nodatatext_message.nonotifications}
                svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                ishow={true}
                icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.main_content_tab.join(' ')}>
                    <div className={classshared.size1of1}>
                        <h1 className={classshared.text_dark_margin_b_m.join(' ')}>Your Notifications</h1>
                        {divblank}
                        {divstaff}
                        {divtieups}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default allnotifications;