import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import * as classshared from '../commoncss/classconst';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const eventintroduction = (props) => {

    return (
        <React.Fragment>
            <div className={classshared.about_section.join(' ')}>
                <div className={classshared.introduction_header.join(' ')}>Introduction</div>                
                { ReactHtmlParser(props.event_introduction) }
                <p>
                    To book a slot as a visitor click <a href="#top">here</a>. To book a stall as an exhibitor,
                            click <a href="#top">here</a></p>




            </div>
        </React.Fragment>
    )
}
export default React.memo(eventintroduction);