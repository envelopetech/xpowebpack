import React from 'react';
import Featureevent from './featureevent';
import * as classshared from '../commoncss/classconst';
import { largeimageconfiguration } from '../../shared/utility';



const upcomingevents = (props) => {
    let divrenderproductimage = null;
    if (props.upcomingeventdata !== null && props.upcomingeventdata.length > 0) {
        let data = null;
        data = props.upcomingeventdata.map((item, i) => {
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
            let exhibitor_offer_price = null
            if (item.exhibitor_event_price_detail.is_free) {
                exhibitor_offer_price = "FREE"
            }
            else {
                exhibitor_offer_price = "INR " + item.exhibitor_event_price_detail.final_price
            }
            let visitor_offer_price = null
            if (item.visitor_event_price_detail.is_free) {
                visitor_offer_price = "FREE"
            }
            else {
                visitor_offer_price = "INR " + item.visitor_event_price_detail.final_price
            }
            let items =
                <Featureevent key={item.id}
                    live_status={item.live_status}
                    user_already_join_this_event={item.user_already_join_this_event}
                    display_date={item.display_date}
                    usertypename={props.usertypename}
                    eventimage={item.event_pic_url}
                    title={item.event_title}
                    id={item.id}
                    location={location}
                    toalattendees={toalattendees}
                    totalvisitors={totalvisitors}
                    totalexhibitors={totalexhibitors}
                    description={item.event_description}
                    totalvisitorsexhibitors={profilepicdata}
                    loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                    loggedinuser_email={props.loggedinuser_email}
                    loggedinuser_phonenumber={props.loggedinuser_phonenumber}
                    loggedinuser_name={props.loggedinuser_name}
                    eventtype={props.eventtype}
                    event_time_duration={item.event_time_duration}
                    descriptionsubstring={item.descriptionsubstring}
                    registrationstatus={item.registrationstatus}
                    display_registration_date={item.display_registration_date}
                    edition={item.edition}
                    is_offer_event={item.is_offer_event}
                    offer_description={item.offer_description}
                    exhibitor_price={item.exhibitor_event_price_detail.price}
                    exhibitor_offer_price={exhibitor_offer_price}
                    visitor_price={item.visitor_event_price_detail.price}
                    visitor_offer_price={visitor_offer_price}></Featureevent>

            return (
                <React.Fragment>{items}</React.Fragment>
            )
        }
        )
        divrenderproductimage =
            <React.Fragment>
                <ul className={classshared.displayblock}>{data}</ul></React.Fragment>

    }
    return (
        <React.Fragment>
            <h2 className={classshared.font_1_bold_text_dark.join(' ')}>
                <i className={classshared.fontawesome_calendar_star.join(' ')}></i><span className={classshared.font_1_bold_text_18_text_dark.join(' ')}>Upcoming Events</span>
            </h2>
            <div className={classshared.margin_b_l}>
                <div className={classshared.margin_l_sm}> <span className={classshared.font_1_regular_text_14_text_light.join(' ')}>We have an upcoming event. Let's go ahead and book your slot.</span></div>
            </div>
            {divrenderproductimage}

        </React.Fragment>
    )
}
export default React.memo(upcomingevents);