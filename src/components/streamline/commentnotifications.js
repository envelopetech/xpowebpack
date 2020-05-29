import React from 'react';
import * as classshared from './classconst'; 
import Profilepic from '../UI/profilepic/profilepic';
import axios from '../../store/axios-orders'; 
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';


class commentnotifications extends React.Component { 
    
    constructor(props)
    {        
        super(props)
        this.state={ 
            is_read_notification:props.is_read_notification
        }
    }
    notificationmasrkasseenhandler= ( event, id ) => { 
        event.preventDefault();           
        const data = {
            id: id           
        };     
        this.props.onuser_notification_mark_asread(data );   
        this.setState({is_read_notification:true})      
    }    
    render()
    {         
       
        let isreadclass = null;
        if(this.state.is_read_notification)
        {
            isreadclass = classshared.notification_item_isread
        }
        else{
            isreadclass= classshared.notification_item
        }

        return(           
            <React.Fragment>
                <li className={isreadclass.join(' ')} onClick={( event ) => this.notificationmasrkasseenhandler( event, this.props.activityverbid)}>
                <div className={classshared.streamline__card_left}>
                        <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname=""></Profilepic> 
                </div>
                <div className={classshared.streamline__card_right}>
                    <div className={classshared.streamline__card_header}>
                        <div className={classshared.streamline__card_header_name}>
                                <span className={classshared.streamlinename_medium.join(' ')}>{this.props.userpostername}</span> 
                                <span className={classshared.streamlinemessage_medium.join(' ')}>{this.props.notification_messages}</span> 
                        </div>
                        <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>{this.props.posttime}</span>
                    </div>
                </div>
                </li>
            </React.Fragment>
        )  
    } 
}

const mapDispatchToProps = dispatch => {
    return {                           
        onuser_notification_mark_asread: ( data ) => dispatch( actions.user_notification_mark_asread( data ) ),         
        
    };
};
export default connect(null, mapDispatchToProps)(commentnotifications, axios );