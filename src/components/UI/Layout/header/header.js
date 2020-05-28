import React, { Component } from 'react';
import * as classshared from './classconst';
import xporiumlogo from '../../../../assets/images/143.511--x-25-px.png';
import Navigations from './navigation/navigations';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Profilepic from '../../profilepic/profilepic';
import { ButtonType, ButtonText, ICONS } from '../../../../shared/utility';


class header extends Component {
    state = {
        showMenu: false
    }
    showMenu = () => {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenu(event) {
        event.preventDefault();
        //if (!this.dropdownMenu.contains(event.target)) {          
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
        //}
    }
    render() {
        return (
            <div className={classshared.topnavbar.join(' ')}>
                <div className={classshared.nav_bar_wrap.join(' ')}>
                    <div className={classshared.logo_block.join(' ')}><img src={xporiumlogo} alt="" className={classshared.dashboard_logo} /></div>
                    <div className={classshared.header_row.join(' ')}>
                        <div className={classshared.search_column.join(' ')}>
                            <input type="search" id="search" name="query" placeholder="   Search expo, exhibitors, people..." maxLength="256" required="" className={classshared.search_block.join(' ')} />
                        </div>
                        <div className={classshared.dash_columns.join(' ')}>
                            <div >
                                <Navigations></Navigations>
                                {/* <a  className={classshared.headernavmenu} onClick={( event ) => this.navclick( event, 'home' )}>                                
                                    <div className={classshared.social_card_base.join(' ')}>
                                       <div className={classshared.navimage}>
                                            <img src={homeimage} alt="" className={classshared.imglink}/>
                                            <span className={classshared.social_link}>Home</span>          
                                        </div>
                                        {gredientlinedivhome}                            
                                    </div>                      
                                </a>
                                <a  className={classshared.headernavmenu} onClick={( event ) => this.navclick( event, 'account' )}>                                 
                                <div className={classshared.social_card_base.join(' ')}>
                                   <div className={classshared.navimage}>
                                        <img src={accoutimage} alt="" className={classshared.imglink}/>
                                        <span className={classshared.social_link}>My Account</span>          
                                    </div>
                                    {gredientlinedivaccount}                       
                                </div>                      
                            </a>
                            <a  className={classshared.headernavmenu} onClick={( event ) => this.navclick( event, 'exhibition' )}>                                
                                    <div className={classshared.social_card_base.join(' ')}>
                                       <div className={classshared.navimage}>
                                            <img src={exhibitionimage} alt="" className={classshared.imglink}/>
                                            <span className={classshared.social_link}>My Exhibition</span>          
                                        </div>
                                        {gredientlinedivexhibition}                           
                                    </div>                      
                                </a> */}
                            </div>
                        </div>
                        <div className={classshared.profile_column.join(' ')}>
                            {/* <div className={classshared.profile_link}><a  className={classshared.link_16dark.join(' ')}><br/></a>
                                <a className={classshared.link_16}><br/></a><a className={classshared.link_16}><br/></a>
                            </div> */}
                            <div className={classshared.profile_block} onClick={this.showMenu.bind(this)}>
                                <Profilepic profilepic_url={this.props.profilepic_url} altname={this.props.first_name}></Profilepic>
                                <div className={classshared.name_text}>{this.props.first_name}<br /></div>
                                <div className={classshared.name_text}><span className={classshared.text_span_3}></span></div>
                            </div>
                            {
                                this.state.showMenu
                                ? (
                                    <div
                                        className={classshared.list_dropdown_content}
                                        ref={(element) => {
                                            this.dropdownMenu = element;
                                        }}>
                                        <Button btntype={ButtonType.btnlistdeleteedit} svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}>
                                            {ButtonText.logout}
                                        </Button>
                                    </div>
                                )
                                : 
                                (
                                    null
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default header;