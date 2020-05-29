import React from 'react';
import * as classshared from '../../commoncss/classconst';
import defaultimage  from '../../../assets/images/default_avatar.png';
import Profilepic from '../../UI/profilepic/profilepic';
import Skeleton from 'react-loading-skeleton'; 


const educationdetailitems = (props) => {     
    let image= defaultimage;  
    if(props.college_logo_url !== null) 
    {
        image = props.college_logo_url;
    }  
    let divfromyear=null
    if(props.year_from !== null && props.year_from !== undefined)
    {
        divfromyear = props.year_from +"-" + props.year_to
    }
    else{
        divfromyear = <Skeleton width={50}/>
    }  
    return(
        <div key={props.id} className={classshared.sidebar__user_stats.join(' ')}>                       
            <div className={classshared.sidebar__user_details_left.join(' ')}>
                <Profilepic profilepic_url={image} type={props.type} altname=""></Profilepic>
                <div className={classshared.sidebar__user_stats_company_college.join(' ')}>{props.college_name || <Skeleton width={100}/>}</div> 
            </div>    
            <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
            {divfromyear}
            </div>            
        </div>
    )   
}
//export default educationdetailitems;
//  export default moize(educationdetailitems,{
//     isReact: true
//  }); 
export default React.memo(educationdetailitems)