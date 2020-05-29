import React from 'react';
import * as classshared from '../../commoncss/classconst';
import Profilepic from '../../UI/profilepic/profilepic';
import Button from '../../UI/Button/Button'
import NavButton from '../../UI/Button/navlinkbutton'
import { encodedstring, customPopUp } from '../../../shared/utility';
import Leadrefusedreason from '../../streamline/wingstreamline/leadrefusedreason';
import Modal from "react-responsive-modal";//'../../UI/Modal/Modal';


class wingsterlistitem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openrejectpopup: false,
            loading:false
        }
    }
    wingsterrequestrejecthandler = (event) => {
        event.preventDefault();
        this.setState({ openrejectpopup: true })
    }
    closeleadrejectmodalhandler = (event) => {
        event.preventDefault();
        this.setState({ openrejectpopup: false })
    }
    

    render() {
            let encoded = encodedstring(this.props.user_id)
        return(

            <React.Fragment >
                <Modal open={this.state.openrejectpopup} styles={customPopUp}
                    onClose={this.closeleadrejectmodalhandler} center showCloseIcon={false}>
                    <Leadrefusedreason
                        title="Refused the wingster's request"
                        subtitle="Add the reason below to refused the wingster's request."
                        onSubmit={this.props.wingsterrejecthandler}
                        closemodal={this.closeleadrejectmodalhandler}
                        id={this.props.id}
                    >
                    </Leadrefusedreason>
                </Modal>
                <div className={classshared.card_back_relative_card_wingster.join(' ')}>
                    <div className={classshared.middle}>
                        {
                            !this.props.alreadymember ?
                                (
                                    <React.Fragment>

                                        <Button
                                            btntype={this.props.approvebuttontype}
                                            buttontype="button"
                                            clicked={this.props.wingsterapprovehandler}>{this.props.approvetext}
                                        </Button>
                                        <Button
                                            btntype={this.props.rejectbuttontype}
                                            buttontype="button"
                                            clicked={this.wingsterrequestrejecthandler}>{this.props.rejecttext}
                                        </Button>
                                    </React.Fragment>
                                ) :
                                (
                                    <React.Fragment>
                                        <Button
                                            btntype={this.props.rejectbuttontype}
                                            buttontype="button"
                                            clicked={this.props.removefromwinghandler}>{this.props.rejecttext}
                                        </Button>
                                    </React.Fragment>
                                )
                        }
                        <NavButton
                            btntype={this.props.viewprofilebuttontype}
                            buttontype="button"
                            link={`/home/${encoded}`}
                            clicked={this.props.viewprofilehandler}
                            istargetblank={true}>{this.props.viewprofiletext}

                        </NavButton>
                    </div>
                    <div className={classshared.personal_header}>
                        <div className={classshared.margin_r_sm}>
                            <Profilepic profilepic_url={this.props.profile_pic_url} type={this.props.ProfilepicType} altname=""></Profilepic>
                        </div>
                        <div>
                            <p className={classshared.font_1_medium_text_dark_text_12.join(' ')}>{this.props.name}</p>
                            <p className={classshared.text_11.join(' ')}>{this.props.work_as}</p>
                        </div>
                    </div>
                    <div className={classshared.other_info}>
                        <p className={classshared.text_10}>{this.props.address1}</p>
                        <p className={classshared.text_10}>{this.props.address2}</p>
                        <p className={classshared.text_10}>{this.props.phone_number}</p>
                        <p className={classshared.text_10}>{this.props.company_website}</p>
                        <p className={classshared.text_10}>{this.props.company_email}</p>
                    </div>
                    <div className={classshared.company_logo}>
                        <Profilepic type={this.props.companylogotype} profilepic_url={this.props.company_logo_url}></Profilepic>
                    </div>
                </div>
            </React.Fragment >
        )
    }


}
export default wingsterlistitem;