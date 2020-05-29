import React from 'react';
import * as classshared from '../commoncss/classconst';
import Upcomingevents from './upcomingevents';

const exploreexpo = (props) => {    
    return (
        <React.Fragment>
            <div className={classshared.w_container_main_content_coming_soon.join(' ')}>                
               <Upcomingevents upcomingeventdata={props.upcomingeventdata}></Upcomingevents>
            </div>
        </React.Fragment>
    )
}
export default React.memo(exploreexpo);