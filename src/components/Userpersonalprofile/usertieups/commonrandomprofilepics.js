import React from 'react';
import * as classshared from './classconst';

import ProfilePic from '../../UI/profilepic/profilepic';
import { ProfilepicType } from '../../../shared/utility';

class commonrandomprofilepics extends React.Component {


    render() {

        let tieupsdata = [];
        if (this.props.tieupsdata !== null) {
            this.props.tieupsdata.map((item, i) => {
                let detail = <React.Fragment key={item.id}>
                    <a href="#/" className={classshared.displaycursor} onClick={this.props.settabindexhandler}>
                        <ProfilePic profilepic_url={item.profile_pic_url} type={ProfilepicType.avatar} altname={item.name}></ProfilePic>
                    </a>
                </React.Fragment>
                return (
                    tieupsdata.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                )
            })
        }
        let tieupdiv = ""

        tieupdiv = <div className={classshared.main__hero_tieups}>
            <div className={classshared.main__hero_tieups_left}>
                <div className={classshared.avatars}>{tieupsdata}</div>
            </div>

        </div>

        return (
            <React.Fragment>{tieupdiv}</React.Fragment>
        )
    }
}

export default commonrandomprofilepics;