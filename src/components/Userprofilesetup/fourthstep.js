import React, { Component } from 'react';
import * as classshared from './classconst';
import { get_recommend_wings_exhibition_peoples } from '../../actions/userprofilesetup/dataactions'
import { sendtieupsrequest } from '../../actions/tieupsactions/dataactions';
import Exhibitionrecommendation from './exhibitionrecommendation';
import Peoplerecommendation from './peoplerecommendation';
import Wingrecommendation from './wingrecommendation';
import shortid from "shortid";
import logoimage from '../../assets/images/574.043--x-100-px.png';
import { ButtonText, ICONS, ProfilepicType, label_text } from '../../shared/utility';
import Icon from '../UI/Icon/Icon';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import Spinner from '../UI/Spinner/Spinner';
import socket from '../../actions/socket';


const params = {
    slidesPerView: 3,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    spaceBetween: 10,
    rebuildOnUpdate: true,
    observer: true
}

class fourthstep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wingdata: null,
            exhibitiondata: null,
            peopledata: null,
            loading: false,
            tieups_requested: false,
            client: socket()
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        var data = get_recommend_wings_exhibition_peoples()
        data.then(res => {
            if (res !== undefined) {
                alert(JSON.stringify(res.data))
                if (res.data[0] !== undefined) {
                    this.setState({ exhibitiondata: res.data[0] })
                }
                if (res.data[1] !== undefined) {
                    this.setState({ peopledata: res.data[1] })
                }
                if (res.data[2] !== undefined) {
                    this.setState({ wingdata: res.data[2] })
                }
                this.setState({ loading: false })
            }
        });
    }
    tieupsclickhandler(e, i, user_responder_id) {
        e.preventDefault();
        const data = {
            user_responder_id: user_responder_id,
        };
        var dataadd = sendtieupsrequest(data)
        dataadd.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({ tieups_requested: true })
                this.state.client.user_tieups_request_send(res.data);
            }

        }).catch(error => {
        });
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        const { previousPage } = this.props
        let listexhibition = null        
        if (this.state.exhibitiondata !== null) {
            if (this.state.exhibitiondata.length > 0) {
                let data = null;
                data = this.state.exhibitiondata.map((item, i) => {
                    let detail = null;
                    let islazyloading = false;
                    if (i > 1) {
                        islazyloading = true;
                    }
                    detail = <Exhibitionrecommendation
                        is_lazyloading={islazyloading}
                        key={item.id}
                        totalvisitorsexhibitors={item.totalvisitorsexhibitors[0]}
                        eventimage={item.event_pic_url}
                        title={item.event_title}
                        description={item.event_description}
                        location={item.event_location}
                        id={item.id}>
                    </Exhibitionrecommendation>
                    return (
                        <div key={shortid.generate()}>{detail}</div>
                    )
                });
                if (this.state.exhibitiondata.length > 3) {
                    listexhibition = <Swiper {...params}>
                        {data}
                    </Swiper>
                }
                else {
                    listexhibition = <div className={classshared.flex}>{data}</div>
                }
            }
        }
        let listwings = null
        if (this.state.wingdata !== null) {
            if (this.state.wingdata.length > 0) {
                let data = null;
                data = this.state.wingdata.map((item, i) => {
                    let totalmembers = 0
                    if (item.wings_users !== null) {
                        if (item.wings_users.length > 0) {
                            totalmembers = item.wings_users[1]
                        }
                    }
                    let islazyloading = false;
                    if (i > 1) {
                        islazyloading = true;
                    }
                    let detail = null;
                    detail = <Wingrecommendation
                        is_lazyloading={islazyloading}
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        location={item.location}
                        wing_members_data={item.wing_members_data}
                        totalmembers={totalmembers}
                        coverimage={item.wing_cover_url}
                        descriptionsubstring={item.descriptionsubstring}
                        id={item.id}>
                    </Wingrecommendation>
                    return (
                        <div key={shortid.generate()}>{detail}</div>
                    )
                });
                if (this.state.wingdata.length > 3) {
                    listwings = <Swiper {...params}>
                        {data}
                    </Swiper>
                }
                else {
                    listwings = <div className={classshared.flex}>{data}</div>
                }
            }
        }
        let listpeople = null
        if (this.state.peopledata !== null) {
            if (this.state.peopledata.length > 0) {
                let data = null
                data = this.state.peopledata.map((item, i) => {
                    let islazyloading = false;
                    if (i > 1) {
                        islazyloading = true;
                    }
                    let detail = null;
                    if (item.user_friend_status !== label_text.friend) {
                        detail = <Peoplerecommendation
                            id={item.id}
                            is_lazyloading={islazyloading}
                            userid={item.user_id}
                            profile_pic_url={item.profile_pic_url}
                            name={item.name}
                            designation={item.work_as}
                            user_friend_status={item.user_friend_status}
                            location={item.location}
                            mutualtieupsdata={item.user_mutual_data[0]}
                            totalmutualtieupes={item.user_mutual_data[1]}
                            ProfilepicType={ProfilepicType.tieupsmediumpic}
                            mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}
                            loggedin_userstatus={item.loggedin_userstatus}
                            tieups_requested={this.state.tieups_requested}
                            tieupsclickhandler={(e) => this.tieupsclickhandler(e, i, item.user_id)}>
                        </Peoplerecommendation>
                    }

                    return (
                        <div key={shortid.generate()}>{detail}</div>
                    )
                });
                let selecteddata = this.state.peopledata.find(i => i.user_friend_status !== label_text.friend);
                if (selecteddata !== undefined) {
                    if (selecteddata > 3) {
                        listpeople = <Swiper {...params}>
                            {data}
                        </Swiper>
                    }
                    else {
                        listpeople = <div className={classshared.flex}>{data}</div>
                    }
                }
            }
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.fixed_content_with_overflow.join(' ')}>
                    <div className={classshared.navbar}>
                        <div className={classshared.w_container}>
                            <a href="https://xporium.com" className={classshared.brand}><img src={logoimage} height="40" alt=""></img></a>
                        </div>
                    </div>
                    <div className={classshared.content.join(' ')}>
                        <div className={classshared.signupWrapper.join(' ')}>
                            <div className={classshared.margin_bottom__lv8}>
                                <div className={classshared.size1of1.join(' ')}>
                                    <div className={classshared.overflow__visible_centered.join(' ')}>
                                        <div className={classshared.progressDot_inactive}></div>
                                        <div className={classshared.progressDot_inactive}></div>
                                        <div className={classshared.progressDot_inactive}></div>
                                        <div className={classshared.progressDot_active}></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className={classshared.font_1_regular_text_dark_center.join(' ')}>We've got some suggestions for you</h1>
                                <div className={classshared.font_1_regular_text_dark_center.join(' ')}>Follow some popular Wings and Exhibitions relevant to you.</div>
                                <div>
                                    <div className={classshared.font_1_medium_text_18_text_dark_margin_b_m_margin_t_m_uppercase.join(' ')}>
                                        Exhibitions</div>
                                    <div>{listexhibition}</div>
                                </div>
                                <div>
                                    <div className={classshared.font_1_medium_text_18_text_dark_margin_b_m_margin_t_m_uppercase.join(' ')}>
                                        Wings</div>
                                    <div>{listwings}</div>
                                </div>
                                <div>
                                    <div className={classshared.font_1_medium_text_18_text_dark_margin_b_m_margin_t_m_uppercase.join(' ')}>
                                        People </div>
                                    <div>{listpeople}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classshared.fixed_footer}>
                    <div className={classshared.flex_align_center_bottom.join(' ')}>
                        <a href="#/" className={classshared.explore__items} onClick={previousPage}>
                            <Icon svgclass={classshared.common__icon} icon={ICONS.LEFTARROW} />
                            <strong className={classshared.side_nav__item}>{ButtonText.back} </strong>
                        </a>
                    </div>
                    <div className={classshared.flex_align_center_bottom.join(' ')}>
                        <div className={classshared.margin_l_m}>
                            {/* <a href="/home">
                                    <strong className={classshared.side_nav__item}>{ButtonText.home} </strong>
                                </a> */}
                            <a href="/expohome">
                                <strong className={classshared.side_nav__item}>{ButtonText.home} </strong>
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default fourthstep