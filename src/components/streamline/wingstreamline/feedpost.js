import React from 'react';
import * as classshared from '../classconst';
import Button from '../../UI/Button/Button';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { Wingposttype, commonplaceholder, titleheading, ProfilepicType } from '../../../shared/utility';
import ProfilePic from '../../UI/profilepic/profilepic';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import PhoneNumber from '../../UI/reduxformcontrols/phonenumber';
//import { combineValidators, isRequired} from 'revalidate'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { get_wings_users, get_wings_users_for_lead } from '../../../actions/wings/dataactions';
import InputTrigger from 'react-input-trigger';
import shortid from "shortid";
import { SingleSelect } from "react-select-material-ui";
// const validate = combineValidators({
//     text_message: isRequired({message: 'Write a something..'}),
//     leadtype:isRequired({message: 'Lead type is required'}),   
//   }) 

const options = [
  { value: 'external', label: 'External' },
  { value: 'internal', label: 'Internal' }
]
class feedpost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post_type: Wingposttype.general.toLowerCase(),
      showleadtypefields: false,
      leadtypevalue: '',
      phone: '',
      top: null,
      left: null,
      buttondisabled: true,
      showSuggestor: false,
      startPosition: null,
      users: null,
      text: null,
      currentSelection: null,
      user_id: null,
      wingster_for_lead: null,
      show_contact_fields: false,
      errormessage: null
    }
    this.toggleSuggestor = this.toggleSuggestor.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.clearfields_after_submit === true) {
      this.setState({ textareaValue: '', buttondisabled: true });
      this.props.change("text_message", null);
    }
    if (nextProps.error_message !== null) {
      this.setState({ errormessage: nextProps.error_message })
    }
  }
  componentDidMount() {
    if (this.props.textarea_value !== null) {
      this.setState({ textareaValue: this.props.textarea_value, buttondisabled: false }, () => {
        this.props.change("text_message", this.props.textarea_value);
      });
    }
    var data = get_wings_users(this.props.wing_id)
    data.then(res => {
      if (res !== undefined) {
        if (res.data["error"] === undefined) {
          this.setState({ users: res.data });
          var data1 = get_wings_users_for_lead(this.props.wing_id)
          data1.then(res => {
            if (res !== undefined) {
              if (res.data["error"] === undefined) {
                this.setState({ wingster_for_lead: res.data });
              }
            }
          });
        }
      }
    });
  }
  toggleSuggestor(metaInformation) {
    if (this.state.user_id == null) {
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
        // this.setState({ showSuggestor: false,
        //   left: null,
        //   top: null,
        //   text: null,
        //   startPosition: null,    
        //   textareaValue: newText,
        //   currentSelection:null,
        //   user_id : this.state.user_id === null ? user.id : [...this.state.user_id, user.id] }, () => {
        //   this.props.change("user_id", this.state.user_id);
        // });
        // this.setState({
        //   showSuggestor: false,
        //   left: null,
        //   top: null,
        //   text: null,
        //   startPosition: null,
        //   textareaValue: newText,
        //   currentSelection: null
        // }, () => {
        //   this.setState({ user_id: this.state.user_id === null ? user.id : [...this.state.user_id, user.id] }, () => {
        //     this.props.change("user_id", this.state.user_id);
        //   });
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
      // alert(this.state.user_id)
      // alert(user.id)
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
      //alert(this.state.user_id)
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
  handleMouseHover(event, index) {
    event.preventDefault();
    const { users } = this.state;
    this.setState({
      currentSelection: (index) % users.length,
    });
  }
  handleposttypeChange = (event) => {
    let showleadtypefields = false
    if (event.target.value === Wingposttype.lead.toLowerCase()) {
      showleadtypefields = true;
    }
    this.setState({
      post_type: event.target.value,
      showleadtypefields: showleadtypefields

    });
    this.props.change("posttype", event.target.value);
  }
  phonenumberchange = (value) => {
    this.setState({ phone: value }, () => {
      this.props.change("phonenumber", value);
    });
  }
  leadtypechangehandler = (value) => {
    this.setState({ leadtypevalue: value }, () => {
      this.props.change("leadtype", value.value);
      if (value.value === "external") {
        this.setState({ show_contact_fields: true })
      }
      else {
        this.setState({ show_contact_fields: false })
      }
    });
  }
  handleTextareaInput = (event) => {
    const { value } = event.target;
    this.setState({ textareaValue: value, buttondisabled: false }, () => {
      this.props.change("text_message", value);
    });
    if (value === "") {
      this.setState({
        buttondisabled: true,
        user_id: null
      });
    }
  }
  handlewingsterchange = (value) => {
    this.props.change("selectedwingsterid", value);
    this.setState({ errormessage: null })
  };
  render() {
    const { handleSubmit } = this.props;
    let errordiv = null;
    if (this.state.errormessage !== null) {
      errordiv = <div className={classshared.leadtypeform.join(' ')}>
        <div className={classshared.padding_l_45px}><span className={classshared.labelerror}>{this.state.errormessage}</span>
        </div></div>
    }
    let divuserlist = null;
    if (this.state.users !== null) {
      divuserlist = this.state.users.map((user, index) => (
        <div
          key={shortid.generate()}
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
    let leadtypediv = null;
    if (this.state.showleadtypefields) {
      leadtypediv = <React.Fragment>
        <div className={classshared.leadtypeform.join(' ')}>
          {/* <Field
                        component={Select}
                        name="leadtype"   
                        ismulti={false}    
                        data={options}  
                        placeholder={commonplaceholder.selectleadtype} 
                        option={Options}
                        divclass={classshared.width600per}                         
                        value={this.state.leadtypevalue}  
                        onchangehandler={this.leadtypechangehandler}                      
                    />*/}
          <div className={classshared.padding_l_45px}>
            <div className={classshared.margin_b_m}>
              <div className={classshared.flex_flex_align_center.join(' ')}>
                <Dropdown options={options} onChange={this.leadtypechangehandler}
                  value={this.state.leadtypevalue}
                  placeholder={commonplaceholder.selectleadtype} />
                <div className={classshared.padding_l_m}>
                  <SingleSelect placeholder="Select a wingster" style={{ width: 300 }} options={this.state.wingster_for_lead} onChange={this.handlewingsterchange} />
                  <Field
                    component={TextInput}
                    name="phonenumber"
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <Field
                    component={TextInput}
                    name="text_message"
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <Field
                    component={TextInput}
                    name="leadtype"
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <Field
                    component={TextInput}
                    name="posttype"
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <Field
                    component={TextInput}
                    name="selectedwingsterid"
                    type="hidden"
                    style={{ height: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.show_contact_fields ?
            (
              <div className={classshared.leadtypeform.join(' ')}>
                <div className={classshared.padding_l_45px}>
                  <div className={classshared.margin_b_m}>
                    <div className={classshared.flex_flex_align_center.join(' ')}>
                      <Field
                        id="withallborder"
                        name={titleheading.firstname.toLowerCase()}
                        type="text"
                        tabIndex={1}
                        component={TextInput}
                        className={classshared.input_box}
                        placeholder={commonplaceholder.contact_name}
                        errorclass={classshared.formlabelerror}
                      />
                      <div className={classshared.padding_l_m}>
                        <Field
                          tabIndex={2}
                          component={PhoneNumber}
                          name="phone_number"
                          placeholder={commonplaceholder.phonenumber}
                          phone={this.state.phone}
                          phonenumberchange={this.phonenumberchange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
        }
        {errordiv}
      </React.Fragment>
    }
    return (
      <Form onSubmit={handleSubmit}>
        <div className={classshared.input_post}>
          <div className={classshared.user_nav__icon_box2}>
            <ProfilePic type={this.props.PostProfilepicType} profilepic_url={this.props.loggedin_user_pic_url}></ProfilePic>
          </div>
          <div className={classshared.form_group_width100.join(' ')}>
            {/* <textarea
                        id="withborderarea"
                        placeholder={this.props.placeholder} 
                        className={classshared.feedtextarea.join(' ')}
                        onChange={this.handleTextareaInput}                    
                        />   */}
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
                  id="withborderarea"
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
        </div>
        <div>
          {leadtypediv}
        </div>
        <div className={classshared.input_submitdiv.join(' ')}>
          <div className={classshared.flex_flex_align_center.join(' ')}>
            <div className={classshared.margin_r_sm}> <div className={classshared.font_1_medium_text_dark.join(' ')}>Mark as:</div></div>
            <input
              type="radio"
              value={Wingposttype.general.toLowerCase()}
              checked={this.state.post_type === Wingposttype.general.toLowerCase()}
              className={classshared.margin_r_sm}
              onChange={this.handleposttypeChange}
            />General<br />
            <input
              type="radio"
              value={Wingposttype.lead.toLowerCase()}
              className={classshared.margin_r_sm_margin_l_m.join(' ')}
              checked={this.state.post_type === Wingposttype.lead.toLowerCase()}
              onChange={this.handleposttypeChange}
            />Lead<br />
            <input
              type="radio"
              value={Wingposttype.recommend.toLowerCase()}
              className={classshared.margin_r_sm_margin_l_m.join(' ')}
              checked={this.state.post_type === Wingposttype.recommend.toLowerCase()}
              onChange={this.handleposttypeChange}
            />Recommend<br />
          </div>
          <div className={classshared.margin_r_sm_margin_l_m.join(' ')}>
            <Button btntype={this.props.btntype}
              buttontype="submit"
              buttondisabled={this.state.buttondisabled}>
              {this.props.buttontext}
            </Button>
          </div>
        </div>
      </Form>
    )
  }
}
feedpost = reduxForm({
  form: 'feedpostwing',
  //validate,
})(feedpost);
export default feedpost;