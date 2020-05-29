import React from 'react';
import * as classshared from '../commoncss/classconst';
import {ButtonType,ICONS} from '../../shared/utility';
import Button from '../UI/Button/Button';


const commonpopupmessage = (props) => { 
    return(
       <React.Fragment>
          
                    <div className={classshared.popup__content_header.join(' ')}>
                        <div  className={classshared.sidebar__user_stats.join(' ')}>                       
                            <div className={classshared.sidebar__user_details_left.join(' ')}>
                                <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{props.title}</h2> 
                            </div>    
                            <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                <Button btntype={ButtonType.btn_close_popup} clicked={props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                            </div>            
                        </div>                       
                        <h3 className={classshared.font_1_regular_text_14_text_light.join(' ')}>{props.description}</h3>                                                 
                    </div>                    
                
       </React.Fragment>
    )   
}
export default React.memo(commonpopupmessage);