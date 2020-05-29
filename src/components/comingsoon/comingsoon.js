import React, { Component } from 'react';
import * as classesshared from '../commoncss/classconst';

class comingsoon extends Component {
    render() {
        let message = "This feature is on its way!"
        let subtitle = "We are currently working on this feature and will launch soon"
        if (this.props.message !== undefined && this.props.message !== null) {
            message = this.props.message
        }
        if (this.props.subtitle !== undefined && this.props.subtitle !== null) {
            subtitle = this.props.subtitle
        }
        return (
            <React.Fragment>
                <div className={classesshared.comingsoon_content.join(' ')}>
                    <div className={classesshared.comingsoon_onboarding.join(' ')}>
                        <div className={classesshared.comingsoon_onboarding_profile.join(' ')}>
                            <i className={classesshared.fontawesome_shipping_timed.join(' ')}></i>
                        </div>
                        <div className={classesshared.margin_b_sm}><div className={classesshared.font_1_bold_text_dark.join(' ')}>{message}</div></div>
                        <p className={classesshared.text_12_text_normal}>{subtitle}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default comingsoon;