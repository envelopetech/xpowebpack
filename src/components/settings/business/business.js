import React, { Component } from 'react';
import Businessform from './businessform'

class business extends Component {
    render() {
        return (
            <React.Fragment>
                <Businessform
                industrylist={this.props.industrylist}
                    loading={this.props.loading}
                    onSubmit={this.props.submitbusinessdetail}
                    page_type={this.props.page_type}
                    usertypename={this.props.usertypename}
                    business_name={this.props.business_name}
                    designation={this.props.designation}
                    industry={this.props.industry}
                    company_website={this.props.company_website}
                    company_logo_url={this.props.company_logo_url}
                    company_logo_url_preview={this.props.company_logo_url_preview}
                    industrydata={this.props.industrydata}
                >
                </Businessform>
            </React.Fragment>
        )
    }
}
export default business