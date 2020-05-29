import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import Button from '../UI/Button/Button' ;
import { ICONS, ButtonType} from '../../shared/utility';


class usercommentslistitemsnode extends React.Component {  
    
    render()
    {             
        return(              

            <React.Fragment>                   
                <li>
                    <div className={classshared.comments_list__main.join(' ')}>
                        <div className={classshared.comment_space.join(' ')}>
                            <div className={classshared.comments_header.join(' ')}>
                                <div className={classshared.user_nav__icon_box3}>
                                    <Profilepic profilepic_url={this.props.profilepic_url} type={this.props.commentusertype} altname=""></Profilepic>
                                </div>
                                <div className={classshared.comments_header.join(' ')}>Nisarg Mehta</div>
                                <div className={classshared.comments_message_text.join(' ')}>commented on your post</div>
                            </div>
                        </div> 

                        <div className={classshared.comment_icons}>
                            <div className={classshared.like_icon_margin_r_m.join(' ')}>  
                                <Button btntype={ButtonType.btnsharecommentlikepost} svgclass={classshared.comment__icon} icon={ICONS.THUMBSUPS}></Button>                          
                                <span className={classshared.join(' ')}>Like</span>
                            </div>
                            <div className={classshared.like_icon}> 
                                <Button btntype={ButtonType.btnsharecommentlikepost} svgclass={classshared.comment__icon} icon={ICONS.REPLY}></Button>                                
                                <span className={classshared.likes__number.join(' ')}>Reply</span>
                            </div>    
                        </div>
                    </div>                    
                </li>               
            </React.Fragment>
        )  
    } 
}
export default usercommentslistitemsnode;