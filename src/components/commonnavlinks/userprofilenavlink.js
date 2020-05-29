import React from 'react';
import * as classshared from '../commoncss/classconst';

import { NavLink } from 'react-router-dom';
import { encodedstring } from '../../shared/utility';

const userprofilenavlink = (props) => {   
    let encoded = encodedstring(props.userid)
    let tolink=`/home/${encoded}`

    if(props.is_exhibitorprofile !== null && props.is_exhibitorprofile !== undefined  && props.is_exhibitorprofile === true)
    {
        tolink=`/exhibitorprofile/${encoded}`
    }

    return (
        <React.Fragment>
            <NavLink
                className={classshared.font_1_medium_text_color__light_blue_margin_r_sm_text_transform_c.join(' ')}
                to={tolink}>{props.username}</NavLink>
        </React.Fragment>
    )
}
export default React.memo(userprofilenavlink);