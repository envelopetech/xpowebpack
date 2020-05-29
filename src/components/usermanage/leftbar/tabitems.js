import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classesshared from '../../exhibitionprofile/exhibitionprofiletab/classconst';
import Userwings from '../../wings/winglist/userwings'
import UserExhibition from '../leftbar/userexhibitions/userexhibitions';
import Schedulecalendar from '../leftbar/userschedule/schedulecalendar';
import MediaQuery from 'react-responsive';
import ComingSoon from '../../comingsoon/comingsoon'

const tabitems = (props) => {
    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div >
            <Tabs className={classesshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classesshared.react_tabs__tab_exhibitor__selected}>
                <TabList className={classesshared.react_tabs__tab_exhibitor__list}>
                    {/* <Tab className={classesshared.react_tabs__tab_exhibitor}>Wings</Tab> */}
                    <Tab className={classesshared.react_tabs__tab_exhibitor}>Exhibitions</Tab>
                    <Tab className={classesshared.react_tabs__tab_exhibitor}>Enquiries</Tab>
                    <Tab className={classesshared.react_tabs__tab_exhibitor}>Schedule</Tab>
                </TabList>
                <TabPanel>
                    {/* <Userwings page_type={props.page_type}
                        currency_name={props.currency_name}
                        usertypename={props.usertypename}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}>
                    </Userwings> */}
                    <UserExhibition loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}></UserExhibition>
                </TabPanel>
                <TabPanel>
                <div className={classesshared.main_content}>
                <ComingSoon message={"Nobody has enquired yet!"} subtitle={"The enquiries placed by the visitors during a live exhibition will be displayed here"}/>
                </div>
                    
                
                </TabPanel>
                <TabPanel>
                    <ComingSoon message={"No calls scheduled!"} subtitle={"The calls you schedule for live exhibitions will be displayed here."}/>
                </TabPanel>
                <TabPanel>
                <ComingSoon></ComingSoon>
                    {/* <MediaQuery query="(max-width: 1224px)">
                        <Schedulecalendar
                            first_name={props.first_name}
                            last_name={props.last_name}
                            loggedin_user_id={props.loggedin_user_id}
                            loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                            is_schedule_call={true}>
                        </Schedulecalendar>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <Schedulecalendar
                            first_name={props.first_name}
                            last_name={props.last_name}
                            loggedin_user_id={props.loggedin_user_id}
                            is_schedule_call={false}
                            loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        >
                        </Schedulecalendar>
                    </MediaQuery> */}
                </TabPanel>
            </Tabs>
        </div>
    )
}
export default React.memo(tabitems);