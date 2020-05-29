import React from 'react';
import * as classshared from './classconst';
import { ButtonText } from '../../../shared/utility'
import Peopleimage from '../../../assets/images/undraw-people.svg'
import Wingimage from '../../../assets/images/undraw-wings.svg'
import Expoimage from '../../../assets/images/product-tour.svg'
import { Redirect } from 'react-router-dom'

class sidebar extends React.Component {
    state = {
        redirecttoexplorepeople: false,
        redirecttoexploreexpo: false,
        redirecttoexplorewing: false,
    }
    redirectexplorepeoplehandler = () => {
        this.setState({
            redirecttoexplorepeople: true
        })
    }
    redirectexploreexpohandler = () => {
        this.setState({
            redirecttoexploreexpo: true
        })
    }
    redirectexploreewinghandler = () => {
        this.setState({
            redirecttoexplorewing: true
        })
    }
    render() {
        let explorepeople = null;
        if (this.state.redirecttoexplorepeople) {
            //explorepeople = <Redirect to={`/explorepeople`} />
            explorepeople = <Redirect to={`/comingsoon`} />
        }
        let exploreexpo = null;
        if (this.state.redirecttoexploreexpo) {
            exploreexpo = <Redirect to={`/exploreexpo`} />
        }
        let explorewing = null;
        if (this.state.redirecttoexplorewing) {
            //explorewing = <Redirect to={`/explorewings`} />
            //explorepeople = <Redirect to={`/comingsoon`} />    
            explorewing =  <Redirect to={{
                pathname: '/comingsoon',
                state: { id: '123' }
            }} />
        }
        return (
            <React.Fragment>
                {explorepeople}
                {exploreexpo}
                {explorewing}
                <div className={classshared.sidebar_bottom.join(' ')}>
                    <div className={classshared.sidebar_item}>
                        <div className={classshared.sidebar_item_title}>
                            <h4 className={classshared.text_dark}>What can we help you find, <span className={classshared.text_trancform_c}>{this.props.name}</span></h4>
                        </div>
                        <div className={classshared.sidebar_item_wrapper.join(' ')} onClick={this.redirectexplorepeoplehandler}>
                            <div className={classshared.absolute_right__lv0.join(' ')}>
                                <div className={classshared.card_label_orange.join(' ')}>Coming Soon</div>
                            </div>
                            <div className={classshared.flex}>
                                <div className={classshared.img_square_m_wrapper}>
                                    <img src={Peopleimage} alt="people" className={classshared.img_square_m} />
                                </div>
                                <div className={classshared.sidebar_item_content}>
                                    {/* <NavLink     
                                className={classshared.font_1_medium_text_dark_text_color_strong_blue.join(' ')}                  
                                to={`/explorepeople`}>{ButtonText.people}</NavLink> */}
                                    <span className={classshared.font_1_medium_text_dark_text_color_strong_blue.join(' ')}>{ButtonText.people}</span>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.sidebar_item_wrapper_without_comingsoon} onClick={this.redirectexploreexpohandler}>
                            <div className={classshared.img_square_m_wrapper}>
                                <img src={Expoimage} alt="Exhibition" className={classshared.img_square_m} />
                            </div>
                            <div className={classshared.sidebar_item_content}>
                                <span
                                    className={classshared.font_1_medium_text_dark_text_color_strong_blue.join(' ')}
                                >{ButtonText.expo}</span>
                            </div>
                        </div>
                        <div className={classshared.sidebar_item_wrapper.join(' ')} onClick={this.redirectexploreewinghandler}>
                            <div className={classshared.absolute_right__lv0.join(' ')}>
                                <div className={classshared.card_label_orange.join(' ')}>Coming Soon</div>
                            </div>
                            <div className={classshared.flex}>
                                <div className={classshared.img_square_m_wrapper}>
                                    <img src={Wingimage} alt="Wings" className={classshared.img_square_m} />
                                </div>
                                <div className={classshared.sidebar_item_content}>
                                    {/* <NavLink     
                                className={classshared.font_1_medium_text_dark_text_color_strong_blue.join(' ')}                  
                                to={`/explorewings`}>{ButtonText.wings}</NavLink> */}
                                    <span className={classshared.font_1_medium_text_dark_text_color_strong_blue.join(' ')}>{ButtonText.wings}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="compliance" className={classshared.compliancediv}>
                    <a className={classshared.complienceanchor} href="https://app.xporium.com/privacypolicy" target="_blank"  rel="noopener noreferrer">Privacy Policy &bull; </a>
                        <a className={classshared.complienceanchor} href="https://app.xporium.com/termsofservice" rel="noopener noreferrer" target="_blank">Terms of Service &bull; </a>
                        <a className={classshared.complienceanchor} href="https://app.xporium.com/cookies" rel="noopener noreferrer" target="_blank">Cookies</a><br></br>
                        <span>&copy; Xporium Technologies Pte Ltd</span>
                        
                    </div>
                </div>
            </React.Fragment >
        )
    }

}
export default React.memo(sidebar);