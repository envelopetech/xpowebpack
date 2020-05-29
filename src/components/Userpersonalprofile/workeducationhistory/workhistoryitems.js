import React from 'react';
import * as classshared from '../../commoncss/classconst';
import defaultimage  from '../../../assets/images/default_avatar.png';
import Profilepic from '../../UI/profilepic/profilepic';
import Skeleton from 'react-loading-skeleton'; 


const workhistoryitems = (props) => { 
    
    let image= defaultimage;  
    if(props.company_logo_url !== null) 
    {
        image = props.company_logo_url;
    }
    let divfromyear=null
    if(props.fromyear !== null && props.fromyear !== undefined)
    {
        divfromyear = props.fromyear +"-" + props.toyear
    }
    else
    {
        divfromyear = <Skeleton width={50}/>
    }    
    return(
        <div key={props.id} className={classshared.sidebar__user_stats.join(' ')}>                       
            <div className={classshared.sidebar__user_details_left.join(' ')}>
                <Profilepic profilepic_url={image} type={props.type} altname=""></Profilepic>
                <div className={classshared.sidebar__user_stats_company_college.join(' ')}>
                    {props.designation_in_company || <Skeleton width={100}/>}
                </div> 
            </div>    
            <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                {divfromyear}
            </div>            
        </div>
        // <div className={classshared.work__card.join(' ')}> 
        //         <div className={classshared.work__card_top}>                
        //         <Profilepic profilepic_url={image} type={props.type} altname=""></Profilepic>               
        //             <div className={classshared.work__card_content}> 
        //                 <div className={classshared.sidebar__user_stats_company_college.join(' ')}>{props.designation_in_company || <Skeleton width={100}/>}</div>            
        //             </div>
        //             <div className={classshared.list_dropdown}>                    
        //             {props.fromyear || <Skeleton width={100}/>}-{props.toyear || <Skeleton width={100}/>}
        //             </div>                    
        //         </div>                 
        // </div>
    )   
}
export default React.memo(workhistoryitems);