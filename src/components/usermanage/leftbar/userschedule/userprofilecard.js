import React, { Component } from 'react';
import * as classshared from './classconst';
import Profilepic from '../../../UI/profilepic/profilepic'
import Icon from '../../../UI/Icon/Icon';
import VideocameraIcon from '../../../UI/Icon/videocamera';
import {ICONS} from '../../../../shared/utility'


class userprofilecard extends Component {               
    
    render()
    {      
        return(              
            <React.Fragment>                                
                {/* <div className={classshared.suggestion_card.join(' ')}> */}                
                    <div className={classshared.height_auto.join(' ')}>
                        <div className={classshared.flex_align_center.join(' ')}>
                            <div className={classshared.tieup_profile_content.join(' ')}>
                                <div className={classshared.tieup_profile_name.join(' ')}>{this.props.username}</div>
                                <div className={classshared.text_12}>{this.props.designation}</div>
                            </div>
                            <Profilepic profilepic_url={this.props.suggestioncardprofilepic} type={this.props.schedule_user_profile_pic}></Profilepic>
                        </div>                        
                    </div>
                    <div className={classshared.suggestion_card__unit_stats.join(' ')}>
                        <div className={classshared.size1of3.join(' ')} disabled={this.props.isdisable}>
                            <Icon svgclass={classshared.search__icon} icon={ICONS.PHONE_HANDSET}></Icon>
                        </div>
                        <div className={classshared.size1of3.join(' ')} onClick={!this.props.isdisable ? this.props.user_call_save: null} disabled={this.props.isdisable}>
                            <VideocameraIcon svgclass={classshared.search__icon}></VideocameraIcon>
                        </div>
                        <div className={classshared.size1of3_without_border.join(' ')} onClick={!this.props.isdisable ? this.props.deletecallschedule: null} disabled={this.props.isdisable}>
                            <Icon svgclass={classshared.search__icon} icon={ICONS.BUBBLE}></Icon>
                        </div>
                    </div>
                {/* </div>*/}                              
            </React.Fragment>
        )  
    }      
}
export default userprofilecard