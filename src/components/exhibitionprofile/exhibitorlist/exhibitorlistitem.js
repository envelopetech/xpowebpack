import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../../UI/profilepic/profilepic';
import { encodedstring } from '../../../shared/utility'
import { Redirect } from 'react-router-dom';
import defaultimage from '../../../assets/images/default_avatar.png'

class exhibitorlistitem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirecttohome: false,
        }
    }
    // let namelink =null;       
    // let text = props.userid;
    // let bytes = utf8.encode(text);
    // let encoded = base64.encode(bytes);    
    // namelink=<React.Fragment>
    //         <NavLink     
    //         className={classshared.anchorremoveline.join(' ')}                  
    //         to={`/home/${encoded}`}>{props.name}</NavLink>
    //         </React.Fragment> 

    redirecthandler = () => {
        this.setState({
            redirecttohome: true
        })
    }

    render() {
        // let authRedirect = null;
        // if (this.state.redirecttohome) {
        //     let encoded = encodedstring(this.props.id)
        //     authRedirect = <Redirect to={`/exhibitorprofile/${encoded}`} />
        // }
        let exhibitorimage = defaultimage
        if (this.props.company_logo_url !== undefined && this.props.company_logo_url !== null) {
            exhibitorimage = this.props.company_logo_url
        }
        return (
            <React.Fragment>
                {/* {authRedirect} */}
                <div className={classshared.company_card__wrapper} onClick={this.redirecthandler}>
                    <div className={classshared.company_card__image.join(' ')}>
                        <img src={exhibitorimage} className={classshared.exhibitorlist__image_large} />
                        <div className={classshared.hovertext.join(' ')}>
                            View Details<br />
                        </div>
                    </div>
                    {/* <div className={classshared.photos__content.join(' ')}>
                        <div className={classshared.flex_flex_align_center.join(' ')}>
                            <img src={threedimage} alt=""></img>
                            <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')} icon={props.iconname}></Icon>
                        </div>
                    </div> */}
                    <div className={classshared.company_card__footer.join(' ')}>{this.props.name}</div>
                </div>
            </React.Fragment>
        )
    }
}
export default React.memo(exhibitorlistitem);