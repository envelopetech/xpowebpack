import React, { Component } from 'react';
import Schedulecallfirststep from './schedulecallfirststep';
import Schedulecallsecondstep from './schedulecallsecondstep';
import Schedulecallthirdstep from './schedulecallthirdstep';
//import * as classshared from '../../../commoncss/classconst';
//import dateFns from "date-fns";


class schedulecallwizard extends Component {
    // constructor(props) {
    //     super(props)
    //     this.nextPage = this.nextPage.bind(this)
    //     this.previousPage = this.previousPage.bind(this)
    //     this.state = {
    //         page: 1,
    //         finalcallschedulestring:null
    //     }
    // }
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
    //         this.setState({finalcallschedulestring:finalcallschedulestring, page: this.state.page + 1})
    //     }
    // }
    // nextPage(values) {
    //     if (this.state.page === 1) {
    //         this.setState({
    //             page: this.state.page + 1
    //         })
    //     }
    //     else if (this.state.page === 2) {
    //         this.setState({
    //             page: this.state.page + 1
    //         })
    //     }

    //     else {
    //         //schedule call save data

    //     }
    // }
    // previousPage() {
    //     this.setState({ page: this.state.page - 1 })
    // }
    // skipPage = () => {
    //     this.setState({ page: this.state.page + 1 })
    // }
    render() {
        const { page } = this.props
        let renderdiv = null;
        if (page === 1) {
            renderdiv = <Schedulecallfirststep
                loggedin_user_id={this.props.loggedin_user_id}
                dayclickhandler={this.props.dayclickhandler}
                onSubmit={this.props.nextPage}
                skipPage={this.props.skipPage}
                name={this.props.name}
                closemodal={this.props.closemodal}
                user_id={this.props.user_id}
                wingsterprofilepic={this.props.wingsterprofilepic}
                call_type={this.props.call_type}                
                >
            </Schedulecallfirststep>
        }
        else if (page === 2) {
            renderdiv = <Schedulecallsecondstep
                loggedin_user_id={this.props.loggedin_user_id}
                previousPage={this.props.previousPage}
                skipPage={this.props.skipPage}
                onSubmit={this.props.nextPage}
                closemodal={this.props.closemodal}
                name={this.props.name}
                user_id={this.props.user_id}
                wingsterprofilepic={this.props.wingsterprofilepic}
                finalcallschedulestring={this.props.finalcallschedulestring}
                call_type={this.props.call_type}                
            />
        }
        else if (page === 3) {
            renderdiv = <Schedulecallthirdstep
                loggedin_user_id={this.props.loggedin_user_id}
                skipPage={this.props.skipPage}
                previousPage={this.props.previousPage}
                onSubmit={this.props.nextPage}
                closemodal={this.props.closemodal}
                name={this.props.name}
                user_id={this.props.user_id}
                wingsterprofilepic={this.props.wingsterprofilepic}
                finalcallschedulestring={this.props.finalcallschedulestring}
                call_type={this.props.call_type}                
            />
        }
        return (
            <React.Fragment>
             
                    {renderdiv}
               
            </React.Fragment>
        )
    }
}
export default schedulecallwizard