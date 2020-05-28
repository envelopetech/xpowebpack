import React from 'react';
import LeftHeader from './header/leftheader';
import RightHeader from './header/rightheader';
import * as classshared from './classconst';

const layout = (props) => {

    //let contentclass= null;

    // switch(props.pageType)
    // {
    //     case(PageType.event):
    //             contentclass = classshared.contentmaincontent.join(' ')
    //         break;
    //     default:
    //         contentclass = classshared.content;
    //         break;
    // }  
    let bottomdivid = null;
    if (props.bottomdivid !== null && props.bottomdivid !== undefined) {
        bottomdivid = props.bottomdivid;
    }

    return (
        <React.Fragment>
            <div id="left" className={classshared.column}>
                <div className={classshared.left_header}>
                    <LeftHeader></LeftHeader>
                    {props.sidebarleftfixchildrens}
                </div>
                {props.sidebarchildrens}
            </div>
            <div id="right" className={classshared.column.join(' ')}>
                {
                    props.ishiderightheader ?
                        (null) :
                        (<div id="divright" className={classshared.right_header}> <RightHeader
                            wingname={props.wingname}
                            wing_id={props.wing_id}
                            user_wing_id={props.user_wing_id}
                            exhibitordata={props.exhibitordata}
                            is_exhibitor={props.is_exhibitor}
                            first_name={props.first_name}
                            last_name={props.last_name}
                            profilepic_url={props.profilepic_url}
                            loggedin_user_id={props.loggedin_user_id}
                        > </RightHeader></div>)
                }

                <div className={classshared.bottom}>{props.contentchildrens}</div>
            </div>
        </React.Fragment>
    )
}

export default layout;