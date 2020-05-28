import React from 'react';
import * as classshared from '../classconst';
import NavigationItem from './navigationitems';
import homeimage from '../../../../../assets/images/home-1.png';
import accoutimage from '../../../../../assets/images/icon.png';
import exhibitionimage from  '../../../../../assets/images/black-gallon.png'

const navigations = ( props ) => (
    <ul className={classshared.sharing_buttons.join(' ')}>
        <NavigationItem link="/home" exact>
            <div className={classshared.navimage}>
                <img src={homeimage} alt="" className={classshared.imglink}/>
                <span className={classshared.social_link_ind}>Home</span>          
            </div>
        </NavigationItem>
        
        <NavigationItem link="/myaccount">
            <div className={classshared.navimage}>
                <img src={accoutimage} alt="" className={classshared.imglink}/>
                <span className={classshared.social_link_ind}>My Account</span>          
            </div>
        </NavigationItem>

        <NavigationItem link="/wingsterzone">
            <div className={classshared.navimage}>
                <img src={exhibitionimage} alt="" className={classshared.imglink}/>
                <span className={classshared.social_link_ind}>Wingster Zone</span>          
            </div>
        </NavigationItem> 
    </ul>
);
export default navigations;