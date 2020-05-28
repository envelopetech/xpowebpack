import React from 'react'
import { Label } from 'semantic-ui-react'

const Textinputwithevent = (props) => {
    let class_name = props.className;
    if (props.meta.touched && props.meta.error) {
        const feedbutton = [class_name]
        feedbutton.push(props.inputbordererrorclass)
        class_name = feedbutton.join(' ');
        //lablelclass = labelerrorclassname;
    }
    return (
        <React.Fragment>
            <input  value={props.value} tabIndex={props.tabIndex} placeholder={props.placeholder} type={props.type} 
            className={class_name} id={props.id} onBlur={props.onChangeHandler} />
            {props.meta.touched && props.meta.error && <Label className={props.errorclass}>{props.error}</Label>}
        </React.Fragment>
    )
}
export default Textinputwithevent