import React, { Component } from 'react';
import * as classshared from '../commoncss/classconst';
import { Redirect } from 'react-router-dom';
import shortid from "shortid";
import ProfilePic from '../UI/profilepic/profilepic';
import { ProfilepicType, encodedstring } from '../../shared/utility';

class exhibitionrecommendation extends Component {
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
            authRedirect = <Redirect to={`/exhibitionprofile/${encoded}`} />
        }
        let tieupsdata = [];
        if (this.props.totalvisitorsexhibitors !== null) {
            this.props.totalvisitorsexhibitors.map((item, i) => {
                let detail = <React.Fragment key={shortid.generate()}>
                    <ProfilePic profilepic_url={item} type={ProfilepicType.avatar} altname=""></ProfilePic>
                </React.Fragment>
                return (
                    tieupsdata.push(<React.Fragment key={shortid.generate()}>{detail}</React.Fragment>)
                )
            })
        }
        return (
            <React.Fragment>
                {authRedirect}
                <div className={classshared.suggestion_wrapper_expos_margin__lv0.join(' ')} onClick={this.redirecthandler}>
                    <div id="expo_card" className={classshared.card_without_follow.join(' ')}>
                        <div className={classshared.margin_t_b_10.join(' ')}></div>
                        <div className={classshared.card_follow_header} style={{ backgroundImage: `url(${this.props.eventimage})` }}> </div>
                        <div id="card_align" className={classshared.card_summary}>
                            <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')} >{this.props.title}
                                <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.description}</div>
                            </div>
                            <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.location}</div>
                            <div className={classshared.tieup__connections_margin_b_sm.join(' ')}>
                                <div className={classshared.avatars_flex_row_withoutmargin}>
                                    {tieupsdata}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default exhibitionrecommendation

