import React from 'react';
import Featureevent from './featureevent';
import * as classshared from '../commoncss/classconst';
import Nodatamessage from '../nodatamessage/nodatamessage'
import nodataimage from '../../assets/images/nodatafound.svg';
import { ButtonType, EventType, nodatatext_image_configuration, nodatatext_message } from '../../shared/utility'
import MediaQuery from 'react-responsive';


const allexhibitions = (props) => {

    let nofoundmessage = null;
    if (props.eventtype === EventType.liveevent) {
        nofoundmessage = nodatatext_message.noliveeventfound
    }
    else {
        nofoundmessage = nodatatext_message.noupcomingeventfound
    }
    let divrenderproductimage = null;
    if (props.eventdata !== null && props.eventdata.length > 0) {
        let data = null;
        data = props.eventdata.map((item, i) => {
            let location = item.country + ", " + item.city
            let totalvisitors = null
            let totalexhibitors = null
            let profilepicdata = null
            if (item.totalvisitorsexhibitors !== null) {
                totalvisitors = item.totalvisitorsexhibitors[1]
                totalexhibitors = item.totalvisitorsexhibitors[2]
                profilepicdata = item.totalvisitorsexhibitors[0]
            }
            let items =
                <Featureevent key={item.id}
                    live_status={item.live_status}
                    user_already_join_this_event = {item.user_already_join_this_event}
                    display_date={item.display_date}
                    usertypename={props.usertypename}
                    eventimage={item.event_pic_url}
                    title={item.event_title}
                    id={item.id}
                    location={location}
                    totalvisitors={totalvisitors}
                    totalexhibitors={totalexhibitors}
                    description={item.event_description}
                    totalvisitorsexhibitors={profilepicdata}
                    event_fees={item.event_fees}
                    loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                    loggedinuser_email={props.loggedinuser_email}
                    loggedinuser_phonenumber={props.loggedinuser_phonenumber}
                    loggedinuser_name={props.loggedinuser_name}
                    eventtype={props.eventtype}
                    event_time_duration={item.event_time_duration}
                ></Featureevent>

            return (
                <React.Fragment>{items}</React.Fragment>
            )
        }
        )

        divrenderproductimage =
            <React.Fragment><MediaQuery query="(max-width: 1224px)"><ul className={classshared.displayblock}>{data}</ul></MediaQuery>
                <MediaQuery query="(min-device-width: 1224px)"><ul className={classshared.flex}>{data}</ul></MediaQuery></React.Fragment>

    }
    else {
        divrenderproductimage = <Nodatamessage imagesource={nodataimage}
            type={nodatatext_image_configuration.sidebarworkhistory}
            nodata_message={nofoundmessage}
            btntype={ButtonType.edit_mode_button_profile}
            svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}>
        </Nodatamessage>
    }
    return (
        <React.Fragment>

            <div className={classshared.padding_all_25m}>
                <div className={classshared.div_width_90}> {divrenderproductimage}</div></div>
            {/* </div> */}
        </React.Fragment>
    )
}
export default React.memo(allexhibitions);