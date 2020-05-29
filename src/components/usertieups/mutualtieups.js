import React from 'react';
import * as classshared from './classconst';
import ProfilePic from '../UI/profilepic/profilepic';


const mutualtieups  = (props) => {  
    let divdata=null;   
    let tieupsdata=[];
    if(props.totalmutualtieupes > 0)
    {        
        if(props.mutualtieupsdata !== null && props.mutualtieupsdata.length > 0)
        {
            props.mutualtieupsdata.map( (item,i)  => {                 
                let detail =  <div key={item.id}>                
                        <a href="#/">                
                            <ProfilePic profilepic_url={item.profile_pic_url} type={props.imagetype} altname={item.name}></ProfilePic>
                        </a>
                </div>
                return(
                    tieupsdata.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                )
            })
        }        
        divdata= <div className={classshared.linkup_block}>{tieupsdata}            
                    <div className={classshared.font_1_regular_text_12_color_grey_dark_3.join(' ')}>{props.totalmutualtieupes} Mutual TieUps</div>
                </div> 
    }
    else
    {
        let detail = <React.Fragment>                
                        <a href="#/">                
                            <ProfilePic type={props.imagetype} altname=""></ProfilePic>
                        </a>
                    </React.Fragment>                
        tieupsdata.push(<React.Fragment>{detail}</React.Fragment>)        
        divdata= <div className={classshared.linkup_block}>{tieupsdata}            
                    <div className={classshared.font_1_regular_text_12_color_grey_dark_3.join(' ')}>No Mutual TieUps</div>
                </div> 
    }        
    return(
            <React.Fragment>{divdata}</React.Fragment>            
        )  
}

export default React.memo(mutualtieups);