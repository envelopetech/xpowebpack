import React from 'react';
import * as classshared from '../../commoncss/classconst';

const productdetailtechnicalspec = (props) => {                   
    return(
        <div className={classshared.grid_item.join(' ')}>
            <div className={classshared.margin_r_sm}><div className={classshared.font_1_medium_text_dark.join(' ')}>{props.spec_name}:</div></div> 
            <div> {props.spec_value}</div> 
        </div>
    )   
}
export default React.memo(productdetailtechnicalspec);