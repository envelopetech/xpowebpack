import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classshared from '../../exhibitionprofile/exhibitionprofiletab/classconst';
import Tieups from '../../usertieups/tieupslist';
import UserPost from '../../streamline/userstreamline';
import UserPhoto from '../../streamline/userphotos';
import UserVideos from '../../streamline/uservideos'
import { feedpost_type } from '../../../shared/utility';

const tabitems = (props) => {

    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div className={classshared.main_content.join(' ')}>
            <div >
                <Tabs className={classshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classshared.react_tabs__tab_exhibitor__selected}>
                    <TabList className={classshared.react_tabs__tab_exhibitor__list}>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Streamline</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Photos</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Videos</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Tieups</Tab>
                    </TabList>
                    <TabPanel>
                        <UserPost is_tieups={props.is_tieups} type_for={feedpost_type.personal} 
                        loggedin_user_id={props.loggedin_user_id}                         
                        otherusername={props.otherusername} 
                        current_loggedin_user_profile_pic={props.current_loggedin_user_profile_pic} 
                        otheruserid={props.otheruserid}>
                        </UserPost>
                    </TabPanel>
                    <TabPanel>
                        <UserPhoto 
                        is_tieups={props.is_tieups} 
                        type_for={feedpost_type.personal} 
                        loggedin_user_id={props.loggedin_user_id}                         
                        otherusername={props.otherusername} 
                        current_loggedin_user_profile_pic={props.current_loggedin_user_profile_pic} 
                        otheruserid={props.otheruserid}>
                        </UserPhoto>
                    </TabPanel>
                    <TabPanel>
                        <UserVideos 
                        is_tieups={props.is_tieups} 
                        type_for={feedpost_type.personal} 
                        loggedin_user_id={props.loggedin_user_id}                         
                        otherusername={props.otherusername} 
                        current_loggedin_user_profile_pic={props.current_loggedin_user_profile_pic} 
                        otheruserid={props.otheruserid}>
                        </UserVideos>
                    </TabPanel>
                    <TabPanel>
                        <Tieups is_tieups={props.is_tieups} 
                        otheruserid={props.otheruserid} 
                        type_for={feedpost_type.personal}>
                        </Tieups>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
export default React.memo(tabitems);