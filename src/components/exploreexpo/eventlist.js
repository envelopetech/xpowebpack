import React from 'react';
//import { geteventlist } from '../../actions/events/dataactions';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import Eventlistitems from './eventlistitems';
import * as classshared from '../commoncss/classconst';
import Nodatamessage from '../nodatamessage/nodatamessage'
import nodataimage from '../../assets/images/nodatafound.svg';
import { ButtonType,  nodatatext_image_configuration, nodatatext_message } from '../../shared/utility'
import shortid from "shortid";
//import windowSize from 'react-window-size';
import MediaQuery from 'react-responsive';

const params = {
    slidesPerView: 3,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 5
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 3
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 3
        }
    },
    spaceBetween: 10,
    rebuildOnUpdate: true,
    observer: true
}
const eventlist = (props) => {
    //class eventlist extends React.Component {
    //class eventlist extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         eventdata: null,
    //     }
    // }
    // componentDidMount() {
    //     var data = geteventlist(props.eventtype)
    //     data.then(res => {
    //         if (res !== undefined) {
    //             if (res.data["error"] === undefined && res.data.length > 0) {
    //                 this.setState({ eventdata: res.data });
    //             }
    //         }
    //     });
    // }
    // render() {
    //alert(props.windowWidth)
    let nofoundmessage = null;
    // if (props.eventtype === EventType.liveevent) {
         nofoundmessage = nodatatext_message.noliveeventfound
    // }
    // else {
    //    nofoundmessage = nodatatext_message.noupcomingeventfound
    //}
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
            let islazyloading = false;
            if (i > 3) {
                islazyloading = true;
            }
            let items =
                <Eventlistitems key={item.id}
                    usertypename={props.usertypename}
                    is_lazyloading={islazyloading}
                    eventimage={item.event_pic_url}
                    title={item.event_title}
                    id={item.id}
                    display_date={item.display_date}
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
                    descriptionsubstring={item.descriptionsubstring}
                ></Eventlistitems>
            return (
                <div key={shortid.generate()}>{items}</div>
            )
        }
        )
        if (props.eventdata.length > 3) {
            divrenderproductimage = <Swiper {...params}>
                {data}
            </Swiper>
        }
        else {
            divrenderproductimage =
                <React.Fragment><MediaQuery query="(max-width: 1224px)"><div className={classshared.displayblock}>{data}</div></MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)"><div className={classshared.flex}>{data}</div></MediaQuery></React.Fragment>
        }
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
            {/* <div className={classshared.w_container}> */}
            <div className={classshared.padding_all_25m}>
                <div className={classshared.div_width_90}> {divrenderproductimage}</div></div>
            {/* </div> */}
        </React.Fragment>
    )
}
export default React.memo(eventlist);