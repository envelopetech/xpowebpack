import React, { Component } from 'react';
import * as classshared from '../../../commoncss/classconst';
import { getusereventlist } from '../../../../actions/events/dataactions';
import Eventlistitems from '../../../exploreexpo/eventlistitems'
import { nodatatext_image_configuration, nodatatext_message, ButtonType } from '../../../../shared/utility'
import Spinner from '../../../UI/Spinner/Spinner'
import Nodatamessage from '../../../nodatamessage/nodatamessage'
import nodataimage from '../../../../assets/images/nodatafound.svg';
import MediaQuery from 'react-responsive';
import shortid from "shortid";


class userexhibitions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userexhibitiondata: null,
            loading: false
        }
    }
    filldata() {
        this.setState({ loading: true })
        var data = getusereventlist()
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ userexhibitiondata: res.data, loading: false });
                }
                else {
                    this.setState({ loading: false })
                }
            }
            else {
                this.setState({ loading: false })
            }
        });
    }
    componentDidMount() {
        this.filldata();
    }

    render() {
        let nodatadiv =
            <Nodatamessage imagesource={nodataimage}
                type={nodatatext_image_configuration.sidebarworkhistory}
                nodata_message={nodatatext_message.noexhibition}
                btntype={ButtonType.edit_mode_button_profile}
                svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}>
            </Nodatamessage>
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let list = [];
        let detail = null;
        list = this.state.userexhibitiondata;
        if (list !== null) {
            if (list.length > 0) {
                let data = null;
                data = list.map((item, i) => {
                    let location = item.country + ", " + item.city
                    let totalvisitors = null
                    let totalexhibitors = null
                    let profilepicdata = null
                    let toalattendees = 0;
                    if (item.totalvisitorsexhibitors !== null) {
                        totalvisitors = item.totalvisitorsexhibitors[1]
                        totalexhibitors = item.totalvisitorsexhibitors[2]
                        profilepicdata = item.totalvisitorsexhibitors[0]
                        toalattendees = parseInt(totalvisitors, 10) + parseInt(totalexhibitors, 10)
                    }
                    let islazyloading = false;
                    if (i > 3) {
                        islazyloading = true;
                    }
                    let items =
                        <Eventlistitems key={item.id}
                            toalattendees={toalattendees}
                            usertypename={this.props.usertypename}
                            is_lazyloading={islazyloading}
                            eventimage={item.cover_pic_url}
                            title={item.event_title}
                            id={item.id}
                            display_date={item.display_date}
                            location={location}
                            totalvisitors={totalvisitors}
                            totalexhibitors={totalexhibitors}
                            description={item.event_description}
                            totalvisitorsexhibitors={profilepicdata}
                            event_fees={item.event_fees}
                            is_exhibitor={item.is_exhibitor}
                            loggedin_user_profilepic_url={this.props.loggedin_user_profilepic_url}
                            loggedinuser_email={this.props.loggedinuser_email}
                            loggedinuser_phonenumber={this.props.loggedinuser_phonenumber}
                            loggedinuser_name={this.props.loggedinuser_name}
                            descriptionsubstring={item.descriptionsubstring}></Eventlistitems>
                    return (
                        <div key={shortid.generate()}>{items}</div>
                    )
                }
                )
                detail =
                    <React.Fragment><MediaQuery query="(max-width: 1224px)"><div className={classshared.displayblock}>{data}</div></MediaQuery>
                        <MediaQuery query="(min-device-width: 1224px)"><div className={classshared.flex}>{data}</div></MediaQuery></React.Fragment>
            }
            else {
                detail = <React.Fragment>{nodatadiv}</React.Fragment>
            }
        }
        else {
            detail = <React.Fragment>{nodatadiv}</React.Fragment>
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.main__hero_content.join(' ')}>
                    <div className={classshared.events_cards.join(' ')}>
                        {detail}
                    </div></div>
            </React.Fragment>
        )
    }
}
export default userexhibitions