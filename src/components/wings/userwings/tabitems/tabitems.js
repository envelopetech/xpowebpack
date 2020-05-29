import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs-Exhibition_Profile.css';
import React from 'react';
import * as classshared from '../../../exhibitionprofile/exhibitionprofiletab/classconst';
import Userwingstreamline from '../../../streamline/wingstreamline/userwingstreamline';
import { Wingposttype, users_type } from '../../../../shared/utility';

const tabitems = (props) => {       
    let divblurclass = null   
    if ((props.usertypename === users_type.visitor || props.usertypename === users_type.wingster) && !props.is_member) {
        divblurclass= classshared.blurdiv
    }
    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div className={classshared.main_content.join(' ')}>
            <div className={divblurclass}>
                <Tabs className={classshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classshared.react_tabs__tab_exhibitor__selected}>
                    <TabList className={classshared.react_tabs__tab_exhibitor__list}>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Streamline</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Recommend</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Leads</Tab>
                        <Tab className={classshared.react_tabs__tab_exhibitor}>Conversion</Tab>
                    </TabList>
                    <TabPanel>
                        <Userwingstreamline
                            is_member={props.is_member}                            
                            usertypename={props.usertypename}
                            wings_users={props.wings_users}
                            loggedin_user_pic_url={props.loggedin_user_pic_url}
                            wing_id={props.wing_id}
                            loggedin_user_id={props.loggedin_user_id}
                            post_type={Wingposttype.all.toLowerCase()}
                            tabitems={activeindex}
                            currency_name={props.currency_name} >
                        </Userwingstreamline>
                    </TabPanel>
                    <TabPanel>
                        <Userwingstreamline                         
                            is_member={props.is_member}
                            usertypename={props.usertypename}
                            wings_users={props.wings_users}
                            loggedin_user_pic_url={props.loggedin_user_pic_url}
                            wing_id={props.wing_id}
                            loggedin_user_id={props.loggedin_user_id}
                            post_type={Wingposttype.recommend.toLowerCase()}
                            tabitems={activeindex}
                            currency_name={props.currency_name} >
                        </Userwingstreamline>
                    </TabPanel>
                    <TabPanel>
                        <Userwingstreamline                         
                            is_member={props.is_member}
                            usertypename={props.usertypename}
                            wings_users={props.wings_users}
                            loggedin_user_pic_url={props.loggedin_user_pic_url}
                            wing_id={props.wing_id}
                            loggedin_user_id={props.loggedin_user_id}
                            post_type={Wingposttype.lead.toLowerCase()}
                            tabitems={activeindex}
                            currency_name={props.currency_name} >
                        </Userwingstreamline>
                    </TabPanel>
                    <TabPanel>
                        <Userwingstreamline                         
                            usertypename={props.usertypename}
                            is_member={props.is_member}
                            wings_users={props.wings_users}
                            loggedin_user_pic_url={props.loggedin_user_pic_url}
                            wing_id={props.wing_id}
                            loggedin_user_id={props.loggedin_user_id}
                            post_type={Wingposttype.conversion.toLowerCase()}
                            tabitems={activeindex}
                            currency_name={props.currency_name} >
                        </Userwingstreamline>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
export default React.memo(tabitems);