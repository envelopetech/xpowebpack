import React from 'react'
import { Label } from 'semantic-ui-react'

const TextInput = ({ input, id, type, placeholder, className, errorclass, inputbordererrorclass, labelname, labelclassname, labelerrorclassname,  tabIndex, onKeyDown, onBlur, readonly, onChangeHandler, meta: { touched, error } }) => {
  let class_name = className;
  if (touched && error) {
    const feedbutton = [className]
    feedbutton.push(inputbordererrorclass)
    class_name = feedbutton.join(' ');
    //lablelclass = labelerrorclassname;
  }
  return (
    <React.Fragment>
      {/* <label className={lablelclass}>{labelname}</label> */}
      {/* <Form.Field error={touched && !!error} width={width}> */}
      {
        readonly === true  && readonly !== undefined ?
          (<input onBlur={onBlur} readOnly {...input} tabIndex={tabIndex} placeholder={placeholder} type={type} className={class_name} id={id} />) :
          (<input onBlur={onBlur}  onKeyDown={onKeyDown} {...input} tabIndex={tabIndex} placeholder={placeholder} type={type} className={class_name} id={id} />)
      }
      {touched && error && <Label className={errorclass}>{error}</Label>}
      {/* </Form.Field> */}
    </React.Fragment>
  )
}
export default TextInput
