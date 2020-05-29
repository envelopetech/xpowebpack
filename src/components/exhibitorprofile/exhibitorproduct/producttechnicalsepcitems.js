import React from 'react';
import * as classshared from '../../commoncss/classconst';
import Button from '../../UI/Button/Button';

const producttechnicalsepcitems = (props) => {    
        
    return(           
            <tr>
            <td>Weight</td>
            <td>500 gms</td>
            <td>
            <div className={classshared.buttoncontainer}>
                <div className={classshared.mar_r_m}><Button btntype={props.btnedit} clicked={props.edittechnicalspec} buttontype="button" >{props.edit}</Button></div>
                <div className={classshared.mar_r_m}><Button btntype={props.btndelete}  buttontype="button" clicked={props.deletetechnicalspec}>{props.delete}</Button></div></div>
            </td>
            </tr>                 
        
    )   
}
export default producttechnicalsepcitems;