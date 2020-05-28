import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import UploadDocs from '../../UI/Uploaddocs/Uploaddocs';

const imageupload = ({ input, width, buttontype, options, onSuccessupload, labelname, fieldvalue, preview, formlabelclass, buttontext, tabIndex, meta: { touched, error } }) => {

  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* <Filestack {...input} buttontype={buttontype} 
                            option={options}
                            onSuccessupload={onSuccessupload} onErrorupload={input.onErrorImageupload}></Filestack>  */}
      <UploadDocs label={labelname}
        value={fieldvalue}
        tabIndex={tabIndex}
        preview={preview}
        option={options}
        formlabel={formlabelclass}
        buttontype={buttontype}
        buttontext={buttontext}
        onSuccessImageupload={onSuccessupload} onErrorupload={input.onErrorImageupload}></UploadDocs>
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}
export default imageupload