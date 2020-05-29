import React, { Component } from 'react';
import Visitorbookeventsummary from './visitorbookeventsummary';
import Visitoreventticketsummary from './visitoreventticketsummary';
import Stallselection from './stallselection'
//import * as classshared from '../commoncss/classconst';

class eventbookingwizard extends Component {
    render() {
        const { page } = this.props
        let renderdiv = null;
        if (page === 1) {
            renderdiv = <Visitorbookeventsummary
                nextPage={this.props.nextPage}
                skipPage={this.props.skipPage}
                closemodal={this.props.closemodal}
                eventtitle={this.props.eventtitle}
                event_id={this.props.event_id}
                eventlocation={this.props.eventlocation}
                totalexhibitors={this.props.totalexhibitors}
                totalvisitors={this.props.totalvisitors}
                eventdescription={this.props.eventdescription}
                totalvisitorsexhibitors={this.props.totalvisitorsexhibitors}
                eventimage={this.props.eventimage}
                display_date={this.props.display_date}
                event_time_duration={this.props.event_time_duration}
            >
            </Visitorbookeventsummary>
        }
        else if (page === 2) {
            if (this.props.isvisitor) {
                renderdiv = <Visitoreventticketsummary
                    ischeckuserexhibition={false}
                    closemodal={this.props.closemodal}
                    eventtitle={this.props.eventtitle}
                    eventlocation={this.props.eventlocation}
                    totalexhibitors={this.props.totalexhibitors}
                    totalvisitors={this.props.totalvisitors}
                    eventdescription={this.props.eventdescription}
                    totalvisitorsexhibitors={this.props.totalvisitorsexhibitors}
                    eventimage={this.props.eventimage}
                    proceedhandler={this.openproceedhandler}
                    display_date={this.props.display_date}
                    event_time_duration={this.props.event_time_duration}
                    event_booking_number={this.props.event_booking_number}
                    skipPage={this.props.skipPage}
                    previousPage={this.props.previousPage}
                    loggedinuser_name={this.props.loggedinuser_name}
                    start_time={this.props.start_time}
                ></Visitoreventticketsummary>
            }
            else {
                renderdiv = <Stallselection
                    closemodal={this.props.closemodal}
                    eventtitle={this.props.eventtitle}
                    event_id={this.props.event_id}
                    eventlocation={this.props.eventlocation}
                    totalexhibitors={this.props.totalexhibitors}
                    totalvisitors={this.props.totalvisitors}
                    eventdescription={this.props.eventdescription}
                    totalvisitorsexhibitors={this.props.totalvisitorsexhibitors}
                    eventimage={this.props.eventimage}
                    display_date={this.props.display_date}
                    event_time_duration={this.props.event_time_duration}
                    skipPage={this.props.skipPage}
                    previousPage={this.props.previousPage}
                    onSubmit={this.props.nextPage}
                    event_stall_data={this.props.event_stall_data}
                ></Stallselection>
            }

        }
        else if (page === 3) {
            renderdiv = <Visitoreventticketsummary
                stallname={this.props.stallname}
                ischeckuserexhibition={false}
                closemodal={this.props.closemodal}
                eventtitle={this.props.eventtitle}
                eventlocation={this.props.eventlocation}
                totalexhibitors={this.props.totalexhibitors}
                totalvisitors={this.props.totalvisitors}
                eventdescription={this.props.eventdescription}
                totalvisitorsexhibitors={this.props.totalvisitorsexhibitors}
                eventimage={this.props.eventimage}
                proceedhandler={this.openproceedhandler}
                display_date={this.props.display_date}
                event_time_duration={this.props.event_time_duration}
                loggedinuser_name={this.props.loggedinuser_name}
                event_booking_number={this.props.event_booking_number}
                skipPage={this.props.skipPage}
                previousPage={this.props.previousPage}
                onSubmit={this.props.nextPage}
                start_time={this.props.start_time}
            ></Visitoreventticketsummary>
        }
        return (
            <React.Fragment>

                {renderdiv}

            </React.Fragment>
        )
    }
}
export default React.memo(eventbookingwizard);