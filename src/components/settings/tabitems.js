import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classesshared from '../usermanage/leftbar/classconst';
import Personal from './personal/personal';
import Business from './business/business';
// import Plans from './plans/plans'
import BillingHistory from './billinghistory/billinghistory'
import Paymentmethod from './paymentmethod/paymentmethod'
// import Referrals from './referrals/referrals'
import Changepassword from './changepassword/changepassword'
import Comngsoon from '../comingsoon/comingsoon'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css';

const tabitems = (props) => {
    let activeindex = parseInt(props.tabindex, 10);
    return (
        <div>
            <ReactNotification className={classesshared.popupnotification} />
            <Tabs className={classesshared.react_tabs} selectedIndex={activeindex} onSelect={props.onChange} selectedTabClassName={classesshared.react_tabs__tab_profile__selected}>
                <TabList className={classesshared.react_tabs__tab_profile__list}>
                    <Tab className={classesshared.react_tabs__tab_profile}>Personal</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Business</Tab>
                    {/* <Tab className={classesshared.react_tabs__tab_profile}>Plans</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Billing History</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Payment Method</Tab>
                    <Tab className={classesshared.react_tabs__tab_profile}>Referrals</Tab> */}
                    <Tab className={classesshared.react_tabs__tab_profile}>Password</Tab>
                </TabList>
                <TabPanel>
                    <Personal
                        loading={props.loading}
                        page_type={props.page_type}
                        usertypename={props.usertypename}
                        submitpersonaldetail={props.submitpersonaldetail}
                        first_name={props.first_name}
                        last_name={props.last_name}
                        location={props.location}
                        profile_pic_url={props.profile_pic_url}
                        profile_pic_url_preview={props.profile_pic_url_preview}
                        phone_number={props.phone_number}
                        company_email={props.company_email}
                        personal_email={props.personal_email}
                        address1={props.address1}
                        address2={props.address2}
                    >
                    </Personal>
                </TabPanel>
                <TabPanel>
                    <Business
                        industrylist={props.industrylist}
                        loading={props.loading}
                        page_type={props.page_type}
                        submitbusinessdetail={props.submitbusinessdetail}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}
                        business_name={props.business_name}
                        designation={props.designation}
                        industry={props.industry}
                        company_website={props.company_website}
                        company_logo_url={props.company_logo_url}
                        company_logo_url_preview={props.company_logo_url_preview}
                        industrydata={props.industrydata}>
                    </Business>
                </TabPanel>
                <TabPanel>
                    <Changepassword
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}
                    ></Changepassword>
                </TabPanel>
                <TabPanel>
                    {/* <Plans
                        page_type={props.page_type}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}>
                    </Plans> */}
                    <Comngsoon></Comngsoon>
                </TabPanel>
                <TabPanel>
                    {/* <BillingHistory
                        page_type={props.page_type}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}>
                    </BillingHistory> */}
                    <Comngsoon></Comngsoon>
                </TabPanel>
                <TabPanel>
                    {/* <Paymentmethod
                        page_type={props.page_type}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}>
                    </Paymentmethod> */}
                    <Comngsoon></Comngsoon>
                </TabPanel>
                <TabPanel>
                    {/* <Referrals
                        page_type={props.page_type}
                        loggedin_user_profilepic_url={props.loggedin_user_profilepic_url}
                        usertypename={props.usertypename}>
                    </Referrals> */}
                    <Comngsoon></Comngsoon>
                </TabPanel>

            </Tabs>
        </div>
    )
}
export default React.memo(tabitems);