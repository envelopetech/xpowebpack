import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { titleheading, ProfilepicType, encodedstring } from '../../../shared/utility'
import ProfilePic from '../../UI/profilepic/profilepic';
import { Redirect } from 'react-router-dom';
import shortid from "shortid";
import defaultimage from '../../../assets/images/default_avatar.png';

class recommendationwings extends Component {
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
        let coverimage = defaultimage
        if (this.props.coverimage !== null && this.props.coverimage !== undefined) {
            coverimage = this.props.coverimage
        }
        let authRedirect = null;
        if (this.state.redirecttohome) {
            let encoded = encodedstring(this.props.id)
            authRedirect = <Redirect to={`/userwings/${encoded}`} />
        }
        let membersdata = [];
        if (this.props.wing_members_data !== null) {
            this.props.wing_members_data.map((item, i) => {
                let detail = <React.Fragment key={shortid.generate()}>
                    <ProfilePic profilepic_url={item.profile_pic_url} type={ProfilepicType.avatar_l} altname=""></ProfilePic>
                </React.Fragment>
                return (
                    membersdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
                )
            })
        }
        let wingdescription = null;
        if (this.props.description !== null && this.props.description !== undefined) {
            if (this.props.description.toString().length > 50) {
                wingdescription = this.props.description.toString().replace(/<[^>]*>/g, '').substring(0, 50) + "...";
            }
            else {
                wingdescription = this.props.descriptiony.toString().replace(/<[^>]*>/g, '')
            }
        }
        return (
            <React.Fragment>
                {authRedirect}
                <div className={classshared.suggestion_wrapper_margin__lv0.join(' ')} onClick={this.redirecthandler}>
                    <div className={classshared.margin_b_m}><div className={classshared.font_1_medium_text_14.join(' ')}>{titleheading.recommendations}</div></div>
                    <div className={classshared.card_follow_310.join(' ')}>
                        <div className={classshared.card_follow_header} style={{ backgroundImage: `url(${coverimage})` }}> </div>
                        <div className={classshared.card_summary}>
                            <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')}>{this.props.title}</div>
                            <div className={classshared.font_2_regular_text_12.join(' ')}>{wingdescription}</div>
                            <div className={classshared.margin_l_l_tieup__connections.join(' ')}>
                                <div className={classshared.avatars}>
                                    {membersdata}
                                </div>
                                <div className={classshared.margin_l_sm}><div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.totalmembers}</div></div>
                            </div>
                            <div className={classshared.margin_l_l_tieup__connections.join(' ')}>
                                <i className={classshared.fontawesome_location_alt.join(' ')}></i>
                                <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.location}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default recommendationwings;