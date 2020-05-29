import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import { get_exhibitor_staff_data, exhibitor_staff_request_send, save_existing_member_staff_invitation, delete_staff_member_request_from_exhibitor } from '../../../actions/exhibitor/dataactions';
import Stafflistitem from './stafflistitem'
import Search from '../../UI/search/search'
import { searchplaceholder, searchpagetype, ProfilepicType, ButtonText, ButtonType, error_message
    // , nodatatext_image_configuration
    // , nodatatext_message
    // , ICONS 
, confirmdelete, customPopUp} from '../../../shared/utility';
import Button from '../../UI/Button/Button'
import Modal from "react-responsive-modal";//'../../UI/Modal/Modal';
import Staffform from './staffform';
import defaultimage from '../../../assets/images/default_avatar.png';
// import Nodatamessage from '../../nodatamessage/nodatamessage'
// import nodataimage from '../../../assets/images/nodatafound.svg';
import Spinner from '../../UI/Spinner/Spinner';
 //import { confirmAlert } from 'react-confirm-alert'; // Import
// import DeleteConfirmation from '../../UI/Deleteconfirmation/deleteconfirmation'


class stafflist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            exhibitorstaffdata: null,
            is_open_staff_form: false,
            selectedOption: null,
            errormessage: null,
            delete_item_id: null
        }
    }
    filldata() {
        this.setState({ loading: true })
        var data = get_exhibitor_staff_data(this.props.exhibitor_id, false)
        data.then(res => {
            if (res !== undefined) {
                if (res.data["error"] === undefined) {
                    this.setState({ exhibitorstaffdata: res.data, loading: false });
                }
            }
        });
    }
    addmodelhandler = (event) => {
        event.preventDefault();
        this.setState({ is_open_staff_form: true });
    }
    closemodelhandler = () => {
        this.setState({ is_open_staff_form: false });
    }
    componentDidMount() {
        this.filldata();
    }

    submit = (values) => {
        const dataval = {
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
            // role: values.role,
            exhibitor_id: this.props.exhibitor_id
        };
        var data = exhibitor_staff_request_send(dataval, null)
        data.then(res => {
            if (res.data["error"] === undefined) {
                if (!res.data) {
                    this.setState({ is_open_staff_form: false }, () => {
                        this.filldata();
                        // //this.setState({ exhibitorstaffdata: [res.data, ...this.state.exhibitorstaffdata]})
                        // if (this.state.exhibitorstaffdata === null && this.state.exhibitorstaffdata.length === 0) {
                        //     this.setState({ exhibitorstaffdata: res.data })
                        // }
                        // else {
                        //     this.setState({ exhibitorstaffdata: [res.data, ...this.state.exhibitorstaffdata] })
                        // }
                    })
                }
                else {
                    //Display message to user that, email address is already available in our system.
                    //Not fixed yeat, where it would be show to users.
                }

            }
        });
    }
    exhistingmemberstaffinvitationsend = () => {
        if (this.state.selectedOption !== null) {
            const dataval = {
                user_datas: this.state.selectedOption,
                exhibitor_id: this.props.exhibitor_id
            };
            var data = save_existing_member_staff_invitation(dataval, null)
            data.then(res => {
                if (res.data["error"] === undefined) {
                    // if(!res.data)
                    // {
                    this.setState({ is_open_staff_form: false }, () => {
                        this.filldata();
                    })
                }
            });
        }
        else {
            this.setState({ errormessage: error_message.selectusers })
        }
    }
    exhibitorchangehandler = (selectedOption) => {
        this.setState({ selectedOption });
    }

    deleteitemconfirmhandler = (event, id) => {
        event.preventDefault();
        this.setState({ delete_item_id: id }, () => {
            confirmdelete(this.deletestaffrequesthandler);
        });
    }
    deletestaffrequesthandler = () => {         
        const dataval = {
            id: this.state.delete_item_id
        };
        var returndata = delete_staff_member_request_from_exhibitor(dataval)
        returndata.then(res => {
            let filterdata = this.state.exhibitorstaffdata.filter((post) => {
                return this.state.delete_item_id !== post.id;
            });
            this.setState(state => {
                state.exhibitorstaffdata = filterdata;
                return state;
            });
        })
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.exhibitorstaffdata !== this.state.exhibitorstaffdata;
    // }
    render() {      
        let spinnerform = null
        if (this.state.loading) {
            spinnerform = <Spinner />
        }
        // let divnodatamessage =
        //     <Nodatamessage imagesource={nodataimage}
        //         type={nodatatext_image_configuration.userprofilevideo}
        //         nodata_message={nodatatext_message.noexhibitorstafffound}
        //         btntype={ButtonType.edit_mode_button_profile}
        //         svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
        //         ishow={true}
        //         icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}>
        //     </Nodatamessage>
        let tieupsdeetail = [];
        let finalist = null;
        finalist = this.state.exhibitorstaffdata;
        if (finalist !== null) {
            if (finalist.length > 0) {
                if (!this.props.is_editmode) {
                    finalist = finalist.filter(element => element.statusname === "Accepted")
                }
                finalist.map((item, i) => {
                    let name = "";
                    let picurl = "";
                    let designation = "";
                    let location = ""
                    if (item.userdetail !== null && item.userdetail !== undefined && item.userdetail.length > 0) {
                        name = item.userdetail[0].name;
                        picurl = item.userdetail[0].profile_pic_url;
                        designation = item.userdetail[0].work_as;
                        location = item.userdetail[0].location;
                    }
                    else {
                        name = item.first_name + " " + item.last_name
                        picurl = defaultimage;
                        designation = item.role
                    }
                    let detail =
                        <Stafflistitem
                            exhibitor_id={this.props.exhibitor_id}
                            is_editmode={this.props.is_editmode}
                            id={item.id}
                            userid={item.user_id}
                            otheruserid={this.state.otheruserid}
                            profile_pic_url={picurl}
                            name={name}
                            designation={designation}
                            location={location}
                            ProfilepicType={ProfilepicType.tieupsmediumpic}
                            mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}
                            tieups_requested={this.state.tieups_requested}
                            statusname={item.statusname}
                            loggedin_userstatus={item.loggedin_userstatus}
                            tieups_just_requested={this.state.tieups_just_requested}
                            tieupsclickhandler={(e) => this.tieupsclickhandler(e, i, item.user_id)}
                            deletestaffrequesthandler={(event) => this.deleteitemconfirmhandler(event, item.id)}>
                        </Stafflistitem>
                    return (
                        tieupsdeetail.push(
                            <React.Fragment>{detail}</React.Fragment>
                        )
                    )
                });
            }
        }
        //#region If data null than skeleton display
        // else {
        //     tieupsdeetail = divnodatamessage
        //     // if(this.state.totalshowlesscount > 0)
        //     // {
        //     //     tieupsdeetail = range(0, this.state.totalshowlesscount -1).map( (i)  => (
        //     //         <Stafflistitem ProfilepicType={ProfilepicType.tieupsmediumpic} 
        //     //         mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall} 
        //     //         exhibitor_id ={this.props.exhibitor_id}                    
        //     //         is_editmode ={this.props.is_editmode}></Stafflistitem>
        //     //         ));
        //     // }          
        // }
        //#endregion   
        return (
            <React.Fragment>
                {spinnerform}
                <Modal open={this.state.is_open_staff_form}  styles={customPopUp}                                       
                    onClose={this.closemodelhandler} center showCloseIcon={false}>
                    <Staffform onSubmit={this.submit}
                        exhibitor_id={this.props.exhibitor_id}
                        closemodal={this.closemodelhandler}
                        exhibitorchangehandler={this.exhibitorchangehandler}
                        selectedOption={this.state.selectedOption}
                        exhistingmemberstaffinvitationsend={this.exhistingmemberstaffinvitationsend}
                        errormessage={this.state.errormessage}
                    ></Staffform>
                </Modal>
                <div className={classshared.w_container}>
                    <div className={classshared.margin_t_b_25_flex.join(' ')}>
                        <Search placeholder={searchplaceholder.generalsearch} pagetype={searchpagetype.profiletieups}></Search>
                        <div>
                            {
                                this.props.is_editmode
                                    ?
                                    (
                                        <Button btntype={ButtonType.btn_btn_outline_blue} clicked={this.addmodelhandler}>{ButtonText.addmembers}</Button>
                                    ) :
                                    null
                            }
                        </div>                        
                    </div>
                    {tieupsdeetail}
                </div>
            </React.Fragment>
        )
    }
}
export default stafflist