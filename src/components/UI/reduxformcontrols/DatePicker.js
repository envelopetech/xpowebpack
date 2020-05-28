import React from 'react'
import { Form } from 'semantic-ui-react'
import { Label } from 'semantic-ui-react'
import './date.module.css'

const DatePicker = (props) => {
    let class_name = props.className;
    if (props.meta.touched && props.meta.error) {
        const feedbutton = [class_name]
        feedbutton.push(props.inputbordererrorclass)
        class_name = feedbutton.join(' ');
        //lablelclass = labelerrorclassname;
    }
    return (
        <Form.Field error={props.meta.touched && !!props.meta.error} width={props.width}>
            <input type="date" className={class_name} min={props.min} onBlur={props.onChangeHandler} placeholder={props.placeholder}
            ></input>
            {props.meta.touched && props.meta.error && <Label className={props.errorclass}>{props.meta.error}</Label>}
        </Form.Field>
    )
}
export default DatePicker