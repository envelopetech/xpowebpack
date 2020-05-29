import React, { Component } from 'react';
import * as classshared from './classconst';
import { getwingsbyuser, exitfromwings, join_user_wings_save, get_all_wings } from '../../../actions/wings/dataactions';
import Userwingitems from './userwingitems';
import { nodatatext_image_configuration, nodatatext_message, ButtonType, PageType, confirmdelete } from '../../../shared/utility';
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import Spinner from '../../UI/Spinner/Spinner';
import socket from '../../../actions/socket';
//import { confirmAlert } from 'react-confirm-alert';
//import DeleteConfirmation from '../../UI/Deleteconfirmation/deleteconfirmation'

class userwings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wingsdata: null,
            loading: false,
            delete_item_id: null,
            client: socket()
        }
    }
    filldata() {
        var data = null;
        switch (this.props.page_type) {
            case (PageType.userwings):
                data = getwingsbyuser()
                data.then(res => {
                    if (res !== undefined) {
                        if (res.data.length > 0) {
                            if (res.data[0]["error"] === undefined) {
                                this.setState({ wingsdata: res.data, loading: false });
                            }
                        }
                        else {
                            this.setState({ loading: false });
                        }
                    }
                    else {
                        this.setState({ loading: false });
                    }
                });
                break;
            case (PageType.explorewings):
                this.setState({ wingsdata: this.props.wingsdata, loading: false });
                break;
            default:
                data = getwingsbyuser()
                break;
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.filldata();
    }
    joinwingrequesthandler = (event, id) => {
        this.setState({ loading: true })
        event.preventDefault();
        const formdata = {
            wing_id: id
        };
        var data = join_user_wings_save(formdata)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.state.client.join_wing_request_send(res.data);
                var data = get_all_wings()
                data.then(res => {
                    if (res !== undefined) {
                        if (res.data[0].length > 0) {
                            if (res.data[0]["error"] === undefined) {
                                this.setState({ wingsdata: res.data[0], loading: false });
                            }
                        }
                    }
                });
            }
        });
    }
    cancelwingrequesthandler = (event, id) => {
        this.setState({ loading: true })
        event.preventDefault();
        const formdata = {
            wing_id: id
        };
        var data = exitfromwings(formdata)
        data.then(res => {
            if (res.data["error"] === undefined) {
                this.filldata();
            }
        });
    }
    deleteitemconfirmhandler = (event, id) => {
        event.preventDefault();
        this.setState({ delete_item_id: id }, () => {
            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <DeleteConfirmation onClose={onClose} deletedataconfirmation={this.deletefromwinghandler} />
            //         );
            //     },
            // });
            confirmdelete(this.deletefromwinghandler);
        });
    }
    deletefromwinghandler = () => {
        const formdata = {
            wing_id: this.state.delete_item_id
        };
        var data = exitfromwings(formdata)
        data.then(res => {
            if (res.data["error"] === undefined) {
                let filterdata = this.state.wingsdata.filter((post) => {
                    return this.state.delete_item_id !== post.id;
                });
                this.setState(state => {
                    state.wingsdata = filterdata;
                    return state;
                });
            }
        });
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.wingsdata !== this.state.wingsdata;
    // }
    render() {        
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let list = [];
        let detail = null;
        list = this.state.wingsdata;
        let nodatadiv =
            <Nodatamessage imagesource={nodataimage}
                type={nodatatext_image_configuration.sidebarworkhistory}
                nodata_message={nodatatext_message.nowingsfound}
                btntype={ButtonType.edit_mode_button_profile}
                svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}>
            </Nodatamessage>
        if (list !== null) {
            if (list.length > 0) {
                detail = list.map((item, i) => (
                    <Userwingitems
                        usertypename={this.props.usertypename}
                        curate_at={item.curate_at}
                        totalbusiness={item.totalbusiness}
                        totalleads={item.totalleads}
                        largestdealsize={item.largestdealsize}
                        totalwingsmembers={item.totalwingsmembers}
                        key={item.id}
                        curated_userid={item.user_id}
                        id={item.id}
                        is_curator={item.is_curator}
                        wing_member_wing_id={item.wing_member_wing_id}
                        title={item.title}
                        description={item.description}
                        location={item.location}
                        moderator_message={item.moderator_message}
                        wing_pic_url={item.wing_pic_url}
                        status_name={item.status_name}
                        userjoiningstatus={item.userjoiningstatus}
                        wing_members_data={item.wing_members_data[0]}
                        totalwingmembers={item.wing_members_data[1]}
                        wing_pic_url_preview={item.wing_pic_url_preview}
                        loggedin_user_profilepic_url={this.props.loggedin_user_profilepic_url}
                        deletefromwinghandler={(event) => this.deleteitemconfirmhandler(event, item.id)}
                        joinwingrequesthandler={(event) => this.joinwingrequesthandler(event, item.id)}
                        cancelwingrequesthandler={(event) => this.cancelwingrequesthandler(event, item.id)}
                        page_type={this.props.page_type}
                        currency_name={this.props.currency_name}
                        curate_by_profile_pic={item.curate_by_profile_pic}
                        descriptionsubstring={item.descriptionsubstring}>
                    </Userwingitems>
                ));
            }
            else {
                detail = <React.Fragment>{nodatadiv}</React.Fragment>
            }
        }
        else {
            // detail = <Userwingitems
            //     loggedin_user_profilepic_url={this.props.loggedin_user_profilepic_url}
            //     page_type={this.props.page_type}
            //     currency_name={this.props.currency_name}>
            // </Userwingitems>
            detail = <React.Fragment>{nodatadiv}</React.Fragment>
        }
        return (
            <React.Fragment>
                {spinner}
                <div className={classshared.main__hero_content.join(' ')}>
                    <div className={classshared.streamline__cards_padding.join(' ')}>
                        {detail}
                    </div></div>
            </React.Fragment>
        )
    }
}
export default userwings