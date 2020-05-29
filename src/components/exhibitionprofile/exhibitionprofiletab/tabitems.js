import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classshared from './classconst';
import Exhibitorlist from '../exhibitorlist/exhibitorlist'
import Postenquries from '../postenquries/postenquries';
import Eventintroduction from '../eventintroduction';
import Eventexhibitorprofile from '../eventexhibitorprofile';
import Eventvisitorpofile from '../eventvisitorpofile';

const tabitems = (props) => {

    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div className={classshared.main_content.join(' ')}>
            <div >
                <Tabs className={classshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classshared.react_tabs__tab_exhibitor__selected}>
                    <TabList className={classshared.react_tabs__tab_exhibitor__list}>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Introduction</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Exhibitor Profile</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Visitor Profile</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Exhibitor List</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Post Enquiries</Tab>
                    </TabList>
                    <TabPanel>
                        <Eventintroduction event_introduction={props.event_introduction}></Eventintroduction>
                    </TabPanel>
                    <TabPanel>
                        <Eventexhibitorprofile event_exhibitor_profile={props.event_exhibitor_profile}></Eventexhibitorprofile>
                    </TabPanel>
                    <TabPanel>
                    <Eventvisitorpofile event_visitor_profile={props.event_visitor_profile}></Eventvisitorpofile>
                    </TabPanel>
                    <TabPanel>
                        <Exhibitorlist loggedin_user_id={props.loggedin_user_id} withoutloggedin={props.withoutloggedin}
                            event_id={props.event_id}></Exhibitorlist>
                    </TabPanel>
                    <TabPanel>
                        <Postenquries
                            eventlivestatus={props.eventlivestatus}
                            loggedin_user_id={props.loggedin_user_id}
                            event_id={props.event_id}></Postenquries>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
export default React.memo(tabitems);