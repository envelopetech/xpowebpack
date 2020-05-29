import React, { Component } from 'react';
import * as classshared from '../commoncss/classconst';
import { ProfilepicType, ICONS, encodedstring } from '../../shared/utility'
import ProfilePic from '../UI/profilepic/profilepic';
import Icon from '../UI/Icon/Icon';
import { Redirect } from 'react-router-dom';
import shortid from "shortid";

class wingrecommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirecttohome: false,
        }
    }
    redirecthandler = () => {
        this.setState({
            redirecttohome: true
        })
    }
    render() {
        let authRedirect = null;
        if (this.state.redirecttohome) {
            let encoded = encodedstring(this.props.id)
            authRedirect = <Redirect to={`/userwings/${encoded}`} />
        }
        let membersdata = [];
        if (this.props.wing_members_data !== null) {
            this.props.wing_members_data.map((item, i) => {
                let detail = <React.Fragment key={shortid.generate()}>
                    <ProfilePic profilepic_url={item.profile_pic_url} type={ProfilepicType.avatar} altname=""></ProfilePic>
                </React.Fragment>
                return (
                    membersdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
                )
            })
        }       
        return (
            <React.Fragment>
                {authRedirect}
                <div className={classshared.suggestion_wrapper_profile_recommend_margin__lv0.join(' ')} onClick={this.redirecthandler}>
                    <div className={classshared.card_follow_310.join(' ')}>
                        <div className={classshared.card_follow_header} style={{ backgroundImage: `url(${this.props.coverimage})` }}> </div>
                        <div className={classshared.card_summary}>
                            <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')}>{this.props.title}</div>
                            <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.descriptionsubstring}</div>
                            <div className={classshared.margin_l_l_tieup__connections.join(' ')}>
                                <div className={classshared.avatars}>
                                    {membersdata}
                                </div>
                                <div className={classshared.margin_l_sm}><div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.totalmembers}</div></div>
                            </div>
                            <div className={classshared.margin_l_l_tieup__connections.join(' ')}>
                                <Icon svgclass={classshared.icon_20_icon_purple_dim__high.join(' ')} icon={ICONS.LOCATION_PIN}></Icon>
                                <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.location}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default wingrecommendation