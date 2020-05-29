import React from 'react';
import * as classshared from '../commoncss/classconst';
import ProfilePic from '../UI/profilepic/profilepic';
import { ProfilepicType, encodedstring } from '../../shared/utility';
import shortid from "shortid";
import { Redirect } from 'react-router-dom';


class allexhibitionitems extends React.Component {
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
                <li id="allexhibitions" className={classshared.event_card_wrapper.join(' ')} onClick={this.redirecthandler}>                   

                    <div className={classshared.img_square_sm_wrapper.join(' ')}>
                        <ProfilePic profilepic_url={this.props.eventimage} type={ProfilepicType.img_square_l} altname=""></ProfilePic>
                    </div>
                    <div className={classshared.sidebar_item_content.join(' ')}>
                        <div className={classshared.padding_all_m}>
                            <div className={classshared.card_summary_header_font_1_medium_text_14_text_dark.join(' ')}>{this.props.title}
                                <div className={classshared.seperator_dot.join(' ')}></div>{this.props.display_date}
                            </div>
                            <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.location}</div>

                            <div className={classshared.margin_t_sm}>
                                <div className={classshared.tieup__connections_margin_b_sm.join(' ')}>
                                    <div className={classshared.avatars_flex_row_withoutmargin}>
                                        {tieupsdata}
                                    </div>

                                    <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.totalvisitors} Visitors</div>
                                    <div className={classshared.seperator_dot.join(' ')}></div>
                                    <div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.totalexhibitors} Exhibitors</div>
                                </div>
                            </div>
                            <div className={classshared.margin_t_b_m.join(' ')}><div className={classshared.card_summary_header_text_12_font_weight__thin.join(' ')}>{this.props.description}</div></div>
                        </div>
                        <div className={classshared.inquiry_box_upper.join(' ')}>
                            <div>
                                <span className={classshared.font_1_bold_text_dark_text_15.join(' ')}>
                                    Free
                                </span>
                                <div className={classshared.font_1_medium_text_12.join(' ')}>For Visitors</div>
                            </div>
                            <div>
                                <span className={classshared.font_1_bold_text_dark_text_15.join(' ')}>
                                    {this.props.event_fees}
                                </span>
                                <div className={classshared.font_1_medium_text_12.join(' ')}>For Exhibitors</div>
                            </div>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        )
    }
}
export default allexhibitionitems;