import React from 'react';
import * as classshared from './classconst';
import Button from '../UI/Button/Button';
import { ButtonType, ButtonText } from '../../shared/utility';

const tieupsrequest = (props) => {
    let buttondiv = <Button btntype={ButtonType.tieup_btn} clicked={props.tieupsclickhandler}>+ {ButtonText.tieups}   &gt;</Button>
    if (props.user_friend_status !== null && props.user_friend_status !== undefined) {
        buttondiv = <div className={classshared.tieuprequest_div}><span className={classshared.tieuprequest_span}>{props.user_friend_status}</span></div>
    }
    if (props.tieups_requested !== null && props.tieups_requested !== undefined && props.tieups_requested !== false) {
        buttondiv = <div className={classshared.tieuprequest_div}><span className={classshared.tieuprequest_span}>Requested</span></div>
    }
    return (
        <React.Fragment className={classshared.tieup_link_block}>
            <div className={classshared.showalllescenterdivtieups}>{buttondiv}</div>
        </React.Fragment>
    )
}
export default React.memo(tieupsrequest);