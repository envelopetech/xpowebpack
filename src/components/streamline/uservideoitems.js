import React from 'react';
import * as classshared from './classconst';
import Button from '../UI/Button/Button' ;
import { ICONS, ButtonType, ProfilepicType, customPopUp} from '../../shared/utility';
import axios from '../../store/axios-orders'; 
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import 'video-react/dist/video-react.css';
import Profilepic from '../UI/profilepic/profilepic';
import Modal from  "react-responsive-modal";//'../../UI/Modal/Modal';
import Streamlineitems from './streamlineitems';
import { userpostupdate , user_feeds_likes, user_feeds_unlike} from '../../actions/streamlines/dataactions'
import socket from '../../actions/socket';

class uservideoitems extends React.Component {
    constructor(props) {       
        super(props);          
        this.state={
            showMenu: false,
            totallikescount: props.totallikescount,
            totalcommentscount: props.totalcommentscount,
            totalcommentsdata: props.totalcommentsdata,
            currentuserlike: props.currentuserlike,
            commentvalue:null,
            is_edit_mode:false,          
            buttondisabled:true,
            is_open_video_play_popup:false,
            client: socket()   
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);     
    }
    showMenu(event) {        
        event.preventDefault();        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
      }      
    closeMenu(event) {
        event.preventDefault();        
          this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });           
    }
    userpostunlikehandler= (event, id) => {   
        event.preventDefault();             
        const data = {
            user_post_id: id          
        };     
        var listdata = user_feeds_unlike(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ currentuserlike: false, totallikescount: parseInt(this.state.totallikescount, 10) - 1 })
                }
            }
        });        
    }
    userpostlikehandler= (event, id) => {                  
        event.preventDefault();           
        const data = {
            user_post_id: id           
        };     
        var listdata = user_feeds_likes(data)
        listdata.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ currentuserlike: true, totallikescount: parseInt(this.state.totallikescount, 10) + 1 }, () => {
                        this.state.client.user_feeds_likes(res.data);
                    });
                }
            }
        });      
    }
    usercommentshandler= (event, id) => {  
        event.preventDefault();        
        if (event.keyCode === 13) 
        {  
            const data = {
                user_post_id: id,
                comments:event.target.value           
            };             
            this.setState({commentvalue: event.target.value});                   
            this.props.onusercommentssave(data ); 
            this.setState({currentuserlike:true, totalcommentscount : parseInt(this.state.totalcommentscount, 10) + 1, commentvalue:""})            
        }       
    }
    feedmessagedchanged = (e) => {        
        this.setState({
            postmessage: e.target.value,
            buttondisabled:false           
        });
        if(e.target.value === "")
        {
            this.setState({                
                buttondisabled:true           
            });
        }
    }  
    editposthandler= () => {
        this.setState({                
            is_edit_mode:true,
            buttondisabled:false         
        });
    }
    userpostcancelhandler= () => {
        this.setState({                
            is_edit_mode:false           
        });
    }
    userfeedposthandler = () => {        
        const dataval = {
            feed_message: this.props.postmessage,   
            id:this.props.id        
        };                   
        var data = userpostupdate(dataval)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.setState({
                    is_edit_mode: false
                });
            }
        });
    }
    openvideoplaypopuphandler= () => {
        this.setState({is_open_video_play_popup: true});       
    } 
    closevideoplaypopuphandler= () => {
        this.setState({is_open_video_play_popup: false});       
    }
    render()
    { 
        return(              
            <React.Fragment>
                <Modal open={this.state.is_open_video_play_popup}  styles={customPopUp}
                    onClose={this.closevideoplaypopuphandler} center showCloseIcon={false}>
                   
                            <div className={classshared.popup__content_header}>
                                <div  className={classshared.sidebar__user_stats.join(' ')}>                       
                                    <div className={classshared.sidebar__user_details_left.join(' ')}>
                                        {/*<h2 className={classshared.font_1_bold_text_18_text_dark.join(' ')}>{titleheading.uploadvideo}</h2>*/}
                                    </div>    
                                    <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                        <Button btntype={ButtonType.btn_close_popup} clicked={this.closevideoplaypopuphandler} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                    </div>            
                                </div>                                                   
                            </div>
                            <Streamlineitems 
                            key={this.props.id} 
                            id={this.props.id} 
                            profile_pic_url={this.props.profile_pic_url}
                            ProfilepicType={ProfilepicType.user_nav__user_photo_small} 
                            wall_post_type={this.props.wall_post_type} 
                            userpostername={this.props.userpostername}
                            posttime={this.props.posttime} 
                            postmessage={this.props.postmessage}  
                            currentuserprofileforcomment={ProfilepicType.user_nav__user_photo_xsmall_margin_r_m} 
                            current_user_profile_pic_url={this.props.current_user_profile_pic_url}                                                                  
                            totallikescount={this.props.totallikescount}
                            totalcommentscount={this.props.totalcommentscount}
                            totalcommentsdata={this.props.totalcommentsdata}
                            currentuserlike={this.props.currentuserlike}                            
                            useruploadedphototype={ProfilepicType.photos__image_large_streamline} 
                            video_thumbnail_image_url ={this.props.video_thumbnail_image_url}
                            video_id ={this.props.video_id}
                            posttype={this.props.post_type}>
                            </Streamlineitems>
                        
                </Modal>
            <div className={classshared.photos__wrapper} onClick={this.openvideoplaypopuphandler}>
                <div className={classshared.photos__image}>
                    <Profilepic profilepic_url={this.props.video_thumbnail_image_url} type={this.props.ProfilepicType} altname=""></Profilepic>
                    <div className={classshared.play_button}></div>
                </div>
                <div className={classshared.photos__content}>
                    <div className={classshared.photos__content_inner}>
                        <h3 className={classshared.font_1_regular_text_14.join(' ')}>{this.props.postmessage}</h3>                
                        <div className={classshared.like_icon}>
                            {                            
                                this.state.currentuserlike
                                ?
                                (
                                    <Button btntype={ButtonType.btnsharecommentlikepost} clicked= {( event ) => this.userpostunlikehandler( event, this.props.id)} svgclass={classshared.photo_icon_blue.join(' ')} icon={ICONS.THUMBSUPS}></Button>
                                )
                                :
                                (
                                    <Button btntype={ButtonType.btnsharecommentlikepost} clicked= {( event ) => this.userpostlikehandler( event, this.props.id)} svgclass={classshared.photo_icon} icon={ICONS.THUMBSUPS}></Button>
                                )
                            }                            
                            <span className={classshared.text_light.join(' ')}>{this.state.totallikescount}</span>
                        </div>
                        <div className={classshared.like_icon}>
                            <Button btntype={ButtonType.btnsharecommentlikepost} clicked={this.userpostcommenthandler} svgclass={classshared.photo_icon} icon={ICONS.POSTCOMMENTS}></Button>
                            <span className={classshared.text_light.join(' ')}>{this.state.totalcommentscount}</span>
                        </div>                                                  
                        <div className={classshared.card__dots_flex}>                        
                            <Button btntype={ButtonType.btnuserpostmore} 
                            clicked={this.showMenu} svgclass={classshared.dots__icon} 
                            icon={ICONS.MORE_VERTICAL}></Button>
                            {
                                this.state.showMenu
                                ? 
                                (
                                    <div 
                                    className={classshared.arrow_box}
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}
                                    >
                                    <Button  btntype={ButtonType.btnlistdeleteedit} clicked={this.editposthandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.NEWMESSAGE}></Button>
                                    <Button btntype={ButtonType.btnlistdeleteedit} clicked={this.props.deleteposthandler} svgclass={classshared.icon_15_icon_grey_margin_r_10.join(' ')} icon={ICONS.TRASH}></Button>
                                    </div>
                                )
                                : 
                                (
                                    null
                                )
                            }
                        </div>
                    </div>  
                </div>
            </div>
          </React.Fragment>                                
        )  
    } 
}
////export default streamlineitems;
const mapDispatchToProps = dispatch => {
    return {                                    
        onusercommentssave: (data) => dispatch(actions.usercommentssave(data)),        
    };
};
export default connect(null, mapDispatchToProps)(uservideoitems, axios );