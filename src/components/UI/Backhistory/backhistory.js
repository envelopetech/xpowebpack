import React from 'react';
import * as classshared from './classconst';
import Icon from '../Icon/Icon';
import { ICONS, ButtonType } from '../../../shared/utility';
import { withRouter } from 'react-router';
import Button from '../Button/Button'
import MediaQuery from 'react-responsive'

class backhistory extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.go(-1);
    }
    render() {        
        return (
            <div className={classshared.explore}>
                <MediaQuery query="(min-device-width: 1224px)"> <Button
                    btntype={ButtonType.showmorelesslink} clicked={this.goBack}>
                    {
                        this.props.isicon
                            ?
                            <Icon svgclass={classshared.common__icon} icon={ICONS.LEFTARROW} />
                            :
                            null
                    }
                    <strong className={classshared.side_nav__item}>{this.props.buttontext} </strong>
                </Button>
                </MediaQuery>
            </div>
        )
    }

};
export default React.memo(withRouter(backhistory));