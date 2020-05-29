import React from 'react';
import ReactFilestack from 'filestack-react';
import * as classesshared from './classconst';
import { FilestackType, filestackclientid } from '../../shared/utility';

const FilestackUpload = (props) => {

    let classname = "";
    let buttontext = null;
    let btntype = null;

    switch (props.buttontype) {
        case (FilestackType.moderatordoc):
            buttontext = "Click to Upload";
            classname = [classesshared.textlink]
            btntype = classname.join(' ')
            break;
        case (FilestackType.usercoverpic):
            buttontext = " ";
            classname = classesshared.btnedicoverpic;
            btntype = classname.join(' ')
            break;
        case (FilestackType.userprofilepic):
            buttontext = " ";
            classname = classesshared.btn_edit_profile_small;
            btntype = classname.join(' ')
            break;
        case (FilestackType.userprofilesteppic):
            buttontext = " ";
            classname = classesshared.btn_edit_profile_setup_small;
            btntype = classname.join(' ')
            break;
        case (FilestackType.streamphoto):
            buttontext = "Upload Photo";
            classname = classesshared.user_profile_streamline_photo;
            btntype = classname.join(' ')
            break;
        case (FilestackType.streamvideo):
            buttontext = "Upload Video";
            classname = classesshared.user_profile_streamline_photo;
            btntype = classname.join(' ')
            break;
        case (FilestackType.uploadbrochure):
            buttontext = "Upload Brochure";
            classname = classesshared.textlink_showmoreless_blue_font_1_medium;
            btntype = classname.join(' ')
            break;
        case (FilestackType.uploadimages):
            buttontext = "Upload Images";
            classname = classesshared.textlink_showmoreless_blue_font_1_medium;
            btntype = classname.join(' ')
            break;
        case (FilestackType.uploaddoc):
            buttontext = "Upload Doc";
            classname = classesshared.textlink_showmoreless_uploaddoc_blue_font_1_medium;
            btntype = classname.join(' ')
            break;
        default:
            buttontext = "Change";
            classname = [classesshared.changeimgbtn];
            btntype = classname.join(' ')
            break;
    }
    if (props.buttontext !== undefined) {
        buttontext = props.buttontext
    }
    return (
        // <ReactFilestack apikey={filestackclientid}  
        //     onSuccess={props.onSuccessupload} 
        //     onError={props.onErrorupload} 
        //     buttonText={buttontext}
        //     buttonClass={btntype}
        //     options={props.option}
        // />   
        <ReactFilestack
            apikey={filestackclientid}
            actionOptions={props.option}
            componentDisplayMode={{
                type: 'button',
                customText: buttontext,
                customClass: btntype
            }}
            onSuccess={props.onSuccessupload}
        />
    )
}
export default FilestackUpload;