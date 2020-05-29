import React from 'react';
import * as classshared from '../../commoncss/classconst';


const userbusinessstatus = (props) => {
    return (
        <React.Fragment>
            <div className={classshared.sidebar__user_stats_wrapper}>
                <div className={classshared.sidebar__user_stats_sidebar.join(' ')}>
                    <div className={classshared.sidebar__user_stats_left}>
                        <div className={classshared.font_2_regular_text_12_text_light.join(' ')}>{props.businessgiven}</div>
                        <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{props.totalbusinessgiven}</h2>
                    </div>
                    <div className={classshared.sidebar__user_stats_right}>
                        <div className={classshared.font_2_regular_text_12_text_light.join(' ')}>{props.tieups}</div>
                        <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{props.totaltieupes}</h2>
                    </div>
                </div>
                <div className={classshared.sidebar__user_stats_sidebar.join(' ')}>
                    <div className={classshared.sidebar__user_stats_left}>
                        <div className={classshared.font_2_regular_text_12_text_light.join(' ')}>{props.businessrecive}</div>
                        <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{props.totalbusinessreceived}</h2>
                    </div>
                    <div className={classshared.sidebar__user_stats_right}>
                        <div className={classshared.font_2_regular_text_12_text_light.join(' ')}>{props.largestdeal}</div>
                        <h2 className={classshared.font_1_medium_text_16_text_dark.join(' ')}>{props.largestdealsize}</h2>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default React.memo(userbusinessstatus);