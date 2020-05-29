import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classshared from '../commoncss/classconst';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const eventexhibitorprofile = (props) => {

    return (
        <React.Fragment>
            <div className={classshared.about_section.join(' ')}>
                <div className={classshared.introduction_header.join(' ')}>Exhibitor Profile</div>                
                { ReactHtmlParser(props.event_exhibitor_profile) }
                


            </div>
        </React.Fragment>
    )
}
export default React.memo(eventexhibitorprofile);