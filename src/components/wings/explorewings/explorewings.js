import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import Search from '../../UI/search/search';
import { searchpagetype, searchplaceholder, PageType } from '../../../shared/utility';
import UserWings from '../winglist/userwings';
import Recommendationwings from './recommendationwings';
import { get_random_recommend_wings } from '../../../actions/userprofilesetup/dataactions';
import shortid from "shortid";


const initialState = {
    recommendwingsdata: null,
}
class explorewings extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    componentDidMount() {        
        this.setState({ loading: true })
        var data = get_random_recommend_wings()
        data.then(res => {
            if (res !== undefined) {
                if (res.data.length > 0) {
                    if (res.data["error"] === undefined) {                        
                        this.setState({ recommendwingsdata: res.data });
                    }
                }
            }
        });
    }    
    render() {          
        let listwings =null
        if (this.state.recommendwingsdata !== null) {
            if (this.state.recommendwingsdata.length > 0) {
                let data = null;
                data = this.state.recommendwingsdata.map((item, i) => {
                    let totalmembers = 0
                    if (item.wings_users !== null) {
                        if (item.wings_users.length > 0) {
                            totalmembers = item.wings_users[1]
                        }
                    }
                    let detail = null;
                    detail = <Recommendationwings
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                location={item.location}
                                wing_members_data={item.wing_members_data}
                                totalmembers={totalmembers}
                                coverimage={item.wing_cover_url}
                                descriptionsubstring={item.descriptionsubstring}
                                id={item.id}>
                            </Recommendationwings>
                    return (
                        <div key={shortid.generate()} className={classshared.margin_t_m}>{detail}</div>
                    )
                });
                listwings = <React.Fragment>{data}</React.Fragment>
            }
        }
        return (
            <React.Fragment>
                <div className={classshared.main_content_tab.join(' ')}>
                    <div className={classshared.size2of3}>
                        <h1 className={classshared.text_dark_margin_b_m.join(' ')}>Explore Wings</h1>
                        <div className={classshared.margin_b_m}><Search placeholder={searchplaceholder.explorewingsearch} pagetype={searchpagetype.explorewingsearch}></Search></div>
                        <UserWings usertypename={this.props.usertypename} wingsdata={this.props.wingsdata} currency_name={this.props.currency_name} page_type={PageType.explorewings} loggedin_user_profilepic_url={this.props.loggedin_user_profilepic_url}></UserWings>
                    </div>
                    {listwings}
                </div>
            </React.Fragment>
        )
    }
}
export default explorewings