import React, { Component } from 'react';
import * as classshared from '../classconst';
import { ProfilepicType, ICONS } from '../../../shared/utility';
import defaultimage from '../../../assets/images/default_avatar.png';
import Profilepic from '../../UI/profilepic/profilepic';
import Icon from '../../UI/Icon/Icon';

class curatorsection extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="userwingsstreamline" className={classshared.size1of3.join(' ')}>
                    <div className={classshared.background_card.join(' ')}>
                        <div className={classshared.padding_all_m}>
                            <h3 className={classshared.center_text_dark_maring_b_m.join(' ')}>Talk to Curators</h3>
                            <p className={classshared.center}>Our Curators of this Wing are always happy to talk to you about what's best for your needs.</p>
                        </div>
                        <ul className={classshared.margin_b_l}>
                            <li className={classshared.flex_flex_align_center.join(' ')}>
                                <div className={classshared.avatars_flex_row}>
                                    <Profilepic profilepic_url={defaultimage} type={ProfilepicType.avatar_l_avatar_xl} altname=""></Profilepic>
                                </div>
                                <div>
                                    <p className={classshared.text_dark}>Hetal Mehta</p>
                                    <p className={classshared.text_12}>Founding Curator</p>
                                </div>
                            </li>
                            <li className={classshared.flex_flex_align_center.join(' ')}>
                                <div className={classshared.avatars_flex_row}>
                                    <Profilepic profilepic_url={defaultimage} type={ProfilepicType.avatar_l_avatar_xl} altname=""></Profilepic>
                                </div>
                                <div>
                                    <p className={classshared.text_dark}>Hetal Mehta</p>
                                    <p className={classshared.text_12}>Founding Curator</p>
                                </div>
                            </li>
                        </ul>
                        <div className={classshared.padding_t_l}>
                            <div className={classshared.border_top}>
                                <div className={classshared.margin_b_m}>
                                    <div className={classshared.title}>
                                        <div className={classshared.icon_wrapper}>
                                            <Icon svgclass={classshared.icon_20_icon_dark.join(' ')} icon={ICONS.CLOCK}></Icon>

                                        </div>   <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>08:00 - 17:00 hrs (Weekdays)</div>
                                    </div>
                                </div>
                                <div className={classshared.margin_b_m}>
                                    <div className={classshared.title}>
                                        <div className={classshared.icon_wrapper}>
                                            <Icon svgclass={classshared.icon_20_icon_dark.join(' ')} icon={ICONS.BUBBLE}></Icon>

                                        </div>
                                        <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}> <a href="#/" className={classshared.text_color_blue}>Live Chat</a></div>
                                    </div>
                                </div>
                                <div className={classshared.margin_b_m}>
                                    <div className={classshared.title}>
                                        <div className={classshared.icon_wrapper}>
                                            <Icon svgclass={classshared.icon_20_icon_dark.join(' ')} icon={ICONS.ENVELOPE}></Icon>

                                        </div>
                                        <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}> <a href="#/" className={classshared.text_color_blue}>Message</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default React.memo(curatorsection);