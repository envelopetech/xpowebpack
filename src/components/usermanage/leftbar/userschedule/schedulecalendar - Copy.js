import React from "react";
import dateFns from "date-fns";
import moment from 'moment'
import Popup from 'reactjs-popup'
//import momentt from 'moment-timezone'
import * as classshared from './classconst';
import Userprofilecard from './userprofilecard';
import Icon from '../../../UI/Icon/Icon';
import { ICONS, ProfilepicType, streamcredentials, stream_verb_list, callacceptrejectstatus, customPopUp } from '../../../../shared/utility'
import Profilepic from '../../../UI/profilepic/profilepic'
import { get_user_schedule, delete_call_schedule } from '../../../../actions/userscheduler/dataactions'
import { save_user_call_getstream } from '../../../../actions/videocalling/dataactions'
import Modal from "react-responsive-modal";
import Usercallpopupsender from '../../../usercallpopup/usercallpopupsender'
import stream from 'getstream';
import Videocomponent from '../../../usercallpopup/videocomponent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import shortid from "shortid";


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
      calleeuserprofilepic: null,
      calleename: null,
      is_open_video_component: false,
      calledesignation: null
    };
    if (props.is_schedule_call) {
      this.totaldays = 2
    }
  }
  user_call_save = (event, notified_user_id, calleeuserporfilepic, calleename, calledesignation) => {
    event.preventDefault();
    var dataval = {
      notified_user_id: notified_user_id
    }
    var data = save_user_call_getstream(dataval)
    data.then(res => {
      if (res.data["error"] === undefined) {
        this.setState({
          openusercallpopup: true,
          calleeuserprofilepic: calleeuserporfilepic,
          calleename: calleename,
          calledesignation: calledesignation,
          twilio_token: res.data[0],
          twilio_identity: res.data[1],
          twilio_room: res.data[2]
        })
      }
    })
  }
  closeopencallpopup = () => {
    this.setState({ openusercallpopup: false });
  }
  closeopenvideocallpopup = () => {
    this.setState({ is_open_video_component: false });
    //return ""
  }
  deletecallschedulehandler = (event, id) => {
    event.preventDefault();
    var dataval = {
      id: id
    }
    var data = delete_call_schedule(dataval)
    data.then(res => {
      if (res.data["error"] === undefined) {
        let filterdata = this.state.data.filter((post) => {
          return id !== post.id;
        });
        this.setState(state => {
          state.data = filterdata;
          return state;
        });
      }
    })
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

    console.log(JSON.stringify(this.state.data))
    let days = [];
    this.state.week_result.map((item, index) => {
      let date = dateFns.format(item, 'YYYY-MM-DD')
      let dayname = dateFns.format(item, 'dddd')
      let spanid = displaytime + "##" + date + "##" + dayname
      let isdisable = false;
      if (this.state.data !== null) {
        let selecteddata = this.state.data.find(i => i.getscheduledate === date && i.call_start_time === testtime);
        if (selecteddata !== undefined) {
          let today = new Date();
          today = dateFns.format(today, 'YYYY-MM-DD')
          //alert(today)
          //alert(selecteddata.getscheduledate)
          var result = dateFns.compareAsc(
            new Date(selecteddata.getscheduledate),
            new Date(today)
          )
          //alert(result)
          if (result === -1) {
            isdisable = true
          }
          let detail = null;
          if (this.props.user_id !== null && this.props.user_id !== undefined) {
            detail = <div className={classshared.col_cell.join(' ')} key={shortid.generate()}>
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
                user_call_save={(event) => { this.user_call_save(event, selecteddata.schedule_user_id, selecteddata.scheduleuserprofiledata[0]["profile_pic_url"], selecteddata.scheduleuserprofiledata[0]["name"], selecteddata.scheduleuserprofiledata[0]["work_as"]); }}
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
          //console.log("fdgsdgsdfgdfgfdgfgfdgfd")
          let detail1 = <div onClick={this.props.dayclickhandler} className={classshared.col_cell.join(' ')} key={shortid.generate()}>
            <span id={spanid} className={classshared.number}></span><br />
          </div>
          return (
            days.push(
              <React.Fragment key={shortid.generate()}>{detail1}</React.Fragment>
            )
          )
        }
      }
      else {
        let detail2 = <div onClick={this.props.dayclickhandler} className={classshared.col_cell.join(' ')} key={shortid.generate()}>
          <span id={spanid} className={classshared.number}></span><br />
        </div>
        return (
          days.push(
            <React.Fragment key={shortid.generate()}>{detail2}</React.Fragment>
          )
        )
      }
    })
    return days;
  }
  renderCells() {
    if (this.state.week_result !== null) {
      let timeslot = []
      const rows = [];
      let days = [];
      let start_time = dateFns.getTime(dateFns.format(moment('09:00', 'h:mm')));
      let end_time = dateFns.getTime(dateFns.format(moment('24:00', 'h:mm')));
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
    let start_date = dateFns.subDays(this.state.week_first_date, 7);
    let end_date = dateFns.addDays(start_date, this.totaldays);
    let current_week = dateFns.format(start_date, 'DD MMM YYYY') + " - " + dateFns.format(end_date, 'DD MMM YYYY')

    let result = dateFns.eachDay(
      start_date,
      end_date
    )
    this.setState({ currentweek: current_week, week_last_date: end_date, week_result: result, week_first_date: start_date })
  };
  render() {
    return (
      <div className={classshared.w_container}>
        <Modal open={this.state.openusercallpopup} styles={customPopUp}
          onClose={this.closeopencallpopup} center showCloseIcon={false}>
          <Usercallpopupsender
            loggedin_user_id={this.props.loggedin_user_id}
            closemodal={this.closeopencallpopup}
            calleeuserprofilepic={this.state.calleeuserprofilepic}
            calleename={this.state.calleename}
            designation={this.state.calledesignation}
            imagetype={ProfilepicType.user_nav__user_photo_small}
            loggedinuserpofilepic={this.props.loggedin_user_profilepic_url}
            logedinuserfirstname={this.props.first_name}
            logedinuserlastname={this.props.last_name}
            iscaller={true}
          ></Usercallpopupsender>
        </Modal>
        <Modal open={this.state.is_open_video_component} styles={customPopUp}
          onClose={this.closeopenvideocallpopup} center showCloseIcon={false}>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
              <Videocomponent
                loggedin_user_id={this.props.loggedin_user_id}
                closemodal={this.closeopenvideocallpopup}
                twilio_token={this.state.twilio_token}
                twilio_identity={this.state.twilio_identity}
                twilio_room={this.state.twilio_room}
                iscaller={true}
              ></Videocomponent>
            </div>
          </MuiThemeProvider>
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
    );
  }
}
export default schedulecalendar;