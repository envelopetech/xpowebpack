import React from 'react';
import * as classshared from '../../commoncss/classconst';
import Button from '../../UI/Button/Button';
import {ButtonType,commonplaceholder,ICONS,titleheading, ButtonText} from '../../../shared/utility';


const aboutmeedit = ( props ) => {

    return(
        <React.Fragment>
            
                        <div className={classshared.popup__content_header}>
                        <div  className={classshared.sidebar__user_stats.join(' ')}>                       
                            <div className={classshared.left_content.join(' ')}>
                                <h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.editaboutmedetail}</h2> 
                            </div>    
                            <div className={classshared.right_content.join(' ')}>
                                <Button btntype={ButtonType.btn_close_popup} clicked={props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                            </div>            
                        </div>                                               
                        </div>                    
                        <div className={classshared.simple_form}> 
                        <div className={classshared.form_group}>
                            <div className={classshared.buttoncontainer}>
                                <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnsavecancel} buttontype="button" clicked={props.saveaboutme} svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')} icon={ICONS.SAVE}>{ButtonText.save}</Button></div>
                                <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnsavecancel}  buttontype="button" clicked={props.closemodal} svgclass={classshared.icon_20_icon_grey_margin_r_10.join(' ')} icon={ICONS.CROSS}>{ButtonText.cancel}</Button></div>
                            </div>                      
                        </div> 
                        <div className={classshared.form_group}>
                            <textarea  placeholder={commonplaceholder.userpostcomment} className={classshared.feedtextarea.join(' ')}  rows="8" onChange={props.changed} value={props.aboutmevalue}>
                            </textarea>                          
                        </div>  
                    </div>
                               
        </React.Fragment>      
    )
}
export default aboutmeedit;