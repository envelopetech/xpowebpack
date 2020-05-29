import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classesshared from '../usermanage/leftbar/classconst';
import Deals from './deals/deals';
import Activity from './activity/activity';
import Wingsters from './wingsters/wingsterlist'


const tabitems = (props) => {
    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div>
            <Tabs className={classesshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classesshared.react_tabs__tab_profile__selected}>
                <TabList className={classesshared.react_tabs__tab_profile__list}>
                    <Tab className={classesshared.react_tabs__tab_profile}>Profile</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Deals</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Activity</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Wingsters</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Payout</Tab>
                </TabList>
                <TabPanel>Profile
                </TabPanel>
                <TabPanel><Deals
                    page_type={props.page_type}
                    loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                    usertypename={props.usertypename}
                    wing_id={props.wing_id}>
                </Deals></TabPanel>
                <TabPanel>
                    <Activity
                        page_type={props.page_type}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}
                        wing_id={props.wing_id}>
                    </Activity>
                </TabPanel>
                <TabPanel><Wingsters
                    page_type={props.page_type}
                    loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                    usertypename={props.usertypename}
                    wing_id={props.wing_id}></Wingsters></TabPanel>
                <TabPanel>Payout</TabPanel>
            </Tabs>
        </div>
    )
}
export default React.memo(tabitems);