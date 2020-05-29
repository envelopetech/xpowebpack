import React from 'react';
import Search from './../UI/search/search';
import Sidebar from '../usermanage/sidebar/sidebar';
import {searchplaceholder} from '../../shared/utility';
const mobilesearch = (props) => {

    return (
        <React.Fragment>
            <Search placeholder={searchplaceholder.headersearch}/>
            <Sidebar />
        </React.Fragment>
    )

}
export default mobilesearch;