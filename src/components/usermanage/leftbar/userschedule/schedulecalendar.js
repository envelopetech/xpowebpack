import React from "react";
import dateFns from "date-fns";
import moment from 'moment'
import Popup from 'reactjs-popup'
//import momentt from 'moment-timezone'
import * as classshared from './classconst';
import Userprofilecard from './userprofilecard';
import Icon from '../../../UI/Icon/Icon';
import { ICONS, ProfilepicType, confirmdelete, socketendpoint, customPopUp } from '../../../../shared/utility'
import Profilepic from '../../../UI/profilepic/profilepic'
import { get_user_schedule, delete_call_schedule } from '../../../../actions/userscheduler/dataactions'
import Modal from "react-responsive-modal";
import Usercallpopupsender from '../../../usercallpopup/usercallpopupsender'
import Spinner from '../../../UI/Spinner/Spinner';
import shortid from "shortid";
import socket from '../../../../actions/socket';
import socketIOClient from "socket.io-client";

import { generate_opentokbox_token } from '../../../../actions/videocalling/dataactions'

class schedulecalendar extends React.Component {
  totaldays = 6
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      currentweek: null,
      week_last_date: null,
      week_result: null,
      week_first_date: null,
      data: null,
      openusercallpopup: false,
      twilio_token: null,
      twilio_identity: null,
      twilio_room: null,      
      delete_item_id: null,
      client: socket(),
      notified_user_id: null,
      callerprofilepic: null,
      callername: null,
      callerdesignation: null,
      calleruserid: null,
      receiverprofilepic: null,
      receivername: null,
      receiverdesignation: null,
      receiveruserid: null,
      loading: false,
      showvideocallstream:false,
      end_time:null,
      starttime:null
      
    };
    if (props.is_schedule_call) {
      this.totaldays = 2
    }
  }
  user_call_save = (event, notified_user_id, receiverprofilepic, receivername, receiverdesignation, loggedinuserdesignation, receiveruserid) => {
    event.preventDefault();
    this.setState({ loading: true })
    var data = generate_opentokbox_token()
    data.then(res => {
      if (res.data["error"] === undefined) {
        if (res.data[0] !== null && res.data[0] !== undefined && res.data[1] !== null && res.data[1] !== undefined) {
          let callername = this.props.first_name + " " + this.props.last_name
          var dataval = {
            notified_user_id: notified_user_id,
            callerprofilepic: this.props.loggedin_user_profilepic_url,
            callername: callername,
            callerdesignation: loggedinuserdesignation,
            calleruserid: this.props.loggedin_user_id,
            receiverprofilepic: receiverprofilepic,
            receivername: receivername,
            receiverdesignation: receiverdesignation,
            receiveruserid: receiveruserid,
            opentok_token: res.data[0],
            opentok_sessionid: res.data[1]
          }
          this.setState({
            notified_user_id: notified_user_id,
            callerprofilepic: this.props.loggedin_user_profilepic_url,
            callername: callername,
            callerdesignation: loggedinuserdesignation,
            calleruserid: this.props.loggedin_user_id,
            receiverprofilepic: receiverprofilepic,
            receivername: receivername,
            receiverdesignation: receiverdesignation,
            receiveruserid: receiveruserid,
            opentok_token: res.data[0],
            opentok_sessionid: res.data[1],
          }, () => {
            this.state.client.call_request_from_publisher(dataval);
            this.setState({ openusercallpopup: true, loading: false })
          });
        }
      }
    });
  }
  closeopencallpopup = () => {
    this.setState({ openusercallpopup: false });
    this.state.client.end_call_by_publisher_subscriber();
  }  
  deleteitemconfirmhandler = (event, id) => {
    event.preventDefault();
    this.setState({ delete_item_id: id }, () => {
      confirmdelete(this.deletecallschedulehandler);
    });
  }
  deletecallschedulehandler = () => {
    var dataval = {
      id: this.state.delete_item_id
    }
    var data = delete_call_schedule(dataval)
    data.then(res => {
      if (res.data["error"] === undefined) {
        let filterdata = this.state.data.filter((post) => {
          return this.state.delete_item_id !== post.id;
        });
        this.setState(state => {
          state.data = filterdata;
          return state;
        });
      }
    })
  }
  componentWillUnmount() {
    const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
    socket.off("show_end_call_by_publisher");
    socket.off("show_call_response_from_subscriber");
    socket.off("show_end_call_by_publisher_subscriber");    
  }
  componentDidMount() {
    let userid = null
    if (this.props.user_id !== null && this.props.user_id !== undefined) {
      userid = this.props.user_id
    }
    let today = new Date();
    let dayAWeekFromNow = dateFns.addDays(today, this.totaldays);
    var data = get_user_schedule(dateFns.format(today, 'YYYY-MM-DD'), dateFns.format(dayAWeekFromNow, 'YYYY-MM-DD'), userid)
    data.then(res => {
      if (res !== undefined) {
        if (res.data["error"] === undefined) {
          this.setState({ data: res.data })
        }
      }
    });
    let result = dateFns.eachDay(
      today,
      dayAWeekFromNow
    )
    let current_week = dateFns.format(today, 'DD MMM YYYY') + " - " + dateFns.format(dayAWeekFromNow, 'DD MMM YYYY')
    this.setState({ currentweek: current_week, week_last_date: dayAWeekFromNow, week_result: result, week_first_date: today })

    const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
    socket.on('show_end_call_by_publisher', (end_time) => {     
      this.setState({        
        // opentok_sessionid:null,
        // opentok_token:null,
        // end_time:end_time,
        openusercallpopup:false
      })
    })
    socket.on('show_call_response_from_subscriber', (data) => {
      this.setState({        
        showvideocallstream:true,
        starttime:data
      })
    })
    socket.on('show_end_call_by_publisher_subscriber', () => {
      this.setState({        
        openusercallpopup:false
      })
    })
  }
  renderHeader = () => {
    return (
      <div className={classshared.header.join(' ')}>
        <div className={classshared.col_start.join(' ')} >
          <div onClick={this.prevMonth} className={classshared.displaycursor}>
            <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.LEFT_ARROW}></Icon>
          </div>
        </div>
        <div className={classshared.col_center.join(' ')}>
          <span>{this.state.currentweek}</span>
        </div>
        <div className={classshared.col_end.join(' ')} onClick={this.nextMonth}>
          <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.RIGHT_ARROW}></Icon>
        </div>
      </div>
    );
  }
  renderDays() {    
    if (this.state.week_result !== null) {
      let timeslot = []
      let days = [];
      timeslot =
        <div className={classshared.time} >
          <div className={classshared.title_numbers}>GMT</div>
        </div>
      this.state.week_result.map((item, index) => {
        return (
          days.push(
            <div className={classshared.col_center.join(' ')} key={shortid.generate()}>
              <span className={classshared.day}>{dateFns.format(item, 'dddd')}</span><br />
              <strong><span>{dateFns.format(item, 'DD')}</span></strong>
            </div>
          ))
      })
      return <div className={classshared.calendar_body.join(' ')}>{timeslot}<div className={classshared.slots}><div className={classshared.row}>{days}</div></div></div>
    }
  }
  render_dates(displaytime, tooltip, testtime) {    
    let days = [];
    this.state.week_result.map((item, index) => {
      let date = dateFns.format(item, 'YYYY-MM-DD')
      let dayname = dateFns.format(item, 'dddd')
      let spanid = displaytime + "##" + date + "##" + dayname
      let isdisable = false;
      if (this.state.data !== null) {
        let selecteddata = this.state.data.find(i => i.getscheduledate === date && i.call_start_time === displaytime.toString());
        if (selecteddata !== undefined) {
          let today = new Date();
          let currenttime = dateFns.getTime(new Date(), 'h:mm');
          let starttime = testtime
          let endtime = dateFns.addMinutes(starttime, 15).getTime()
          today = dateFns.format(today, 'YYYY-MM-DD')
          var result = dateFns.isAfter(
            currenttime,
            starttime
          )
          var result1 = dateFns.isBefore(
            currenttime,
            endtime
          )
          var isequaldate = dateFns.isEqual(
            new Date(selecteddata.getscheduledate),
            new Date(today)
          )
          if (isequaldate) {
            if (result && result1) {
              isdisable = false
            }
            else {
              isdisable = true
            }
          }
          else {
            isdisable = true
          }
          let detail = null;
          if (this.props.user_id !== null && this.props.user_id !== undefined) {
            detail = <div className={classshared.col_cell_cursornone.join(' ')} key={shortid.generate()}>
              <div className={classshared.bookings.join(' ')}>
                <span className={classshared.text_12_font_1_medium_caps.join(' ')}>Booked</span>
              </div>
            </div>
          }
          else {
            detail = <Popup
              contentStyle={tooltip}
              trigger={
                <div className={classshared.col_cell.join(' ')} key={shortid.generate()}>
                  <div className={classshared.bookings.join(' ')}>
                    <div className={classshared.avatars}>
                      <Profilepic profilepic_url={selecteddata.scheduleuserprofiledata[0]["profile_pic_url"]} type={ProfilepicType.avatar_l_avatar_m}></Profilepic>
                    </div>
                    <span className={classshared.text_12_font_1_medium_caps.join(' ')}>{selecteddata.scheduleuserprofiledata[0]["first_name"]}</span>
                  </div>
                </div>
              }
              position="bottom center"
              on="hover"
            >
              <Userprofilecard title="Bottom Center"
                user_call_save={(event) => {
                  this.user_call_save(event
                    , selecteddata.schedule_user_id
                    , selecteddata.scheduleuserprofiledata[0]["profile_pic_url"]
                    , selecteddata.scheduleuserprofiledata[0]["name"]
                    , selecteddata.scheduleuserprofiledata[0]["work_as"]
                    , selecteddata.userdesignation, selecteddata.receiveruserid
                  )
                }}
                notified_user_id={selecteddata.schedule_user_id}
                deletecallschedule={(event) => { this.deletecallschedulehandler(event, selecteddata.id); }}
                username={selecteddata.scheduleuserprofiledata[0]["name"]}
                suggestioncardprofilepic={selecteddata.scheduleuserprofiledata[0]["profile_pic_url"]}
                schedule_user_profile_pic={ProfilepicType.tieupsmediumpic}
                designation={selecteddata.scheduleuserprofiledata[0]["work_as"]}
                isdisable={isdisable} />
            </Popup>
          }
          return (
            days.push(
              <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
            )
          )
        }
        else {
          let commingdate = dateFns.format(item, 'YYYY-MM-DD')
          let commingdata = commingdate + " " + displaytime
          let current_date = dateFns.format(new Date(), 'MM/DD/YYYY H:mm');
          let result = dateFns.isAfter(commingdata, current_date)
          if (result) {
            let detail1 = <div onClick={this.props.dayclickhandler} className={classshared.col_cell.join(' ')} key={shortid.generate()}>
              <span id={spanid} className={classshared.number}></span><br />
            </div>
            return (
              days.push(
                <React.Fragment key={shortid.generate()}>{detail1}</React.Fragment>
              )
            )
          }
          else {
            let detail1 = <div className={classshared.col_cell_readonly.join(' ')} key={shortid.generate()} readOnly>
              <span id={spanid} className={classshared.number}></span><br />
            </div>
            return (
              days.push(
                <React.Fragment key={shortid.generate()}>{detail1}</React.Fragment>
              )
            )
          }
        }
      }
      else {
        let commingdate = dateFns.format(item, 'YYYY-MM-DD')
        let commingdata = commingdate + " " + displaytime
        let current_date = dateFns.format(new Date(), 'MM/DD/YYYY H:mm');
        let result = dateFns.isAfter(commingdata, current_date)
        if (result) {
          let detail2 = <div onClick={this.props.dayclickhandler} className={classshared.col_cell.join(' ')} key={shortid.generate()}>
            <span id={spanid} className={classshared.number}></span><br />
          </div>
          return (
            days.push(
              <React.Fragment key={shortid.generate()}>{detail2}</React.Fragment>
            )
          )
        }
        else {
          let detail2 = <div className={classshared.col_cell_readonly.join(' ')} key={shortid.generate()} readOnly>
            <span id={spanid} className={classshared.number}></span><br />
          </div>
          return (
            days.push(
              <React.Fragment key={shortid.generate()}>{detail2}</React.Fragment>
            )
          )
        }
      }
    })
    return days;
  }
  renderCells() {
    if (this.state.week_result !== null) {
      let timeslot = []
      const rows = [];
      let days = [];
      // var result = dateFns.getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
      // alert(result)
      //let test1 = dateFns.format(test, 'H:mm')
      //alert(test1)

      // let now = moment();
      // alert(now.format('09:00', "HH:mm"));
      // alert(dateFns.getTime(dateFns.format(now.format('09:00', "HH:mm"))))

      //alert(moment('09:00', 'HH:mm'))
      //alert(dateFns.format(moment('09:00', 'HH:mm')))

      let start_time = dateFns.getTime(dateFns.format(moment('09:00', 'h:mm')));
      let end_time = dateFns.getTime(dateFns.format(moment('23:45', 'h:mm')));

      //var tz = momentt.tz.guess();       
      // let d = moment.tz(start_time, tz)
      // d=d.format();
      // const momentDateTz = momentt.tz(d,'YYYY-MM-DD HH:mm',tz)
      // console.log(momentDateTz)
      let tooltip = {
        position: "absolute",
        zIndex: "2",
        width: "250px",
        //border: "1px solid rgb(187, 187, 187)",
        boxShadow: "0 6px 11px -1px #e9ebee",//"rgba(0, 0, 0, 0.2) 0px 1px 3px",
        padding: "0px",
        border: "1px solid #e9ebee",
        cursor: "pointer",
        transition: "all .15s ease",
        borderRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        height: "auto",
      }
      while (start_time <= end_time) {
        //let displaydate=dateFns.format(start_time, 'hh:mm a') //12 Hours wit AM PM
        let displaytime = dateFns.format(start_time, 'H:mm')//24 Hours display   
        //console.log(displaytime)       
        timeslot.push(
          <div className={classshared.numbers} key={start_time}>{displaytime}</div>
        );
        days = this.render_dates(displaytime, tooltip, start_time)
        rows.push(
          <div className={classshared.row} key={start_time}>
            {days}
          </div>
        );
        days = [];
        start_time = dateFns.addMinutes(start_time, 15).getTime()
      }
      return <div className={classshared.calendar_content.join(' ')}> <div className={classshared.time}>{timeslot}</div><div className={classshared.slots}>{rows}</div></div>;
    }
  }
  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };
  nextMonth = () => {
    let start_date = dateFns.addDays(this.state.week_last_date, 1);
    let end_date = dateFns.addDays(start_date, this.totaldays);
    let current_week = dateFns.format(start_date, 'DD MMM YYYY') + " - " + dateFns.format(end_date, 'DD MMM YYYY')
    let result = dateFns.eachDay(
      start_date,
      end_date
    )
    this.setState({ currentweek: current_week, week_last_date: end_date, week_result: result, week_first_date: start_date })
  };
  prevMonth = () => {
    let days = 7
    if (this.props.is_schedule_call) {
      days = 3
    }
    let start_date = dateFns.subDays(this.state.week_first_date, days);
    let end_date = dateFns.addDays(start_date, this.totaldays);
    let current_week = dateFns.format(start_date, 'DD MMM YYYY') + " - " + dateFns.format(end_date, 'DD MMM YYYY')
    let result = dateFns.eachDay(
      start_date,
      end_date
    )
    this.setState({ currentweek: current_week, week_last_date: end_date, week_result: result, week_first_date: start_date })
  };
  render() {   
    let spinnerform = null
    if (this.state.loading) {
      spinnerform = <Spinner />
    }
    return (
      <React.Fragment>
        {spinnerform}
        <div className={classshared.w_container}>
          <Modal open={this.state.openusercallpopup} styles={customPopUp}
            onClose={this.closeopencallpopup} center showCloseIcon={false}>
            <Usercallpopupsender
              closemodal={this.closeopencallpopup}
              imagetype={ProfilepicType.user_nav__user_photo_small}
              iscaller={true}
              notified_user_id={this.state.notified_user_id}
              callerprofilepic={this.state.callerprofilepic}
              callername={this.state.callername}
              calleruserid={this.state.calleruserid}
              receiverprofilepic={this.state.receiverprofilepic}
              receivername={this.state.receivername}
              receiverdesignation={this.state.receiverdesignation}
              opentok_token={this.state.opentok_token}
              opentok_sessionid={this.state.opentok_sessionid}
              showvideocallstream={true}
              endtime={this.state.end_time}
              starttime={this.state.starttime}
            ></Usercallpopupsender>
          </Modal>
          <div className={classshared.calendar.join(' ')}>
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
            {/* <Userprofilecard title="Bottom Center" 
                username="hetal mehta"               
                schedule_user_profile_pic={ProfilepicType.tieupsmediumpic}/> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default React.memo(schedulecalendar);

//Mon Mar 09 2020 09:00:00 GMT+0530
//2020-03-09T09:00:00.000+05:30