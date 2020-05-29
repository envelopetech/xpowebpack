import React, { Component } from 'react';
import Eventform from './eventform';
import { save_event } from '../../actions/events/dataactions';

import Spinner from '../UI/Spinner/Spinner';


class events extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    submit = (values) => {        
        this.setState({ loading: true })
        const dataval = {
            event_title: values.event_title,
            event_description: values.event_description,
            start_date: values.start_date,
            end_date: values.end_date,
            start_time: values.start_time,
            end_time: values.end_time,
            address: values.address,
            event_location: values.event_location,
            pincode: values.pincode,
            event_pic_url:values.event_pic_url,
            cover_pic_url:values.cover_pic_url,
            event_fees:values.event_fees,
            registration_end_date:values.registration_end_date,
            edition:values.edition,
            event_number:values.event_number,            
        }
        var returndata = save_event(dataval)
        returndata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    alert("test")
                    this.setState({ loading: false });
                }
            }
        })
    }
    render() {
        let spinnerform = null
        if (this.state.loading) {
            spinnerform = <Spinner />
        }
        return (
            <React.Fragment>
                {spinnerform}
                <Eventform onSubmit={this.submit}></Eventform>
            </React.Fragment>
        )
    }
}
export default events;