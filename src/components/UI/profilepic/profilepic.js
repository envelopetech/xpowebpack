import React from 'react';
import logo from '../../../assets/images/default_avatar.png';
import * as classshared from './classconst';
import { ProfilepicType } from '../../../shared/utility';
import { SkeletonImg } from 'react-js-skeleton';

const profilepic = (props) => {    
    let profilepic = logo;
    let classname = "";
    if (props.profilepic_url !== undefined && props.profilepic_url !== null) {
        profilepic = props.profilepic_url;
    }
    switch (props.type) {
        case (ProfilepicType.user_nav__user_photo_xsmall):
            classname = classshared.user_nav__user_photo_xsmall;
            break;
        case (ProfilepicType.user_nav__user_photo_large):
            classname = classshared.user_nav__user_photo_large;
            break;
        case (ProfilepicType.uploadeduserstreamlinephoto):
            classname = classshared.user_streamline_photo;
            break;
        case (ProfilepicType.avatar):
            classname = classshared.avatar;
            break;   
               
        case (ProfilepicType.tieupsmediumpic):
            classname = classshared.tieup_profile_hero;
            break;
        case (ProfilepicType.user_nav__user_photo_medium):
            classname = classshared.user_nav__user_photo_medium;
            break;
        case (ProfilepicType.user_nav__user_photo_xsmall_margin_r_m):
            classname = classshared.user_nav__user_photo_xsmall_margin_r_m;
            break;
        case (ProfilepicType.user_nav__user_photo_small):
            classname = classshared.user_nav__user_photo_small;
            break;
        case (ProfilepicType.photos__image_large):
            classname = classshared.photos__image_large;
            break;
        case (ProfilepicType.photos__image_large_streamline):
            classname = classshared.photos__image_large_streamline;
            break;
        case (ProfilepicType.profilesetuppic):
            classname = classshared.user_profile_setup_profile_pic;
            break;
        case (ProfilepicType.user_nav__user_photo_xxsmall_with_margin):
            classname = classshared.user_nav__user_photo_xxsmall_with_margin;
            break;
        case (ProfilepicType.avatar_l):
            classname = classshared.avatar_l;
            break;
        case (ProfilepicType.avatar_40px):
            classname = classshared.avatar_40px;
            break; 
        case (ProfilepicType.img_square_l):
            classname = classshared.img_square_l;
            break;
        case (ProfilepicType.avatar_l_avatar_m):
            classname = classshared.avatar_l_avatar_m;
            break;
        case (ProfilepicType.avatar_l_avatar_xl):
            classname = classshared.avatar_l_avatar_xl;
            break;
        case (ProfilepicType.square_image_large):
            classname = classshared.exhibitor_list;
            break;
        case (ProfilepicType.image_only_height_25):
            classname = classshared.image_only_height_25;
            break;
        default:
            classname = classshared.user_nav__user_photo_small;
            break;
    }
    return (
        <React.Fragment>
            {/*<img alt={props.altname} src={profilepic} className={classname}></img> */}
            <SkeletonImg
                img={profilepic}
                setClass={classname.join(' ')}
                setClassSkeleton={classname.join(' ')}
                heightSkeleton={props.skeletonheight}
                widthSkeleton={props.skeletonwidth}
            ></SkeletonImg>

            {/* <div  className={classname.join(' ')} style={{backgroundImage: `url(${profilepic})`}}>              
            </div>  */}
        </React.Fragment>
    );
}
export default profilepic;
    ///////------------if set image in div background than give below css
    //width: 80px;
    //height: 80px;
    //border-radius: 50%;
    //background-repeat: no-repeat;
    ///background-position: 50% 50%;    
    //background-size: cover;