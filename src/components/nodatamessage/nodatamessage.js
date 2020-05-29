import React from 'react';
import * as classshared from './classconst';
import Nodataimage from './nodataimage';
//import Button from '../UI/Button/Button';

const nodatamessage = (props) => {    
     
    return(           
        <div className={classshared.nodata_card}> 
            <div>                
                <Nodataimage imagesource={props.imagesource} type={props.type}></Nodataimage> </div>                 
            <div>                
                <div className={classshared.headertextsmall.join(' ')}>{props.nodata_message} </div>   
            </div>        

                {/* {
                    props.ishow ? (
                        <div> 
                        <div className={classshared.margin_l_m}><Button btntype={props.btntype} clicked={props.addnewrecordhandler} svgclass={props.svgclassname} icon={props.icons}></Button></div></div> 
                    ): (
                        null
                    )
                } */}
               
            

                      
        </div>
    )   
}
export default nodatamessage;