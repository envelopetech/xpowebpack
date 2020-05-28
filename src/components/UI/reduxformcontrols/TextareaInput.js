import React from 'react'
//import { Form } from 'semantic-ui-react'

const TextareaInput = ({input, width, type, placeholder, className, tabIndex, errorclass, inputbordererrorclass, labelname, labelclassname, labelerrorclassname, rows,  meta: {touched, error}}) => {
    
  let class_name= className;      
  if(touched && error)
  {
    const feedbutton = [className]
    feedbutton.push(inputbordererrorclass)
    class_name = feedbutton.join(' ');
  }

  return (
    <React.Fragment>
    {/* <label className={lablelclass}>{labelname}</label> */}
    {/* <Form.Field error={touched && !!error} width={width}> */}
      <textarea {...input} tabIndex={tabIndex} placeholder={placeholder} type={type} className={class_name} rows={rows}/>
      {/* {touched && error && <Label className={errorclass}>{error}</Label>} */}
    {/* </Form.Field> */}
    </React.Fragment>
  )
}
export default TextareaInput
