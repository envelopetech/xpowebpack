import React, { Component } from 'react';
import PersonalForm from './personalform'


class personal extends Component {

    render() {

        return (
            <React.Fragment>
                <PersonalForm
                loading={this.props.loading}
                    onSubmit={this.props.submitpersonaldetail}
                    page_type={this.props.page_type}
                    usertypename={this.props.usertypename}
                    submitpersonaldetail={this.props.submitpersonaldetail}
                    first_name={this.props.first_name}
                    last_name={this.props.last_name}
                    location={this.props.location}
                    profile_pic_url={this.props.profile_pic_url}
                    profile_pic_url_preview={this.props.profile_pic_url_preview}
                    phone_number={this.props.phone_number}
                    company_email={this.props.company_email}
                    personal_email={this.props.personal_email}
                    address1={this.props.address1}
                    address2={this.props.address2}
                >

                </PersonalForm>
            </React.Fragment>
        )
    }

}

export default personal