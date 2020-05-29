import React from 'react';
import  * as classshared from '../../commoncss/classconst';
import Sidebarwinglist from './sidebarwinglist';

const sidebar = ( props ) => {            
    return (
        <React.Fragment>
            <div className={classshared.sidebar__user_stats_wrapper}>
            <div className={classshared.sidebar__user_stats_sidebar.join(' ')}>
                <div className={classshared.sidebar__user_stats_left.join(' ')}>
                    <div className={classshared.font_2_regular_text_14_text_light.join(' ')}>Total Wings</div>
                    <h2 className={classshared.text_dark}>{props.totalwings}</h2>
                </div>
                <div className={classshared.sidebar__user_stats_right}>
                    <div className={classshared.font_2_regular_text_14_text_light.join(' ')}>Total Wingsters</div>
                    <h2 className={classshared.text_dark}>{props.totalwingsters}</h2>
                </div>
            </div>                
            </div>
            <Sidebarwinglist></Sidebarwinglist>
        </React.Fragment> 
    );
}
export default sidebar;