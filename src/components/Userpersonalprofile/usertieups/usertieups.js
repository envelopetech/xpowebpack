import React from 'react';
import * as classshared from './classconst';

import ProfilePic  from '../../UI/profilepic/profilepic';
import {ProfilepicType} from '../../../shared/utility';

class usertieups extends React.Component {  
    
    
    render()
    {
             
        let tieupsdata=[];
        if(this.props.tieupsdata !== null)
        {     
            this.props.tieupsdata.map( (item,i)  => {                 
                let detail =  <React.Fragment key={item.id}>                
                    <a href="#/" className={classshared.displaycursor} onClick={this.props.settabindexhandler}>                
                        <ProfilePic profilepic_url={item.profile_pic_url} type={ProfilepicType.avatar} altname={item.name}></ProfilePic>
                    </a>
                </React.Fragment>
                return(
                    tieupsdata.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                )
            })
        }
        let tieupdiv ="" 
        if(this.props.totaltieupes !== null && this.props.totaltieupes > 0) 
        {
            tieupdiv = <div className={classshared.main__hero_tieups}>
                            <div>
                                <div className={classshared.avatars}>{tieupsdata}</div>
                            </div>
                            <div className={classshared.main__hero_tieups_right}>
                            <div className={classshared.sidebarimageheader.join(' ')}>({this.props.totaltieupes}) {this.props.nametext}</div>
                            </div>                                            
                        </div>
        }
        return(
            <React.Fragment>{tieupdiv}</React.Fragment>    
        )
    }
}

export default usertieups;