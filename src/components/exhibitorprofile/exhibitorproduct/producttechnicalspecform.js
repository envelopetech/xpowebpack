import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import TextInput from '../../UI/reduxformcontrols/TextInput';
import Button from '../../UI/Button/Button';
import{ButtonType, ButtonText,titleheading,commonplaceholder,label_text} from '../../../shared/utility'
import { Field, reduxForm } from 'redux-form';
import { Form} from 'semantic-ui-react';
import { required} from 'redux-form-validators'


class producttechnicalspecform extends Component {

    constructor(props) {
        super(props);        
        this.state={            
            
        }
    }    
    render()
    {                              
        return(  
            <React.Fragment>         
                <div  className={classshared.simple_form}>
                <div className={classshared.flex}>
                    <div className={classshared.forum_group_margin_r_m.join(' ')}>                    
                        {/* <Field
                            name={titleheading.specname.toLowerCase()}
                            type="text"                    
                            component={TextInput}                    
                            className={classshared.input_box}
                            placeholder={commonplaceholder.specname}
                            errorclass ={classshared.formlabelerror}                                            
                            validate={[required()]}
                        /> */}
                        <input type="text" 
                        tabIndex={1}
                        placeholder={commonplaceholder.specname}  
                        className={classshared.input_box}
                        onChange={this.props.specnamechangehandler}></input>
                        <label className={classshared.form_label.join(' ')}>{label_text.specname}</label>
                    </div>
                    <div className={classshared.form_group}>                    
                    <Field
                            name={titleheading.specvalue.toLowerCase()}
                            type="text"    
                            tabIndex={2}                
                            component={TextInput}                    
                            className={classshared.input_box}
                            placeholder={commonplaceholder.specvalue}
                            errorclass ={classshared.formlabelerror}                                            
                            validate={[required()]}
                        />
                        <label className={classshared.form_label.join(' ')}>{label_text.specvalue}</label>
                    </div>
                    </div> 
                    <div className={classshared.form_group}>
                        <div className={classshared.buttoncontainer}>
                            <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnsavecancel} buttontype="submit" >{ButtonText.save}</Button></div>
                            <div className={classshared.mar_r_m}><Button btntype={ButtonType.btnsavecancel}  buttontype="button" clicked={this.props.canceltechnicalspec}>{ButtonText.cancel}</Button></div>
                        </div>                      
                    </div>
                </div> 
                
            </React.Fragment> 
        )
    }
}


producttechnicalspecform = reduxForm({
    form: 'producttechnicalspec',
    //validate,
  })(producttechnicalspecform);
  
  export default producttechnicalspecform;