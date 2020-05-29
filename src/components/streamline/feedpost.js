import React from 'react';
import * as classshared from './classconst';
import Button from '../UI/Button/Button';
import ProfilePic from '../UI/profilepic/profilepic';
import Photoupload from '../FilestackUpload/FilestackUpload';
import { PageType, ProfilepicType } from '../../shared/utility';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import InputTrigger from 'react-input-trigger';
import { get_user_mentions_list_by_user } from '../../actions/streamlines/dataactions';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import TextInput from '../UI/reduxformcontrols/TextInput';
//import TextareaInput from '../UI/reduxformcontrols/TextareaInput'


class feedpost extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      top: null,
      left: null,
      buttondisabled: true,
      showSuggestor: false,
      startPosition: null,
      users: null,
      text: null,
      currentSelection: null,
      user_id: null,
      //clearfields_after_submit:props.clearfields_after_submit
    }
    this.toggleSuggestor = this.toggleSuggestor.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTextareaInput = this.handleTextareaInput.bind(this);
  }
  componentWillReceiveProps(nextProps) {   
    if (nextProps.clearfields_after_submit === true) {
      this.setState({ textareaValue: '', buttondisabled: true });
      this.props.change("text_message", null);
    }
    if(nextProps.feedtype === "images" && nextProps.uploaded_image_url !== null)
    {
      this.setState({ buttondisabled: false });
    }
  }
  toggleSuggestor(metaInformation) {
    if (this.props.otheruserid === null || this.props.otheruserid === undefined) {
      const { hookType, cursor } = metaInformation;
      if (hookType === 'start') {
        this.setState({
          showSuggestor: true,
          left: cursor.left,
          top: cursor.top + cursor.height, // we need to add the cursor height so that the dropdown doesn't overlap with the `@`.
          startPosition: cursor.selectionStart,
        });
      }
      if (hookType === 'cancel') {
        // reset the state
        this.setState({
          showSuggestor: false,
          left: null,
          top: null,
          text: null,
          startPosition: null,
        });
      }
    }
  }
  handleInput(metaInformation) {
    this.setState({
      text: metaInformation.text,
    });
  }
  handleKeyDown(event) {
    const { which } = event;
    const { currentSelection, users } = this.state;
    //console.log(which)
    if (which === 40) { // 40 is the character code of the down arrow
      event.preventDefault();
      this.setState({
        currentSelection: (currentSelection + 1) % users.length,
      });
    }
    if (which === 38) { // 40 is the character code of the down arrow
      event.preventDefault();
      this.setState({
        currentSelection: (currentSelection - 1) % users.length,
      });
    }
    if (which === 32) {
      this.setState({
        currentSelection: null,
      });
    }
    if (which === 13) { // 13 is the character code for enter          
      event.preventDefault();
      const { users, currentSelection, startPosition, textareaValue } = this.state;
      const user = users[currentSelection];
      if (user !== undefined) {
        const newText = `${textareaValue.slice(0, startPosition)}${user.name}${textareaValue.slice(startPosition + user.name.length, textareaValue.length)}`
        // reset the state and set new text
        this.props.change("text_message", newText);
        // this.setState({
        //   showSuggestor: false,
        //   left: null,
        //   top: null,
        //   text: null,
        //   startPosition: null,  
        //   textareaValue: newText,              
        //   currentSelection:null
        // });
        // this.setState({
        //   showSuggestor: false,
        //   left: null,
        //   top: null,
        //   text: null,
        //   startPosition: null,
        //   textareaValue: newText,
        //   currentSelection: null,
        //   user_id: this.state.user_id === null ? user.id : [...this.state.user_id, user.id]
        // }, () => {
        //   this.props.change("user_id", this.state.user_id);
        // });
        this.setState({
          showSuggestor: false,
          left: null,
          top: null,
          text: null,
          startPosition: null,
          textareaValue: newText,
          currentSelection: null
        }, () => {
          if (this.state.user_id == null) {
            this.setState({ user_id: user.user_id }, () => {
              this.props.change("user_id", this.state.user_id);
            })
          }
          else {
            this.setState({ user_id: [...this.state.user_id, user.user_id] }, () => {
              this.props.change("user_id", this.state.user_id);
            })
          }
        });
      }
      this.endHandler();
    }
  }
  selectbymousehandler = () => {
    const { users, currentSelection, startPosition, textareaValue } = this.state;
    const user = users[currentSelection];
    if (user !== undefined) {
      const newText = `${textareaValue.slice(0, startPosition)}${user.name}${textareaValue.slice(startPosition + user.name.length, textareaValue.length)}`
      // reset the state and set new text
      this.props.change("text_message", newText);
      // this.setState({
      //   showSuggestor: false,
      //   left: null,
      //   top: null,
      //   text: null,
      //   startPosition: null,  
      //   textareaValue: newText,              
      //   currentSelection:null,
      //   user_id:null
      // });
      // this.setState({
      //   showSuggestor: false,
      //   left: null,
      //   top: null,
      //   text: null,
      //   startPosition: null,
      //   textareaValue: newText,
      //   currentSelection: null,
      //   user_id: this.state.user_id === null ? user.id : [...this.state.user_id, user.id]
      // }, () => {
      //   this.props.change("user_id", this.state.user_id);
      // });
      this.setState({
        showSuggestor: false,
        left: null,
        top: null,
        text: null,
        startPosition: null,
        textareaValue: newText,
        currentSelection: null
      }, () => {
        if (this.state.user_id == null) {
          this.setState({ user_id: user.user_id }, () => {
            this.props.change("user_id", this.state.user_id);
          })
        }
        else {
          this.setState({ user_id: [...this.state.user_id, user.user_id] }, () => {
            this.props.change("user_id", this.state.user_id);
          })
        }
      });
    }
    this.endHandler();
  }
  handleTextareaInput(event) {
    const { value } = event.target;
    this.setState({ textareaValue: value, buttondisabled: false }, () => {
      this.props.change("text_message", value);
    });
    if (value === "") {
      this.setState({
        buttondisabled: true
      });
    }
  }
  handleMouseHover(event, index) {
    event.preventDefault();
    const { users } = this.state;
    this.setState({
      currentSelection: (index) % users.length,
    });
  }
  componentDidMount() { 
    if(this.props.feedtype !== "images")
    {
      if (this.props.textarea_value !== null && this.props.textarea_value !== undefined) {
        this.setState({ textareaValue: this.props.textarea_value, buttondisabled: false }, () => {
          this.props.change("text_message", this.props.textarea_value);
        });
      }
    } 
    else
    {
      this.setState({ textareaValue: this.props.textarea_value, buttondisabled: true }, () => {
        this.props.change("text_message", this.props.textarea_value);
      });
    }  
    
    var data = get_user_mentions_list_by_user()
    data.then(res => {
      if (res !== undefined) {
        if (res.data["error"] === undefined) {
          this.setState({ users: res.data });
        }
      }
    });
  }

  render() {
    // let otherusername=null;
    // if(this.props.otherusername !== null && this.props.otherusername !== undefined)
    // {
    //   otherusername= this.props.otherusername;
    // }
    const { handleSubmit } = this.props;
    let divuserlist = null;
    if (this.state.users !== null) {
      divuserlist = this.state.users.map((user, index) => (
        <div
          key={user.id}
          style={{
            padding: '10px 20px',
            background: index === this.state.currentSelection ? '#eee' : '',
            textTransform: 'capitalize',
            cursor: 'pointer'
          }}
          onMouseEnter={(event) => { this.handleMouseHover(event, index); }}
          onClick={this.selectbymousehandler}
        >
          <div key={user.id} className={classshared.sidebar__user_stats.join(' ')}>
            <div className={classshared.sidebar__user_details_left.join(' ')}>
              <ProfilePic profilepic_url={user.profile_pic_url} type={ProfilepicType.user_nav__user_photo_xsmall} altname=""></ProfilePic>
              <div className={classshared.sidebar__user_stats_company_college.join(' ')}>{user.name}</div>
            </div>
          </div>
        </div>
      ))
    }
    let picdata = null;
    let photovideodiv = null
    let photovideonavbox = null;
    switch (this.props.pagetype) {
      case (PageType.userprofilephoto):
        picdata = this.props.uploaded_file_url
        photovideodiv = <ProfilePic type={this.props.PostProfilepicType} profilepic_url={picdata}></ProfilePic>
        photovideonavbox = [classshared.user_nav__icon_box2]
        break;
      case (PageType.userprofilestreamline):
        picdata = this.props.current_loggedin_user_profile_pic
        photovideodiv = <ProfilePic type={this.props.PostProfilepicType} profilepic_url={picdata}></ProfilePic>
        photovideonavbox = [classshared.user_nav__icon_box2]
        break;
      case (PageType.userprofilevideos):
        photovideodiv = <Player
          playsInline
          poster={this.props.posterimage}
          src={this.props.uploaded_file_url}
        />
        photovideonavbox = [classshared.user_nav__icon_box2_with_width]
        break;
      default:
        break;
    }
    return (
      <Form onSubmit={handleSubmit}>
        <div className={classshared.input_post}>
          <div className={photovideonavbox}>
            {photovideodiv}
          </div>
          <div
            style={{
              position: 'relative',
              width: "100%"
            }}
            onKeyDown={this.handleKeyDown}
          >
            <InputTrigger
              trigger={{
                keyCode: 50,
                shiftKey: true,
              }}
              onStart={(metaData) => { this.toggleSuggestor(metaData); }}
              onCancel={(metaData) => { this.toggleSuggestor(metaData); }}
              onType={(metaData) => { this.handleInput(metaData); }}
              endTrigger={(endHandler) => { this.endHandler = endHandler; }}
            >
              <textarea
                placeholder={this.props.placeholder}
                className={classshared.feedtextarea.join(' ')}
                onChange={this.handleTextareaInput}
                value={this.state.textareaValue}
              />
            </InputTrigger>
            <div
              id="dropdown"
              style={{
                position: "absolute",
                width: "200px",
                borderRadius: "6px",
                background: "white",
                boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",
                zIndex: "1",
                display: this.state.showSuggestor ? "block" : "none",
                top: this.state.top,
                left: this.state.left,
              }}
            >
              <React.Fragment>{divuserlist}
                <Field
                  component={TextInput}
                  name="user_id"
                  type="hidden"
                  style={{ height: 0 }}
                />
                <Field
                  component={TextInput}
                  name="text_message"
                  type="hidden"
                  style={{ height: 0 }}
                />
              </React.Fragment>
            </div>

          </div>
        </div>
        <div className={classshared.input_submitdiv.join(' ')}>
          <div className={classshared.buttoncontainer}>
            {
              this.props.is_photo_button_show
                ?
                (
                  <div className={classshared.mar_r_m}><Photoupload buttontype={this.props.filestacktype} option={this.props.uploadfileoption} onSuccessupload={this.props.onSuccessImageupload} /></div>
                ) : null
            }
            <div className={classshared.mar_r_m}><Button btntype={this.props.btntype}
              buttontype="submit"
              //clicked={this.props.userfeedposthandler} 
              buttondisabled={this.state.buttondisabled}>{this.props.buttontext}</Button></div>
            {
              this.props.is_cancel_button_show
                ?
                (
                  <div className={classshared.mar_r_m}> <Button btntype={this.props.btncanceltype} clicked={this.props.userpostcancelhandler}>{this.props.cancelbuttontext}</Button></div>
                ) : null
            }
          </div>
        </div>
      </Form>
    )
  }
}
feedpost = reduxForm({
  form: 'feedpost',
  //validate,
})(feedpost);
export default feedpost;