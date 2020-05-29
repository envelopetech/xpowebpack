import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classshared from '../../exhibitionprofile/exhibitionprofiletab/classconst';
import Introduction from '../exhibitorabout/introduction';
import Additionalinfo from '../exhibitorabout/additionalinfo';
import Productlist from '../exhibitorproduct/productlist';
import UserPhoto from '../../streamline/userphotos';
import UserVideos from '../../streamline/uservideos';
import {feedpost_type} from '../../../shared/utility';
import Stafflist from '../exhibitorstaff/stafflist'

const tabitems = (props) => {     
    let activeindex = parseInt(props.tabindex, 10);
    return(
        <div className={classshared.main_content.join(' ')}>
            <div >                        
                <Tabs className={classshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classshared.react_tabs__tab_exhibitor__selected}>
                    <TabList className={classshared.react_tabs__tab_exhibitor__list}>                    
                        <Tab className={classshared.react_tabs__tab_exhibitor}>About</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Products</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Team</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Photos</Tab>                    
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Videos</Tab>                    
                    </TabList>                    
                    <TabPanel>
                        <Additionalinfo exhibitordata={props.exhibitordata}
                            loggedin_user_id={props.loggedin_user_id}                             
                            current_loggedin_user_profile_pic={props.currentuserprofilepicforotheruser}                                   
                            otherusername ={props.otherusername} 
                            otheruserid={props.otheruserid}
                            exhibitor_id={props.exhibitor_id}
                            is_editmode={props.is_editmode}
                            edit_mode_button_profile={props.edit_mode_button_profile} 
                            icon={props.icon} 
                            saveicon={props.saveicon}            
                            crossicon={props.crossicon}>
                        </Additionalinfo>
                        <Introduction
                            loggedin_user_id={props.loggedin_user_id}                             
                            current_loggedin_user_profile_pic={props.currentuserprofilepicforotheruser}                                   
                            otherusername ={props.otherusername} 
                            otheruserid={props.otheruserid}
                            exhibitor_id={props.exhibitor_id}
                            is_editmode={props.is_editmode}
                            edit_mode_button_profile={props.edit_mode_button_profile} 
                            icon={props.icon} 
                            saveicon={props.saveicon}            
                            crossicon={props.crossicon}
                        >
                        </Introduction>
                    </TabPanel>
                    <TabPanel>
                        <Productlist
                            loggedin_user_id={props.loggedin_user_id}                             
                            current_loggedin_user_profile_pic={props.currentuserprofilepicforotheruser}                                   
                            otherusername ={props.otherusername} 
                            otheruserid={props.otheruserid}
                            exhibitor_id={props.exhibitor_id}
                            is_editmode={props.is_editmode}
                            edit_mode_button_profile={props.edit_mode_button_profile} 
                            icon={props.icon} 
                            saveicon={props.saveicon}            
                            crossicon={props.crossicon}
                            currency_name={props.currency_name}>
                        </Productlist></TabPanel>
                    <TabPanel>
                        <Stafflist                  
                            loggedin_user_id={props.loggedin_user_id}                             
                            current_loggedin_user_profile_pic={props.currentuserprofilepicforotheruser}                                   
                            otherusername ={props.otherusername} 
                            otheruserid={props.otheruserid}
                            exhibitor_id={props.exhibitor_id}
                            is_editmode={props.is_editmode}
                            edit_mode_button_profile={props.edit_mode_button_profile} 
                            icon={props.icon} 
                            saveicon={props.saveicon}            
                            crossicon={props.crossicon}>
                        </Stafflist>
                    </TabPanel>     
                    <TabPanel>
                        <UserPhoto 
                            type_for={feedpost_type.exhibitor} 
                            loggedin_user_id={props.loggedin_user_id}                             
                            current_loggedin_user_profile_pic={props.currentuserprofilepicforotheruser}                                   
                            otherusername ={props.otherusername} 
                            otheruserid={props.otheruserid}
                            exhibitor_id={props.exhibitor_id}
                            is_editmode_exhibitor={props.is_editmode}
                            edit_mode_button_profile={props.edit_mode_button_profile} 
                            icon={props.icon} 
                            saveicon={props.saveicon}            
                            crossicon={props.crossicon}>
                        </UserPhoto>
                    </TabPanel>
                    <TabPanel>
                        <UserVideos 
                            type_for={feedpost_type.exhibitor} 
                            loggedin_user_id={props.loggedin_user_id}                             
                            current_loggedin_user_profile_pic={props.currentuserprofilepicforotheruser}                                   
                            otherusername ={props.otherusername} 
                            otheruserid={props.otheruserid}
                            exhibitor_id={props.exhibitor_id}
                            is_editmode_exhibitor={props.is_editmode}
                            edit_mode_button_profile={props.edit_mode_button_profile} 
                            icon={props.icon} 
                            saveicon={props.saveicon}            
                            crossicon={props.crossicon}>
                        </UserVideos>
                    </TabPanel>                   
                </Tabs>
            </div>
        </div>
    )      
}
export default React.memo(tabitems);