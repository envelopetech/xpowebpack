import React, { Component } from 'react';
import * as classshared from './classconst';
import logoimage from '../../assets/images/574.043--x-100-px.png';
import ImageUpload from '../FilestackUpload/FilestackUpload';
import { FilestackType, ProfilepicType, titleheading, label_text, ButtonText, ButtonType, commonplaceholder, getfilestackpreviewurl, filestackoptionimage } from '../../shared/utility';
import Pic from '../UI/profilepic/profilepic';
import defaultimage from '../../assets/images/default_avatar.png';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../../components/UI/reduxformcontrols/TextInput';
import Button from '../../components/UI/Button/Button';
import Autocomplete from 'react-google-autocomplete';
import { required } from 'redux-form-validators';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

const styles = {
    content: {
        display: 'flex',
        maxWidth: '940px',
        alignItems: 'center',
        margin: '0px auto',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            padding: '15px',
        }
    },

    marginBottomLg: {
        marginBottom: '48px',
    }
}

class firststep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploaded_image_url: props.profile_pic_url === null ? defaultimage : props.profile_pic_url
        }
    }
    componentDidMount() {
        this.props.change("firstname", this.props.first_name);
        this.props.change("lastname", this.props.last_name);
        this.props.change("autolocation", this.props.location);
        this.props.change("location", this.props.location);
        this.props.change("profileimageurl", this.props.profile_pic_url);
        this.props.change("profileimageurlpreview", this.props.profile_pic_url_preview);
    }
    onSuccessImageupload = (result) => {
        let preview = getfilestackpreviewurl(result.filesUploaded[0]["handle"]);
        let imageurl = result.filesUploaded[0]["url"];
        this.setState({
            uploaded_image_url: imageurl
        })
        this.props.change("profileimageurl", imageurl);
        this.props.change("profileimageurlpreview", preview);
    };
    render() {
        const { classes } = this.props;
        const { handleSubmit } = this.props
        return (
            <React.Fragment>
                <Form className={classshared.login_form.join(' ')} onSubmit={handleSubmit}>
                    <div className={classshared.fixed_content.join(' ')}>
                        <div className={classshared.navbar}>
                            <div className={classshared.w_container}>
                                <a href="https://xporium.com" className={classshared.brand}><img src={logoimage} height="40" alt=""></img></a>

                            </div>
                        </div>
                        <div className={clsx(classes.content, classes.marginBottomLg)}>
                            <div className={classshared.size1of1.join(' ')}>
                                <div className={classshared.overflow__visible.join(' ')}>
                                    <div className={classshared.progressDot_active}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                    <div className={classshared.progressDot_inactive}></div>
                                </div>
                                <h1 className={classshared.font_1_regular_text_dark.join(' ')}>Let's get started!</h1>
                                <div className={classshared.font_weight_thin_text_dark.join(' ')}>Alright! Let's set this up. Tell us a bit about yourself.</div>
                            </div>
                        </div>
                        <div className={classes.content}>


                            <div className={classshared.half_flex}>
                                <div className={classshared.avatar_upload}>
                                    <div className={classshared.avatar_edit}>
                                        <ImageUpload buttontype={FilestackType.userprofilesteppic} option={filestackoptionimage} onSuccessupload={this.onSuccessImageupload} />
                                    </div>
                                    <div className={classshared.avatar_preview}>
                                        <Pic type={ProfilepicType.profilesetuppic} profilepic_url={this.state.uploaded_image_url}></Pic>
                                    </div>
                                </div>
                                <div className={classshared.centered_text_center.join(' ')}>
                                    <p className={classshared.upload_pic_dim__high.join(' ')}>Upload Profile Picture</p>
                                    <p className={classshared.upload_pic_tip_text.join(' ')}>Tip: Adding a picture adds a lot of trust factor amongst other community members.</p>
                                </div>
                            </div>
                            <div className={classshared.half_flex}>

                                <div className="">

                                    <div className={classshared.margin_top__lv8}>
                                        <div className={classshared.form_group}>
                                            <Field
                                                name={titleheading.firstname.toLowerCase()}
                                                type="text"
                                                tabIndex={1}
                                                component={TextInput}
                                                className={classshared.input_box}
                                                placeholder={commonplaceholder.first_name}
                                                errorclass={classshared.formlabelerror}
                                                inputbordererrorclass={classshared.input_box_error}
                                                validate={[required()]}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.firstname}</label>
                                        </div>
                                        <div className={classshared.form_group}>
                                            <Field
                                                name={titleheading.lastname.toLowerCase()}
                                                type="text"
                                                tabIndex={2}
                                                component={TextInput}
                                                className={classshared.input_box}
                                                placeholder={commonplaceholder.last_name}
                                                errorclass={classshared.formlabelerror}
                                                inputbordererrorclass={classshared.input_box_error}
                                                validate={[required()]}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.lastname}</label>
                                        </div>
                                        <div className={classshared.form_group}>
                                            {/* <Field
                                                        name={titleheading.location.toLowerCase()}
                                                        type="text"                    
                                                        component={TextInput}                    
                                                        className={classshared.input_box}
                                                        placeholder={commonplaceholder.location}
                                                        errorclass ={classshared.formlabelerror}
                                                        inputbordererrorclass={classshared.input_box_error}                     
                                                        //validate={[required(), email()]}
                                                    /> */}
                                            <Field
                                                component={TextInput}
                                                name="profileimageurl"
                                                type="hidden"
                                                style={{ height: 0 }}
                                            />
                                            <Field
                                                component={TextInput}
                                                name="profileimageurlpreview"
                                                type="hidden"
                                                style={{ height: 0 }}
                                            />
                                            <Field
                                                component={TextInput}
                                                name="location"
                                                type="hidden"
                                                style={{ height: 0 }}
                                            />
                                            <Autocomplete
                                                tabIndex={3}
                                                onPlaceSelected={(place) => {
                                                    console.log(place["name"]);
                                                    console.log(place["formatted_address"]);
                                                    let data = null;
                                                    if (place["name"] !== undefined) {
                                                        data = place["name"]
                                                    }
                                                    else {
                                                        data = place["formatted_address"]
                                                    }
                                                    this.props.change("location", data);
                                                }}
                                                types={['(regions)']}
                                                name="autolocation"
                                                className={classshared.input_box}
                                                value={this.props.location}
                                            />
                                            <label className={classshared.form_label.join(' ')}>{label_text.location}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classshared.fixed_footer}>
                            <div className={classshared.flex_align_center_bottom.join(' ')}>
                                {/* <a className={classshared.explore__items} onClick={this.props.goBack}>                
                            <Icon svgclass={classshared.common__icon} icon={ICONS.LEFTARROW}/>                             
                            <strong className={classshared.side_nav__item}>{ButtonText.back} </strong>                   
                        </a> .
                         */}
                            </div>
                            <div className={classshared.flex_align_center_bottom.join(' ')}>
                                <Button btntype={ButtonType.profilesetupbutton} buttontype="submit">{ButtonText.next}</Button>
                                <div className={classshared.margin_l_m}>
                                    <a href="#/" className={classshared.explore__items} onClick={this.props.skipPage}>
                                        <strong className={classshared.side_nav__item}>{ButtonText.skip} </strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}
firststep = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    //validate
})(firststep);


export default withStyles(styles)(firststep);