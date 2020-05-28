import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as classshared from '../../commoncss/classconst';
import Button from '../Button/Button';
import { ButtonType } from '../../../shared/utility';
import 'react-confirm-alert/src/react-confirm-alert.css';

class deleteconfirmation extends Component {
    render() {
        return (
            <div className={classshared.delete_confirmation_overlay}>
                <div className={classshared.margin_b_m}><p className={classshared.font_1_medium_text_grey.join(' ')}>Are you sure you want to delete this?</p></div>
                <div className={classshared.buttoncontainer}>
                    <div className={classshared.mar_r_m}> <Button btntype={ButtonType.btn_grey} clicked={this.props.onClose}>Cancel</Button></div>
                    <div className={classshared.mar_r_m}>
                        <Button
                            btntype={ButtonType.btn_green}
                            clicked={() => {
                                this.props.deletedataconfirmation();
                                this.props.onClose();
                            }}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
deleteconfirmation.propTypes = {
    actions: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default deleteconfirmation;