import React from 'react';
import * as classshared from '../../commoncss/classconst';
import defaultimage from '../../../assets/images/default_avatar.png';
import Profilepic from '../../UI/profilepic/profilepic';
import { NavLink } from 'react-router-dom';
import { encodedstring } from '../../../shared/utility';

const sidebarwinglistitem = (props) => {
    let image = defaultimage;
    if (props.wing_pic_url !== null) {
        image = props.wing_pic_url;
    }
    let totalwingster = null;
    if (props.totalwingster !== null) {
        totalwingster = `${props.totalwingster} Wingsters`//(typeof props.totalwingster) +"  "+  "Wingsters";        
    }
    // let text = props.id;
    // let bytes = utf8.encode(text.toString());
    // let encoded = base64.encode(bytes);
    let encoded = encodedstring(props.id)
    return (
        <NavLink
            className={classshared.textdecorationnone.join(' ')}
            to={`/userwings/${encoded}`}>
            <div key={props.id} className={classshared.sidebar__user_chat.join(' ')}>
                <div className={classshared.sidebar__user_details_left.join(' ')}>
                    <div className={classshared.user_nav__icon_box}>
                        <Profilepic profilepic_url={image} type={props.type} altname=""></Profilepic>
                    </div>
                    <div className={classshared.margin_l_sm}><div className={classshared.flex__column.join(' ')}>
                        <div className={classshared.margin_l_m}>
                            <div className={classshared.font_2_bold_text_dark.join(' ')}>{props.title}</div>
                        </div>
                        <div className={classshared.margin_l_m}>
                            <div className={classshared.font_2_regular_text_12_text_dark.join(' ')}>{props.location} | {totalwingster}</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}
export default React.memo(sidebarwinglistitem);