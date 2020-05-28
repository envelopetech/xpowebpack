import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import Filestack from '../../FilestackUpload/FilestackUpload';
import * as classshared from '../../commoncss/classconst';
import Icon from '../Icon/uploadicon';

const fileuploadwithoutvalidations = ({ input, width, buttontype, options, onSuccessupload, buttontext, tabIndex, meta: { touched, error } }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <div className={classshared.flex}>
                <Icon svgclass={classshared.icon_20_icon_blue_margin_r_10.join(' ')}></Icon>
                <Filestack {...input} buttontype={buttontype}
                    option={options}
                    tabIndex={tabIndex}
                    buttontext={buttontext}
                    onSuccessupload={onSuccessupload}
                    onErrorupload={input.onErrorImageupload}></Filestack>
            </div>
        </Form.Field>
    )
}
export default fileuploadwithoutvalidations