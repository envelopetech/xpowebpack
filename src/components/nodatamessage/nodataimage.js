import React from 'react';
import  * as classshared from './classconst';
import { nodatatext_image_configuration } from '../../shared/utility'; 


const nodataimage = ( props ) => { 
    
    let  classname =null 
    switch(props.type){
        case ( nodatatext_image_configuration.sidebareducationdetail ):  
            classname = classshared.noimage_small;
            break; 
        case ( nodatatext_image_configuration.sidebarworkhistory ):  
            classname = classshared.noimage_small;
            break;  
        case ( nodatatext_image_configuration.alllistworkhistorypopup ):  
            classname = classshared.noimage_large;
            break; 
        case ( nodatatext_image_configuration.alllisteducationdetailpopup ):  
            classname = classshared.noimage_large;
            break; 
        case ( nodatatext_image_configuration.userprofilevideo ):  
            classname = classshared.noimage_large;
            break;          
        default :
            classname = classshared.noimage_small;
            break;         
    }

        
        return (
           <React.Fragment>
               <img alt="" src={props.imagesource} className={classname}></img>              
            </React.Fragment> 
        );
}

export default nodataimage;