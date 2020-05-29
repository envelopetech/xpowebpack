import React, { Component } from 'react';
import * as classshared from '../../../commoncss/classconst';
import { ProfilepicType, encodedstring } from '../../../../shared/utility'
import Profilepic from '../../../UI/profilepic/profilepic'
import { Redirect } from 'react-router-dom';

class userexhibitionsitems extends Component {
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
        return (
            <React.Fragment>
                {authRedirect}
                {/* <NavLink                     
                    to={`/eventprofile/${props.id}`}> */}
                <div className={classshared.event_card_wrapper} onClick={this.redirecthandler}>
                    <div className={classshared.img_square_m_wrapper}>
                        <Profilepic type={ProfilepicType.img_square_l} profilepic_url={this.props.event_pic_url}></Profilepic>
                    </div>
                    <div className={classshared.event_card_content}>
                        <div className={classshared.margin_t_sm}> <h4 className={classshared.font_1_bold_text_dark.join(' ')}>{this.props.title}</h4></div>
                        <div className={classshared.margin_b_sm}>
                            <span className={classshared.font_2_regular_text_12.join(' ')}>{this.props.display_date}</span> &#183;
                                    <span className={classshared.font_2_regular_text_12.join(' ')}> {this.props.location}</span>
                        </div>
                        <p className={classshared.font_2_regular_text_14.join(' ')}>{this.props.description}</p>
                        {/* <div className={classshared.main__tags.join(' ')}>
                            <div className={classshared.tags.join(' ')}>#renewables</div>
                        </div> */}
                    </div>
                </div>
                {/* </NavLink> */}
            </React.Fragment>
        )
    }
}
export default userexhibitionsitems