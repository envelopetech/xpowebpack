import React from 'react';
import { NavLink } from 'react-router-dom';
import * as classshared from '../classconst';

const navigationItem = ( props ) => {
    return(
        <li className={classshared.NavigationItem}>
        <div className={classshared.social_card_base.join(' ')}>
                <div className={classshared.navimage}>                
                    <NavLink   
                    className={classshared.social_link.join(' ')}
                    to={props.link}
                    exact={props.exact}
                    activeClassName={classshared.NavigationItemActive.join(' ')}>{props.children}</NavLink>      
                </div>                                                            
            </div>   
        </li>
    )
};

export default navigationItem;