import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classesshared from '../usermanage/leftbar/classconst';
import Eventlist from './eventlist'
import { EventType } from '../../shared/utility'


const tabitems = (props) => {
    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div >
            <Tabs className={classesshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classesshared.react_tabs__tab_profile__selected}>
                <TabList className={classesshared.react_tabs__tab_profile__list}>
                    <Tab className={classesshared.react_tabs__tab_profile}>Live Events</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Upcoming Events</Tab>
                </TabList>
                <TabPanel><Eventlist
                    usertypename={props.usertypename}
                    eventdata={props.liveeventdata}
                    eventtype={EventType.liveevent}
                    loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                    loggedinuser_email={props.loggedinuser_email}
                    loggedinuser_phonenumber={props.loggedinuser_phonenumber}
                    loggedinuser_name={props.loggedinuser_name}></Eventlist></TabPanel>
                <TabPanel>
                    <Eventlist
                        usertypename={props.usertypename}
                        eventdata={props.upcomingeventdata}
                        eventtype={EventType.upcomingevent}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        loggedinuser_email={props.loggedinuser_email}
                        loggedinuser_phonenumber={props.loggedinuser_phonenumber}
                        loggedinuser_name={props.loggedinuser_name}>
                    </Eventlist>
                </TabPanel>
            </Tabs>
        </div>
    )
}
export default React.memo(tabitems);