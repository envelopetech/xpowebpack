import React, { Component } from 'react';
import * as classshared from '../../../commoncss/classconst';
import Button from '../../../UI/Button/Button';
import { ICONS, ButtonType } from '../../../../shared/utility'
import { reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Schedulecalendar from './schedulecalendar';
//import dateFns from "date-fns";

class schedulecallfirststep extends Component {
    // dayclickhandler = (event) =>{        
    //     let children = event.target.childNodes;        
    //     let data = children[0].id
    //     if(data.includes("##"))  
    //     {
    //         let arrayobj = data.split('##')
    //         let timeslot= arrayobj[0]
    //         let date= arrayobj[1]
    //         let day= arrayobj[2]            
    //         let datename = dateFns.format(date, 'DD')
    //         let monthyearname = dateFns.format(date, 'MMMM YYYY') 
    //         let finalcallschedulestring = "On " + day +", "+ datename +"th "+ monthyearname +" at "+ timeslot +" (IST)";
    //         //alert(finalcallschedulestring)
    //     }
    // }
    render() {
        const { handleSubmit } = this.props;
        return (
            <React.Fragment>
                <div className={classshared.popup__content_header.join(' ')}>
                    <div className={classshared.sidebar__user_stats.join(' ')}>
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>Schedule a Call</h2>
                        </div>
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                        </div>
                    </div>
                    <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>Pick the date and time below to speak to <strong>{this.props.name}</strong></h3>
                </div>
                <div className={classshared.popup__content_bottom}>
                    <Form onSubmit={handleSubmit}>
                        <Schedulecalendar
                            loggedin_user_id={this.props.loggedin_user_id}
                            dayclickhandler={this.props.dayclickhandler}
                            name={this.props.name} user_id={this.props.user_id}
                            is_schedule_call={true}>
                        </Schedulecalendar>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
schedulecallfirststep = reduxForm({
    form: 'schedulecallfirststepform',
    //validate,
})(schedulecallfirststep);
export default schedulecallfirststep;
