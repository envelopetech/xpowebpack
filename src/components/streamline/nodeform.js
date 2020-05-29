import React from 'react';
import * as classshared from './classconst';
import Button from '../UI/Button/Button';
import { ButtonType, ButtonText, commonplaceholder, ICONS } from '../../shared/utility';
import Profilepic from '../UI/profilepic/profilepic';
import 'video-react/dist/video-react.css';

const nodeform = (props) => {
    return (
        <React.Fragment>
            <div className={classshared.comments_list__main_with_space.join(' ')}>
                <div className={classshared.user_nav__icon_box2}>
                    <Profilepic type={props.commentusertype} profilepic_url={props.profilepic_url} altname=""></Profilepic>
                </div>
                <input type="text"
                    placeholder={commonplaceholder.userpostcomment}
                    className={classshared.comment_box}
                    onKeyUp={props.onKeyUp}></input>
                <div className={classshared.margin_l_m}>
                    {/* <Button btntype={ButtonType.btnsharecommentlikepost}
                        clicked={props.closeForm}>{ButtonText.cancel}
                    </Button> */}
                    <a href="#/" className={classshared.like_icon.join(' ')} onClick={props.closeForm}>
                        <Button btntype={ButtonType.btnsharecommentlikepost} svgclass={classshared.comment__icon} icon={ICONS.CROSS}></Button>
                        <span className={classshared.likes__number.join(' ')}>{ButtonText.cancel}</span>
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
}
export default nodeform;