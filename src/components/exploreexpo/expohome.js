import React from 'react';
import * as classshared from '../commoncss/classconst';
import Upcomingevents from './upcomingevents';
import HIW from '../../assets/images/HIW-1.png'
import ProfilePic from '../UI/profilepic/profilepic';
import { ProfilepicType } from '../../shared/utility';

const expohome = (props) => {
    return (
        <React.Fragment>
            <div className={classshared.w_container_main_content_coming_soon.join(' ')}  >
                <div className={classshared.margin_top__lv4}>
                    <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')} data-tut="reactour__start">Hi {props.loggedinuser_name}, Welcome to Xporium!</h2>
                </div>
                <div className={classshared.margin_t_sm}>
                    <div className={classshared.font_1_regular_text_14_text_light.join(' ')}>India's first 3D virtual exhibitions platform!</div>
                </div>
                <div className={classshared.img_square_sm_wrapper}>
                    <ProfilePic profilepic_url={HIW} type={ProfilepicType.img_square_l} altname=""></ProfilePic>
                </div>
                <div className={classshared.margin_bottom__lv8}>
                    <div className={classshared.container.join(' ')}>
                        <div className={classshared.margin_t_b_25.join(' ')}>
                            <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>How It Works</h2>
                        </div>

                        <div className={classshared.process_wrap}>
                            <div className={classshared.block_wrap}>
                                <div className={classshared.block}>
                                    <div className={classshared.line_01}> </div>
                                    <h1 className={classshared.h1_1}>01</h1>
                                    <div className={classshared.dot_container}>
                                        <div className={classshared.green_dot}></div>
                                        <div className={classshared.ring_03}></div>
                                        <div className={classshared.ring_02}></div>
                                        <div className={classshared.ring_01}></div>
                                        <div className={classshared.white_dot}></div>
                                    </div>
                                </div>
                                <div className={classshared.content_wrap}>
                                    <h4 className={classshared.margin_b_sm}>View Upcoming Events</h4>
                                    <p className={classshared.plain_text}>You may begin by choosing from a list of upcoming exhibitions. We will keep adding new events regularly.</p>
                                   
                                </div>
                            </div>


                            <div className={classshared.block_wrap}>
                                <div className={classshared.block}>
                                    <div className={classshared.line_01}> </div>
                                    <h1 className={classshared.h1_1}>02</h1>
                                    <div className={classshared.dot_container}>
                                        <div className={classshared.green_dot}></div>
                                        <div className={classshared.ring_03}></div>
                                        <div className={classshared.ring_02}></div>
                                        <div className={classshared.ring_01}></div>
                                        <div className={classshared.white_dot}></div>
                                    </div>
                                </div>
                                <div className={classshared.content_wrap}>
                                    <h4 className={classshared.margin_b_sm} >Book Your Place</h4>
                                    <p className={classshared.plain_text}>You can book your place either as a visitor or as an exhibitor from the exhibition details page.</p>
                                </div>
                            </div>

                            <div className={classshared.block_wrap}>
                                <div className={classshared.block}>
                                    <div className={classshared.line_01}> </div>
                                    <h1 className={classshared.h1_1}>03</h1>
                                    <div className={classshared.dot_container}>
                                        <div className={classshared.green_dot}></div>
                                        <div className={classshared.ring_03}></div>
                                        <div className={classshared.ring_02}></div>
                                        <div className={classshared.ring_01}></div>
                                        <div className={classshared.white_dot}></div>
                                    </div>
                                </div>
                                <div className={classshared.content_wrap}>
                                    <h4 className={classshared.margin_b_sm} >That's it! Time to Relax</h4>
                                    <p className={classshared.plain_text}>We will update you when the event date comes closer. Our support team will be happy to assist you if you need help in setting up your stall</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Upcomingevents upcomingeventdata={props.upcomingeventdata}></Upcomingevents>
            </div>
        </React.Fragment>
    )
}
export default React.memo(expohome);