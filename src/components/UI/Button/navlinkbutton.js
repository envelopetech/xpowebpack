import React from 'react';
import classes from './Button.module.css';
import { ButtonType } from '../../../shared/utility';
import { NavLink } from 'react-router-dom';
import * as common from '../../commoncss/classconst';

const navlinkbutton = (props) => {

    let btntype = null;

    switch (props.btntype) {
        case (ButtonType.nodatafoundbutton):
            const button4 = [classes.buttonnodata]
            button4.push(classes.success);
            btntype = button4.join(' ');
            break;
        case (ButtonType.btn_outline_purple):
            const btnviewmore = [classes.btn]
            btnviewmore.push(classes.btn_purple)
            btnviewmore.push(common.font_1_bold)
            btnviewmore.push(common.text_12)
            btnviewmore.push(common.margin_r_sm)
            btntype = btnviewmore.join(' ');
            break;
        case (ButtonType.dropdownnavlink):
            const btndropdownnavlink = [classes.btn_action_delete_edit]
            btndropdownnavlink.push(classes.padding15px)
            btndropdownnavlink.push(common.font_1_regular)
            btndropdownnavlink.push(common.text_12)
            btndropdownnavlink.push(common.text_normal)
            btntype = btndropdownnavlink.join(' ');
            break;
        case (ButtonType.btn_btn_outline_blue):
            const btn_btn_outline_blue = [classes.btn]
            btn_btn_outline_blue.push(common.font_1_bold)
            btn_btn_outline_blue.push(classes.btn_outline)
            btn_btn_outline_blue.push(classes.blue)
            btn_btn_outline_blue.push(common.text_12) 
            btn_btn_outline_blue.push(common.margin_r_sm)                       
            btntype = btn_btn_outline_blue.join(' ');
            break;

        case (ButtonType.btn_grey):
            const btngrey = [classes.btn]
            btngrey.push(classes.btn_grey)
            btngrey.push(common.margin_t_m)
            btntype = btngrey.join(' ');
            break;
        case (ButtonType.btn_back_button):
            const btn_back_button = [classes.backbutton]            
            btntype = btn_back_button.join(' ');
            break;
        default:
            btntype = classes.save_btn
    }

    let renderdiv = <React.Fragment>
        <NavLink
            className={btntype}
            to={props.link}>{props.children}</NavLink>
    </React.Fragment>

    if (props.istargetblank !== undefined && props.istargetblank === true) {
        renderdiv = <NavLink
            className={btntype}
            target="_blank"
            to={props.link}>{props.children}</NavLink>
    }

    return (

        <React.Fragment>{renderdiv}</React.Fragment>
    )
};

export default navlinkbutton;