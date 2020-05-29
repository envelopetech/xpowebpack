import React, { Component } from 'react';
import * as classshared from './classconst';
import { titleheading, label_text, ButtonType } from '../../shared/utility'
import Button from '../UI/Button/Button';



class notificationsmessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalnotification_count: 0,
            notification_data: null,
            shownotificationmenu: false,
            mainclass: [classshared.user_nav__icon_box],

        }
    }
    shownotificationmenu = (event) => {
        event.preventDefault();
        this.setState({ shownotificationmenu: true, mainclass: classshared.user_nav__icon_box_selected }, () => {
            document.addEventListener('click', this.closenotificationmenu);
        });
        this.setState({ totalnotification_count: 0 })
    }
    closenotificationmenu = (event) => {
        event.preventDefault();
        this.setState({ shownotificationmenu: false, mainclass: classshared.user_nav__icon_box }, () => {
            document.removeEventListener('click', this.closenotificationmenu);
        });
    }
    render() {
        let shownotificationcoundiv = null;
        if (this.state.totalnotification_count > 0) {
            shownotificationcoundiv = <span className={classshared.user_nav__notification}>{this.state.totalnotification_count}</span>
        }
        return (
            <React.Fragment>
                <div className={this.state.mainclass} onClick={this.shownotificationmenu.bind(this)}>
                    <i className={classshared.fontawesome_envelope.join(' ')}></i>
                    {shownotificationcoundiv}
                    {
                        this.state.shownotificationmenu
                            ? (
                                <div className={classshared.nav_item_notifications_dropdown.join(' ')}>
                                    <div className={classshared.dropdown_notification_title.join(' ')}>{titleheading.messages}</div>
                                    <ul className={classshared.notification_list}>
                                        <li className={classshared.notification_item.join(' ')}>
                                            <div className={classshared.flex}>
                                                <div className={classshared.streamline__card_left.join(' ')}>                                                    
                                                </div>
                                                <div className={classshared.streamline__card_right.join(' ')}>
                                                    <div className={classshared.streamline__card_header.join(' ')}>
                                                        <div className={classshared.streamline__card_header_name}>                                                            
                                                            <span className={classshared.font_2_regular_text_12_text_normal.join(' ')}>You have no new message</span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                    <Button btntype={ButtonType.btnshowallnotifications} clicked={this.editposthandler}>{label_text.viewallmessages}</Button>
                                </div>
                            ) : (null)
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default React.memo(notificationsmessages);