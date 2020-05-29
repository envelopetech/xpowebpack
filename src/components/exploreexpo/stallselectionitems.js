import React from 'react';
import * as classshared from '../commoncss/classconst';
import { stall_company_name } from '../../shared/utility'


const stallselectionitems = (props) => {
    let isChecked = props.isChecked
    if (props.checked_id !== null) {
        if (props.id === props.checked_id) {
            isChecked = true
        }
    }

    let labeldiv = null
    if (props.is_booked) {
        labeldiv = <label id="disabledlabel">
            <input type="checkbox" value={props.id} /> {props.stall_name}
        </label>
    }
    else {
        if (isChecked) {
            labeldiv = <label id="selected">
                <input type="checkbox" onClick={props.onchangehandler} checked={isChecked} value={props.id} /> {props.stall_name}
            </label>
        }
        else {
            labeldiv = <label >
                <input type="checkbox" onClick={props.onchangehandler} checked={isChecked} value={props.id} /> {props.stall_name}
            </label>
        }
    }
    if (props.stall_name.toString().toLowerCase() === stall_company_name) {
        labeldiv = <label id="disabledlabel">
            <input type="checkbox" value={props.id} /> {props.stall_name}
        </label>
    }
    return (
        <React.Fragment>
            <div className={classshared.flex_flex_justify_sb_column.join(' ')}>
                <div className={classshared.stall_margin_b_l.join(' ')}>
                    {labeldiv}
                </div>
            </div>
        </React.Fragment >
    )
}
export default React.memo(stallselectionitems);