import React, { Component } from 'react';
import * as classshared from '../commoncss/classconst';
import Icon from '../UI/Icon/Icon';
import {ICONS} from '../../shared/utility';
import NewlyjoinedUsers from '../usertieups/newlyjoineduser';
import Businessgenerator from '../usertieups/businessgenerator';
import Largestbeneficiaries from '../usertieups/largestbeneficiaries';


class explorepeople extends Component {    
    render()
    {        
        return(
            <React.Fragment>
                <div className={classshared.main_content_tab.join(' ')}>
                    <div className={classshared.size1of1}>
                        <h1 className={classshared.text_dark_margin_b_m.join(' ')}>Explore People</h1>
                        <div>
                            <div className={classshared.flex}>
                                <Icon svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')} icon={ICONS.USER1}/> 
                                <h4 className={classshared.font_1_medium}>Newly Joined</h4>
                            </div>
                            <div className={classshared.flex_margin_t_m.join(' ')}>
                                <NewlyjoinedUsers currency_name={this.props.currency_name}></NewlyjoinedUsers>
                            </div>
                        </div>
                        <div className={classshared.margin_top__lv8}>
                            <div className={classshared.flex}>
                                <Icon svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')} icon={ICONS.TROPHY}/> 
                                <h4 className={classshared.font_1_medium}>Highest Business Generator</h4>
                            </div>
                            <div className={classshared.flex_margin_t_m.join(' ')}>
                                <Businessgenerator currency_name={this.props.currency_name}></Businessgenerator>
                            </div>
                        </div>
                        <div className={classshared.margin_top__lv8}>
                            <div className={classshared.flex}>
                                <Icon svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')} icon={ICONS.WALLET}/> 
                                <h4 className={classshared.font_1_medium}>Largest Beneficiaries</h4>
                            </div>
                            <div className={classshared.flex_margin_t_m.join(' ')}>
                                <Largestbeneficiaries currency_name={this.props.currency_name}></Largestbeneficiaries>
                            </div>
                        </div>
                    </div>                    
                </div>                          
            </React.Fragment>
        )
    }
}
export default explorepeople