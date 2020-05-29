import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import {
    ButtonType
    , ICONS, nodatatext_image_configuration, nodatatext_message, Wingposttype, ProfilepicType
} from '../../../shared/utility';
import Activityitem from './activityitem';
import { get_flat_user_wing_feeds } from '../../../actions/wings/dataactions'
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import shortid from  "shortid";
import Spinner from '../../UI/Spinner/Spinner'

class activity extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            activitydata: null,
            loading: false
        }
    }
    filldata() {
        this.setState({ loading: true })
        var data = get_flat_user_wing_feeds(this.props.wing_id, Wingposttype.all.toLowerCase())
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {                       
                    this.setState({ activitydata: res.data, loading:false });
                }
            }
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.filldata();
    }
    render() {
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let activitylist = [];
        let completepostdata = [];
        activitylist = this.state.activitydata;
        if (activitylist !== null) {
            if (activitylist.length > 0) {
                activitylist.map((item, i) => {                                        
                    let mentionusername =null
                    let mentionuserid =null
                    if(item.mentionuser !== null)
                    {
                        mentionusername = item.mentionuser[0]["name"]
                        mentionuserid = item.mentionuser[0]["user_id"]
                    }
                    let detail = <Activityitem
                        posttime={item.postdatetime}
                        statuschangeddatetime={item.statuschangeddatetime}
                        mentionusername={mentionusername}
                        mentionsuserid={mentionuserid}
                        profile_pic_url={item.visitor[0]["profile_pic_url"]}
                        ProfilepicType={ProfilepicType.user_nav__user_photo_small}
                        userpostername={item.visitor[0]["name"]}
                        userpostid={item.visitor[0]["user_id"]}
                        wallpostmessagetype={item.wall_post_type_header}
                    >
                    </Activityitem>
                    return (
                        completepostdata.push(
                            <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>
                        )
                    )
                });
            }
            else {
                completepostdata = <Nodatamessage imagesource={nodataimage}
                    type={nodatatext_image_configuration.userprofilevideo}
                    nodata_message={nodatatext_message.noactivityfound}
                    btntype={ButtonType.edit_mode_button_profile}
                    svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                    ishow={true}
                    icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}></Nodatamessage>
            }
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.w_container}>
                    <div className={classshared.margin_top__lv8}><h3 className={classshared.font_1_bold_text_dark.join(' ')}>Activity</h3></div>
                    <div className={classshared.text_dark_dim_high_thin_margin_b_m.join(' ')}>Track the latest happenings in your Wing</div>
                    <div className={classshared.size2of3_padding_t_l_border_top.join(' ')}>
                        {completepostdata}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default activity;