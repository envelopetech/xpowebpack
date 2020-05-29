import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classshared from '../commoncss/classconst';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const eventvisitorpofile = (props) => {

    return (
        <React.Fragment>
            <div className={classshared.about_section.join(' ')}>
                <div className={classshared.introduction_header.join(' ')}>Visitor Profile</div>                
                { ReactHtmlParser(props.event_visitor_profile) }
               



            </div>
        </React.Fragment>
    )
}
export default React.memo(eventvisitorpofile);